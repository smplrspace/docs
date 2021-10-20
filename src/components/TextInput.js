import React from 'react'
import { TextInput as MantineTextInput, createStyles } from '@mantine/core'

const useStyles = createStyles(theme => ({
  input: {
    borderColor:
      theme.colorScheme === 'dark'
        ? theme.colors.dark[3]
        : theme.colors.dark[0],
    '&:focus': {
      borderColor: `${
        theme.colorScheme === 'dark' ? theme.colors.gray[0] : theme.black
      }!important`,
      color: theme.colorScheme === 'dark' ? theme.colors.gray[0] : theme.black
    }
  }
}))

const TextInput = props => {
  const { classes } = useStyles()
  return <MantineTextInput {...props} classNames={classes} />
}

export default TextInput
