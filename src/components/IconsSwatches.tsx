import React, { useEffect, FC } from 'react'
import { loadSmplrJs } from '@smplrspace/smplr-loader'

const IconsSwatches: FC = () => {
  useEffect(() => {
    loadSmplrJs('umd', 'dev')
      .then((smplr) => {
        smplr.Color.drawIconsSwatches({
          containerId: 'example-icons-swatches',
          icons: [
            {
              url: 'https://retail.smplrspace.io/img/electric.png',
              label: 'EV charging'
            },
            {
              url: 'https://retail.smplrspace.io/img/wheelchair.png',
              label: 'Reduced mobility'
            }
          ],
          height: 20
        })
      })
      .catch((error) => console.error(error))
  }, [])

  return (
    <div style={{ marginTop: '2em', marginBottom: '2em' }}>
      <div id='example-icons-swatches'>Loading...</div>
    </div>
  )
}

export default IconsSwatches
