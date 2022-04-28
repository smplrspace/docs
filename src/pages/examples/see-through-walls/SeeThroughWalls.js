import React, { useState } from 'react'
import { Group, Switch } from '@mantine/core'

import Viewer from './Viewer'
// import Button from '../../../components/Button'

const SeeThroughWalls = () => {
  const [transparent, setTransparent] = useState(false)
  const [lowered, setLowered] = useState(false)

  return (
    <div style={{ width: '100%', maxWidth: 800, margin: '0 auto' }}>
      <Viewer
        renderOptions={{
          walls: {
            alpha: transparent ? 0.18 : 1,
            maxHeightCm: lowered ? 120 : undefined
          }
        }}
      />
      <Group position='center' my='md' aign='baseline'>
        <h3>Render options</h3>
        <Switch
          label='Transparent walls'
          checked={transparent}
          onChange={e => {
            const checked = e.currentTarget.checked
            setTransparent(checked)
            if (checked) {
              setLowered(false)
            }
          }}
        />
        <Switch
          label='Lowered walls'
          checked={lowered}
          onChange={e => {
            const checked = e.currentTarget.checked
            setLowered(checked)
            if (checked) {
              setTransparent(false)
            }
          }}
        />
      </Group>
    </div>
  )
}

export default SeeThroughWalls
