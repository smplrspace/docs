import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import Layout from '@theme/Layout'
import { MantineProvider } from '@mantine/core'
import useThemeContext from '@theme/hooks/useThemeContext'

function Page ({ children }) {
  const { isDarkTheme } = useThemeContext()

  // ugly fix mantine SSR issue
  const [forceLightTheme, setForceLightTheme] = useState(isDarkTheme)
  useEffect(() => {
    setForceLightTheme(false)
  }, [])

  return (
    <MantineProvider
      theme={{
        colorScheme: !forceLightTheme && isDarkTheme ? 'dark' : 'light', // sync docusaurus and mantine themes
        fontFamily: '"RNSSanz-Normal", Helvetica, sans-serif',
        primaryColor: 'dark',
        black: '#3a3c3c',
        colors: {
          dark: [
            '#C1C2C5',
            '#A6A7AB',
            '#909296',
            '#5C5F66',
            '#373A40',
            '#2a2c2c',
            '#242526',
            '#1A1c1c',
            '#141517',
            '#101113'
          ], // replace dark[5-7] only
          gray: [
            '#f7f9fb',
            '#F1F3F5',
            '#E9ECEF',
            '#DEE2E6',
            '#CED4DA',
            '#ADB5BD',
            '#868E96',
            '#495057',
            '#343A40',
            '#212529'
          ] // replace gray[0] only
        }
      }}
    >
      <main className='container container--fluid margin-vert--lg'>
        {children}
      </main>
    </MantineProvider>
  )
}

Page.propTypes = {
  children: PropTypes.any
}

// separate in 2 components because useThemeContext must be under <Layout />
function Wrapper ({ title, children }) {
  return (
    <Layout title={title}>
      <Page>{children}</Page>
    </Layout>
  )
}

Wrapper.propTypes = {
  title: PropTypes.string,
  children: PropTypes.any
}

export default Wrapper
