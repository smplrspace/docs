/* global smplr */
import React from 'react'

import useSmplrJs from '../../../hooks/useSmplrJs'

const HelloWorld = () => {
  useSmplrJs({ onLoad })

  function onLoad () {
    const space = new smplr.Space({
      spaceId: 'e4cbc25e-1550-444f-8ac9-35c7c29ff243',
      spaceToken: 'X',
      containerId: 'smplr-container'
    })
    space.preview({
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
