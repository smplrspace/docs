/* eslint-disable import/no-webpack-loader-syntax */
import React from 'react'

import Project from '../../../components/Project'
import ControlledCamera from './ControlledCamera'

import ControlledCameraCode from '!!raw-loader!./ControlledCamera'
import ViewerCode from '!!raw-loader!./Viewer'
import data from '!!raw-loader!./_data'
import { FEATURES } from '../_categories'

export const controlledCamera = {
  slug: 'controlled-camera',
  title: 'Controlled camera',
  category: FEATURES,
  description: `Because some areas are out of bound, restrict user's viewing access with pre-recorded camera placements that navigate between points of interests.`,
  published: true,
  code: [
    {
      filename: 'ControlledCamera.js',
      lang: 'jsx',
      content: ControlledCameraCode
    },
    { filename: 'Viewer.js', lang: 'jsx', content: ViewerCode },
    { filename: 'data.js', lang: 'jsx', content: data }
  ]
}

export default function () {
  return (
    <Project project={controlledCamera}>
      <ControlledCamera />
    </Project>
  )
}
