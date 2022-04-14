/* eslint-disable import/no-webpack-loader-syntax */
import React from 'react'

import Project from '../../../components/Project'
import ControlledCamera from './ControlledCamera'

import ControlledCameraCode from '!!raw-loader!./ControlledCamera'
import ViewerCode from '!!raw-loader!./Viewer'
import data from '!!raw-loader!./_data'

export const controlledCamera = {
  slug: 'controlled-camera',
  title: 'Controlled camera',
  description:
    'Demonstrate how to use pre-recorded camera placements to navigate between points of interest.',
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
