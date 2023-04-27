/* eslint-disable import/no-webpack-loader-syntax */
import React from 'react'

import StackblitzProject from '../../../components/StackblitzProject'

import { USE_CASES } from '../_categories'

export const iot = {
  slug: 'iot',
  title: 'Internet of Things',
  category: USE_CASES,
  description: `Complement your existing dashboards with actual display of sensor locations and ranges. Not only do users love this, your sales teams will thank you as well.`,
  published: true,
  stackblitzProjects: [
    {
      lang: 'Javascript',
      id: 'smplr-iot-js',
      openFile: 'index.js'
    },
    {
      lang: 'Typescript',
      id: 'smplr-iot-ts',
      openFile: 'index.ts',
      default: true
    },
    {
      lang: 'React',
      id: 'smplr-iot-react',
      openFile: 'SpaceViewer.tsx'
    }
  ]
}

export default function () {
  return <StackblitzProject project={iot} />
}
