---
sidebar_position: 1
---

# Overview

Smplr.js makes a `smplr` object available on the global scope. The main class provided under this object is the `Space` class. It provides the API necessary to preview a space, start an interactive viewer session, add data layers, and more.

## Constructor

To create a Space instance, initialise it as follow.

```js
const space = new smplr.Space({
  spaceId,
  spaceToken, // this is still in flight and might change
  containerId
})
```

- `spaceId` is the unique string identifier of the space in Smplrspace, something like "fbc5617e-5a27-4138-851e-839446121b2e".
- `spaceToken` is not used at the moment and the API might change, for the time being please use any string value, for example "X".
- `containerId` is the string "id" of the html "div" container where smplr.js should render the preview or viewer, something like "smplr-container" that can be found in your html. Only ids are supported, not classes.

## Static preview

To initiate the static preview (preview image with play button similar to YouTube embed), use the following code.

```js
space.preview({
  onViewerReady,
  onError
})
```

- `onViewerReady()` is a function called once the viewer is ready after a user has clicked on the play button.
- `onError(error)` is a function called if an error occur while initiating the preview or while starting the viewer after the user clicked the play button.
  - `error` can be a string or a Javascript error object.

## Interactive viewer session

To initiate an interactive viewer session, use the following code.

```js
space.startViewer({
  onReady,
  onError
})
```

- `onReady()` is a function called once the viewer's initial render is done.
- `onError(error)` is a function called if an error occur while starting the viewer.
  - `error` can be a string or a Javascript error object.

Although not a rule not to break, we generally _recommend_ to use `preview` instead of `startViewer` as this avoids loading the space if the user do not intend to interact with it. It also helps with reducing the number of views counted on your spaces. Under the hood, `startViewer` is called by the preview when the user clicks the play button.

**Note:** at this stage the viewer is only available in 3D, but an API-compatible 2D mode will be available soon.

### Picking mode

In order to know where a user clicks or taps in the floor plan, you can enable picking mode. For example, this is useful if you have an admin interface to configure floor plans and position sensors on it, or if you want to let users point to the location of an issue they are reporting. Enabling picking mode is done as follows.

```js
// call this after `onReady` or `onViewerReady` has fired
space.enablePickingMode({
  onPick
})
```

- `onPick({ coordinates: { levelIndex, x, z, elevation }})` is a function called each time a click/tap event fires. The coordinates object provides the location that was picked in 3D. This should be stored in your database and reused anytime you need to display data at this location.

Disabling picking mode is done as follow. You could call `disablePickingMode` inside the `onPick` handler to limit the number of times a pick event should be processed.

```js
space.disablePickingMode()
```

### Data layers

#### Add a layer

The viewer lets you add data layers that are rendered on the floor plan. Each layer holds one type of information with one or more data points and shared parameters for rendering. To add a layer, proceed as follow.

```js
// call this after `onReady` or `onViewerReady` has fired
space.addDataLayer({
  id,
  type,
  data,
  ...rest
})
```

- `id` is a unique string identifier for this layer which is used for updates.
- `type` is a string defining how the data should be rendered. The supported values are:
  - `point` to render a sphere for each data point.
  - `icon` to render an icon for each data point.
  - _more types are coming soon._
- `data` is an array of objects to be rendered.
- `...rest` represents other parameters that are specific to the type of the layer.

**For more details on the layer types and their specific options and data attributes, refer to the [data layers](/api-reference/space/data-layers.md) section.**

#### Update a layer

To update a layer with new data or options, proceed as follow.

```js
space.updateDataLayer({
  id,
  data,
  ...rest
})
```

- `id` is the string identifier of the layer to update.
- `data` & `...rest` definitions are matching the ones provided for `addDataLayer`.

#### Remove a layer

Removing a data layer completely is done as follow.

```js
space.removeDataLayer(id)
```

- `id` is the string identifier of the layer to remove.
