/* eslint-disable import/no-webpack-loader-syntax */
import React from 'react'

import StackblitzProject from '../../../components/StackblitzProject'

import { USE_CASES } from '../_categories'

export const markup = {
  slug: 'markup',
  title: 'Markup',
  category: USE_CASES,
  description: `Use our floor plan spatial data extraction and computation APIs to quickly markup a space and extract statistics.`,
  published: true,
  stackblitzProjects: [
    {
      lang: 'React',
      id: 'smplr-markup',
      openFile: 'index.tsx',
      default: true
    }
  ]
}

export default function () {
  return <StackblitzProject project={markup} />
}
