import React from 'react'
import PropTypes from 'prop-types'
import { UnstyledButton } from '@mantine/core'

const MiniButton = ({ style = {}, children, ...props }) => (
  <UnstyledButton
    style={{ textDecoration: 'underline', color: 'inherit', ...style }}
    {...props}
  >
    [{children}]
  </UnstyledButton>
)

MiniButton.propTypes = {
  style: PropTypes.object,
  children: PropTypes.any
}

export default MiniButton
