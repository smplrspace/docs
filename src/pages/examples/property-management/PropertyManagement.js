import React, {
  Fragment,
  useState,
  useCallback,
  useReducer,
  useEffect
} from 'react'
import { Group, List, ListItem, Text, Modal, Image } from '@mantine/core'
import { compose, concat, propEq, find, filter } from 'ramda'
import { useMediaQuery } from '@mantine/hooks'
import numeral from 'numeral'
import moment from 'moment'
import Chance from 'chance'

import Viewer from './Viewer'
import Button from '../../../components/Button'
import TextInput from '../../../components/TextInput'
import { reports as savedReports } from './_data'

const chance = new Chance()

const PropertyManagement = () => {
  const isMobile = useMediaQuery('(max-width: 600px)')

  const [space, setSpace] = useState()

  const [reports, dispatchReport] = useReducer((reports, action) => {
    switch (action.type) {
      case 'add':
        return [...reports, action.report]
      case 'update':
        return reports.map(s =>
          s.id === action.id ? { ...s, ...action.updates } : s
        )
      default:
        console.error(`Unknown action type ${action.type}`)
    }
  }, savedReports)

  const [newReport, dispatchNewReport] = useReducer((report, action) => {
    switch (action.type) {
      case 'new':
        space.enablePickingMode({
          onPick: ({ coordinates }) => {
            dispatchNewReport({ type: 'position', position: coordinates })
            space.disablePickingMode()
          }
        })
        return {
          id: chance.guid(),
          created_at: new Date().toISOString(),
          title: '',
          status: 'pending review'
        }
      case 'title':
        return {
          ...report,
          title: action.title
        }
      case 'position':
        return {
          ...report,
          position: action.position
        }
      case 'add':
        dispatchReport({
          type: 'add',
          report
        })
        return null
      default:
        console.error(`Unknown action type ${action.type}`)
    }
  }, null)

  const [modalId, setModalId] = useState(null)
  const modalItem = compose(
    find(propEq('id', modalId)),
    filter(report => !!report.image)
  )(reports)

  // memoize so Viewer render once only (wrapped in memo)
  const onReady = useCallback(space => setSpace(space), [])

  // render reports
  useEffect(() => {
    if (!space) {
      return
    }
    const allReports = concat(
      newReport && newReport.position ? [newReport] : [],
      reports
    )
    space.addDataLayer({
      id: 'reports',
      type: 'point',
      diameter: 0.6,
      data: allReports,
      tooltip: d => d.title,
      color: d => (d.status === 'repair planned' ? '#3aa655' : '#1e7bd3'),
      onClick: d => setModalId(d.id)
    })
    return () => {
      space.removeDataLayer('reports')
    }
  }, [space, reports, newReport])

  return (
    <Group align='flex-start'>
      <div style={{ width: isMobile ? '100%' : 'calc(50% - 16px)' }}>
        <Viewer onReady={onReady} />
      </div>
      <Group
        direction='column'
        style={{ width: isMobile ? '100%' : 'calc(50% - 16px)' }}
      >
        <h3>Reports</h3>
        <List>
          {reports.map(report => (
            <ListItem key={report.id}>
              {report.title} - {report.status} (
              {moment(report.created_at).fromNow()})
            </ListItem>
          ))}
        </List>
        {newReport ? (
          <Fragment>
            <h4>New report</h4>
            <TextInput
              label='Report title'
              required
              value={newReport.title}
              onChange={e =>
                dispatchNewReport({ type: 'title', title: e.target.value })
              }
            />
            {!newReport.position ? (
              <Text size='sm' mt='xs' mb='sm'>
                Please click on the floor plan to locate the defect.
              </Text>
            ) : (
              <Text size='sm' mt='xs' mb='sm'>
                Report location captured: (L{newReport.position.levelIndex},{' '}
                {numeral(newReport.position.x).format('0.0')}m,{' '}
                {numeral(newReport.position.z).format('0.0')}m ,{' '}
                {numeral(newReport.position.elevation).format('0.0')}m)
              </Text>
            )}
            <Button
              disabled={!newReport.title || !newReport.position}
              onClick={() => {
                dispatchNewReport({ type: 'add' })
              }}
            >
              Add report
            </Button>
          </Fragment>
        ) : (
          <Button
            disabled={!space}
            onClick={() => dispatchNewReport({ type: 'new' })}
          >
            New report
          </Button>
        )}
        {!space && <p>Please start the viewer</p>}
      </Group>
      {!!modalItem && (
        <Modal opened onClose={() => setModalId(null)} title={modalItem.title}>
          <Text mb='md'>
            Reported {moment(modalItem.created_at).fromNow()}
            <br />
            Status: {modalItem.status}
          </Text>
          <Image width={320} src={modalItem.image} withPlaceholder />
        </Modal>
      )}
    </Group>
  )
}

export default PropertyManagement
