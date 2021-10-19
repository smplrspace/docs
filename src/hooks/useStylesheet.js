// inspired by https://usehooks.com/useScript/
import { useState, useEffect } from 'react'

export default function useStylesheet (href) {
  // Keep track of status ("idle", "loading", "ready", "error")
  const [status, setStatus] = useState(href ? 'loading' : 'idle')
  useEffect(
    () => {
      // Allow falsy href value if waiting on other data needed for
      // constructing the link URL passed to this hook.
      if (!href) {
        setStatus('idle')
        return
      }
      // Fetch existing stylesheet element by href
      // It may have been added by another intance of this hook
      let link = document.querySelector(`link[href="${href}"]`)
      if (!link) {
        // Create link
        link = document.createElement('link')
        link.href = href
        link.rel = 'stylesheet'
        link.async = true
        link.setAttribute('data-status', 'loading')
        // Add link to document body
        document.head.appendChild(link)
        // Store status in attribute on link
        // This can be read by other instances of this hook
        const setAttributeFromEvent = event => {
          link.setAttribute(
            'data-status',
            event.type === 'load' ? 'ready' : 'error'
          )
        }
        link.addEventListener('load', setAttributeFromEvent)
        link.addEventListener('error', setAttributeFromEvent)
      } else {
        // Grab existing link status from attribute and set to state.
        setStatus(link.getAttribute('data-status'))
      }
      // link event handler to update status in state
      // Note: Even if the link already exists we still need to add
      // event handlers to update the state for *this* hook instance.
      const setStateFromEvent = event => {
        setStatus(event.type === 'load' ? 'ready' : 'error')
      }
      // Add event listeners
      link.addEventListener('load', setStateFromEvent)
      link.addEventListener('error', setStateFromEvent)
      // Remove event listeners on cleanup
      return () => {
        if (link) {
          link.removeEventListener('load', setStateFromEvent)
          link.removeEventListener('error', setStateFromEvent)
        }
      }
    },
    [href] // Only re-run effect if link href changes
  )
  return status
}
