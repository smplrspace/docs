/* eslint-disable import/no-webpack-loader-syntax */
import React from 'react'

import Project from '../../../components/Project'
import SpaceBooking from './SpaceBooking'

import SpaceBookingCode from '!!raw-loader!./SpaceBooking'
import ViewerCode from '!!raw-loader!./Viewer'
import data from '!!raw-loader!./_data'

export const spaceBooking = {
  slug: 'space-booking',
  title: 'Space booking',
  description: `Showcase real time availability of assets, from entire event spaces to meeting rooms and down to single chairs.`,
  published: true,
  code: [
    {
      filename: 'SpaceBooking.js',
      lang: 'jsx',
      content: SpaceBookingCode
    },
    { filename: 'Viewer.js', lang: 'jsx', content: ViewerCode },
    { filename: 'data.js', lang: 'jsx', content: data }
  ]
}

export default function () {
  return (
    <Project project={spaceBooking}>
      <SpaceBooking />
    </Project>
  )
}
