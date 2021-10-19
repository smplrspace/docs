import HelloWorldCode from '!!raw-loader!./hello-world/HelloWorld';

export default [
  {
    slug: 'hello-world',
    title: 'Hello world',
    description:
      'A basic example showing how to integrate the viewer into your app.',
    published: true,
    code: [{ filename: 'HelloWorld.js', lang: 'jsx', content: HelloWorldCode }]
  },
  {
    slug: 'coming-soon',
    title: 'Coming soon',
    description: 'The suspense is incredible.',
    published: false
  }
]