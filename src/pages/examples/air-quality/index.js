/* eslint-disable import/no-webpack-loader-syntax */
import React from 'react'

import StackblitzProject from '../../../components/StackblitzProject'

import { USE_CASES } from '../_categories'

export const airQuality = {
  slug: 'air-quality',
  title: 'Air quality',
  category: USE_CASES,
  description: `Showcase environmental data such as air quality, temperature, and more using our customizable heat map layer.`,
  published: true,
  stackblitzProjects: [
    {
      lang: 'React',
      id: 'smplr-heat-map',
      openFile: 'SpaceViewer.tsx',
      default: true
    }
  ]
}

export default function () {
  return <StackblitzProject project={airQuality} />
}
