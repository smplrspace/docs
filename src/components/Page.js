import React from 'react'
import Layout from '@theme/Layout'
import { Container, MantineProvider } from '@mantine/core'

export default function({ title, children }) {
  return (
    <MantineProvider
      theme={{
        fontFamily: '"RNSSanz-Normal", Helvetica, sans-serif',
        primaryColor: 'dark',
        black: '#3a3c3c'
      }}
    >
      <Layout title={title}>
        <main className="container container--fluid margin-vert--lg">
          {children}
        </main>
      </Layout>
    </MantineProvider>
    )
}
