import { useEffect, useRef } from 'react'

import useScript from './useScript'
import useStylesheet from './useStylesheet'

const SMPLR = {
  umd: {
    dev: 'https://dev.smplrspace.com/lib/smplr.js',
    prod: 'https://app.smplrspace.com/lib/smplr.js'
  },
  esm: {
    dev: 'https://dev.smplrspace.com/lib/smplr.mjs',
    prod: 'https://app.smplrspace.com/lib/smplr.mjs'
  },
  css: {
    dev: 'https://dev.smplrspace.com/lib/smplr.css',
    prod: 'https://app.smplrspace.com/lib/smplr.css'
  }
}

export function useSmplrJsUMD ({ onLoad, dev = false }) {
  const loaded = useRef(false)

  const smplrjsStatus = useScript(SMPLR.umd[dev ? 'dev' : 'prod'])
  useStylesheet(SMPLR.css[dev ? 'dev' : 'prod'])

  useEffect(() => {
    if (smplrjsStatus === 'ready' && !loaded.current) {
      loaded.current = true
      onLoad && onLoad()
    }
  }, [onLoad, smplrjsStatus])
}

export function useSmplrJsESM ({ onLoad, dev = false }) {
  useStylesheet(SMPLR.css[dev ? 'dev' : 'prod'])
  useEffect(() => {
    import(SMPLR.esm[dev ? 'dev' : 'prod']).then(onLoad)
  }, [onLoad, dev])
}

export default useSmplrJsUMD
