import React from 'react'
import PropTypes from 'prop-types'
import { Button as MantineButton, createStyles } from '@mantine/core'

const useStyles = createStyles((theme, props) => ({
  root: props.disabled
    ? {
      cursor: 'default',
      border: 0,
      backgroundColor: '#f7f9fb',
      color: theme.colors.dark[2],
      border: `solid 1px ${theme.colors.dark[0]}`
    }
    : {
      '&:hover': {
        backgroundColor: theme.colors.dark[5],
        color: theme.white,
        textDecoration: 'none'
      }
    },
  label: {
    fontFamily: '"RNSSanz-Medium", Helvetica, sans-serif',
    fontWeight: 100
  }
}))

const Button = ({ disabled, ...props }) => {
  const { classes } = useStyles({ disabled })
  return (
    <MantineButton
      variant='outline'
      {...props}
      component={disabled ? undefined : props.component}
      classNames={classes}
    />
  )
}

Button.propTypes = {
  disabled: PropTypes.bool,
  component: PropTypes.any
}

export default Button
