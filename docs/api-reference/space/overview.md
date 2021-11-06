---
sidebar_position: 1
---

# Overview

Smplr.js makes a `smplr` object available on the global scope. The main class provided under this object is the `Space` class. It provides the API necessary to preview a space, start an interactive viewer session, add data layers, and more.

## Constructor

To create a Space instance, initialise it as follow.

```ts
const space = new smplr.Space({
  spaceId: string,
  spaceToken: string,
  containerId: string
})
```

- `spaceId` is the unique identifier of the space in Smplrspace, something like "fbc5617e-5a27-4138-851e-839446121b2e".
- `spaceToken` is not used at the moment and the API might change, for the time being please use any value, for example "X".
- `containerId` is the "id" of the html "div" container where smplr.js should render the preview or viewer, something like "smplr-container" that can be found in your html. Only ids are supported, not classes.

## Static preview

To initiate the static preview (preview image with play button similar to YouTube embed), use the following code.

```ts
space.preview({
  onViewerReady?: () => void,
  onError?: (error: string | Error) => void
})
```

- `onViewerReady` - _optional_ - is called once the viewer is ready after a user has clicked on the play button.
- `onError` - _optional_ - is called if an error occur while initiating the preview or while starting the viewer after the user clicked the play button.

## Interactive viewer session

To initiate an interactive viewer session, use the following code.

```ts
space.startViewer({
  onReady?: () => void,
  onError?: (error: string | Error) => void
})
```

- `onReady` - _optional_ - is called once the viewer's initial render is done.
- `onError` - _optional_ - is called if an error occur while starting the viewer.

Although not a rule not to break, we generally _recommend_ to use `preview` instead of `startViewer` as this avoids loading the space if the user do not intend to interact with it. It also helps with reducing the number of views counted on your spaces. Under the hood, `startViewer` is called by the preview when the user clicks the play button.

**Note:** at this stage the viewer is only available in 3D, but an API-compatible 2D mode will be available soon.

### Picking mode

In order to know where a user clicks or taps in the floor plan, you can enable picking mode. For example, this is useful if you have an admin interface to configure floor plans and position sensors on it, or if you want to let users point to the location of an issue they are reporting. Enabling picking mode is done as follows.

```ts
// call this after `onReady` or `onViewerReady` has fired
space.enablePickingMode({
  onPick: ({
    coordinates: {
      levelIndex: number,
      x: number,
      z: number,
      elevation: number
    }
  }) => void
})
```

- `onPick` is called each time a click/tap event fires. The coordinates object provides the location that was picked in 3D. This should be stored in your database and reused anytime you need to display data at this location.

Disabling picking mode is done as follow. You could call `disablePickingMode` inside the `onPick` handler to limit the number of times a pick event should be processed.

```ts
space.disablePickingMode()
```

You may refer to the [temperature sensors](/examples/temperature-sensors) example for a simple implementation using picking mode.

### Data layers

#### Add a layer

The viewer lets you add data layers that are rendered on the floor plan. Each layer holds one type of information with one or more data elements and shared parameters for rendering. To add a layer, proceed as follow.

```ts
// call this after `onReady` or `onViewerReady` has fired
space.addDataLayer({
  id: string,
  type: 'point' | 'icon' | 'polygon' | 'polyline',
  data: object[],
  ...rest: object
})
```

- `id` is a unique identifier for this layer which is used for updates.
- `type` defines how the data should be rendered. _More types are coming soon._
- `data` is an array of objects (refered to as data elements) to be rendered.
- `...rest` represents other parameters that are specific to the type of the layer.

**For more details on the layer types and their specific options and data attributes, refer to the [data layers](/api-reference/space/data-layers.md) page.**

#### Update a layer

To update a layer with new data or options, proceed as follow.

```ts
space.updateDataLayer({
  id: string,
  data: object[],
  ...rest: object
})
```

- `id` is the identifier of the layer to update.
- `data` & `...rest` definitions are matching the ones provided for `addDataLayer`.

#### Remove a layer

Removing a data layer completely is done as follow.

```ts
space.removeDataLayer(id: string)
```

- `id` is the identifier of the layer to remove.
