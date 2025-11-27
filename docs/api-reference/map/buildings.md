---
sidebar_position: 2
sidebar_label: Buildings
---

# Buildings on the map

One of the main added "layer" the Smplrspace map viewer provides, as compared to just Mapbox is the ability to render 3D spaces from your Smplrspace data, and 3D cities based on OpenStreetMap data in a few lines of code. Here are the functions currently available.

## Spaces from Smplrspace

### List spaces by ID

To list the spaces that are currently rendered in the viewer by their IDs (something like "spc_xxx"), call:

```ts
map.getCurrentSpaceIds() => string[]
```

### Add spaces by ID

To fetch spaces from your Smplrspace account and render them on the map, call the following method. Note that the spaces need to be georeferenced within the platform.

```ts
map.addSpacesById(spaceIds: string[]) => void
```

- `spaceIds` - unique identifiers of the spaces in Smplrspace, something like "spc_xxx".

### Remove spaces by ID

To remove specific spaces from the map, call this function:

```ts
map.removeSpacesById(spaceIds: string[]) => void
```

- `spaceIds` - unique identifiers of the spaces in Smplrspace, something like "spc_xxx".

### Remove all spaces

To remove all spaces from the map, call this function:

```ts
map.removeAllSpaces() => void
```

## City building data

### Control 3D cities

3D cities are rendered using OSM (OpenStreet Map) data, an open dataset that includes the footprint of many buildings globally. To control whether to render the 3D cities based on OpenStreetMap data or not, use the following methods:

```ts
map.showOsmBuildings() => void
map.hideOsmBuildings() => void
map.toggleOsmBuildings() => void
```

You can also use OSM buildings as a [data layer](/api-reference/map/data-layers#openstreetmap-building-layer), to render them in colors and make them an interactive part of your data visualization.
