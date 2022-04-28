import React, { useState, useCallback } from 'react'
import { Group } from '@mantine/core'
import { mapObjIndexed, compose, values } from 'ramda'
import { capitalCase } from 'change-case'

import Viewer from './Viewer'
import Button from '../../../components/Button'
import { cameraPlacements } from './_data'

const ControlledCamera = () => {
  const [space, setSpace] = useState()

  // memoize so Viewer render once only (wrapped in memo)
  const onReady = useCallback(space => setSpace(space), [])

  return (
    <div style={{ width: '100%', maxWidth: 800, margin: '0 auto' }}>
      <Viewer onReady={onReady} cameraPlacement={cameraPlacements.overview} />
      <Group position='center' my='md'>
        <h3>Cams</h3>
        {compose(
          values,
          mapObjIndexed((placement, name) => (
            <Button
              key={name}
              disabled={!space}
              onClick={() =>
                space.setCameraPlacement({
                  ...placement,
                  animate: true,
                  animationDuration: 1
                })
              }
            >
              {capitalCase(name)}
            </Button>
          ))
        )(cameraPlacements)}
      </Group>
    </div>
  )
}

export default ControlledCamera
