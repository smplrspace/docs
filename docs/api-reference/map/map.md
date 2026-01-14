---
sidebar_label: Overview
slug: overview
sidebar_position: 1
---

# Embedding the map viewer

:::warning

This is a beta version, the API could change anytime with no backward compatibility, as we are still actively developing the map viewer. If you rely on this in production, please [get in touch](mailto:support@smplrspace.com) so we can take your usage into account and communicate to you any upcoming changes.

:::

Smplr.js makes a `smplr` object available on the global scope. One of the classes provided under this object is the `Map` class. It provides the API necessary to render the Smplrspace map viewer, a custom pre-configured Mapbox-based map which provide all the feature of Mapbox, including their 3D buildings, plus Smplrspace specific features to render your spaces, add data layers, and more.

## Constructor

To create a Map instance, initialise it as follow.

```ts
const map = new smplr.Map({
  clientToken: string
  containerId?: string
  container?: HTMLElement
  disableErrorReporting?: boolean
}) => Map
```

- `clientToken` is an API token that is used to authenticate client-side requests. It is safe to have it exposed in your client code. You can manage your organisation's tokens in the Smplrspace app, by heading to the Developers page from the main menu. [More info](/guides/embedding#client-tokens).
- `containerId` is the "id" of the html "div" container where smplr.js should render the viewer, something like "smplr-container" that can be found in your html. Only ids are supported, not classes.
- `container` is an alternative to `containerId` that lets you provide the HTML element directly instead of an id.
- `disableErrorReporting` - _optional_ - can be set to "true" to disable the automated reporting of errors to our 3rd party error tracking tool, [Sentry](https://sentry.io/). We have discovered that Sentry's instrumentation could make it seem as if all network requests originated from smplr.js. Unfortunately, there is nothing simple we can do on our side to avoid that. If this is an issue for you, you can disable Sentry altogether. The tradeoff is that we will not automatically detect errors hapenning in your integration, and you may need to be more proactive to report them for us to roll out fixes.

## Interactive map viewer session

### Start the viewer

To initiate an interactive viewer session, use the following code.

```ts
map.startViewer({
  spaceIds?: string[]
  hash?: boolean | string
  fitNewSpacesInScreen?: boolean
  loadingMessage?: string
  forceLoader?: boolean
  onReady?: () => void
  onError?: (errorMessage: string) => void
  onSpaceClick?: ({ space, levelIndex }: { space: object | undefined; levelIndex: number }) => void
  hideNavigationButtons?: boolean
  hideLevelPicker?: boolean
  hideControls?: boolean
  controlsPosition?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | 'center-left' | 'center-right'
  legendPosition?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'
  cameraPlacement?: PartialMapCameraPlacement
  search?: boolean
  protectScroll?: boolean
}) => Promise<void>
```

- `spaceIds` - _optional_ - lets you specify the Smplrspace ID ("spc_xxx") of the spaces to render on the map when initializing the viewer. You can also do that dynamically as described on the [Building page](/api-reference/map/buildings).
- `hash` - _optional_ - lets you choose whether to automatically sync the map location to the hash fragment of the page's URL. This makes it for easy to share links to specific map locations. It relies on Mapbox's corresponding [parameter](https://docs.mapbox.com/mapbox-gl-js/api/map/#map-parameters) which supports turning it on (the hash would be the whole URL hash), or providing a custom hash key to avoid conflict with other hash parameters. _Default value: false_.
- `fitNewSpacesInScreen` - _optional_ - lets you choose whether to automatically recenter the map to fit all the spaces when the spaces rendered on the map change. You can also center the map using [`fitAllSpacesInScreen`](#fit-all-spaces-in-screen). _Default value: true._
- `loadingMessage` - _optional_ - lets you override the text displayed while the space is loading. This can be change dynamically as well, see [UI controls](#ui-controls). _Default value: "Loading map"_.
- `forceLoader` - _optional_ - provides programmatic control to whether the loader should be displayed or not. By default we display it while loading the map and initial spaces provided by `spaceIds`, but you can control this if you load your own data as well. This option is more of a forced initial state, and then you can be change whether the loader is visible dynamically, see [UI controls](#ui-controls). _Default value: false._
- `onReady` - _optional_ - is called once the viewer's initial render is done. You may alternatively use the promise returned by startViewer, which resolves when the viewer is ready.
- `onError` - _optional_ - is called if an error occur that crashes the viewer. You may alternatively use the promise returned by startViewer to catch errors.
- `onSpaceClick` - _optional_ - is called when the user clicks a 3D space, and provide data about which space and which level where clicked.
- `hideNavigationButtons` - _optional_ - set this to true if you want the user to control the camera but want to remove the navigation buttons. Mouse, touch and keyboard inputs will work while the buttons are hidden. _Default value: false_
- `hideLevelPicker` - _optional_ - set this to true if you want to remove the level picker from the viewer. Levels can still be controlled programmatically, so you could use your own buttons or logic. _Default value: false_
- `hideControls` - _optional_ - set this to true if you want to remove *all* control buttons from the viewer. _Default value: false_
- `controlsPosition` - _optional_ - lets you choose where the control buttons are rendered. _Default value: 'center-right'_
- `legendPosition` - _optional_ - lets you choose where the legend (if any is configured in the data layers) would be rendered. _Default value: 'top-left'_
- `cameraPlacement` - _optional_ - set the initial position and direction of the camera. See [camera controls](/api-reference/map/custom-ux#set-the-camera-placement) for more details.
- `search` - _optional_ - set this to true to add a search button on the top left corner of the map, letting you find places on the map by address, GPS coordinates, and more. This is using a custom Mapbox Geocoder, and clicking a result from the list will move the camera to the place of interest. _Default value: false_.
- `protectScroll` - _optional_ - lets you force users to use cmd/ctrl + scroll to zoom. This allows you implement cooperative gestures easily in apps where the viewer is part of a scrollable page.

Calling `startViewer` returns a `Promise` ([MDN docs](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)) which resolves when the viewer is ready. This lets you use `Promise.then().catch()` or `async/await` with a `try/catch` block to react when the viewer is ready, or to handle errors that may occur. It is an alternative to providing `onReady` and `onError` callback methods. You may choose the option that suits the most your environment or coding style.

### Stop the viewer

To stop the viewer, dispose of resources it allocated, and clear the container in which it is rendered back to its original state, call the following function.

```ts
map.remove() => void
```

### Check if the viewer is ready

To check if the viewer has finished initializing and is ready for API methods to be called, you can do:

```ts
map.isViewerStarted() => boolean
```

## Picking mode

In order to know where a user clicks or taps on the map, you can enable picking mode. For example, this is useful if you have an admin interface to position items or draw on the map. Enabling picking mode is done as follows.

```ts
// call this after `onReady` has fired
map.enablePickingMode({
  onPick: ({ 
    coordinates: {
      lng: number
      lat: number
    }
    event: MapMouseEvent
  }) => void
}) => void
```

- `onPick` is called each time a click/tap event fires:
  - The `coordinates` object provides the location that was picked. It should be stored in your database and reused anytime you need to display data at this location.
  - The `event` value is the event object fired by Mapbox and is documented [here](https://docs.mapbox.com/mapbox-gl-js/api/events/#mapmouseevent).

Disabling picking mode is done as follow. For example, you would call `disablePickingMode` inside the `onPick` handler if you want to process a single pick event.

```ts
map.disablePickingMode() => void
```

You may refer to the [Add data elements](/examples/add-data-elements) example to see picking mode in action and understand the API. The example uses the space viewer, but the concepts are the same.

## Render buildings

See the dedicated functions you can call to render buildings [on this page](/api-reference/map/buildings).

## Data layers

The map viewer includes a full SDK to render data layers. Learn more [on this page](/api-reference/map/data-layers).

## Control the map location

### Focus on a specific space

You can change automatically "fly" the map to a specific space, by providing the space's identifier as follow:

```ts
map.flyToSpace(spaceId: string, options?: EasingOptions) => void
```

- `spaceId` - unique identifier of the space in Smplrspace, something like "spc_xxx".
- `options` - are camera animation options as per [Mapbox's documentation](https://docs.mapbox.com/mapbox-gl-js/api/map/#map%23flyto). Search `flyTo` on that page in case it doesn't navigate to it automatically.

### Fit all spaces in screen

You can change automatically "fly" the map to an overview point, showing all rendered spaces, as follow:

```ts
map.fitAllSpacesInScreen() => void
```

In case their is a single space rendered, this method will be equivalent to calling [`flyToSpace`](#focus-on-a-specific-space) on that space.

## UI controls

### Change the loading message

You can change the loading message any time as follow. This doesn't impact whether the loader is displayed or not.

```ts
map.updateLoadingMessage(message: string) => void
```

There is also the `loadingMessage` option on [`startViewer`](#start-the-viewer) to manage the initial state.

### Control the loader

You can control whether the loader is displayed or not anytime with the following functions.

```ts
map.showLoader() => void
map.hideLoader() => void
```

There is also the `forceLoader` option on [`startViewer`](#start-the-viewer) to manage the initial state.

## Full Mapbox SDK

The Smplrspace map viewer is built on top of [Mapbox GL JS](https://docs.mapbox.com/mapbox-gl-js/guides). We provide a number of features dedicated to Smplrspace use-cases, but you can also build anything you want by accessing the full Mapbox SDK as below:

```ts
map.mapbox() => mapboxgl.Map | undefined
```

The methods below are Smplrspace improved alternatives to the Mapbox ones.

### Changing the map style

Mapbox provides a `setStyle` method which works, but we recommend using ours instead so the Smplrspace managed elements automatically adapt to the new style. You should call it as below:

```ts
map.setStyle(style: string) => void
```

- `style` is a mapbox style url like "mapbox://styles/mapbox/satellite-streets-v12"

and you can use the below to revert to the default Smplrspace style:

```ts
map.setDefaultStyle() => void
```