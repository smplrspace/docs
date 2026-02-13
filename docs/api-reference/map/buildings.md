---
sidebar_position: 2
sidebar_label: Buildings
---

# Buildings on the map

One of the main added capability the Smplrspace map viewer provides, as compared to just Mapbox is the ability to render 3D spaces from your Smplrspace data. We also setup the map to leverage Mapbox's 3D building out of the box, and we make it easier to interact with them in a few lines of code. Here are the functions currently available.

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

### Control 3D buildings

Mapbox provides 3D building rendering based on OpenStreetMap (OSM) data, an open dataset that includes the footprint of many buildings globally. The map viewer renders these 3D buildings by default, but you can control their visibility using the following methods:

```ts
map.showMap3dBuildings() => void
map.hideMap3dBuildings() => void
map.toggleMap3dBuildings() => void
```

You can also set the initial visibility when starting the viewer using the `map3dBuildings` option in [`startViewer`](/api-reference/map/map#start-the-viewer).
