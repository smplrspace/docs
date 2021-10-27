import React from 'react'
import PropTypes from 'prop-types'
import { Divider, Group, Space } from '@mantine/core'
import { IoInformation, IoLogoGithub, IoReturnUpBack } from 'react-icons/io5'
import CodeBlock from '@theme/CodeBlock'

import Page from './Page'
import Button from './Button'
import { Tabs, Tab } from './Tabs'

function Project ({ project, children }) {
  if (!project.published) {
    return (
      <Page title='Coming soon'>
        <h1>Coming soon</h1>
        <p>This project is not live yet, come again soon ;)</p>
        <Button component='a' href='/examples'>
          Go back
        </Button>
      </Page>
    )
  }

  return (
    <Page title={project.title}>
      <h1>{project.title}</h1>
      <p>{project.description}</p>
      <Group>
        <Button
          size='sm'
          component='a'
          target='_blank'
          rel='noopener noreferrer'
          href={`https://github.com/smplrspace/docs/tree/main/src/pages/examples/${project.slug}`}
          leftIcon={
            <IoLogoGithub
              style={{
                width: 16,
                height: 16
              }}
            />
          }
        >
          Browse code
        </Button>
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
          Go back
        </Button>
      </Group>
      <Divider my='lg' />
      {children}
      <Space h='lg' />
      <Group align='baseline'>
        <Tabs initialTab={1} style={{ width: 'calc(100% - 16px)' }}>
          <Tab icon={<IoInformation />}>
            <p>
              Note that the example projects are implemented with React. For
              vanilla Javascript, you would load the script and stylesheet like
              any other in your HTML <code>{`<head>`}</code> and add a{' '}
              <code>{`<script>`}</code> to the body that corresponds to the code
              found in the <code>onLoad</code> function. Refer to the{' '}
              <a href='/guides/embedding' color='blue'>
                embedding spaces
              </a>{' '}
              guide for more details.
            </p>
          </Tab>
          {project.code.map(({ filename, lang, content }) => (
            <Tab key={filename} label={filename}>
              <CodeBlock className={`language-${lang}`}>{content}</CodeBlock>
            </Tab>
          ))}
        </Tabs>
      </Group>
    </Page>
  )
}

Project.propTypes = {
  project: PropTypes.shape({
    slug: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    published: PropTypes.bool,
    code: PropTypes.arrayOf(
      PropTypes.shape({
        filename: PropTypes.string.isRequired,
        lang: PropTypes.string.isRequired,
        content: PropTypes.string.isRequired
      })
    )
  }).isRequired,
  children: PropTypes.any
}

export default Project
