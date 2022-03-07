/* eslint-disable import/no-webpack-loader-syntax */
import React from 'react'

import Project from '../../../components/Project'
import MallLeasing from './MallLeasing'

import MallLeasingCode from '!!raw-loader!./MallLeasing'
import ViewerCode from '!!raw-loader!./Viewer'

export const mallLeasing = {
  slug: 'mall-leasing',
  title: 'Mall leasing',
  description: 'Demonstrate a simple commercial leasing experience.',
  published: true,
  code: [
    {
      filename: 'MallLeasing.js',
      lang: 'jsx',
      content: MallLeasingCode
    },
    { filename: 'Viewer.js', lang: 'jsx', content: ViewerCode }
  ]
}

export default function () {
  return (
    <Project project={mallLeasing}>
      <MallLeasing />
    </Project>
  )
}
