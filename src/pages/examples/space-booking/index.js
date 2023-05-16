/* eslint-disable import/no-webpack-loader-syntax */
import React from 'react'

import StackblitzProject from '../../../components/StackblitzProject'

import { USE_CASES } from '../_categories'

export const spaceBooking = {
  slug: 'space-booking',
  title: 'Space booking',
  category: USE_CASES,
  description: `Showcase real time availability of assets, from entire event spaces to meeting rooms and down to single chairs.`,
  published: true,
  stackblitzProjects: [
    {
      lang: 'Javascript',
      id: 'smplr-booking-js',
      openFile: 'index.js'
    },
    {
      lang: 'Typescript',
      id: 'smplr-booking-ts',
      openFile: 'index.ts',
      default: true
    },
    {
      lang: 'React',
      id: 'smplr-booking-react',
      openFile: 'SpaceViewer.tsx'
    }
  ]
}

export default function () {
  return <StackblitzProject project={spaceBooking} />
}
