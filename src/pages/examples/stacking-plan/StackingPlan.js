import React, { useState, useCallback, useEffect } from 'react'

import Viewer from './Viewer'
import { units } from './_units'

const StackingPlan = () => {
  const [space, setSpace] = useState()

  // memoize so Viewer render once only (wrapped in memo)
  const onReady = useCallback(space => setSpace(space), [])

  useEffect(() => {
    if (!space) {
      return
    }
    const colorScheme = {
      paid: '#3aa655',
      'payment due': '#ff3f34',
      'for rent': '#bec4c8'
    }
    space.addDataLayer({
      id: 'units',
      type: 'polygon',
      data: units,
      tooltip: d => `${d.name}: ${d.status}`,
      color: d => colorScheme[d.status],
      height: 3.8
    })
    return () => {
      space.removeDataLayer('units')
    }
  }, [space])

  return (
    <div style={{ width: '100%', maxWidth: 800, margin: '0 auto' }}>
      <Viewer onReady={onReady} />
    </div>
  )
}

export default StackingPlan
