import React from 'react'
import PropTypes from 'prop-types'
import { Card, useMantineTheme } from '@mantine/core'

import Button from './Button'

const ProjectCard = ({ slug, title, description, published }) => {
  const theme = useMantineTheme()

  return (
    <Card
      shadow='sm'
      padding='lg'
      style={{
        display: 'flex',
        flexDirection: 'column',
        color:
          theme.colorScheme === 'dark' ? theme.colors.gray[0] : theme.black,
        opacity: published ? 1 : 0.75
      }}
    >
      <Card.Section>
        {published ? (
          <a href={`/examples/${slug}`}>
            <img
              src={require(`../pages/examples/${slug}/card.png`).default}
              alt={title}
              style={{ marginBottom: 30 }}
            />
          </a>
        ) : (
          <img
            src={require(`../pages/examples/${slug}/card.png`).default}
            alt={title}
            style={{ marginBottom: 30 }}
          />
        )}
      </Card.Section>
      <h3>{title}</h3>
      <p style={{ fontSize: '.9rem', flexGrow: 1 }}>{description}</p>
      <Button
        component='a'
        href={`/examples/${slug}`}
        fullWidth
        disabled={!published}
      >
        {published ? 'Open project' : 'Coming soon'}
      </Button>
    </Card>
  )
}

ProjectCard.propTypes = {
  slug: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  published: PropTypes.bool.isRequired
}

export default ProjectCard
