/* eslint-disable import/no-webpack-loader-syntax */
import React from 'react'

import Project from '../../../components/Project'
import SeeThroughWalls from './SeeThroughWalls'

import SeeThroughWallsCode from '!!raw-loader!./SeeThroughWalls'
import ViewerCode from '!!raw-loader!./Viewer'
import { FEATURES } from '../_categories'

export const seeThroughWalls = {
  slug: 'see-through-walls',
  title: 'See through walls',
  category: FEATURES,
  description: `Toggle between opaque and see-through walls, and allow users to visualise furnishings and internal data without being blocked by layout structures.`,
  published: true,
  code: [
    {
      filename: 'SeeThroughWalls.js',
      lang: 'jsx',
      content: SeeThroughWallsCode
    },
    { filename: 'Viewer.js', lang: 'jsx', content: ViewerCode }
  ]
}

export default function () {
  return (
    <Project project={seeThroughWalls}>
      <SeeThroughWalls />
    </Project>
  )
}
