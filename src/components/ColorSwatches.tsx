import React, { useEffect, FC } from 'react'
import { loadSmplrJs } from '@smplrspace/smplr-loader'

const ColorSwatches: FC = () => {
  useEffect(() => {
    loadSmplrJs('umd', 'dev')
      .then((smplr) => {
        smplr.Color.drawColorSwatches({
          containerId: 'example-color-swatches',
          swatches: [
            {
              color: 'red',
              label: 'Alert'
            },
            {
              color: 'orange',
              label: 'Warning'
            },
            {
              color: 'green',
              label: 'All ok'
            }
          ]
        })
      })
      .catch((error) => console.error(error))
  }, [])

  return (
    <div style={{ marginTop: '2em', marginBottom: '2em' }}>
      <div id='example-color-swatches'>Loading...</div>
    </div>
  )
}

export default ColorSwatches
