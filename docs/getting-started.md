---
sidebar_position: 1
slug: /
---

# Getting started

## Intro

Smplrspace lets developers add digital and interactive floor plans to their apps easily. Floor plans can be viewed in 2D _(coming soon)_ or 3D. Data layers can be added on the floor plans.

To get started with Smplrspace, you will need an account. You can sign up from [the website](https://www.smplrspace.com). All features come with a free tier so you can test things out and start building without friction (no credit card required).

## Embed options

To embed our floor plans in your app, you can either use an **iframe** or our **Javascript library, smplr.js**. The iframe option is the easiest to use but provides limited features — you can only display a floor plan. The Javascript library provides a full API that lets you control the rendering of the floor plans with custom color, behaviours and data layers.

### Iframe embeds

You can find the code snippet for iframe embeds from the editor. Click on the name of the space (top left), then head to the "Services" tab in the right pane, and click "Get embed snippet". It will look something like this:

```html
<iframe
  title="Space name - Smplrspace"
  src="https://smplr.me/e/xxxxxxx"
  style="border: 0px none; width: 100%; height: 100%;"
  scrolling="no"
  allowfullscreen=""
  webkitallowfullscreen=""
  mozallowfullscreen=""
></iframe>
```

To control the size of the embed, put it inside a `div` element, the iframe will fill up the div over which you have full control.

You can also add `position: absolute;` in your iframe's style and then set `position: relative; padding-bottom: 66%;` on the parent div to get a responsive embed with a fixed ratio. Replace 66% by your preferred ratio.

### Smplr.js embeds

To embed floor plans using our Javascript library, first load it from our CDN. You will need the JS script itself and the CSS stylesheets. Add these 2 lines to the `<head>` section of your app.

```html
<script src="https://app.smplrspace.com/lib/smplr.js"></script>
<link href="https://app.smplrspace.com/lib/smplr.css" rel="stylesheet" />
```

The script provides the minimal code required to get started. It pulls additional resources from our CDN depending on the features you use. We code-split, bundle, and lazy-load to ensure your application loads as fast as possible.

To start the viewer for a space, you should append the following script at the end of the `<body>` section of your app.

```html
<script>
  const space = new smplr.Space({
    spaceId: 'fbc5617e-5a27-4138-851e-839446121b2e',
    spaceToken: 'X',
    containerId: 'test'
  })
  space.preview({
    onViewerReady: () => console.log('Viewer is ready'),
    onError: error => console.error('Could not start viewer', error)
  })
</script>
```

If you use a frontend framework like React, you can refer to the [embedding spaces](./guides/embedding.md) guide to learn more about loading smplr.js.

## Preview images

Embeds are usually displayed with a static preview image and a button to initiate the interactive session. It works similarly to YouTube videos that require for the user to click "start" before loading the actual video. This is to ensure the page loads fast, and the interactive content is only loaded (and charged) for actual interactive sessions.

For a better experience, remember to generate a preview image once your space is ready. To do so, click on the name of the space (top left) in the editor, then head to the "Services" tab in the right pane, and click "Create preview image". A modal will open to let you position the viewer, you can change the size of the preview image you would like to save, and click "Snap" once ready. It will be saved to our servers and loaded automatically when required.

## How to use this documentation

This documentation is built around two types of content: **[docs](/)** and **[examples](/examples)**. Both are accessible from the top navigation menu.

You are currently on the first page of **the docs**, the menu pane on the left (it's under the menu button on mobile) lets you navigate sections. It includes guides on how to use Smplrspace, as well as the API reference. Do [reach out](https://www.smplrspace.com/support) for anything that's not clear or could be improved, or directly click the "Edit this page" button at the bottom of each doc page to propose changes.

**The examples** provide code templates that you can reuse and combine to build your app, it's a convenient starting point to better understand how to build on top of Smplrspace. Should you want to share and propose an new example to be added, you can simply [open a PR on this repo](https://github.com/smplrspace/docs). The examples are in the `src/pages/examples` folder.
