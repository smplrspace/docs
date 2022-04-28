import { useEffect, useRef } from 'react'

import useScript from './useScript'
import useStylesheet from './useStylesheet'

export default function useSmplrJs ({ onLoad, dev = false }) {
  const loaded = useRef(false)

  const smplrjsStatus = useScript(
    `https://${dev ? 'dev' : 'app'}.smplrspace.com/lib/smplr.js`
  )
  useStylesheet(`https://${dev ? 'dev' : 'app'}.smplrspace.com/lib/smplr.css`)

  useEffect(() => {
    if (smplrjsStatus === 'ready' && !loaded.current) {
      loaded.current = true
      onLoad && onLoad()
    }
  }, [onLoad, smplrjsStatus])
}
