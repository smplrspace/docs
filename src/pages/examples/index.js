import React, { useState } from 'react'
import {
  compose,
  includes,
  map,
  filter,
  propEq,
  groupBy,
  keys,
  prop,
  sortBy,
  indexOf,
  flip
} from 'ramda'
import { SimpleGrid, Group } from '@mantine/core'
import { IoSearchOutline } from 'react-icons/io5'

import Page from '../../components/Page'
import ProjectCard from '../../components/ProjectCard'
import Button from '../../components/Button'
import TextInput from '../../components/TextInput'
import CategoryTitle from '../../components/CategoryTitle'
import { categoriesOrder } from './_categories'

import { helloWorld } from './hello-world'
import { addDataElements } from './add-data-elements'
import { stackingPlan } from './stacking-plan'
import { stackingPlanMap } from './stacking-plan-map'
import { warehouseBins } from './warehouse'
import { spaceBooking } from './space-booking'
import { leasingTenancy } from './leasing-tenancy'
import { iot } from './iot'
import { propertyManagement } from './property-management'
import { controlledCamera } from './controlled-camera'
import { seeThroughWalls } from './see-through-walls'
import { tooltipsOptions } from './tooltips'
import { airQuality } from './air-quality'
import { embeddedEditor } from './embedded-editor'
import { markup } from './markup'

const projects = [
  helloWorld,
  spaceBooking,
  leasingTenancy,
  airQuality,
  iot,
  propertyManagement,
  addDataElements,
  stackingPlan,
  stackingPlanMap,
  markup,
  warehouseBins,
  tooltipsOptions,
  controlledCamera,
  seeThroughWalls,
  embeddedEditor
]

const ProjectList = () => {
  const [search, setSearch] = useState('')

  // apply filter
  const filteredProjects = filter(p =>
    search
      ? includes(
        search.toLowerCase(),
        `${p.title}+${p.description}`.toLowerCase()
      )
      : true
  )(projects)
  const projectsByCategory = groupBy(prop('category'))(filteredProjects)
  const orderedCategory = compose(
    sortBy(flip(indexOf)(categoriesOrder)),
    keys
  )(projectsByCategory)

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
      {map(category => (
        <Group key={category} direction='column'>
          <CategoryTitle>{category}</CategoryTitle>
          <SimpleGrid
            cols={3}
            breakpoints={[
              { maxWidth: 'sm', cols: 2, spacing: 'sm' },
              { maxWidth: 'xs', cols: 1, spacing: 'sm' }
            ]}
            mt='sm'
          >
            {map(p => <ProjectCard key={p.slug} {...p} />)(
              projectsByCategory[category]
            )}
          </SimpleGrid>
        </Group>
      ))(orderedCategory)}
    </Page>
  )
}

export default ProjectList
