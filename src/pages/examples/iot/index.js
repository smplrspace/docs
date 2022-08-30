/* eslint-disable import/no-webpack-loader-syntax */
import React from 'react'

import Project from '../../../components/Project'
import IoT from './IoT'

import IoTCode from '!!raw-loader!./IoT'
import ViewerCode from '!!raw-loader!./Viewer'
import data from '!!raw-loader!./_data'
import { USE_CASES } from '../_categories'

export const iot = {
  slug: 'iot',
  title: 'Internet of Things',
  category: USE_CASES,
  description: `Complement your existing dashboards with actual display of sensor locations and ranges. Not only do users love this, your sales teams will thank you as well.`,
  published: true,
  code: [
    {
      filename: 'IoT.js',
      lang: 'jsx',
      content: IoTCode
    },
    { filename: 'Viewer.js', lang: 'jsx', content: ViewerCode },
    { filename: 'data.js', lang: 'jsx', content: data }
  ]
}

export default function () {
  return (
    <Project project={iot}>
      <IoT />
    </Project>
  )
}
