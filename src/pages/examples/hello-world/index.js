import React from 'react'

import StackblitzProject from '../../../components/StackblitzProject'

import { GETTING_STARTED } from '../_categories'

export const helloWorld = {
  slug: 'hello-world',
  title: 'Hello world',
  category: GETTING_STARTED,
  description: `Let's get started with the basics — integrating the viewer into your app. It takes only a few lines of code.`,
  stackblitzProjects: [
    {
      lang: 'TS',
      id: 'smplr-hello-world-ts',
      openFile: 'index.ts'
    }
  ],
  published: true
}

export default function () {
  return <StackblitzProject project={helloWorld} />
}
