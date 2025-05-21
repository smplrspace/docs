---
sidebar_position: 3
---

# Data layers

To add or update data layers, you should use the type-specific methods documented in the next sections, while other methods are shared between the layer types and documented [further down](#shared-methods).

## Space data layers

Space data layers are layers rendering data with coordinates coming from a Smplrspace space. They're mostly compatible with the [space viewer data layers](/api-reference/space/data-layers).

### Point layer

Coming soon — some methods are already present in the API but should not be used.

### Polygon layer

A polygon layer has each data element rendered as an extruded polygon. It is useful to highlight rooms or specific zones in the buildings.

```ts
interface PolygonMapDataLayerDefinition {
  id: string
  data: [{
    id: string
    coordinates: [{
      levelIndex: number
      x: number
      z: number
    }] | [[{
      levelIndex: number
      x: number
      z: number
    }]]
    ...customData: object
  }]
  baseHeight?: number | (dataElement: object) => number
  height?: number | (dataElement: object) => number
  color?: string | (dataElement: object) => string
  // + fields from SharedDefinitionOptions defined further down
}

map.addPolygonDataLayer(definition: PolygonMapDataLayerDefinition) => void
map.updatePolygonDataLayer(definitionUpdates: Partial<PolygonMapDataLayerDefinition>) => void
```

- `id` is a unique identifier for this layer which is used for updates.
- `data` is an array of objects (refered to as data elements) to be rendered. Each element **must** have an `id` (unique identifier within the data array) and a `coordinates` array.
  - `coordinates` in its simple form is an array of points in the 2D horizontal space, it can also be an array of "rings" where the first ring is the external perimeter of the polygon, and the others are "holes" cut into the external perimeter.
  - `customData` - _optional_ - elements can also contain any additional custom data used for rendering options.
- `baseHeight` - _optional_ - defines the elevation from the ground at the base of the polygon in meters. It can be defined as a number for all elements or per element with a function that takes each element as argument and returns the base height for that element. _Default value: 0m._
- `height` - _optional_ - defines the height of the polygon in meters from its base to its top. It can be defined as a number for all elements or per element with a function that takes each element as argument and returns the height for that element. _Default value: 3m._
- `color` - _optional_ - defines the color of the element to render. It can be defined as any valid CSS color string like "orange" or "#3a3c3c", and applied for all elements or per element with a function that takes each element as argument and returns the color string for that element. _Default value: "#2393d4"_
- `SharedDefinitionOptions` are defined [here](#shared-definition-options).

### Space shell layer

A space shell layer renders a space from your account as a colored interactive shell on the map. It's the quickest way to rely on your digitized spaces to create multi-building data visualizations where each building is one data element.

```ts
interface SpaceShellMapDataLayerDefinition {
  id: string
  // data of type SpaceShellData[]
  data: [{
    id: string
    spaceId: string
    ...customData: object
  }]
  color?: string | ((dataElement: object) => string)
  // + fields from SharedDefinitionOptions defined further down
}

map.addSpaceShellDataLayer(definition: SpaceShellMapDataLayerDefinition) => void
map.updateSpaceShellDataLayer(definitionUpdates: Partial<SpaceShellMapDataLayerDefinition>) => void
```

- `id` is a unique identifier for this layer which is used for updates.
- `data` is an array of objects (refered to as data elements) to be rendered. Each element **must** have an `id` (unique identifier within the data array) and a `spaceId`.
  - `spaceId` is the unique identifier of the space in Smplrspace, something like "spc_xxx".
  - `customData` - _optional_ - elements can also contain any additional custom data used for rendering options.
- `color` - _optional_ - defines the color of the element to render. It can be defined as any valid CSS color string like "orange" or "#3a3c3c", and applied for all elements or per element with a function that takes each element as argument and returns the color string for that element. _Default value: "#2393d4"_
- `SharedDefinitionOptions` are defined [here](#shared-definition-options).

## Geospatial data layers

Geospatial data layers are layers rendering data with GPS-based coordinates. The data could be created using our entity manager, or any other map provider or geospatial tool.

### GeoPoint layer

A geopoint layer has each data element rendered as a point or marker on the map. It is useful to highlight various points of interest.

```ts
interface GeoPointMapDataLayerDefinition {
  id: string
  data: [{
    id: string
    position: {
      lng: number
      lat: number
    }
    ...customData: object
  }]
  color?: string | ((dataElement: object) => string)
  alpha?: number | ((dataElement: object) => number)
  // + fields from SharedDefinitionOptions defined further down
}

map.addGeoPointDataLayer(definition: PointMapDataLayerDefinition) => void
map.updateGeoPointDataLayer(definitionUpdates: Partial<PointMapDataLayerDefinition>) => void
```

- `id` is a unique identifier for this layer which is used for updates.
- `data` is an array of objects (refered to as data elements) to be rendered. Each element **must** have an `id` (unique identifier within the data array) and a `position`. Elements can also contain any additional custom data used for rendering options.
- `color` - _optional_ - defines the color of the element to render. It can be defined as any valid CSS color string like "orange" or "#3a3c3c", and applied for all elements or per element with a function that takes each element as argument and returns the color string for that element. _Default value: "#2393d4"_
- `alpha` - _optional_ - defines the transparency of the element to render. The value should be between 0 (invisible) and 1 (opaque). It can be defined as a fix value for all elements or per element with a function that takes each element as argument and returns the alpha value for that element. _Default value: 1_
- `SharedDefinitionOptions` are defined [here](#shared-definition-options).

### GeoPolygon layer

A geopolygon layer has each data element rendered as a polygon on the map. It is useful to highlight project boundaries, micromarkets, areas under development, etc.

```ts
interface GeoPolygonMapDataLayerDefinition {
  id: string
  // data of type GeoPolygonData[]
  data: [{
    id: string
    coordinates: [[{
      lng: number
      lat: number
    }]]
    ...customData: object
  }]
  color?: string | ((dataElement: object) => string)
  alpha?: number | ((dataElement: object) => number)
  // + fields from SharedDefinitionOptions defined further down
}

map.addGeoPolygonDataLayer(definition: PolygonMapDataLayerDefinition) => void
map.updateGeoPolygonDataLayer(definitionUpdates: Partial<PolygonMapDataLayerDefinition>) => void
```

- `id` is a unique identifier for this layer which is used for updates.
- `data` is an array of objects (refered to as data elements) to be rendered. Each element **must** have an `id` (unique identifier within the data array) and a `coordinates` array.
  - `coordinates` is an array of "rings" where the first ring is the external perimeter of the polygon, and the others (optional) rings are "holes" cut into the external perimeter. Ring are made of GPS points.
  - `customData` - _optional_ - elements can also contain any additional custom data used for rendering options.
- `color` - _optional_ - defines the color of the element to render. It can be defined as any valid CSS color string like "orange" or "#3a3c3c", and applied for all elements or per element with a function that takes each element as argument and returns the color string for that element. _Default value: "#2393d4"_
- `alpha` - _optional_ - defines the transparency of the element to render. The value should be between 0 (invisible) and 1 (opaque). It can be defined as a fix value for all elements or per element with a function that takes each element as argument and returns the alpha value for that element. _Default value: 1_
- `SharedDefinitionOptions` are defined [here](#shared-definition-options).

### OpenStreetMap building layer

An OpenStreetMap (OSM) building layer renders data elements as 3D buildings on the map, relying on footprint and height information made available in open access by the [OpenStreetMap Foundation](https://osmfoundation.org/). [OpenStreetMap](https://www.openstreetmap.org/about) is a free, open map database updated and maintained by a community of volunteers via open collaboration.

```ts
interface OsmBuildingMapDataLayerDefinition {
  id: string
  // data of type OsmBuildingData[]
  data: [{
    id: string
    osmIds: number[]
    ...customData: object
  }]
  color?: string | ((dataElement: object) => string)
  // + fields from SharedDefinitionOptions defined further down
}

map.addOsmBuildingDataLayer(definition: OsmBuildingMapDataLayerDefinition) => void
map.updateOsmBuildingDataLayer(definitionUpdates: Partial<OsmBuildingMapDataLayerDefinition>) => void
```

- `id` is a unique identifier for this layer which is used for updates.
- `data` is an array of objects (refered to as data elements) to be rendered. Each element **must** have an `id` (unique identifier within the data array) and a `osmIds` array.
  - `osmIds` is an array of numbers, each number corresponds to a feature `id` in the OSM buildings layer (source: "composite" and source-layer: "building" in Mapbox).
  - `customData` - _optional_ - elements can also contain any additional custom data used for rendering options.
- `color` - _optional_ - defines the color of the element to render. It can be defined as any valid CSS color string like "orange" or "#3a3c3c", and applied for all elements or per element with a function that takes each element as argument and returns the color string for that element. _Default value: "#2393d4"_
- `SharedDefinitionOptions` are defined [here](#shared-definition-options).

Note: this layer requires the [OSM buildings](/api-reference/map/buildings#city-building-data#control-3d-cities) to be shown in the first place.

## Shared definition options

Some options correspond to generic behaviours that are shared by all data layers, making it easy to swap between similar layer types (e.g. "point" and "polygon").

```ts
// not an actual interface, this is simplified for documentation
interface SharedDefinitionOptions {
  tooltip?: (dataElement: object) => string | HTMLString
  tooltipTemplate?: string
  tooltipContainerStyle?: string
  persistentTooltip?: boolean
  legend?: LegendConfig // see below
  onClick?: (dataElement: object, event: MapMouseEvent) => void
  onHover?: (dataElement: object, event: MapMouseEvent) => void
  onHoverOut?: (dataElement: object, event: MapMouseEvent) => void
}

type LegendConfig =
  | {
    type: 'numeric'
    colorScale: (n: number | null | undefined) => string
    domain?: [number, number]
    ticks?: Record<number, number | string>
  }
  | {
    type: 'swatches'
    swatches: {
      color: string
      label: string
      group?: string
    }[]
  }
  | {
    type: 'icons'
    icons: {
      url: string
      label: string
      group?: string
    }[]
  }
```

- `tooltip` - _optional_ - is taking the newly hovered data element as argument and should return the content of the tooltip to render. It is called once when the pointer starts to hover a data element. Built-in tooltips support string and "HTML as string" values.
  - For string values, newlines are supported by using [multi-line template literals](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals#multi-line_strings).
  - For HTML values, both HTML and CSS are supported, the value will be sanitized to prevent XSS attacks.
  - If you need complete control over the tooltip content (e.g. for a React component), check the [tooltips example](/examples/tooltips/).
- `tooltipTemplate` - _optional_ - is a fully featured template string used to generate the tooltip content based on the data for the hovered element. It is powered by Handlebars with some custom helpers. Read more [in this section](/api-reference/space/data-layers#handlebars-helpers).
- `tooltipContainerStyle` - _optional_ - lets you override the style of the tooltip container with inline CSS.
- `persistentTooltip` - _optional_ - set this to `true` to turn tooltips into small cards that are all visible at once instead of on hover. Persistent tooltips are automatically positioned on the center of the data element they're attached to (limitation: elevation of the element is not accounted for at the moment). _Default value: false_
- `legend` - _optional_ - lets you configure a legend to be rendered automatically in a collapsible overlay on the viewer. The legend can be positioned using `legendPosition` in [viewer options](/api-reference/space/custom-ux#viewer-options).
  - For `numeric` legends, refer to options in [the legend section](/api-reference/color/legend#numerical-scale-legends).
  - For `swatches` legends, refer to options in [the legend section](/api-reference/color/legend#categorical-scale-legends).
  - For `icons` legends, refer to options in [the legend section](/api-reference/color/legend#icons-legends).
- `onClick` - _optional_ - is taking the data element that was clicked as argument, as well as the [Mapbox mouse event](https://docs.mapbox.com/mapbox-gl-js/api/events/#mapmouseevent) that triggered the click. It is called each time a click or tap event happens.
- `onHover` - _optional_ - is taking the newly hovered data element as argument, as well as the [Mapbox mouse event](https://docs.mapbox.com/mapbox-gl-js/api/events/#mapmouseevent) that triggered the click. The handler is called once when the pointer starts to hover a data element.
- `onHoverOut` - _optional_ - is taking the previously hovered data element as argument, as well as the [Mapbox mouse event](https://docs.mapbox.com/mapbox-gl-js/api/events/#mapmouseevent) that triggered the click. The handler is called once when the pointer stops hovering a data element.

You may use the `onClick`, `onHover` and `onHoverOut` handlers to build custom behaviours in your app that respond to interactions happening in the floor plan.


## Shared methods

### Get a data element position on screen

This method lets you get the screen position of a data element. This can be useful to implement custom tooltips that you have full programmatic control over.

```ts
map.getDataElementPositionOnScreen(layerId: string, elementId: string) => ({
  screenX: number
  screenY: number
}) | null
```

- `layerId` is the `id` field in your layer's definition
- `elementId` corresponds to the `id` field used in the `data` array of your layer

If an element is found matching `layerId` and `elementId`, the function returns its coordinates when projected on screen. When no element is found, the function returns `null`.

**Take good note:**
1. The elevation of the element is not accounted for at the moment, due to limitations in the Mapbox APIs.
1. `screenX` and `screenY` are not bounded by the viewer itself, so you could have negative values, or values greater that the size of the viewer if the element is present in the 3D scene, but located outside of the current view.

### Remove a layer

Removing a data layer completely is done as follow.

```ts
map.removeDataLayer(id: string) => void
```

- `id` is the identifier of the layer to remove.

### Remove all layers

Removing all data layers at once is done as follow.

```ts
map.removeAllDataLayers() => void
```
