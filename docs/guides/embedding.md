---
sidebar_position: 2
---

# Embedding spaces

## Iframe

The simplest and least powerful way to embed a Smplrspace floor plan is to use our iframe embeds. If all you require is to showcase the floor plan, with no particular option or custom data / UI, this might be what you need. Head to the [getting started section](/#iframe-embeds) to learn how.

## Custom embeds via smplr.js

In order to customize the experience of the floor plans or layer on your own data on top of them, you should be using our Javascript library, smplr.js. Head to the [getting started section](/#smplrjs-embeds) to learn how.

## Loading smplr.js in React

For React users, you're in luck! Smplrspace is a React house as well so you can use our home made hooks to load smplr.js. The hooks source code is available on the docs repo in the [hooks folder](https://github.com/smplrspace/docs/tree/main/src/hooks). We suggest you copy these hooks in your source code directly.

You can use the default export or the named one `useSmplrJsUMD` which relies on `useScript` to load the UMD bundle and `useStylesheet` to load the CSS file. You can also use the named export `useSmplrJsESM` to load the ESM bundle (recommended) as well as the CSS file.

You can refer to the [hello world example](/examples/hello-world) to see a minimal page using this approach. All [examples](/examples) provided in this docs are using the `useSmplrJs` hook.

## Other frameworks

We imagine that you should be able to adapt the instructions for vanilla JS and React above to adapt tp your framework of choice. Of course we welcome any contributions to add guides for other frontend frameworks – click "Edit this page" below and open a PR anytime!
