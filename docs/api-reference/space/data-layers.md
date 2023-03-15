---
sidebar_position: 2
---

# Data layers

The introduction to data layers and how to add, update and remove them is in the [overview](./overview#data-layers) page. Below, we describe the different layer types and their respective options.

## Generic options

Some options correspond to generic behaviours that are shared by all data layer types, making it easy to swap between similar layer types (e.g. "point" and "icon").

```ts
space.addDataLayer({
  // ...layerDefinition,
  tooltip?: (dataElement: object) => string,
  onClick?: (dataElement: object) => void,
  onHover?: (dataElement: object) => void,
  onHoverOut?: (dataElement: object) => void
}) => void
```

- `...layerDefinition` - refer to the [overview](./overview#data-layers) page.
- `tooltip` - _optional_ - is taking the newly hovered data element as argument and should return the content of the tooltip to render. It is called once when the pointer starts to hover a data element.
- `onClick` - _optional_ - is taking the data element that was clicked as argument. It is called each time a click or tap event happens.
- `onHover` - _optional_ - is taking the newly hovered data element as argument. It is called once when the pointer starts to hover a data element.
- `onHoverOut` - _optional_ - is taking the previously hovered data element as argument. It is called once when the pointer stops hovering a data element.

You may use the `onClick`, `onHover` and `onHoverOut` handlers to build custom behaviours in your app that respond to interactions happening in the floor plan.

## Point layer

A point layer has each data element rendered as a sphere.

```ts
space.addDataLayer({
  id: string,
  type: 'point',
  data: [{
    position: {
      levelIndex: number,
      x: number,
      z: number,
      elevation: number
    },
    ...customData: object
  }],
  diameter?: number | (dataElement: object) => number,
  anchor?: 'bottom' | 'center' | 'top',
  color?: string | (dataElement: object) => string,
  alpha?: number,
  onDrag?: ({ data: object }) => void,
  onDrop?: ({ data: object, position: object }) => void
}) => void
```

- `id` is a unique identifier for this layer which is used for updates.
- `data` is an array of objects (refered to as data elements) to be rendered. Each object **must** have a `position` element and can contain any additional custom data used for rendering options.
- `diameter` - _optional_ - defines the diameter of the sphere to render in meters. It can be defined as a number for all elements or per element with a function that takes each element as argument and returns the diameter for that element. _Default value: 1m._
- `anchor` - _optional_ - defines if the position provided for each data element corresponds to the bottom, center or top of the sphere. _Default value: center._
- `color` - _optional_ - defines the color of the sphere to render. It can be defined as a hexadecimal string like "#3a3c3c" for all elements or per element with a function that takes each element as argument and returns the hexadecimal color string for that element. _Default value: "#2393d4"_
- `alpha` - _optional_ - defines the transparency of the spheres for the whole layer. Element specific alpha value is not supported. The value should be between 0 (invisible) and 1 (opaque). _Default value: 1_
- `onDrag, onDrop` - _optional_ - providing either or both handlers will make data elements of the layer draggable. Each handler takes the dragged data element as argument. `onDrop` also receives the new position of the element so it can be updated in your app state and database.

The [internet of things](/examples/iot) example provides code implementation of point data layers. The [add data elements](/examples/add-data-elements) example gives a full overview of draggable layers.

## Icon layer

An icon layer has each data element rendered as an icon (it's a sprite for readers familiar with 3D rendering).

```ts
space.addDataLayer({
  id: string,
  type: 'icon',
  data: [{
    position: {
      levelIndex: number,
      x: number,
      z: number,
      elevation: number
    },
    ...customData: object
  }],
  icon: {
    url: string,
    width: number,
    height: number
  },
  width?: number | (dataElement: object) => number,
  onDrag?: ({ data: object }) => void,
  onDrop?: ({ data: object, position: object }) => void
}) => void
```

- `id` is a unique identifier for this layer which is used for updates.
- `data` is an array of objects (refered to as data elements) to be rendered. Each object **must** have a `position` element and can contain any additional custom data used for rendering options.
- `icon` provides information about the icon file to use. Icons must be self-hosted, `width` and `height` indicate the dimensions of the icon available at `url`. Only PNG and JPEG files are supported.
- `width` - _optional_ - defines the width of the icon to render in meters. It can be defined as a number for all elements or per element with a function that takes each element as argument and returns the width for that element. _Default value: 1m._
- `onDrag, onDrop` - _optional_ - providing either or both handlers will make data elements of the layer draggable. Each handler takes the dragged data element as argument. `onDrop` also receives the new position of the element so it can be updated in your app state and database.

The [Add data elements](/examples/add-data-elements) example gives a full overview of draggable layers, including an icon layer.

## Polygon layer

A polygon layer has each data element rendered as an extruded polygon. It is useful to highlight rooms or specific zones in the floor plan.

```ts
space.addDataLayer({
  id: string,
  type: 'polygon',
  data: [{
    coordinates: [{
      levelIndex: number,
      x: number,
      z: number
    }],
    ...customData: object
  }],
  baseHeight?: number | (dataElement: object) => number,
  height?: number | (dataElement: object) => number,
  color?: string | (dataElement: object) => string,
  alpha?: number,
  onDrag?: ({ data: object }) => void,
  onDrop?: ({ data: object, coordinates: object[] }) => void,
  disableReshape?: boolean,
  reshapeBoxColor?: string
}) => void
```

- `id` is a unique identifier for this layer which is used for updates.
- `data` is an array of objects (refered to as data elements) to be rendered. Each object **must** have a `coordinates` array and can contain any additional custom data used for rendering options.
- `baseHeight` - _optional_ - defines the elevation from the ground at the base of the polygon in meters. It can be defined as a number for all elements or per element with a function that takes each element as argument and returns the base height for that element. _Default value: 0m._
- `height` - _optional_ - defines the height of the polygon in meters from its base to its top. It can be defined as a number for all elements or per element with a function that takes each element as argument and returns the height for that element. _Default value: 3m._
- `color` - _optional_ - defines the color of the sphere to render. It can be defined as a hexadecimal string like "#3a3c3c" for all elements or per element with a function that takes each element as argument and returns the hexadecimal color string for that element. _Default value: "#2393d4"_
- `alpha` - _optional_ - defines the transparency of the spheres for the whole layer. Element specific alpha value is not supported. The value should be between 0 (invisible) and 1 (opaque). _Default value: 1_
- `onDrag, onDrop` - _optional_ - providing either or both handlers will make data elements of the layer draggable & reshapable. Each handler takes the dragged data element as argument. `onDrop` also receives the new coordinates of the element so they can be updated in your app state and database.
- `disableReshape` - _optional_ - set this to false when using onDrag or onDrop if you want the polygons to be draggable but not modifiable in shape. _Default value: true_
- `reshapeBoxColor` - _optional_ - hexadecimal string defining the color of the boxes used to reshape the polygons. Used in conjunction with onDrag or onDrop. _Default value: "#086bb7"_

The [leasing & tenancy](/examples/leasing-tenancy) example provides a simple implementation of a polygon data layer. The [Add data elements](/examples/add-data-elements) example gives a full overview of draggable & reshapable layers.

## Polyline layer

A polyline layer has each data element rendered as a line with one or more segments. The line is similar to a "pipe" which has a circle section by default but can take any section shape. The scale (you can think of it as the "diameter") of the pipe can be constant, or computed by section to generate patterns.

```ts
space.addDataLayer({
  id: string,
  type: 'polyline',
  data: [{
    coordinates: [{
      levelIndex: number,
      x: number,
      z: number,
      elevation: number
    }],
    ...customData: object
  }],
  shape?: 'circle' | 'triangle' | 'square' | 'pentagon' | 'hexagon' | [number, number][],
  cap?: boolean,
  scale?: number | ({ data: object, stepIndex: number, distance: number }) => number,
  stepSize?: number,
  color?: string | (dataElement: object) => string,
  alpha?: number,
  onDrag?: ({ data: object }) => void,
  onDrop?: ({ data: object, coordinates: object[] }) => void,
  disableReshape?: boolean,
  reshapeBoxColor?: string
}) => void
```

- `id` is a unique identifier for this layer which is used for updates.
- `data` is an array of objects (refered to as data elements) to be rendered. Each object **must** have a `coordinates` array and can contain any additional custom data used for rendering options.
- `shape` - _optional_ - defines the section that is extruded to render the line. A few options are provided, each of them a regular polygon centered on the line path and with its points on a circle of diameter 1m. You can also provide a custom shape with an array of coordinates in meter taking the line path as origin, the first coordinate on the horizontal axis and the second on the vertical axis (e.g. `[[0, -0.2], [0, 0.2], [0.2, 0], [0, -0.2]]` for a triangle pointing right). Custom shapes are not automatically closed, you should repeat the first coordinate at the end of the array to close the shape. _Default value: circle_
- `cap` - _optional_ - set value to false if you want the line shape to be hollow. _Default value: true_
- `scale` - _optional_ - defines the scaling factor applied to the shape during the extrusion. This can be a constant (e.g. circle pipe of diamter 0.5m), or a function of the data element, the step index along the line path, and the distance from the start of the line. A function is useful to create patterns along the line. The scale function is computed at each point defining the line path, you can add "steps" to each segment to compute the scale at regular interval with `stepSize` (see below). _Default value: 1_
- `stepSize` - _optional_ - you should only use this parameter alongside a scale function. It adds additional steps at regular interval on each segment of the line. The step size will not necessarily be exact as the algorithm will prioritize to get full steps over keeping to the step size.
- `color` - _optional_ - defines the color of the sphere to render. It can be defined as a hexadecimal string like "#3a3c3c" for all elements or per element with a function that takes each element as argument and returns the hexadecimal color string for that element. _Default value: "#2393d4"_
- `alpha` - _optional_ - defines the transparency of the spheres for the whole layer. Element specific alpha value is not supported. The value should be between 0 (invisible) and 1 (opaque). _Default value: 1_
- `onDrag, onDrop` - _optional_ - providing either or both handlers will make data elements of the layer draggable & reshapable. Each handler takes the dragged data element as argument. `onDrop` also receives the new coordinates of the element so it can be updated in your app state and database.
- `disableReshape` - _optional_ - set this to false when using onDrag or onDrop if you want the polygons to be draggable but not modifiable in shape. _Default value: true_
- `reshapeBoxColor` - _optional_ - hexadecimal string defining the color of the boxes used to reshape the polygons. Used in conjunction with onDrag or onDrop. _Default value: "#086bb7"_

The [Add data elements](/examples/add-data-elements) example gives a full overview of draggable & reshapable layers, including a polyline layer.

## Furniture layer

A furniture layer has each data element mapped to one or more pieces of furniture from the floor plan.

```ts
space.addDataLayer({
  id: string,
  type: 'furniture',
  data: [{
    furnitureId: string | [string],
    ...customData: object
  }],
  color?: string | (dataElement: object) => string
}) => void
```

- `id` is a unique identifier for this layer which is used for updates.
- `data` is an array of objects (refered to as data elements) to be rendered. Each object **must** have a `furnitureId` value mapping to the unique identifier(s) of one or more furniture in the floor plan and can contain any additional custom data used for rendering options.
- `color` - _optional_ - defines the displayed color of the furniture. It can be defined as a hexadecimal string like "#3a3c3c" for all elements or per element with a function that takes each element as argument and returns the hexadecimal color string for that element. _Default value: "#2393d4"_

The [space booking](/examples/space-booking) example provides a simple implementation of a furniture data layer.
