/* eslint-disable import/no-webpack-loader-syntax */
import React from 'react'

import StackblitzProject from '../../../components/StackblitzProject'

import { GETTING_STARTED } from '../_categories'

export const embeddedEditor = {
  slug: 'embedded-editor',
  title: 'Embedded editor',
  category: GETTING_STARTED,
  description: `Showcase how to embed the Smplrspace editor inside your own application, so users can edit spaces without it.`,
  published: true,
  stackblitzProjects: [
    {
      lang: 'Typescript',
      id: 'smplr-editor-ts',
      openFile: 'index.ts',
      default: true
    }
  ]
}

export default function () {
  return <StackblitzProject project={embeddedEditor} />
}
