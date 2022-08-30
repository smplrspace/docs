/* eslint-disable import/no-webpack-loader-syntax */
import React from 'react'

import Project from '../../../components/Project'
import AddDataElements from './AddDataElements'

import AddDataElementsCode from '!!raw-loader!./AddDataElements'
import ViewerCode from '!!raw-loader!./Viewer'

export const addDataElements = {
  slug: 'add-data-elements',
  title: 'Add data elements',
  description: `A quick tutorial on how to use the picking mode in your admin interface to add data elements such as sensor locations, rooms and areas, or desks.`,
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
