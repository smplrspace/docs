/* global smplr */
import React from 'react'

import useSmplrJs from '../../../hooks/useSmplrJs'

const HelloWorld = () => {
  useSmplrJs({ onLoad })

  function onLoad () {
    const space = new smplr.Space({
      spaceId: '96eae952-ef60-4058-aba1-6ace322506e7',
      spaceToken: 'X',
      containerId: 'smplr-container'
    })
    space.preview({
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
