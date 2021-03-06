/* eslint-disable import/no-webpack-loader-syntax */
import React from 'react'

import Project from '../../../components/Project'
import StackingPlan from './StackingPlan'

import StackingPlanCode from '!!raw-loader!./StackingPlan'
import ViewerCode from '!!raw-loader!./Viewer'
import unitsCode from '!!raw-loader!./_units'

export const stackingPlan = {
  slug: 'stacking-plan',
  title: 'Stacking plan',
  description:
    'Showcases a building "stacking plan" with empty floors and a polygon data layer. This can be used to provide storey-wide information at a glance.',
  published: true,
  code: [
    {
      filename: 'StackingPlan.js',
      lang: 'jsx',
      content: StackingPlanCode
    },
    { filename: 'Viewer.js', lang: 'jsx', content: ViewerCode },
    { filename: 'units.js', lang: 'js', content: unitsCode }
  ]
}

export default function () {
  return (
    <Project project={stackingPlan}>
      <StackingPlan />
    </Project>
  )
}
