import React from 'react'

import StackblitzProject from '../../../components/StackblitzProject'

import { FEATURES } from '../_categories'

export const customTooltips = {
  slug: 'custom-tooltips',
  title: 'Custom tooltips',
  category: FEATURES,
  description: `Programmatically control HTML elements to overlay data elements. This gives you 100% control over your tooltips. And you can react to camera movements.`,
  stackblitzProjects: [
    // {
    //   lang: 'Javascript',
    //   id: 'smplr-custom-tooltips-js',
    //   openFile: 'index.js'
    // },
    // {
    //   lang: 'Typescript',
    //   id: 'smplr-custom-tooltips-ts',
    //   openFile: 'index.ts',
    // },
    {
      lang: 'React',
      id: 'smplr-custom-tooltips',
      openFile: 'SpaceViewer.tsx',
      default: true
    }
  ],
  published: true
}

export default function () {
  return <StackblitzProject project={customTooltips} />
}
