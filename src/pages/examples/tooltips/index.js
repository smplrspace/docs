import React from 'react'

import StackblitzProject from '../../../components/StackblitzProject'

import { FEATURES } from '../_categories'

export const tooltipsOptions = {
  slug: 'tooltips',
  title: 'All tooltips options',
  category: FEATURES,
  description: `Get an overview of all the ways to use tooltips, from simple text tooltips to fully controlled custom elements. And even through programmatic control.`,
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
      id: 'smplr-tooltips',
      openFile: 'index.tsx',
      default: true
    }
  ],
  published: true
}

export default function () {
  return <StackblitzProject project={tooltipsOptions} />
}
