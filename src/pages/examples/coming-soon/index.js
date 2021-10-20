import React from 'react'

import Project from '../../../components/Project'

export const comingSoon = {
  slug: 'coming-soon',
  title: 'Coming soon',
  description: 'The suspense is incredible.',
  published: false,
  code: []
}

export default function () {
  return <Project project={comingSoon}>Coming soon</Project>
}
