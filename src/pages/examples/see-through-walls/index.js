/* eslint-disable import/no-webpack-loader-syntax */
import React from 'react'

import Project from '../../../components/Project'
import SeeThroughWalls from './SeeThroughWalls'

import SeeThroughWallsCode from '!!raw-loader!./SeeThroughWalls'
import ViewerCode from '!!raw-loader!./Viewer'

export const seeThroughWalls = {
  slug: 'see-through-walls',
  title: 'See through walls',
  description:
    'Demonstrate render options that can be used to focus on internal data rather than the space layout.',
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
