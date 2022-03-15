import React, { useState, useCallback, useEffect } from 'react'
import chroma from 'chroma-js'
import { Group } from '@mantine/core'
import { useMediaQuery } from '@mantine/hooks'
import {
  compose,
  groupBy,
  mapObjIndexed,
  pluck,
  prop,
  sum,
  values
} from 'ramda'
import numeral from 'numeral'

import Button from '../../../components/Button'
import Viewer from './Viewer'
import data from './data.json'

const colorScale = chroma.scale('Spectral')
const randomColor = () => colorScale(Math.random()).hex()
const addRandomColor = e => ({
  ...e,
  color: randomColor()
})

const addCoordinates = ({ padding = 0 } = {}) => e => ({
  ...e,
  coordinates: [
    {
      levelIndex: 0,
      x: e.sx - padding,
      z: e.sz - padding
    },
    {
      levelIndex: 0,
      x: e.sx + e.sw + padding,
      z: e.sz - padding
    },
    {
      levelIndex: 0,
      x: e.sx + e.sw + padding,
      z: e.sz + e.sd + padding
    },
    {
      levelIndex: 0,
      x: e.sx - padding,
      z: e.sz + e.sd + padding
    }
  ]
})

const items = data.items.map(addCoordinates()).map(addRandomColor)

const occupancyPercent = compose(
  values,
  mapObjIndexed((items, bin) => {
    const percentUtilised = compose(
      vol => vol / Math.pow(150, 3),
      sum,
      pluck('vol')
    )(items)
    const { sx, sy, sz } = items[0]
    const side = 1.5 - 0.04
    const padding = 0
    const coordinates = [
      {
        levelIndex: 0,
        x: sx - padding,
        z: sz - padding
      },
      {
        levelIndex: 0,
        x: sx + side + padding,
        z: sz - padding
      },
      {
        levelIndex: 0,
        x: sx + side + padding,
        z: sz + side + padding
      },
      {
        levelIndex: 0,
        x: sx - padding,
        z: sz + side + padding
      }
    ]
    return { bin, percentUtilised, sy, coordinates }
  }),
  groupBy(prop('bin'))
)(data.items)

const Warehouse = () => {
  const isMobile = useMediaQuery('(max-width: 600px)')

  const [space, setSpace] = useState()
  const [view, setView] = useState('items')

  // memoize so Viewer render once only (wrapped in memo)
  const onReady = useCallback(space => setSpace(space), [])

  useEffect(() => {
    if (!space) {
      return
    }
    if (view === 'items') {
      space.addDataLayer({
        id: 'items',
        type: 'polygon',
        data: items,
        baseHeight: d => d.sy,
        height: d => d.sh,
        tooltip: d => `Bin: ${d.bin} - Item: ${d.item}`,
        color: d => d.color
      })
      return () => {
        space.removeDataLayer('items')
      }
    }
    if (view === 'occupancy') {
      space.addDataLayer({
        id: 'occupancy',
        type: 'polygon',
        data: occupancyPercent,
        baseHeight: d => d.sy,
        height: d => d.percentUtilised * (1.5 - 0.04),
        tooltip: d =>
          `Bin: ${d.bin} - ${numeral(d.percentUtilised).format(
            '0.00%'
          )} utilised`,
        color: d => (d.percentUtilised >= 0.5 ? '#3aa655' : '#cd4343')
      })
      return () => {
        space.removeDataLayer('occupancy')
      }
    }
  }, [space, view])

  return (
    <Group align='flex-start'>
      <div
        style={{ width: isMobile ? '100%' : 'calc(75% - 16px)', maxWidth: 800 }}
      >
        <Viewer onReady={onReady} />
      </div>
      <Group
        direction={isMobile ? 'row' : 'column'}
        style={{ width: isMobile ? '100%' : 'calc(25% - 16px)' }}
      >
        <Button
          variant='outline'
          disabled={view === 'items' || !space}
          onClick={() => setView('items')}
        >
          View{space && view === 'items' && 'ing'} items
        </Button>
        <Button
          variant='outline'
          disabled={view === 'occupancy' || !space}
          onClick={() => setView('occupancy')}
        >
          View{space && view === 'occupancy' && 'ing'} occupancy
        </Button>
      </Group>
    </Group>
  )
}

export default Warehouse
