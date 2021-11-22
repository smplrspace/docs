import React, {
  useState,
  useCallback,
  useReducer,
  useEffect,
  Fragment
} from 'react'
import { Group, Chips, Chip, List, ListItem } from '@mantine/core'
import { useMediaQuery } from '@mantine/hooks'
import Chance from 'chance'
import { append, evolve, init, isEmpty, last, mergeRight, propEq } from 'ramda'

import Viewer from './Viewer'
import Button from '../../../components/Button'

const chance = new Chance()

const RoomAvailability = () => {
  const isMobile = useMediaQuery('(max-width: 600px)')

  const [space, setSpace] = useState()
  const [mode, setMode] = useState('pick')

  const [rooms, dispatchRoom] = useReducer((rooms, action) => {
    switch (action.type) {
      case 'addCoordinate':
        if (isEmpty(rooms) || last(rooms).closed) {
          // new room
          return append(
            {
              id: chance.guid(),
              name:
                chance.letter({ casing: 'upper' }) +
                chance.integer({ min: 1, max: 9 }),
              available: Math.random() < 0.5,
              coordinates: [action.coordinate],
              closed: false
            },
            rooms
          )
        }
        return [
          ...init(rooms),
          evolve({
            coordinates: append(action.coordinate)
          })(last(rooms))
        ]
      case 'updateCoordinates':
        return rooms.map(r =>
          r.id === action.id ? { ...r, coordinates: action.coordinates } : r
        )
      case 'closeRoom':
        return [...init(rooms), mergeRight(last(rooms), { closed: true })]
      default:
        console.error(`Unknown action type ${action.type}`)
    }
  }, [])

  // memoize so Viewer render once only (wrapped in memo)
  const onReady = useCallback(space => setSpace(space), [])

  // room creation
  useEffect(() => {
    if (!space) {
      return
    }
    if (mode === 'pick') {
      space.enablePickingMode({
        onPick: ({ coordinates }) => {
          dispatchRoom({
            type: 'addCoordinate',
            coordinate: coordinates
          })
        }
      })
    } else {
      space.disablePickingMode()
    }
  }, [space, mode])

  // render rooms
  useEffect(() => {
    if (!space) {
      return
    }
    const openRoom = rooms.find(propEq('closed', false))
    if (openRoom) {
      space.addDataLayer({
        id: 'open-room',
        type: 'polygon',
        data: [openRoom],
        height: 3.05,
        alpha: 0.5,
        onDrop: ({ data, coordinates }) =>
          dispatchRoom({
            type: 'updateCoordinates',
            id: data.id,
            coordinates
          })
      })
    } else {
      space.removeDataLayer('open-room')
    }
    const closedRooms = rooms.filter(propEq('closed', true))
    space.addDataLayer({
      id: 'rooms',
      type: 'polygon',
      data: closedRooms,
      tooltip: d => `${d.name} - ${d.available ? 'free' : 'occupied'}`,
      color: d => (d.available ? '#3aa655' : '#ff3f34'),
      alpha: 0.5,
      height: 2.9
    })
    return () => {
      space.removeDataLayer('rooms')
    }
  }, [space, mode, rooms])

  return (
    <Group align='flex-start'>
      <div style={{ width: isMobile ? '100%' : 'calc(50% - 16px)' }}>
        <Viewer onReady={onReady} />
      </div>
      {!space ? (
        <p>Please start the viewer</p>
      ) : (
        <Group
          direction='column'
          style={{ width: isMobile ? '100%' : 'calc(50% - 16px)' }}
        >
          <Chips
            color='blue'
            variant='outline'
            radius='sm'
            value={mode}
            onChange={setMode}
          >
            <Chip value='pick'>Create new room</Chip>
            <Chip value='display'>Display availability</Chip>
          </Chips>
          {mode === 'pick' ? (
            <Fragment>
              <p>Draw contour on the floor plan to create a new room.</p>
              <Button
                onClick={() => {
                  dispatchRoom({
                    type: 'closeRoom'
                  })
                  setMode('display')
                }}
              >
                Close room
              </Button>
            </Fragment>
          ) : (
            <p>
              Room availability is rendered on the floor plan using a polygon
              data layer.
            </p>
          )}
          <h3>Rooms</h3>
          {rooms.length === 0 && <p>No room yet.</p>}
          <List>
            {rooms.map((room, index) => (
              <ListItem key={index}>
                {room.name} - {room.available ? 'free' : 'occupied'}
              </ListItem>
            ))}
          </List>
        </Group>
      )}
    </Group>
  )
}

export default RoomAvailability
