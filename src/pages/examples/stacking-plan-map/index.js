/* eslint-disable import/no-webpack-loader-syntax */
import React from 'react'

import StackblitzProject from '../../../components/StackblitzProject'

import { USE_CASES } from '../_categories'

export const stackingPlanMap = {
  slug: 'stacking-plan-map',
  title: 'Stacking plan on map',
  category: USE_CASES,
  description: `Visualise floor plate level data through entire buildings via stacking plans. Provide users with storey-wide information at a glance.`,
  published: false,
  stackblitzProjects: [
    {
      lang: 'Typescript',
      id: 'smplr-stacking-plan-map-ts',
      openFile: 'index.ts',
      default: true
    }
  ]
}

export default function () {
  return <StackblitzProject project={stackingPlanMap} />
}
