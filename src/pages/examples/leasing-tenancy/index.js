/* eslint-disable import/no-webpack-loader-syntax */
import React from 'react'

import Project from '../../../components/Project'
import LeasingTenancy from './LeasingTenancy'

import LeasingTenancyCode from '!!raw-loader!./LeasingTenancy'
import ViewerCode from '!!raw-loader!./Viewer'
import data from '!!raw-loader!./_data'
import { USE_CASES } from '../_categories'

export const leasingTenancy = {
  slug: 'leasing-tenancy',
  title: 'Leasing & tenancy',
  category: USE_CASES,
  description: `Let users have a quick overview of vacant units with clarity on location, position and availability.`,
  published: true,
  code: [
    {
      filename: 'LeasingTenancy.js',
      lang: 'jsx',
      content: LeasingTenancyCode
    },
    { filename: 'Viewer.js', lang: 'jsx', content: ViewerCode },
    { filename: 'data.js', lang: 'jsx', content: data }
  ]
}

export default function () {
  return (
    <Project project={leasingTenancy}>
      <LeasingTenancy />
    </Project>
  )
}
