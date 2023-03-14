import React, { Fragment, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { Divider, SegmentedControl } from '@mantine/core'
import { IoReturnUpBack } from 'react-icons/io5'
import sdk from '@stackblitz/sdk'
import useThemeContext from '@theme/hooks/useThemeContext'
import { propEq } from 'ramda'

import Page from './Page'
import Button from './Button'

function Project ({ project }) {
  const { isDarkTheme } = useThemeContext()

  // TODO - persist in localstorage and use as priority
  const [lang, setLang] = useState(
    project.stackblitzProjects.find(propEq('default', true)).lang
  )

  useEffect(() => {
    const stackblitzProject = project.stackblitzProjects.find(
      propEq('lang', lang)
    )
    sdk.embedProjectId('stackblitz-container', stackblitzProject.id, {
      openFile: stackblitzProject.openFile,
      theme: isDarkTheme ? 'dark' : 'light',
      hideNavigation: true
    })
  }, [isDarkTheme, project, lang])

  if (!project.published) {
    return (
      <Fragment>
        <h1>Coming soon</h1>
        <p>This project is not live yet, come again soon 👀</p>
        <Button component='a' href='/examples'>
          All examples
        </Button>
      </Fragment>
    )
  }

  return (
    <Fragment>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'baseline'
        }}
      >
        <h1>{project.title}</h1>
        <Button
          size='sm'
          component='a'
          href='/examples'
          leftIcon={
            <IoReturnUpBack
              style={{
                width: 16,
                height: 16
              }}
            />
          }
        >
          All examples
        </Button>
      </div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'baseline'
        }}
      >
        <p style={{ marginBottom: 0 }}>{project.description}</p>
        <SegmentedControl
          size='xs'
          data={project.stackblitzProjects.map(project => ({
            label: project.lang,
            value: project.lang
          }))}
          value={lang}
          onChange={setLang}
        />
      </div>
      <Divider my='lg' />
      <div id='stackblitz-container' className='stackblitz-embed' />
    </Fragment>
  )
}

Project.propTypes = {
  project: PropTypes.shape({
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    stackblitzProjects: PropTypes.arrayOf(
      PropTypes.shape({
        lang: PropTypes.string.isRequired,
        id: PropTypes.string.isRequired,
        openFile: PropTypes.string.isRequired
      })
    ).isRequired,
    published: PropTypes.bool
  }).isRequired
}

// need to wrap in Layout to access theme context
function LayoutWrapper ({ project }) {
  return (
    <Page title={project.title} largeContainer>
      <Project project={project} />
    </Page>
  )
}

LayoutWrapper.propTypes = Project.propTypes

export default LayoutWrapper
