/* eslint-disable import/no-webpack-loader-syntax */
import React from 'react'

import Project from '../../../components/Project'
import OfficeBooking from './OfficeBooking'

import OfficeBookingCode from '!!raw-loader!./OfficeBooking'
import ViewerCode from '!!raw-loader!./Viewer'

export const officeBooking = {
  slug: 'office-booking',
  title: 'Office booking',
  description: 'Demonstrate a simple room / desk booking app experience.',
  published: true,
  code: [
    {
      filename: 'OfficeBooking.js',
      lang: 'jsx',
      content: OfficeBookingCode
    },
    { filename: 'Viewer.js', lang: 'jsx', content: ViewerCode }
  ]
}

export default function () {
  return (
    <Project project={officeBooking}>
      <OfficeBooking />
    </Project>
  )
}
