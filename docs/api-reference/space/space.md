---
sidebar_position: 1
sidebar_label: Overview
slug: overview
---

# Embedding spaces

Smplr.js makes a `smplr` object available on the global scope. The main class provided under this object is the `Space` class. It provides the API necessary to preview a space, start an interactive viewer session, add data layers, and more.

## Constructor

To create a Space instance, initialise it as follow.

```ts
const space = new smplr.Space({
  spaceId: string
  clientToken: string
  containerId?: string
  container?: HTMLElement
  disableErrorReporting?: boolean
  whiteLabel?: boolean
}) => Space
```

- `spaceId` is the unique identifier of the space in Smplrspace, something like "spc_xxx". Refer to the [page on SIDs](/guides/sid) to learn more.
- `clientToken` is an API token that is used to authenticate client-side requests. It is safe to have it exposed in your client code. You can manage your organisation's tokens in the Smplrspace app, by heading to the Developers page from the main menu. [More info](/guides/embedding#client-tokens).
- `containerId` is the "id" of the html "div" container where smplr.js should render the viewer, something like "smplr-container" that can be found in your html. Only ids are supported, not classes.
- `container` is an alternative to `containerId` that lets you provide the HTML element directly instead of an id.
- `disableErrorReporting` - _optional_ - can be set to "true" to disable the automated reporting of errors to our 3rd party error tracking tool, [Sentry](https://sentry.io/). We have discovered that Sentry's instrumentation could make it seem as if all network requests originated from smplr.js. Unfortunately, there is nothing simple we can do on our side to avoid that. If this is an issue for you, you can disable Sentry altogether. The tradeoff is that we will not automatically detect errors hapenning in your integration, and you may need to be more proactive to report them for us to roll out fixes.
- `whiteLabel` - _optional_ - can be set to "true" to remove the "Powered by Smplrspace" attribution from the viewer. This is a paid add-on. You can check if it is enabled from the Organization settings page. [Get in touch](mailto:hello@smplrspace.com) to learn more.

## Interactive viewer session

### Start the viewer

To initiate an interactive viewer session, use the following code.

```ts
space.startViewer({
  preview?: boolean,
  loadingMessage?: string,
  renderingMessage?: string,
  mode?: '2d' | '3d',
  allowModeChange?: boolean,
  onModeChange?: (mode: '2d' | '3d') => void,
  onReady?: () => void,
  onError?: (errorMessage: string) => void,
  onResize?: (containerRect: DOMRect) => void,
  onVisibleLevelsChanged?: (visibleLevels: number[]) => void
  onObjectsUpdated?: () => void
  ...customUX: object
}) => Promise<void>
```

- `preview` - _optional_ - starts by a preview image with a play button similar to YouTube embed. It is advisable to use [our ESM bundle](/#umd-vs-esm-bundles--tree-shaking) to ensure a quick initial render. _Default value: false_.
- `loadingMessage` - _optional_ - lets you override the text displayed while the space is loading. _Default value: "Loading your space"_.
- `renderingMessage` - _optional_ - lets you override the text displayed when the space is loaded but still rendering. _Default value: same as loadingMessage_.
- `mode` - _optional_ - lets you choose between 2D and 3D rendering. _Default value: 3d_.
- `allowModeChange` - _optional_ - set this to true to allow users to switch between 2D and 3D. _Default value: false_.
- `onModeChange` - _optional_ - is called whenever the user changes the mode. Requires allowModeChange to be set to true.
- `onReady` - _optional_ - is called once the viewer's initial render is done. You may alternatively use the promise returned by startViewer, which resolves when the viewer is ready.
- `onError` - _optional_ - is called if an error occur while starting the viewer. You may alternatively use the promise returned by startViewer to catch errors.
- `onResize` - _optional_ - is called whenever the viewer is resized, including after the initial render, when the window is resized, or on mobile when the device is rotated between vertical to horizontal positions. This can be used to reposition custom tooltips (e.g.).
- `onVisibleLevelsChanged` - _optional_ - is called whenever there is a change in the visible levels. This could be through the user clicking the level picker, or through an API call of [`showUpToLevel`](/api-reference/space/custom-ux#navigate-levels). It is also called when the space first renders. The handler take a single argument `visibleLevels`, which is the ordered list of zero-based level indices currently visible in the viewer. The last element in that list is always the highest visible level.
- `onObjectsUpdated` - _optional_ - is called each time new objects (equipment / furniture) are rendered. It is also called when the space first renders.
- `...customUX` represents additional options that let you customise the user experience as documented in the [custom UX](./custom-ux#viewer-options) page.

Calling `startViewer` returns a `Promise` ([MDN docs](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)) which resolves when the viewer is ready. This lets you use `Promise.then().catch()` or `async/await` with a `try/catch` block to react when the viewer is ready, or to handle errors that may occur. It is an alternative to providing `onReady` and `onError` callback methods. You may choose the option that suits the most your environment or coding style.

Although not a rule not to break, we generally _recommend_ to use `preview: true` as this avoids loading the space if the user do not intend to interact with it. It also helps with reducing the number of views counted on your spaces.

### Stop the viewer

To stop the viewer, dispose of resources it allocated, and clear the container in which it is rendered back to its original state, call the following function.

```ts
space.remove() => void
```

### Check if the viewer is ready

To check if the viewer has finished initializing and is ready for API methods to be called, you can do:

```ts
space.isViewerStarted() => boolean
```

## Picking mode

In order to know where a user clicks or taps in the floor plan, you can enable picking mode. For example, this is useful if you have an admin interface to configure floor plans and position sensors on it, or if you want to let users point to the location of an issue they are reporting. Enabling picking mode is done as follows.

```ts
// call this after `onReady` has fired
space.enablePickingMode({
  onPick: ({
    coordinates: {
      levelIndex: number,
      x: number,
      z: number,
      elevation: number
    },
    furnitureId?: string
  }) => void
}) => void
```

- `onPick` is called each time a click/tap event fires. The `coordinates` object provides the location that was picked in 3D. The `furnitureId` value is set when the user picked a furniture (now called equipment in the app) and contains its unique identifier. These pieces of information should be stored in your database and reused anytime you need to display data at this location.

Disabling picking mode is done as follow. You could call `disablePickingMode` inside the `onPick` handler to limit the number of times a pick event should be processed.

```ts
space.disablePickingMode() => void
```

You may refer to the [Add data elements](/examples/add-data-elements) example to see picking mode in action and understand the API.

## Data layers

### Add a layer

The viewer lets you add data layers that are rendered on the floor plan. Each layer holds one type of information with one or more data elements and shared parameters for rendering. To add a layer, proceed as follow.

```ts
// call this after `onReady` has fired
space.addDataLayer({
  id: string,
  type: 'point' | 'icon' | 'polygon' | 'polyline' | 'dotted-polyline' | 'heatmap' | 'furniture',
  data: object[],
  ...rest: object
}) => DataLayerController
```

- `id` is a unique identifier for this layer which is used for updates.
- `type` defines how the data should be rendered. _More types are coming soon_.
- `data` is an array of objects (refered to as data elements) to be rendered.
- `...rest` represents other parameters that are specific to the type of the layer.

The method returns a `DataLayerController` which provides an API to manipulate the layer. See [the data layer controller section](./data-layers#data-layer-controller) for details.

**For more details on the layer types, their specific options and data attributes, as well as the type-specific variants of `addDataLayer`, refer to the [data layers](./data-layers) page.**

### Get a layer's controller

To retrieve the controller of a data layer, you can call the following method:

```ts
space.getDataLayer(id: string) => DataLayerController | undefined
```

- `id` is the identifier of the layer.

The function will return the [controller](./data-layers#data-layer-controller) if the layer exists, or `undefined` if it doesn't.

### Update a layer

To update a layer with new data or options, proceed as follow.

```ts
space.updateDataLayer({
  id: string,
  data: object[],
  ...rest: object
}) => void
```

- `id` is the identifier of the layer to update.
- `data` & `...rest` definitions are matching the ones provided for `addDataLayer`.

An equivalent method is `update` on a [data layer controller](./data-layers#data-layer-controller).

### Remove a layer

Removing a data layer completely is done as follow.

```ts
space.removeDataLayer(id: string) => void
```

- `id` is the identifier of the layer to remove.

An equivalent method is `remove` on a [data layer controller](./data-layers#data-layer-controller).

### Remove all layers

Removing all data layers at once is done as follow.

```ts
space.removeAllDataLayers() => void
```

## Taking screenshots

You can use the methods below to take screenshots of the Smplrspace viewer.

### Download a screenshot

This method will download the screenshot to the user's file system.

```ts
space.takeScreenshot({
  mode: '3d-scene' | 'full-viewer'
  width?: number
  height?: number
  forceRetinaPixelRatio?: boolean
  forceNonRetinaPixelRatio?: boolean
}) => Promise<void>
```

- `mode` lets you choose between 2 options:
  - `3d-scene` to include only the 3D content in the viewer and ignore the HTML overlays like buttons, tooltips, legends, etc.
  - `full-viewer` to include everything, including the HTML overlays like buttons, tooltips, legends, etc.
- `width` - _optional_ - lets you specify the desired width in pixels of the generated image. It defaults to the width of the viewer, and would maintain ratio if `height` is provided but not `width`.
- `height` - _optional_ - lets you specify the desired height in pixels of the generated image. It defaults to the height of the viewer, and would maintain ratio if `width` is provided but not `height`.
- `forceRetinaPixelRatio` - _optional_ - can be set to true to force the image resolution to be **2x** the set width/height. _Default value: false_.
- `forceNonRetinaPixelRatio` - _optional_ - can be set to true to force the image resolution to be **1x** the set width/height. _Default value: false_.

### Get a screenshot as Base64 string

This method will return a string containing the [Base64 encoded image](https://b64encode.com/blog/what-is-a-base64-image-and-how-to-encode-it/) that you can manipulate, upload, or download as per your specific requirements.

```ts
space.takeScreenshotToString({
  mode: '3d-scene' | 'full-viewer'
  width?: number
  height?: number
  forceRetinaPixelRatio?: boolean
  forceNonRetinaPixelRatio?: boolean
}) => Promise<string>
```

All arguments are the same as [`takeScreenshot`](#download-a-screenshot)