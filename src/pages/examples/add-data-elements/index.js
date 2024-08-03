/* eslint-disable import/no-webpack-loader-syntax */
import React from 'react'

import StackblitzProject from '../../../components/StackblitzProject'

import { GETTING_STARTED } from '../_categories'

export const addDataElements = {
  slug: 'add-data-elements',
  title: 'Add data elements',
  category: GETTING_STARTED,
  description: `A quick tutorial on how to use the picking mode in your admin interface to add data elements such as sensor locations, rooms and areas, or desks.`,
  published: true,
  stackblitzProjects: [
    {
      lang: 'React',
      id: 'smplr-data-elements-react',
      openFile: 'SpaceViewer.tsx',
      default: true
    }
  ]
}

export default function () {
  return <StackblitzProject project={addDataElements} />
}
