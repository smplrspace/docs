---
sidebar_position: 2
---

# Embedding spaces

## CDN links

To embed floor plans using our Javascript library, first load it from our CDN. You will need the JS script itself and the CSS stylesheets. Add these 2 lines to the `<head>` section of your app.

```html
<script src="https://app.smplrspace.com/lib/smplr.js"></script>
<link href="https://app.smplrspace.com/lib/smplr.css" rel="stylesheet" />
```

The script provides the minimal code required to get started. It pulls additional resources from our CDN depending on the features you use. We code-split, bundle, and lazy-load to ensure your application loads as fast as possible.

You **should not try to use a copy** of these files that you self host. Our frontend and backend resources need to be synced at the commit level to avoid data corruption, loading a copy might break your integration as you might not be using the latest version if we deploy a new version of the platform.

## Vanilla Javascript

For vanilla Javascript deploys, the previous 2 lines can be added to the `<head>` section of your app. You should then add a script at the end of your `<body>` to initiate the viewer session. Below is a minimal example corresponding to the [hello world example](/examples/hello-world).

```html
<script>
  const space = new smplr.Space({
    spaceId: 'fbc5617e-5a27-4138-851e-839446121b2e',
    spaceToken: 'X',
    containerId: 'test'
  })
  space.startViewer({
    preview: true,
    onReady: () => console.log('Viewer is ready'),
    onError: error => console.error('Could not start viewer', error)
  })
</script>
```

## React

For React users, you're in luck! Smplrspace is a React house as well so you can use our home made hooks to load smplr.js. The hooks source code is available on the docs repo in the [hooks folder](https://github.com/smplrspace/docs/tree/main/src/hooks). You can import `useSmplrJs` which relies on `useScript` to load the javascript script and `useStylesheet` to load the CSS file. We suggest you copy those files in your source code directly.

You can refer to the [hello world example](/examples/hello-world) to see a minimal page using this approach. All [examples](/examples) provided in this docs are using the `useSmplrJs` hook.

## Other frameworks

We imagine that you should be able to adapt the instructions for vanilla JS and React above to adapt tp your framework of choice. Of course we welcome any contributions to add guides for other frontend frameworks – click "Edit this page" below and open a PR anytime!
