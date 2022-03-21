import React, { useState, useCallback, useEffect } from 'react'
import numeral from 'numeral'

import Viewer from './Viewer'
import { units } from './_data'

const INITIAL_MODE = '2d'

const colorScale = rental =>
  rental < 3000
    ? '#3aa655'
    : rental < 6000
      ? '#c3ae0e'
      : rental < 9000
        ? '#c77a15'
        : '#ff3f34'

const MallLeasing = () => {
  const [space, setSpace] = useState()
  const [mode, setMode] = useState(INITIAL_MODE)

  // memoize so Viewer render once only (wrapped in memo)
  const onReady = useCallback(space => setSpace(space), [])

  const onModeChange = useCallback(setMode, [])

  // render units
  useEffect(() => {
    if (!space) {
      return
    }
    space.addDataLayer({
      id: 'units',
      type: 'polygon',
      data: units,
      tooltip: d => `${d.name} - $${numeral(d.rental).format('0,0')}/mo`,
      color: d => colorScale(d.rental),
      alpha: 0.7,
      height: mode === '3d' ? 2.9 : 0.0045
    })
    return () => {
      space.removeDataLayer('units')
    }
  }, [space, mode])

  return (
    <div style={{ width: '100%', maxWidth: 800, margin: '0 auto' }}>
      <Viewer
        mode={INITIAL_MODE}
        onReady={onReady}
        onModeChange={onModeChange}
      />
    </div>
  )
}

export default MallLeasing
