import React, { useState, useCallback, useEffect } from 'react'

import Viewer from './Viewer'
import { rooms, desks } from './_data'

const OfficeBooking = () => {
  const [space, setSpace] = useState()

  // memoize so Viewer render once only (wrapped in memo)
  const onReady = useCallback(space => setSpace(space), [])

  // render rooms
  useEffect(() => {
    if (!space) {
      return
    }
    space.addDataLayer({
      id: 'rooms',
      type: 'polygon',
      data: rooms,
      tooltip: d => `${d.name} - ${d.available ? 'free' : 'occupied'}`,
      color: d => (d.available ? '#3aa655' : '#ff3f34'),
      alpha: 0.7,
      height: 2.9
    })
    space.addDataLayer({
      id: 'desks',
      type: 'furniture',
      data: desks,
      tooltip: d => `${d.name} - ${d.available ? 'free' : 'occupied'}`,
      color: d => (d.available ? '#3aa655' : '#ff3f34')
    })
    return () => {
      space.removeDataLayer('rooms')
      space.removeDataLayer('desks')
    }
  }, [space])

  return (
    <div style={{ width: '100%', maxWidth: 800, margin: '0 auto' }}>
      <Viewer onReady={onReady} />
    </div>
  )
}

export default OfficeBooking
