/* eslint-disable import/no-webpack-loader-syntax */
import React from 'react'

import Project from '../../../components/Project'
import TemperatureSensors from './TemperatureSensors'

import TemperatureSensorsCode from '!!raw-loader!./TemperatureSensors'
import ViewerCode from '!!raw-loader!./Viewer'

export const temperatureSensors = {
  slug: 'temperature-sensors',
  title: 'Temperature sensors',
  description:
    'Demonstrate how to position sensors and display live data with a point data layer.',
  published: true,
  code: [
    {
      filename: 'TemperatureSensors.js',
      lang: 'jsx',
      content: TemperatureSensorsCode
    },
    { filename: 'Viewer.js', lang: 'jsx', content: ViewerCode }
  ]
}

export default function () {
  return (
    <Project project={temperatureSensors}>
      <TemperatureSensors />
    </Project>
  )
}
