import React, { useState, useCallback, useEffect } from 'react'
import { evolve, map } from 'ramda'

import Viewer from './Viewer'
import { stalls, sensors, beacons } from './_data'

const INITIAL_MODE = '3d'

const IoT = () => {
  const [space, setSpace] = useState()
  const [mode, setMode] = useState(INITIAL_MODE)

  // memoize so Viewer render once only (wrapped in memo)
  const onReady = useCallback(space => setSpace(space), [])

  const onModeChange = useCallback(setMode, [])

  const autoElevation = map(
    evolve({ position: { elevation: value => (mode === '3d' ? value : 0) } })
  )

  // render data layers
  useEffect(() => {
    if (!space) {
      return
    }
    space.addDataLayer({
      id: 'stalls',
      type: 'polygon',
      data: stalls,
      tooltip: d => `${d.name} - ${d.hits} hits`,
      color: d =>
        d.hits < 8 ? '#3aa655' : d.hits < 16 ? '#c08727' : '#ff3f34',
      alpha: 0.7,
      height: mode === '3d' ? 1.9 : 0.1045,
      baseHeight: mode === '3d' ? 0 : -0.1
    })
    space.addDataLayer({
      id: 'sensors',
      type: 'point',
      data: autoElevation(sensors),
      tooltip: d => `Sensor ${d.id}`,
      color: '#357afc',
      diameter: 0.4
    })
    space.addDataLayer({
      id: 'beacons',
      type: 'point',
      data: autoElevation(beacons),
      tooltip: d => `${d.id} - range: ${d.range}m`,
      color: '#3a3c3c',
      diameter: 0.25
    })
    space.addDataLayer({
      id: 'beacons-range',
      type: 'point',
      data: autoElevation(beacons),
      color: '#727676',
      alpha: 0.3,
      diameter: d => d.range
    })
    return () => {
      space.removeDataLayer('stalls')
      space.removeDataLayer('sensors')
      space.removeDataLayer('beacons')
      space.removeDataLayer('beacons-range')
    }
  }, [space, mode, autoElevation])

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

export default IoT
