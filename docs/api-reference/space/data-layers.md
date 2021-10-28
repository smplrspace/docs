---
sidebar_position: 2
---

# Data layers

The introduction to data layers and how to add, update and remove them is in the [overview](/api-reference/space/overview.md#data-layers) page. Below, we describe the different layer types and their respective options.

## Generic options

Some options correspond to generic behaviours that are shared by all data layer types, making it easy to swap between similar layer types (e.g. "point" and "icon").

```ts
space.addDataLayer({
  // ...layerDefinition,
  tooltip?: (dataElement: object) => string,
  onClick?: (dataElement: object) => void,
  onHover?: (dataElement: object) => void,
  onHoverOut?: (dataElement: object) => void
})
```

- `...layerDefinition` - refer to the [overview](/api-reference/space/overview.md#data-layers) page.
- `tooltip` - _optional_ - is taking the newly hovered data element as argument and should return the content of the tooltip to render. It is called once when the pointer starts to hover a data element.
- `onClick` - _optional_ - is taking the data element that was clicked as argument. It is called each time a click or tap event happens.
- `onHover` - _optional_ - is taking the newly hovered data element as argument. It is called once when the pointer starts to hover a data element.
- `onHoverOut` - _optional_ - is taking the previously hovered data element as argument. It is called once when the pointer stops hovering a data element.

You may use the `onClick`, `onHover` and `onHoverOut` handlers to build custom behaviours in your app that respond to interactions happening in the floor plan.

## Point layer

A point layer has each data element rendered as a sphere.

```ts
space.addDataLayer({
  // ...genericOptions,
  diameter?: number | (dataElement: object) => number,
  color?: string | (dataElement: object) => string
})
```

- `...genericOptions` - refer to the [previous section](#generic-options).
- `diameter` - _optional_ - defines the diameter of the sphere to render in meters. It can be defined as a number for all elements or per element with a function that takes each element as argument and returns the diameter for that element. _Default value: 1m._
- `color` - _optional_ - defines the color of the sphere to render. It can be defined as a hexadecimal string like "#3a3c3c" for all elements or per element with a function that takes each element as argument and returns the hexadecimal color string for that element. _Default value: "#2393d4"_

The [temperature sensors](/examples/temperature-sensors) example provides a simple implementation of a point data layer.

## Icon layer

An icon layer has each data element rendered as an icon (it's a sprite for readers familiar with 3D rendering).

```ts
space.addDataLayer({
  // ...genericOptions,
  icon: {
    url: string,
    width: number,
    height: number
  },
  width?: number | (dataElement: object) => number
})
```

- `...genericOptions` - refer to the [previous section](#generic-options).
- `icon` provides information about the icon file to use. Icons must be self-hosted, `width` and `height` indicate the dimensions of the icon available at `url`. Only PNG and JPEG files are supported.
- `width` - _optional_ - defines the width of the icon to render in meters. It can be defined as a number for all elements or per element with a function that takes each element as argument and returns the width for that element. _Default value: 1m._
