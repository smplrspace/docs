/* eslint-disable import/no-webpack-loader-syntax */
import React from 'react'

import Project from '../../../components/Project'
import Warehouse from './Warehouse'

import WarehouseCode from '!!raw-loader!./Warehouse'
import ViewerCode from '!!raw-loader!./Viewer'
import data from './data.json.raw!=!raw-loader!./data.json'

export const warehouseBins = {
  slug: 'warehouse',
  title: 'Warehouse',
  description:
    'Demonstrate how to create data only layouts for warehousing bins or containers layouts.',
  published: true,
  code: [
    {
      filename: 'Warehouse.js',
      lang: 'jsx',
      content: WarehouseCode
    },
    { filename: 'Viewer.js', lang: 'jsx', content: ViewerCode },
    { filename: 'data.json', lang: 'json', content: data }
  ]
}

export default function () {
  return (
    <Project project={warehouseBins}>
      <Warehouse />
    </Project>
  )
}