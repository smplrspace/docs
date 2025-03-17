/* eslint-disable import/no-webpack-loader-syntax */
import React from 'react'

import StackblitzProject from '../../../components/StackblitzProject'

import { USE_CASES } from '../_categories'

export const stackingPlan = {
  slug: 'stacking-plan',
  title: 'Stacking plan',
  category: USE_CASES,
  description: `Visualise floor plate level data through entire buildings via stacking plans. Provide users with storey-wide information at a glance.`,
  published: true,
  stackblitzProjects: [
    {
      lang: 'Typescript',
      id: 'smplr-stacking-plan-ts',
      openFile: 'index.ts',
      default: true
    }
  ]
}

export default function () {
  return <StackblitzProject project={stackingPlan} />
}
