/* global smplr */
import React, { memo } from 'react'
import PropTypes from 'prop-types'

import useSmplrJs from '../../../hooks/useSmplrJs'

const Viewer = memo(({ onReady }) => {
  useSmplrJs({ onLoad })

  function onLoad () {
    const space = new smplr.Space({
      spaceId: 'd7f80b32-069f-4ff3-84ea-fc5398e41406',
      clientToken: 'pub_eb760fee77634cdab2fe31146fc371c2',
      containerId: 'smplr-container'
    })
    space.startViewer({
      preview: true,
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
  onReady: PropTypes.func.isRequired
}

export default Viewer
