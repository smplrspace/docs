---
sidebar_position: 1
slug: /
---

# Getting started

## Intro

Smplrspace lets developers add digital and interactive floor plans to their apps easily. Floor plans can be viewed in 2D or 3D. Data layers can be added on the floor plans.

To get started with Smplrspace, you will need an account. You can sign up from [the website](https://www.smplrspace.com). All features come with a free tier so you can test things out and start building without friction (no credit card required).

## Embed options

To embed our floor plans in your app, you can either use an **iframe** or our **Javascript library, smplr.js**. The iframe option is the easiest to use but provides limited features — you can only display a floor plan. The Javascript library provides a fully typed API that lets you control the rendering of the floor plans with custom colors, behaviours and data layers.

### Iframe embeds

You can find the code snippet for iframe embeds from the app. Click on the "..." menu of the space of your choice, then "View details", and on the pane that opens click "Get embed snippet". It will look something like this:

```html
<iframe
  title="Space name - Smplrspace"
  src="https://smplr.me/xxxxxxx"
  style="border: 0px none; width: 100%; height: 100%;"
  scrolling="no"
  allowfullscreen=""
  webkitallowfullscreen=""
  mozallowfullscreen=""
></iframe>
```

To control the size of the embed, put it inside a `div` element, the iframe will fill up the div over which you have full control.

You can also add `position: absolute;` in your iframe's style and then set `position: relative; aspect-ratio: 16/9;` on the parent div to get a responsive embed with a fixed ratio. Replace 16/9 by your preferred ratio.

### Smplr.js embeds

To embed floor plans using our Javascript library, first load it from our CDN. You will need the JS script itself and the CSS stylesheets. You could either load them yourself, or more simply use [our NPM package](https://www.npmjs.com/package/@smplrspace/smplr-loader) to load the library.

#### Loading from CDN

Add the following in the `<head>` section of your HTML file.

```html
<script src="https://app.smplrspace.com/lib/smplr.js"></script>
<link href="https://app.smplrspace.com/lib/smplr.css" rel="stylesheet" />
```

Learn more in the [embedding spaces guide](/guides/embedding#loading-smplrjs-umd-from-our-cdn).

#### Use our NPM package

Firstly install our loader package with your preferred package manager:

```sh
npm install @smplrspace/smplr-loader
```

```sh
yarn add @smplrspace/smplr-loader
```

then import it in your code and load as follow:

```js
import { loadSmplrJs } from "@smplrspace/smplr-loader";

loadSmplrJs()
  .then((smplr) => {
    /* enjoy a fully typed API */
    const space = new smplr.Space({
      spaceId: "...",
      clientToken: "pub_...",
      containerId: "...",
    });
    space.startViewer({
      preview: true,
      onReady: () => console.log("Viewer is ready"),
      onError: (error) => console.error("Could not start viewer", error),
    });
  })
  .catch((error) => console.error(error));
```

💡 Try it yourself in our [interactive hello world example](/examples/hello-world), which provides vanilla Javascript, vanilla Typescript and React starting points.

Note: `smplr-loader` is not the library itself, but a tiny package that loads the library from our CDN and applies types to the loaded module. We have plans to publish the `smplr.js` library itself to NPM in the future but our backend is not ready for it. See [below](/#warning-against-self-hosting-smplrjs) for details.

### UMD vs ESM bundles & tree shaking

The simplest way to get started is to use our **Universal Module Definition (UMD)** bundle which loads all the required frontend code at once. The disadvantage is a longer loading time on the first visit, subsequent visits will usually be cached.

In many cases, it is advisable to lazy load third party code to ensure a faster initial load time. Smplr.js supports "tree shaking" at runtime through our **ES Modules (ESM)** bundle. The ESM bundle provides an entry point with the minimal code required to get started. It pulls additional resources from our CDN depending on the features you use. We code-split, bundle, and lazy-load to ensure your application loads as fast as possible.

To understand how to load the UMD/ESM bundles from our CDN, refer to the [embedding spaces guide](/guides/embedding#loading-smplrjs-umd-from-our-cdn).

To choose between UMD and ESM using smplr-loader, simply provide your preferred bundle type as the first argument to `loadSmplrJs`. The default is `'esm'`.

```js
// default is 'esm'
loadSmplrJs();
loadSmplrJs("esm").then(...);

// or opt in to 'umd'
// e.g. if your environment doesn't support ESM
loadSmplrJs("umd").then(...);
```

## Warning against self-hosting smplr.js

You **should not try to use a copy** of the library files that you self host. Our frontend and backend resources need to be synced at the commit level to avoid data corruption, loading a copy might break your integration as you might not be using the latest version if we deploy a new version of the platform.

A `smplr.js` **npm package** is on our roadmap but not ready yet due to blockers on the versioning side of things in our database. This remains a priority for us as we understand most engineering team prefer to include pinned versions of their dependencies in their own bundles. We will update our users once this is available.

#### Advanced usage

If you use a frontend framework like React, you can refer to the [embedding spaces](/guides/embedding.md) guide to learn more about loading smplr.js.

## Preview images

Embeds are usually displayed with a static preview image and a button to initiate the interactive session. It works similarly to YouTube videos that require for the user to click "start" before loading the actual video. This is to ensure the page loads fast, and the interactive content is only loaded (and charged) for actual interactive sessions.

For a better experience, remember to generate a preview image once your space is ready. To do so, click on the name of the space (top left) in the editor, then head to the "Services" tab in the right pane, and click "Create preview image". A modal will open to let you position the viewer, you can change the size of the preview image you would like to save, and click "Snap" once ready. It will be saved to our servers and loaded automatically when required.

## How to use this documentation

This documentation is built around two types of content: **[docs](/)** and **[examples](/examples)**. Both are accessible from the top navigation menu.

You are currently on the first page of **the docs**, the menu pane on the left (it's under the menu button on mobile) lets you navigate sections. It includes guides on how to use Smplrspace, as well as the API reference. Do [reach out](https://www.smplrspace.com/support) for anything that's not clear or could be improved, or directly click the "Edit this page" button at the bottom of each doc page to propose changes.

**The examples** provide code templates that you can reuse and combine to build your app, it's a convenient starting point to better understand how to build on top of Smplrspace. Should you want to share and propose an new example to be added, you can simply [open a PR on this repo](https://github.com/smplrspace/docs). The examples are in the `src/pages/examples` folder.
