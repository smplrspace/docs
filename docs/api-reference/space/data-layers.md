---
sidebar_position: 2
---

# Data layers

The introduction to data layers and how to add, update and remove them is in the [overview](./overview#data-layers) page. Below, we describe the different layer types and their respective options.

## Generic options

Some options correspond to generic behaviours that are shared by all interactive data layers, making it easy to swap between similar layer types (e.g. "point" and "icon").

```ts
space.addDataLayer({
  // ...layerDefinition,
  tooltip?: (dataElement: object) => string | HTMLString,
  tooltipTemplate?: string,
  tooltipContainerStyle?: string,
  onClick?: (dataElement: object, event: PointerEvent) => void,
  onHover?: (dataElement: object, event: LimitedPointerEvent) => void,
  onHoverOut?: (dataElement: object, event: LimitedPointerEvent) => void
}) => DataLayerController
```

- `...layerDefinition` - refer to the [overview](./overview#data-layers) page.
- `tooltip` - _optional_ - is taking the newly hovered data element as argument and should return the content of the tooltip to render. It is called once when the pointer starts to hover a data element. Built-in tooltips support string and "HTML as string" values.
  - For string values, newlines are supported by using [multi-line template literals](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals#multi-line_strings).
  - For HTML values, both HTML and CSS are supported, the value will be sanitized to prevent XSS attacks.
  - If you need complete control over the tooltip content (e.g. for a React component), check the [tooltips example](/examples/tooltips/).
- `tooltipTemplate` - _optional_ - is a fully featured template string used to generate the tooltip content based on the data for the hovered element.
  - It is powered by [Handlebars](https://handlebarsjs.com/) and you may refer to the full templating documentation [here](https://handlebarsjs.com/guide/). 
  - It supports HTML, nested fields access, conditionals, loops, and more.
  - A custom helper lets you use fallback default values: `{{fallback [my field] 'default value'}}`.
  - Without this helper, we use `'-'` as a default value for all fields.
- `tooltipContainerStyle` - _optional_ - lets you override the style of the tooltip container with inline CSS.
- `onClick` - _optional_ - is taking the data element that was clicked as argument, as well as the Javascript [pointer event](https://developer.mozilla.org/en-US/docs/Web/API/PointerEvent) that triggered the click. It is called each time a click or tap event happens.
- `onHover` - _optional_ - is taking the newly hovered data element as argument, as well as a limited (due to the rendering engine's internals) "pointer event" that triggered the handler. The limited event only includes the coordinates within the viewer of the pointer at the time when the event was triggered. The handler is called once when the pointer starts to hover a data element.
- `onHoverOut` - _optional_ - is taking the previously hovered data element as argument, as well as the same limited "pointer event" as for `onHover`. The handler is called once when the pointer stops hovering a data element.

You may use the `onClick`, `onHover` and `onHoverOut` handlers to build custom behaviours in your app that respond to interactions happening in the floor plan.

## Types of layers

### Point layer

A point layer has each data element rendered as a sphere.

```ts
space.addDataLayer({
  id: string,
  type: 'point',
  shape: 'sphere' | 'cube',
  data: [{
    id: string | number,
    position: {
      levelIndex: number,
      x: number,
      z: number,
      elevation: number
    },
    ...customData: object
  }],
  color?: string | (dataElement: object) => string,
  anchor?: 'bottom' | 'center' | 'top',
  alpha?: number,
  onDrag?: ({ data: object }) => void,
  onDrop?: ({ data: object, position: object }) => void
  disableElevationCorrection?: boolean,
  // sphere shape options
  diameter?: number | (dataElement: object) => number | { x: number; y: number; z: number },
  // cube shape options
  size?: number
  width?: number
  height?: number
  depth?: number
  scale?: (dataElement: object) => number | { x: number; y: number; z: number },
}) => DataLayerController
```

- `id` is a unique identifier for this layer which is used for updates.
- `shape` is the the 3D shape used to render each data element. Each shape comes with its own options defined below.
- `data` is an array of objects (refered to as data elements) to be rendered. Each element **must** have an `id` (unique identifier within the data array) and a `position`. Elements can also contain any additional custom data used for rendering options.
- `color` - _optional_ - defines the color of the sphere to render. It can be defined as any valid CSS color string like "orange" or "#3a3c3c", and applied for all elements or per element with a function that takes each element as argument and returns the color string for that element. _Default value: "#2393d4"_
- `anchor` - _optional_ - defines if the position provided for each data element corresponds to the bottom, center or top of the sphere. _Default value: center._
- `alpha` - _optional_ - defines the transparency of the spheres for the whole layer. Element specific alpha value is not supported. The value should be between 0 (invisible) and 1 (opaque). _Default value: 1_
- `onDrag, onDrop` - _optional_ - providing either or both handlers will make data elements of the layer draggable. Each handler takes the dragged data element as argument. `onDrop` also receives the new position of the element so it can be updated in your app state and database.
- `disableElevationCorrection` - _optional_
  - In 2D mode, the rendered elevation of points is fully managed and the provided value ignored. Points will be rendered on top of the floor plans.
  - In 3D mode, points are rendered at their provided elevation but points with low elevation will automatically be rendered above the ground to avoid being hidden. You can set `disableElevationCorrection` to true to disable this behavior. The elevation value of each point will then be used directly.

##### Sphere shape options

- `diameter` - _optional_ - defines the diameter of the sphere to render in meters. It can be defined as a number for all elements or per element with a function that takes each element as argument and returns the diameter for that element. The diameter can be a number to render a perfectly round sphere, or an object providing the "diameter" per axis to render ellipsoids. _Default value: 1m._

##### Cube shape options

- `size` - _optional_ - defines the default size of each side of the cube in meters. _Default value: 1m._
- `width` - _optional_ - defines the width of the cube in meters. _Default value: same as size._
- `height` - _optional_ - defines the height of the cube in meters. _Default value: same as size._
- `depth` - _optional_ - defines the depth of the cube in meters. _Default value: same as size._
- `scale` - _optional_ - defines the per-data-element multiplication factor to the size of the cubes. It is a function that takes each element as argument and returns the scale factor for that element. The scale factor can be a number for uniform scaling in all directions, or an object providing one factor per axis.

The [internet of things](/examples/iot) example provides code implementation of point data layers. The [add data elements](/examples/add-data-elements) example gives a full overview of draggable layers.

### Icon layer

An icon layer has each data element rendered as an icon (it's a sprite for readers familiar with 3D rendering).

```ts
space.addDataLayer({
  id: string,
  type: 'icon',
  data: [{
    id: string | number,
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
  disableElevationCorrection?: boolean,
}) => DataLayerController
```

- `id` is a unique identifier for this layer which is used for updates.
- `data` is an array of objects (refered to as data elements) to be rendered. Each element **must** have an `id` (unique identifier within the data array) and a `position`. Elements can also contain any additional custom data used for rendering options.
- `icon` provides information about the icon file to use. Icons must be self-hosted, `width` and `height` indicate the dimensions of the icon available at `url`. Only PNG and JPEG files are supported.
- `width` - _optional_ - defines the width of the icon to render in meters. It can be defined as a number for all elements or per element with a function that takes each element as argument and returns the width for that element. _Default value: 1m._
- `onDrag, onDrop` - _optional_ - providing either or both handlers will make data elements of the layer draggable. Each handler takes the dragged data element as argument. `onDrop` also receives the new position of the element so it can be updated in your app state and database.
- `disableElevationCorrection` - _optional_
  - In 2D mode, the rendered elevation of icons is fully managed and the provided value ignored. Icons will be rendered on top of the floor plans.
  - In 3D mode, icons are rendered at their provided elevation but icons with low elevation will automatically be rendered above the ground to avoid being hidden. You can set `disableElevationCorrection` to true to disable this behavior. The elevation value of each icon will then be used directly.

The [Add data elements](/examples/add-data-elements) example gives a full overview of draggable layers, including an icon layer.

### Polygon layer

A polygon layer has each data element rendered as an extruded polygon. It is useful to highlight rooms or specific zones in the floor plan.

```ts
space.addDataLayer({
  id: string,
  type: 'polygon',
  data: [{
    id: string | number,
    coordinates: [{
      levelIndex: number,
      x: number,
      z: number
    }] | [[{
      levelIndex: number,
      x: number,
      z: number
    }]],
    ...customData: object
  }],
  baseHeight?: number | (dataElement: object) => number,
  height?: number | (dataElement: object) => number,
  color?: string | (dataElement: object) => string,
  alpha?: number,
  onDrag?: ({ data: object }) => void,
  onDrop?: ({ data: object, coordinates: object[] }) => void,
  disableElevationCorrection?: boolean,
  disableReshape?: boolean,
  reshapeBoxColor?: string
}) => DataLayerController
```

- `id` is a unique identifier for this layer which is used for updates.
- `data` is an array of objects (refered to as data elements) to be rendered. Each element **must** have an `id` (unique identifier within the data array) and a `coordinates` array. Elements can also contain any additional custom data used for rendering options.
  - `coordinates` in its simple form is an array of points in the 2D horizontal space, it can also be an array of "rings" where the first ring is the external perimeter of the polygon, and the others are "holes" cut into the external perimeter.
- `baseHeight` - _optional_ - defines the elevation from the ground at the base of the polygon in meters. It can be defined as a number for all elements or per element with a function that takes each element as argument and returns the base height for that element. _Default value: 0m._
- `height` - _optional_ - defines the height of the polygon in meters from its base to its top. It can be defined as a number for all elements or per element with a function that takes each element as argument and returns the height for that element. _Default value: 3m._
- `color` - _optional_ - defines the color of the sphere to render. It can be defined as any valid CSS color string like "orange" or "#3a3c3c", and applied for all elements or per element with a function that takes each element as argument and returns the color string for that element. _Default value: "#2393d4"_
- `alpha` - _optional_ - defines the transparency of the spheres for the whole layer. Element specific alpha value is not supported. The value should be between 0 (invisible) and 1 (opaque). _Default value: 1_
- `onDrag, onDrop` - _optional_ - providing either or both handlers will make data elements of the layer draggable & reshapable. Each handler takes the dragged data element as argument. `onDrop` also receives the new coordinates of the element so they can be updated in your app state and database.
- `disableElevationCorrection` - _optional_
  - In 2D mode, the rendered height of polygons is fully managed and the provided value ignored. Polygons will be rendered on top of the grounds and below the walls.
  - In 3D mode, polygons are rendered at with provided height but polygons with low height will automatically be rendered above between the grounds and the walls, to avoid being hidden. You can set `disableElevationCorrection` to true to disable this behavior. The height value of each polygon will then be used directly.
- `disableReshape` - _optional_ - set this to false when using onDrag or onDrop if you want the polygons to be draggable but not modifiable in shape. _Default value: true_
- `reshapeBoxColor` - _optional_ - hexadecimal string defining the color of the boxes used to reshape the polygons. Used in conjunction with onDrag or onDrop. _Default value: "#086bb7"_

The [leasing & tenancy](/examples/leasing-tenancy) example provides a simple implementation of a polygon data layer. The [Add data elements](/examples/add-data-elements) example gives a full overview of draggable & reshapable layers.

### Polyline layer

A polyline layer has each data element rendered as a line with one or more segments. The line is similar to a "pipe" which has a circle section by default but can take any section shape. The scale (you can think of it as the "diameter") of the pipe can be constant, or computed by section to generate patterns.

```ts
space.addDataLayer({
  id: string,
  type: 'polyline',
  data: [{
    id: string | number,
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
  disableElevationCorrection?: boolean,
  disableReshape?: boolean,
  reshapeBoxColor?: string
}) => DataLayerController
```

- `id` is a unique identifier for this layer which is used for updates.
- `data` is an array of objects (refered to as data elements) to be rendered. Each element **must** have an `id` (unique identifier within the data array) and a `coordinates` array. Elements can also contain any additional custom data used for rendering options.
- `shape` - _optional_ - defines the section that is extruded to render the line. A few options are provided, each of them a regular polygon centered on the line path and with its points on a circle of diameter 1m. You can also provide a custom shape with an array of coordinates in meter taking the line path as origin, the first coordinate on the horizontal axis and the second on the vertical axis (e.g. `[[0, -0.2], [0, 0.2], [0.2, 0], [0, -0.2]]` for a triangle pointing right). Custom shapes are not automatically closed, you should repeat the first coordinate at the end of the array to close the shape. _Default value: circle_
- `cap` - _optional_ - set value to false if you want the line shape to be hollow. _Default value: true_
- `scale` - _optional_ - defines the scaling factor applied to the shape during the extrusion. This can be a constant (e.g. circle pipe of diamter 0.5m), or a function of the data element, the step index along the line path, and the distance from the start of the line. A function is useful to create patterns along the line. The scale function is computed at each point defining the line path, you can add "steps" to each segment to compute the scale at regular interval with `stepSize` (see below). _Default value: 1_
- `stepSize` - _optional_ - you should only use this parameter alongside a scale function. It adds additional steps at regular interval on each segment of the line. The step size will not necessarily be exact as the algorithm will prioritize to get full steps over keeping to the step size.
- `color` - _optional_ - defines the color of the sphere to render. It can be defined as any valid CSS color string like "orange" or "#3a3c3c", and applied for all elements or per element with a function that takes each element as argument and returns the color string for that element. _Default value: "#2393d4"_
- `alpha` - _optional_ - defines the transparency of the spheres for the whole layer. Element specific alpha value is not supported. The value should be between 0 (invisible) and 1 (opaque). _Default value: 1_
- `onDrag, onDrop` - _optional_ - providing either or both handlers will make data elements of the layer draggable & reshapable. Each handler takes the dragged data element as argument. `onDrop` also receives the new coordinates of the element so it can be updated in your app state and database.
- `disableElevationCorrection` - _optional_
  - In 2D mode, the rendered elevation of polylines is fully managed and the provided value ignored. Polylines will be rendered on top of the floor plans.
  - In 3D mode, polylines are rendered at their provided elevation but polyline coordinates with low elevation will automatically be rendered above the ground to avoid being hidden. You can set `disableElevationCorrection` to true to disable this behavior. The elevation value of each coordinate will then be used directly.
- `disableReshape` - _optional_ - set this to false when using onDrag or onDrop if you want the polygons to be draggable but not modifiable in shape. _Default value: true_
- `reshapeBoxColor` - _optional_ - hexadecimal string defining the color of the boxes used to reshape the polygons. Used in conjunction with onDrag or onDrop. _Default value: "#086bb7"_

The [Add data elements](/examples/add-data-elements) example gives a full overview of draggable & reshapable layers, including a polyline layer.

### Dotted polyline layer

A dotted polyline layer is similar to a polyline layer but has each data element rendered as a line of spheres. Also lines can be animated with a few styles.

```ts
space.addDataLayer({
  id: string,
  type: 'dotted-polyline',
  data: [{
    id: string | number,
    coordinates: [{
      levelIndex: number,
      x: number,
      z: number,
      elevation: number
    }],
    ...customData: object
  }],
  diameter?: number | (dataElement: object) => number,
  gap?: number,
  anchor?: 'bottom' | 'center' | 'top',
  color?: string | (dataElement: object) => string,
  alpha?: number,
  disableElevationCorrection?: boolean,
  animation?: false | 'waves' | 'railway',
  // waves animation options
  speed?: number,
  amplitude?: number,
  waves?: number,
  // railway animation options
  speed?: number,
}) => DataLayerController
```

- `id` is a unique identifier for this layer which is used for updates.
- `data` is an array of objects (refered to as data elements) to be rendered. Each element **must** have an `id` (unique identifier within the data array) and a `coordinates` array. Elements can also contain any additional custom data used for rendering options.
- `diameter` - _optional_ - defines the diameter of the sphere to render in meters. It can be defined as a number for all elements or per element with a function that takes each element as argument and returns the diameter for that element. _Default value: 1m._
- `gap` - _optional_ - defines the distance between each sphere in the line as a fraction of the diameter. E.g. 0.3 means the gap is 30% of the diameter. _Default value: 0.3._
- `anchor` - _optional_ - defines if the position provided for each data element corresponds to the bottom, center or top of the sphere. _Default value: center._
- `color` - _optional_ - defines the color of the sphere to render. It can be defined as any valid CSS color string like "orange" or "#3a3c3c", and applied for all elements or per element with a function that takes each element as argument and returns the color string for that element. _Default value: "#2393d4"._
- `alpha` - _optional_ - defines the transparency of the spheres for the whole layer. Element specific alpha value is not supported. The value should be between 0 (invisible) and 1 (opaque). _Default value: 1._
- `disableElevationCorrection` - _optional_
  - In 2D mode, the rendered elevation of dotted polylines is fully managed and the provided value ignored. Dots will be rendered on top of the floor plans.
  - In 3D mode, dots are rendered at their provided elevation but dots with low elevation will automatically be rendered above the ground to avoid being hidden. You can set `disableElevationCorrection` to true to disable this behavior. The elevation value of each coordinate will then be used directly.
- `animation` - _optional_ - use `false` to disable animation, `'railway'` to move spheres in a queue like wagons, or `'waves'` to scale spheres like a wave. _Default value: false._

##### Waves animation options

- `speed` - _optional_ - defines the speed of the animation. Speed 1 means it takes 1 second for a wave to go up and down for each sphere. _Default value: 1._
- `amplitude` - _optional_ - defines the scaling factor of the waves, so 0.4 means each sphere will grow 40% of its diameter. _Default value: 0.4._
- `waves` - _optional_ - defines the number of waves visible on each line at a single point of time. _Default value: 1._

##### Railway animation options

- `speed` - _optional_ - defines the speed of the animation. Speed 1 means each sphere gets to next one in 1 second. _Default value: 1._

Live code example coming soon.

### Furniture layer

A furniture layer has each data element mapped to one or more pieces of furniture from the floor plan. Furniture are only available in 3D mode at the moment. 2D mode support is on the roadmap.

```ts
space.addDataLayer({
  id: string,
  type: 'furniture',
  data: [{
    id: string | number,
    furnitureId: string | [string],
    ...customData: object
  }],
  color?: string | (dataElement: object) => string
}) => DataLayerController
```

- `id` is a unique identifier for this layer which is used for updates.
- `data` is an array of objects (refered to as data elements) to be rendered. Each element **must** have an `id` (unique identifier within the data array) and a `furnitureId` (value mapping to the unique identifier(s) of one or more furniture in the floor plan). Elements can also contain any additional custom data used for rendering options.
- `color` - _optional_ - defines the displayed color of the furniture. It can be defined as any valid CSS color string like "orange" or "#3a3c3c", and applied for all elements or per element with a function that takes each element as argument and returns the color string for that element. _Default value: "#2393d4"_

The [space booking](/examples/space-booking) example provides a simple implementation of a furniture data layer.

### Heat map layer

A heat map layer renders a grid of colored "elements" representing the interpolated value of a given metric across the space, based on a few data points for that metric located in the space. The rendered size of each grid "element" communicates the confidence in the interpolated value. It is typically used to display environmental data that has some level of spatial continuity like temperature, air quality, or to a certain extent crowd density.

**Please take note:** Heat map layers are non-interactive layers. [Generic options](#generic-options) do not apply.

```ts
space.addDataLayer({
  id: string,
  type: 'heatmap',
  style: 'spheres' | 'grid' | 'bar-chart',
  data: [{
    id: string | number,
    position: {
      levelIndex: number,
      x: number,
      z: number,
    },
    ...customData: object
  }],
  value: (dataElement: object) => number,
  color: (interpolatedValue: number) => string,
  gridSize?: number,
  gridFill?: number,
  alpha?: number,
  mask?: [{
    levelIndex: number,
    x: number,
    z: number,
  }] | Record<number, [{
    levelIndex: number,
    x: number,
    z: number,
  }]>,
  confidenceRadius?: number,
  disableElevationCorrection?: boolean,
  // spheres style options
  elevation?: number,
  squishFactor?: number,
  // grid style options
  elevation?: number,
  thickness?: number,
  // bar-chart style options
  height: (interpolatedValue: number) => number
}) => DataLayerController
```

- `id` is a unique identifier for this layer which is used for updates.
- `style` lets you choose between multiple rendering styles for the heat map. Each style comes with its own options defined below.
- `data` is an array of objects (refered to as data points) used as base for the value interpolation. Each data point **must** have an `id` (unique identifier within the data array) and a `position` provided in the 2D plane. Data points must contain the value to be used for interpolation, or the data required to compute that value. They can also contain any additional custom data.
- `value` is a function that takes each data point as argument and returns the value for that data point to be used in the interpolation of the heat map values.
- `color` defines the displayed color of the heat map. It is a function that takes an interpolated value as argument and returns the hexadecimal color string used to render the grid "element" with that value.
- `gridSize` - _optional_ - defines the size in meters of each "cell" of the heat map grid. _Default value: 1m._
- `gridFill` - _optional_ - defines the size of each grid "element" relatively to its "cell". A value of 1 means the element fills up the cell, 0.9 would add a 10% padding, while 1.1 would add a 10% overflow. _Default value: 1._
- `alpha` - _optional_ - defines the transparency of the rendered grid "elements". The value should be between 0 (invisible) and 1 (opaque). _Default value: 1._
- `mask` - _optional_ - a 2D polygon coordinates array that lets you define the area where the heat map should be interpolated and rendered. By default, the space's footprint on the active level will be used as mask. You can also pass an object with a mask for each level, with the key being the levelIndex, and for levels with no mask, it will use the level's footprint.
- `confidenceRadius` - _optional_ - defines the distance in meters from the provided data points where interpolation makes sense. Grid "elements" are rendered at their nominal size (see `gridSize` and `gridFill`) when they are in close proximity to a datapoint. As they get further, their rendered size decreases (linearly to the distance to the nearest data point) as a way to communicate the confidence in the interpolated value. When a grid "element"'s distance to the nearest datapoint reaches the confidenceRadius value, it's rendered size reaches 0. By default, the confidenceRadius value is equal to the median of the distance between each data point and its 2 nearest datapoints.
- `disableElevationCorrection` - _optional_
  - In 2D mode, the rendered elevation of heat maps is fully managed and the provided value ignored. Heat maps will be rendered on top of the floor plans.
  - In 3D mode, heat maps are rendered at their provided elevation but low elevation values will automatically be rendered above the ground to avoid being hidden. You can set `disableElevationCorrection` to true to disable this behavior. The elevation value will then be used directly.

##### Spheres style options

- `elevation` - _optional_ - is the height in meters from the active level's ground where the grid "elements" should be rendered. _Default value: 3m._
- `squishFactor` - _optional_ - lets you deform the spheres in the vertical axis. A value of 0 gives you a perfectly rounded sphere, 0.3 an M&M's type pill, 0.99 a flat sphere, and -2 an elongated ellipsoid. _Default value: 0._

##### Grid style options

- `elevation` - _optional_ - is the height in meters from the active level's ground where the grid "elements" should be rendered. _Default value: 3m._
- `thickness` - _optional_ - defines the height in meters of each cube making up the grid. _Default value: 0.03m._

You can for example set elevation to 0 and thickness to 3 to get a solid grid from the ground to the ceiling (assuming a 3m wall height).

##### Bar chart style options (3D only)

- `height` defines the height of each bar from the ground to the top. It is a function that takes an interpolated value as argument and returns the height in meters of the bar representing an element with that value.

The [air quality](/examples/air-quality) example uses a heat map layer and can be used as a code playground to test out the options. The [timeheat demo](https://timeheat.smplrspace.io/) showcases the capabilies of the heat map layer and provides a UI-based playground to test out options.

## Data layer controller

A controller for a given data layer is returned when you call `addDataLayer` as [documented here](./overview#add-a-layer).

### Update a layer (controller)

To update a layer with new data or options, you can use the controller of the layer as follow.

```ts
layerController.update({
  data: object[],
  ...rest: object
}) => void
```

- `data` & `...rest` definitions are matching the ones provided for `addDataLayer` as [documented here](./overview#add-a-layer).

### Remove a layer (controller)

To remove a layer completely, you can use the controller as follow.

```ts
layerController.remove() => void
```

### Get a data element position on screen

The data layer controller also lets you get the screen position of a data element. This can be useful to implement custom tooltips that you have full programmatic control over.

```ts
layerController.getElementPositionOnScreen(elementId: string | number) => ({
  screenX: number
  screenY: number
}) | null
```

- `elementId` corresponds to the `id` field used in the `data` array of your layer

If an element is found with the `id` equals to `elementId`, the function returns its coordinates when projected on screen. When no element is found, the function returns `null`.

_Take good note:_ `screenX` and `screenY` are not bounded by the viewer itself, so you could have negative values, or values greater that the size of the viewer if the element is present in the 3D scene, but located outside of the current view.
