/* global smplr */
import React from 'react'

import useSmplrJs from '../../../hooks/useSmplrJs'

const HelloWorld = () => {
  useSmplrJs({ onLoad })

  function onLoad () {
    const space = new smplr.Space({
      spaceId: 'edb2ebaa-47ea-4e54-af0d-cf543328bdb0',
      spaceToken: 'X',
      containerId: 'smplr-container'
    })
    space.preview({
      mode: '3d',
      onViewerReady: () => console.log('Viewer is ready'),
      onError: error => console.error('Could not start viewer', error)
    })
  }

  return (
    <div style={{ width: '100%', maxWidth: 600, margin: '0 auto' }}>
      <div
        style={{
          position: 'relative',
          paddingBottom: '60%'
        }}
      >
        <div
          id='smplr-container'
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            backgroundColor: 'whitesmoke'
          }}
        />
      </div>
    </div>
  )
}

export default HelloWorld
