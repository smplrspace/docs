/* eslint-disable import/no-webpack-loader-syntax */
import React from 'react'

import Project from '../../../components/Project'
import HelloWorld from './HelloWorld'

import HelloWorldCode from '!!raw-loader!./HelloWorld'
import { GETTING_STARTED } from '../_categories'

export const helloWorld = {
  slug: 'hello-world',
  title: 'Hello world',
  category: GETTING_STARTED,
  description: `Let's get started with the basics — integrating the viewer into your app. It takes only a couple of minutes.`,
  published: true,
  code: [{ filename: 'HelloWorld.js', lang: 'jsx', content: HelloWorldCode }]
}

export default function () {
  return (
    <Project project={helloWorld}>
      <HelloWorld />
    </Project>
  )
}
