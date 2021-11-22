/* eslint-disable import/no-webpack-loader-syntax */
import React from 'react'

import Project from '../../../components/Project'
import AddDataElements from './AddDataElements'

import AddDataElementsCode from '!!raw-loader!./AddDataElements'
import ViewerCode from '!!raw-loader!./Viewer'

export const addDataElements = {
  slug: 'add-data-elements',
  title: 'Add data elements',
  description:
    'A master example on using the picking mode in your admin interface to add data elements.',
  published: true,
  code: [
    {
      filename: 'AddDataElements.js',
      lang: 'jsx',
      content: AddDataElementsCode
    },
    { filename: 'Viewer.js', lang: 'jsx', content: ViewerCode }
  ]
}

export default function () {
  return (
    <Project project={addDataElements}>
      <AddDataElements />
    </Project>
  )
}
