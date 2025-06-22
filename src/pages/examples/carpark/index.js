/* eslint-disable import/no-webpack-loader-syntax */
import React from 'react'

import StackblitzProject from '../../../components/StackblitzProject'

import { USE_CASES } from '../_categories'

export const carpark = {
  slug: 'carpark',
  title: 'Car park',
  category: USE_CASES,
  description: `Manage car park occupancy and vallet parking with real time lot info and VIP tracking through icons.`,
  published: true,
  stackblitzProjects: [
    {
      lang: 'React',
      id: 'smplr-carpark-react',
      openFile: 'SpaceViewer.tsx',
      default: true
    }
  ]
}

export default function () {
  return <StackblitzProject project={carpark} />
}
