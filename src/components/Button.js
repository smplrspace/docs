import React from 'react'
import PropTypes from 'prop-types'
import { Button as MantineButton, createStyles } from '@mantine/core'

const useStyles = createStyles((theme, props) => ({
  root: props.disabled
    ? {
      cursor: 'not-allowed',
      backgroundColor:
          theme.colorScheme === 'dark'
            ? theme.colors.dark[5]
            : theme.colors.gray[0],
      color: theme.colors.dark[2],
      borderColor:
          theme.colorScheme === 'dark'
            ? theme.colors.dark[3]
            : theme.colors.dark[0]
    }
    : {
      color:
          theme.colorScheme === 'dark' ? theme.colors.gray[0] : theme.black,
      borderColor:
          theme.colorScheme === 'dark' ? theme.colors.gray[0] : theme.black,
      '&:hover': {
        backgroundColor:
            theme.colorScheme === 'dark' ? theme.colors.gray[0] : theme.black,
        color:
            theme.colorScheme === 'dark' ? theme.black : theme.colors.gray[0],
        textDecoration: 'none'
      }
    },
  label: {
    fontFamily: '"RNSSanz-Medium", Helvetica, sans-serif',
    fontWeight: 100
  }
}))

const Button = ({ disabled, onClick, ...props }) => {
  const { classes } = useStyles({ disabled })
  return (
    <MantineButton
      variant='outline'
      onClick={disabled ? () => {} : onClick}
      {...props}
      component={disabled ? undefined : props.component}
      classNames={classes}
    />
  )
}

Button.propTypes = {
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
  component: PropTypes.any
}

export default Button
