import React, { useState, useCallback, useEffect } from 'react'
import chroma from 'chroma-js'

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
      x: e.x - padding,
      z: e.y - padding
    },
    {
      levelIndex: 0,
      x: e.x + e.width + padding,
      z: e.y - padding
    },
    {
      levelIndex: 0,
      x: e.x + e.width + padding,
      z: e.y + e.height + padding
    },
    {
      levelIndex: 0,
      x: e.x - padding,
      z: e.y + e.height + padding
    }
  ]
})

const bins = data.bins.map(addCoordinates({ padding: 0.01 }))
const items = data.items.map(addCoordinates()).map(addRandomColor)

const RoomAvailability = () => {
  const [space, setSpace] = useState()

  // memoize so Viewer render once only (wrapped in memo)
  const onReady = useCallback(space => setSpace(space), [])

  useEffect(() => {
    if (!space) {
      return
    }
    space.addDataLayer({
      id: 'bins',
      type: 'polygon',
      data: bins,
      height: d => d.height,
      color: '#ffffff',
      alpha: 0.3
    })
    space.addDataLayer({
      id: 'items',
      type: 'polygon',
      data: items,
      height: d => d.height,
      tooltip: d => `Item ${d.item}`,
      color: d => d.color
    })
    return () => {
      space.removeDataLayer('bins')
      space.removeDataLayer('items')
    }
  }, [space])

  return (
    <div style={{ width: '100%', maxWidth: 800, margin: '0 auto' }}>
      <Viewer onReady={onReady} />
    </div>
  )
}

export default RoomAvailability
