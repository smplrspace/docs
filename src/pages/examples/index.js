import React, { useState } from 'react'
import { compose, includes, map, filter, propEq } from 'ramda'
import { SimpleGrid, Group } from '@mantine/core'
import { IoSearchOutline } from 'react-icons/io5'

import Page from '../../components/Page'
import ProjectCard from '../../components/ProjectCard'
import Button from '../../components/Button'
import TextInput from '../../components/TextInput'

import { helloWorld } from './hello-world'
import { temperatureSensors } from './temperature-sensors'
const projects = [helloWorld, temperatureSensors]

const ProjectList = () => {
  const [search, setSearch] = useState('')

  return (
    <Page title='Examples'>
      <Group noWrap>
        <TextInput
          placeholder='Search'
          icon={<IoSearchOutline />}
          style={{ flexGrow: 1 }}
          value={search}
          onChange={event => setSearch(event.currentTarget.value)}
        />
        <Button
          onClick={() => {
            const publishedProjects = filter(propEq('published', true))(
              projects
            )
            const randomIndex = Math.floor(
              Math.random() * publishedProjects.length
            )
            const slug = publishedProjects[randomIndex].slug
            window.location.href = `/examples/${slug}`
          }}
        >
          Russian roulette
        </Button>
      </Group>
      <SimpleGrid
        cols={3}
        breakpoints={[
          { maxWidth: 'sm', cols: 2, spacing: 'sm' },
          { maxWidth: 'xs', cols: 1, spacing: 'sm' }
        ]}
        mt='sm'
      >
        {compose(
          map(p => <ProjectCard key={p.slug} {...p} />),
          filter(p =>
            search
              ? includes(
                search.toLowerCase(),
                `${p.title}+${p.description}`.toLowerCase()
              )
              : true
          )
        )(projects)}
      </SimpleGrid>
    </Page>
  )
}

export default ProjectList
