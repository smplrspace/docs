/* global smplr */
import React, { memo } from 'react'
import PropTypes from 'prop-types'

import useSmplrJs from '../../../hooks/useSmplrJs'

const Viewer = memo(({ mode, onReady }) => {
  useSmplrJs({ onLoad })

  function onLoad () {
    const space = new smplr.Space({
      spaceId: 'spc_j6ka3sio',
      clientToken: 'pub_eb760fee77634cdab2fe31146fc371c2',
      containerId: 'smplr-container'
    })
    space.startViewer({
      preview: true,
      mode,
      allowModeChange: true,
      onReady: () => onReady(space),
      onError: error => console.error('Could not start viewer', error)
    })
  }

  return (
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
  )
})

Viewer.propTypes = {
  mode: PropTypes.string.isRequired,
  onReady: PropTypes.func.isRequired
}

export default Viewer
