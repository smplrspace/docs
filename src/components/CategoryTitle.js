import React from 'react'
import PropTypes from 'prop-types'
import { useMantineTheme } from '@mantine/core'

function CategoryTitle ({ children }) {
  const theme = useMantineTheme()

  return (
    <h1
      style={{
        width: 'calc(100% - 16px)',
        margin: '36px 8px 4px 8px',
        padding: 8,
        borderBottom: 'solid 1px',
        borderColor:
          theme.colorScheme === 'dark' ? theme.colors.gray[2] : theme.black
      }}
    >
      {children}
    </h1>
  )
}

CategoryTitle.propTypes = {
  children: PropTypes.any
}

export default CategoryTitle
