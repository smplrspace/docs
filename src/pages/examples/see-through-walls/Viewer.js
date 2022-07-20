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
      spaceId: '808c73b5-36e3-4305-bcf4-1049d8e0665b', // prod
      // spaceId: '736b3294-751a-4af2-b8eb-b62a6f7f86ad', // dev
      clientToken: 'pub_834fae5c46404eafb887a89c45f2a34c',
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
