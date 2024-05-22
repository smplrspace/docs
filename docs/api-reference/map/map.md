---
sidebar_label: Overview
slug: overview
sidebar_position: 1
---

# Embedding the map viewer

Smplr.js makes a `smplr` object available on the global scope. One of the classes provided under this object is the `Map` class. It provides the API necessary to render the Smplrspace map viewer, a custom pre-configured Mapbox-based map which provide all the feature of Mapbox, plus Smplrspace specific features to render your spaces, add 3D cities based on OpenStreetMap data, add data layers, and more.

## Constructor

To create a Map instance, initialise it as follow.

```ts
const map = new smplr.Map({
  clientToken: string,
  containerId: string,
  disableErrorReporting?: boolean,
}) => Map
```

- `clientToken` is an API token that is used to authenticate client-side requests. It is safe to have it exposed in your client code. You can manage your organisation's tokens in the Smplrspace app, by heading to the Developers page from the main menu. [More info](/guides/embedding#client-tokens).
- `containerId` is the "id" of the html "div" container where smplr.js should render the viewer, something like "smplr-container" that can be found in your html. Only ids are supported, not classes.
- `disableErrorReporting` - _optional_ - can be set to "true" to disable the automated reporting of errors to our 3rd party error tracking tool, [Sentry](https://sentry.io/). We have discovered that Sentry's instrumentation could make it seem as if all network requests originated from smplr.js. Unfortunately, there is nothing simple we can do on our side to avoid that. If this is an issue for you, you can disable Sentry altogether. The tradeoff is that we will not automatically detect errors hapenning in your integration, and you may need to be more proactive to report them for us to roll out fixes.

## Interactive map viewer session

### Start the viewer

To initiate an interactive viewer session, use the following code.

```ts
map.startViewer({
  spaceIds?: string[]
  osmBuildings?: boolean
  hash?: boolean
  fitNewSpacesInScreen?: boolean
  loadingMessage?: string
  forceLoader?: boolean
  onReady?: () => void
  onError?: (errorMessage: string) => void
  onSpaceClick?: ({ space, levelIndex }: { space: object | undefined; levelIndex: number }) => void
}) => Promise<void>
```

- `spaceIds` - _optional_ - lets you specify the Smplrspace ID of the spaces to render on the map when initializing the viewer. You can also do that dynamically as described on the [Building page](/api-reference/map/buildings).
- `osmBuildings` - _optional_ - lets you choose whether to render or not cities in 3D. City buildings data comes from OpenStreetMap and is automatically rendered in 3D. You can also do that dynamically as described in [3D cities](/api-reference/map/buildings#3d-cities). _Default value: true_.
- `hash` - _optional_ - lets you choose whether to automatically sync the map location to the hash fragment of the page's URL. This makes it for easy to share links to specific map locations. It relies on Mapbox's corresponding [parameter](https://docs.mapbox.com/mapbox-gl-js/api/map/#map-parameters). _Default value: false_.
- `fitNewSpacesInScreen` - _optional_ - lets you choose whether to automatically recenter the map to fit all the spaces when the spaces rendered on the map change. You can also center the map using [`fitAllSpacesInScreen`](#fit-all-spaces-in-screen). \_Default value: true.
- `loadingMessage` - _optional_ - lets you override the text displayed while the space is loading. This can be change dynamically as well, see [UI controls](#ui-controls). _Default value: "Loading map"_.
- `forceLoader` - _optional_ - provides programmatic control to whether the loader should be displayed or not. By default we display it while loading the map and initial spaces provided by `spaceIds`, but you can control this if you load your own data as well. This can be change dynamically as well, see [UI controls](#ui-controls). \_Default value: false.
- `onReady` - _optional_ - is called once the viewer's initial render is done. You may alternatively use the promise returned by startViewer, which resolves when the viewer is ready.
- `onError` - _optional_ - is called if an error occur while starting the viewer. You may alternatively use the promise returned by startViewer to catch errors.
- `onSpaceClick` - _optional_ - is called when the user clicks a 3D space, and provide data about which space and which level where clicked.

Calling `startViewer` returns a `Promise` ([MDN docs](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)) which resolves when the viewer is ready. This lets you use `Promise.then().catch()` or `async/await` with a `try/catch` block to react when the viewer is ready, or to handle errors that may occur. It is an alternative to providing `onReady` and `onError` callback methods. You may choose the option that suits the most your environment or coding style.

### Stop the viewer

To stop the viewer, dispose of resources it allocated, and clear the container in which it is rendered back to its original state, call the following function.

```ts
space.remove() => void
```

## Render buildings

See the dedicated functions you can call to render buildings [on this page](/api-reference/map/buildings).

## Control the map location

### Focus on a specific space

You can change automatically "fly" the map to a specific space, by providing the space's identifier as follow:

```ts
map.flyToSpace(spaceId: string) => void
```

- `spaceId` - unique identifier of the space in Smplrspace, something like "fbc5617e-5a27-4138-851e-839446121b2e".

### Fit all spaces in screen

You can change automatically "fly" the map to an overview point, showing all rendered spaces, as follow:

```ts
map.fitAllSpacesInScreen() => void
```

## UI controls

### Change the loading message

You can change the loading message any time as follow. This doesn't impact whether the loader is displayed or not.

```ts
map.updateLoadingMessage(message: string) => void
```

### Control the loader

You can control whether the loader is displayed or not anytime with the following functions.

```ts
map.showLoader() => void
map.hideLoader() => void
```

## Full Mapbox SDK

The Smplrspace map viewer is built on top of [Mapbox GL JS](https://docs.mapbox.com/mapbox-gl-js/guides). We provide a number of features dedicated to Smplrspace use-cases, but you can also build anything you want by accessing the full Mapbox SDK as below:

```ts
map.mapbox() => mapboxgl.Map | undefined
```
