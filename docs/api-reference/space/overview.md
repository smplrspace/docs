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
- `containerId` is the "id" of the html "div" container where smplr.js should render the viewer, something like "smplr-container" that can be found in your html. Only ids are supported, not classes.

## Interactive viewer session

To initiate an interactive viewer session, use the following code.

```ts
space.startViewer({
  preview?: boolean,
  // 2D or 3D
  mode?: '2d' | '3d',
  allowModeChange?: boolean,
  onModeChange?: (mode: '2d' | '3d') => void,
  // custom UX
  cameraPlacement?: {
    alpha: number,
    beta: number,
    radius: number,
    target: {
      x: number,
      y: number,
      z: number
    }
  },
  // event handlers
  onReady?: () => void,
  onError?: (error: string | Error) => void
}) => void
```

- `preview` - _optional_ - starts by a preview image with a play button similar to YouTube embed. _Default value: false._
- `mode` - _optional_ - lets you choose between 2D and 3D rendering. _Default value: 3d._
- `allowModeChange` - _optional_ - set this to true to allow users to switch between 2D and 3D. _Default value: false._
- `onModeChange` - _optional_ - is called whenever the user changes the mode. Requires allowModeChange to be set to true.
- `cameraPlacement` - _optional_ - set the initial position and direction of the camera. See [camera controls](/api-reference/space/custom-ux#camera-controls) for more details.
- `onReady` - _optional_ - is called once the viewer's initial render is done.
- `onError` - _optional_ - is called if an error occur while starting the viewer.

Although not a rule not to break, we generally _recommend_ to use `preview: true` as this avoids loading the space if the user do not intend to interact with it. It also helps with reducing the number of views counted on your spaces.

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

- `onPick` is called each time a click/tap event fires. The `coordinates` object provides the location that was picked in 3D. The `furnitureId` value is set when the user picked a furniture and contains its unique identifier. These pieces of information should be stored in your database and reused anytime you need to display data at this location.

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
  type: 'point' | 'icon' | 'polygon' | 'polyline',
  data: object[],
  ...rest: object
}) => void
```

- `id` is a unique identifier for this layer which is used for updates.
- `type` defines how the data should be rendered. _More types are coming soon._
- `data` is an array of objects (refered to as data elements) to be rendered.
- `...rest` represents other parameters that are specific to the type of the layer.

**For more details on the layer types and their specific options and data attributes, refer to the [data layers](/api-reference/space/data-layers.md) page.**

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

### Remove a layer

Removing a data layer completely is done as follow.

```ts
space.removeDataLayer(id: string) => void
```

- `id` is the identifier of the layer to remove.
