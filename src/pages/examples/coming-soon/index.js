import React from 'react'

import Project from '../../../components/Project'
import { GETTING_STARTED } from '../_categories'

export const comingSoon = {
  slug: 'coming-soon',
  title: 'Coming soon',
  category: GETTING_STARTED,
  description: 'The suspense is incredible.',
  published: false,
  code: []
}

export default function () {
  return <Project project={comingSoon}>Coming soon</Project>
}
