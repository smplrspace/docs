import { useEffect } from 'react'

import useScript from './useScript'
import useStylesheet from './useStylesheet'

export default function useSmplrJs ({ onLoad }) {
  const smplrjsStatus = useScript('https://app.smplrspace.com/lib/smplr.js')
  useStylesheet('https://app.smplrspace.com/lib/smplr.css')

  useEffect(() => {
    if (smplrjsStatus === 'ready' && onLoad) {
      onLoad()
    }
  }, [onLoad, smplrjsStatus])
}
