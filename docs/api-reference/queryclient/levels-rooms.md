---
sidebar_position: 4
---

# Levels & rooms

## getLevelBoundingBox

To get the bounding box of the entire floor plate of a space, you can call the following query. The bounding box is defined as a polygon which is always straight with respect to the (x, z) axes.

```ts
smplrClient.getLevelBoundingBox({
  spaceId: string,
  levelIndex: number,
  padding?: number
}): Promise<{
  levelIndex: number,
  x: number,
  z: number
}[]>
```

- `spaceId` - unique identifier of the space in Smplrspace, something like "fbc5617e-5a27-4138-851e-839446121b2e".
- `levelIndex` - zero-based index of the level. Refer to the [Furniture interface](/api-reference/queryclient/furniture#furniture-interface) to learn more.
- `padding` - _optional_ - minimum space between the floor plate's grounds/walls and the bounding box in meters. _Default value: 0_

## getLevelBoundingBoxFromCache

This is the synchronous equivalent of the query right above.

```ts
smplrClient.getLevelBoundingBoxFromCache({
  spaceId: string,
  levelIndex: number,
  padding?: number
}): {
  levelIndex: number,
  x: number,
  z: number
}[]
```

where `spaceId`, `levelIndex`, and `padding` are as defined in `getLevelBoundingBox`.

## getLevelAutomaticGround

To get the automatic ground of the entire floor plate of a space, you can call the following query. The automatic ground is the [continuous concave hull](#getlinesconcavehull) of all the walls of the level put together. It may be enabled or disabled in the editor, but the value here will return a valid hull if the level exists and has walls.

```ts
smplrClient.getLevelAutomaticGround({
  spaceId: string,
  levelIndex: number,
}): Promise<{
  levelIndex: number,
  x: number,
  z: number
}[] | null>
```

- `spaceId` - unique identifier of the space in Smplrspace, something like "fbc5617e-5a27-4138-851e-839446121b2e".
- `levelIndex` - zero-based index of the level. Refer to the [Furniture interface](/api-reference/queryclient/furniture#furniture-interface) to learn more.

## getLevelAutomaticGroundFromCache

This is the synchronous equivalent of the query right above.

```ts
smplrClient.getLevelAutomaticGroundFromCache({
  spaceId: string,
  levelIndex: number,
}): {
  levelIndex: number,
  x: number,
  z: number
}[] | null
```

where `spaceId`, and `levelIndex` are as defined in `getLevelAutomaticGround`.

## getRoomsOnLevel

Rooms are automatically extracted closed polygons formed by the walls of a floor plan. To get the automatic rooms of the entire floor plate of a space, you can call the following query.

```ts
smplrClient.getRoomsOnLevel({
  spaceId: string,
  levelIndex: number,
  useCache?: boolean
}): Promise<{
  room: {
    levelIndex: number,
    x: number,
    z: number
  }[]
  holes: {
    levelIndex: number,
    x: number,
    z: number
  }[][]
  coordinates: {
    levelIndex: number,
    x: number,
    z: number
  }[][]
}[] | null>
```

- `spaceId` - unique identifier of the space in Smplrspace, something like "fbc5617e-5a27-4138-851e-839446121b2e".
- `levelIndex` - zero-based index of the level. Refer to the [Furniture interface](/api-reference/queryclient/furniture#furniture-interface) to learn more.
- `useCache` - _optional_ - set this to control whether the request should use the client's local cache of computed automatic rooms. You can call this query with `useCache` set to `false` to refresh the cache for all automatic rooms related queries. _Default value: true_

## getRoomsOnLevelFromCache

This is the synchronous equivalent of the query right above.

```ts
smplrClient.getRoomsOnLevelFromCache({
  spaceId: string,
  levelIndex: number,
}): {
  levelIndex: number,
  x: number,
  z: number
}[] | null
```

where `spaceId`, and `levelIndex` are as defined in `getRoomsOnLevel`.

## getRoomAtPoint

Building on the automatic rooms described in `getRoomsOnLevel`, you can also request for the room located at a specific location.

```ts
smplrClient.getRoomAtPoint({
  spaceId: string,
  point: {
    levelIndex: number,
    x: number,
    z: number
  },
}): Promise<{
  room: {
    levelIndex: number,
    x: number,
    z: number
  }[]
  holes: {
    levelIndex: number,
    x: number,
    z: number
  }[][]
  coordinates: {
    levelIndex: number,
    x: number,
    z: number
  }[][]
}[] | null>
```

- `spaceId` - unique identifier of the space in Smplrspace, something like "fbc5617e-5a27-4138-851e-839446121b2e".
- `point` - the point coordinates in 2D, with the same schema as `polygon` below.

## getRoomAtPointFromCache

This is the synchronous equivalent of the query right above.

```ts
smplrClient.getRoomAtPointFromCache({
  spaceId: string,
  point: {
    levelIndex: number,
    x: number,
    z: number
  },
}): {
  room: {
    levelIndex: number,
    x: number,
    z: number
  }[]
  holes: {
    levelIndex: number,
    x: number,
    z: number
  }[][]
  coordinates: {
    levelIndex: number,
    x: number,
    z: number
  }[][]
}[] | null
```

where `spaceId`, and `point` are as defined in `getRoomAtPoint`.
