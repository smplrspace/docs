---
sidebar_position: 6
---

# Furniture

:::info
"Furniture" is gradually being renamed to "Equipment". You'll read equipment is the app and furniture here, until the change is complete. They are one and the same concept.
:::

## Furniture interface

Multiple queries in this page return objects of the type `Furniture` described below:

```ts
interface Furniture {
  catalogId: string
  id: string
  name: string
  levelIndex: number
  position: {
    x: number
    z: number
    elevation: number
  }
  rotation: Partial<{
    pitch: number
    yaw: number
    roll: number
  }>
  dimensions: Partial<{
    length: number
    height: number
    width: number
  }>
  configuration?: object
}
```

- `catalogId` - unique identifier of the furniture model, internal to Smplrspace. For example, all desks will share their `catalogId`.
- `id` - unique identifier of this particular piece of furniture, in that space.
- `name` - name given to the furniture in the editor.
- `levelIndex` - zero-based index of the level where the furniture is located. For example, `levelIndex` equals to `2` means the furniture is on `L3` if there are no basements.
- `position` - location of the center of the furniture in the floor plan. Values are given in meter. The absolute value has no meaning since the coordinate `(0,0,0)` is arbitrary. So these values are only relevant relatively to each other.
- `rotation` - angle of rotation of the furniture in degrees. `yaw` would typically be the only non-null value as it represents the rotation around the vertical axis.
- `dimensions` - size of the furniture in centimeters. `length` and `width` are the dimensions in the 2D horizontal plane, while `height` is the vertical height in the 3D space.
- `configuration` - only exists for parametric furniture models, and contains the values of all model options for that piece of furniture. The schema depends on the model.

## getAllFurnitureInSpace

To list all furniture from a space, you can call the following query.

```ts
smplrClient.getAllFurnitureInSpace(spaceId: string): Promise<Furniture[]>
```

- `spaceId` - unique identifier of the space in Smplrspace, something like "spc_xxx".
- `Furniture` - this main interface is described [here](#furniture-interface).

## getAllFurnitureInSpaceFromCache

This is the synchronous equivalent of the query right above.

```ts
smplrClient.getAllFurnitureInSpaceFromCache(spaceId: string): Furniture[]
```

where `spaceId` and `Furniture` are as defined in `getAllFurnitureInSpace`.

## getFurnitureOnLevel

To list all furniture from a single level in a space, you can call the following query.

```ts
smplrClient.getFurnitureOnLevel({
  spaceId: string
  levelIndex: number
}): Promise<Furniture[]>
```

- `spaceId` - unique identifier of the space in Smplrspace, something like "spc_xxx".
- `levelIndex` - zero-based index of the level. Refer to the [Furniture interface](#furniture-interface) to learn more.
- `Furniture` - this main interface is described [here](#furniture-interface).

## getFurnitureOnLevelFromCache

This is the synchronous equivalent of the query right above.

```ts
smplrClient.getFurnitureOnLevelFromCache({
  spaceId: string
  levelIndex: number
}): Furniture[]
```

where `spaceId`, `levelIndex`, and `Furniture` are as defined in `getFurnitureOnLevel`.

## getFurnitureInPolygon

To list all furniture contained within an area defined by a polygon, you can call the following query.

```ts
smplrClient.getFurnitureInPolygon({
  spaceId: string
  polygon: {
    levelIndex: number
    x: number
    z: number
  }[] | {
    levelIndex: number
    x: number
    z: number
  }[][]
}): Promise<Furniture[]>
```

- `spaceId` - unique identifier of the space in Smplrspace, something like "spc_xxx".
- `polygon` - the definition of the area used as a mask to extract furniture. It has the same schema as the coordinates from the [polygon data layers](/api-reference/space/data-layers#polygon-layer). It is assumed here that all coordinates have the same `levelIndex` value.
- `Furniture` - this main interface is described [here](#furniture-interface).

## getFurnitureInPolygonFromCache

This is the synchronous equivalent of the query right above.

```ts
smplrClient.getFurnitureInPolygonFromCache({
  spaceId: string
  polygon: {
    levelIndex: number
    x: number
    z: number
  }[] | {
    levelIndex: number
    x: number
    z: number
  }[][]
}): Furniture[]
```

where `spaceId`, `polygon`, and `Furniture` are as defined in `getFurnitureInPolygon`.

## getFurnitureById

To extract a single piece of furniture from a space, identified by its unique identifier, you can call the following query.

```ts
smplrClient.getFurnitureById({
  spaceId: string
  furnitureId: string
}): Promise<Furniture | null>
```

- `spaceId` - unique identifier of the space in Smplrspace, something like "spc_xxx".
- `furnitureId` - unique identifier of the furniture in the space, something like "fbc5617e-5a27-4138-851e-839446121b2e".
- `Furniture` - this main interface is described [here](#furniture-interface).

Returns `null` if the furniture is not found in the space.

## getFurnitureByIdFromCache

This is the synchronous equivalent of the query right above.

```ts
smplrClient.getFurnitureByIdFromCache({
  spaceId: string
  furnitureId: string
}): Furniture | null
```

where `spaceId`, `furnitureId`, and `Furniture` are as defined in `getFurnitureById`.

## getFurnitureGroundFootprintById

To get the ground footprint (as a polygon) of a single piece of furniture, identified by its unique identifier, you can call the following query.

```ts
smplrClient.getFurnitureGroundFootprintById({
  spaceId: string
  furnitureId: string
  closed?: boolean
}): Promise<{
  levelIndex: number
  x: number
  z: number
}[] | null>
```

- `spaceId` - unique identifier of the space in Smplrspace, something like "spc_xxx".
- `furnitureId` - unique identifier of the furniture in the space, something like "fbc5617e-5a27-4138-851e-839446121b2e".
- `closed` - _optional_ - indicates whether the returned array should be "closed", i.e. the last element repeats the first element. _Default value: false._

Returns `null` if the furniture is not found in the space.

## getFurnitureGroundFootprintByIdFromCache

This is the synchronous equivalent of the query right above.

```ts
smplrClient.getFurnitureGroundFootprintByIdFromCache({
  spaceId: string
  furnitureId: string
  closed?: boolean
}): {
  levelIndex: number
  x: number
  z: number
}[] | null
```

where `spaceId`, `furnitureId`, and `closed` are as defined in `getFurnitureGroundFootprintById`.

## isFurnitureInPolygon

To know whether a piece of furniture is contained within an area defined by a polygon, you can call the following query.

```ts
smplrClient.isFurnitureInPolygon({
  spaceId: string
  furnitureId: string
  polygon: {
    levelIndex: number
    x: number
    z: number
  }[] | {
    levelIndex: number
    x: number
    z: number
  }[][]
}): Promise<boolean | null>
```

- `spaceId` - unique identifier of the space in Smplrspace, something like "spc_xxx".
- `furnitureId` - unique identifier of the furniture in the space, something like "fbc5617e-5a27-4138-851e-839446121b2e".
- `polygon` - the definition of the area used as a mask to extract furniture. It has the same schema as the coordinates from the [polygon data layers](/api-reference/space/data-layers#polygon-layer). It is assumed here that all coordinates have the same `levelIndex` value.

Returns `null` if the furniture is not found in the space, `false` if it is found but not in the polygon, `true` if it is found in the polygon.

A similar query is available for points, see [isPointInPolygon](/api-reference/queryclient/geometry#ispointinpolygon).

## isFurnitureInPolygonFromCache

This is the synchronous equivalent of the query right above.

```ts
smplrClient.isFurnitureInPolygonFromCache({
  spaceId: string
  furnitureId: string
  polygon: {
    levelIndex: number
    x: number
    z: number
  }[] | {
    levelIndex: number
    x: number
    z: number
  }[][]
}): boolean | null
```

where `spaceId`, `furnitureId`, and `polygon` are as defined in `isFurnitureInPolygon`.

## Need any other data?

[Get in touch](mailto:support@smplrspace.com) with any use-case that would require new queries to be exposed.
