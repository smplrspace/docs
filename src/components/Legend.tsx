import React, { useEffect, FC } from 'react'
import { loadSmplrJs } from '@smplrspace/smplr-loader'

const Legend: FC = () => {
  useEffect(() => {
    loadSmplrJs('umd', 'dev')
      .then((smplr) => {
        smplr.Color.drawLegend({
          containerId: 'example-legend',
          colorScale: smplr.Color.numericScale({
            name: smplr.Color.NumericScale.RdYlBu,
            domain: [10, 30],
            invert: true
          }),
          domain: [10, 30],
          ticks: {
            10: '10°C',
            20: '20°C',
            30: '30°C'
          }
        })
      })
      .catch((error) => console.error(error))
  }, [])

  return (
    <div style={{ width: 200, marginTop: '2em', marginBottom: '2em' }}>
      <div id='example-legend'>Loading...</div>
    </div>
  )
}

export default Legend
