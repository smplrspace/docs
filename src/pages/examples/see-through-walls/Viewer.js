/* global smplr */
import React, { useRef, useEffect, memo } from 'react'
import PropTypes from 'prop-types'

import useSmplrJs from '../../../hooks/useSmplrJs'

const Viewer = memo(({ renderOptions = {} }) => {
  useSmplrJs({ onLoad, dev: false })

  const spaceRef = useRef()

  function startOrUpdateViewer ({ preview = false } = {}) {
    if (!spaceRef.current) {
      return
    }
    let cameraPlacement
    if (!preview) {
      cameraPlacement = spaceRef.current.getCameraPlacement()
    }
    spaceRef.current.remove()
    spaceRef.current.startViewer({
      preview,
      renderOptions,
      cameraPlacement,
      onError: error => console.error('Could not start/update viewer', error)
    })
  }

  useEffect(startOrUpdateViewer, [renderOptions])

  function onLoad () {
    const space = new smplr.Space({
      spaceId: 'spc_cyza06gp',
      clientToken: 'pub_eb760fee77634cdab2fe31146fc371c2',
      containerId: 'smplr-container'
    })
    spaceRef.current = space
    startOrUpdateViewer({ preview: true })
    window.space = space
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
  renderOptions: PropTypes.object
}

export default Viewer
