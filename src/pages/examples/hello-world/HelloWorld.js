import React from 'react'
import { useSmplrJsESM } from '../../../hooks/useSmplrJs'

const ENV = 'dev'
const CONFIG = {
  spaceId: {
    dev: '96eae952-ef60-4058-aba1-6ace322506e7',
    prod: 'edb2ebaa-47ea-4e54-af0d-cf543328bdb0'
  },
  clientToken: {
    dev: 'pub_x',
    prod: 'pub_eb760fee77634cdab2fe31146fc371c2'
  }
}

const HelloWorld = () => {
  useSmplrJsESM({ onLoad, dev: ENV === 'dev' })

  function onLoad (smplr) {
    const space = new smplr.Space({
      spaceId: CONFIG.spaceId[ENV],
      clientToken: CONFIG.clientToken[ENV],
      containerId: 'smplr-container'
    })
    space.startViewer({
      preview: true,
      mode: '3d',
      allowModeChange: true,
      onReady: () => console.log('Viewer is ready'),
      onError: error => console.error('Could not start viewer', error)
    })
  }

  return (
    <div style={{ width: '100%', maxWidth: 800, margin: '0 auto' }}>
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
