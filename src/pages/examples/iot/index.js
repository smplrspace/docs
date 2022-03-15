/* eslint-disable import/no-webpack-loader-syntax */
import React from 'react'

import Project from '../../../components/Project'
import IoT from './IoT'

import OfficeBookingCode from '!!raw-loader!./IoT'
import ViewerCode from '!!raw-loader!./Viewer'
import data from '!!raw-loader!./_data'

export const iot = {
  slug: 'iot',
  title: 'Internet of Things',
  description: 'Demonstrate a simple IoT dashboard experience.',
  published: true,
  code: [
    {
      filename: 'IoT.js',
      lang: 'jsx',
      content: OfficeBookingCode
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
