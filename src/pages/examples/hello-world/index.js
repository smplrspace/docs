import React from 'react'

import Project from '../../../components/Project'
import HelloWorld from './HelloWorld'

import HelloWorldCode from '!!raw-loader!./HelloWorld';

export const helloWorld = {
  slug: 'hello-world',
  title: 'Hello world',
  description:
    'A basic example showing how to integrate the viewer into your app.',
  published: true,
  code: [{ filename: 'HelloWorld.js', lang: 'jsx', content: HelloWorldCode }]
}

export default function() {
  return (
    <Project project={project}>
      <HelloWorld />
    </Project>
  )
}
