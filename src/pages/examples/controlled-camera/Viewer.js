/* global smplr */
import React, { memo } from 'react'
import PropTypes from 'prop-types'

import useSmplrJs from '../../../hooks/useSmplrJs'

const Viewer = memo(({ onReady, cameraPlacement }) => {
  useSmplrJs({ onLoad })

  function onLoad () {
    const space = new smplr.Space({
      spaceId: 'ac662f1b-bd0f-4de2-860f-510fa2f90d86',
      spaceToken: 'X',
      containerId: 'smplr-container'
    })
    window.space = space
    space.startViewer({
      preview: true,
      cameraPlacement: cameraPlacement,
      disableCameraControls: true,
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
  onReady: PropTypes.func.isRequired,
  cameraPlacement: PropTypes.object
}

export default Viewer
