---
sidebar_position: 5
---

# Geometry

## getPolylineLength

To measure the length of a line or polyline, you can call the following query.

```ts
smplrClient.getPolylineLength({
  line: {
    levelIndex: number,
    x: number,
    z: number,
    elevation: number
  }[],
  unit?: 'ft' | 'm' | 'cm' | 'mm'
}): number
```

- `line` - the polyline you want to compute the length for. It has the same schema as the coordinates from the [polyline data layers](/api-reference/space/data-layers#polyline-layer).
- `unit` - _optional_ - your unit of choice. _Default value: m_

## getPolygonArea

To measure the area of a polygon, you can call the following query.

```ts
smplrClient.getPolygonArea({
  polygon: {
    levelIndex: number,
    x: number,
    z: number
  }[],
  unit?: 'sqft' | 'sqm'
}): number
```

- `polygon` - the polygon you want to compute the length for. It has the same schema as the coordinates from the [polygon data layers](/api-reference/space/data-layers#polygon-layer).
- `unit` - _optional_ - your unit of choice. _Default value: sqm_

## getPolygonCenter

To get the center point of a polygon, you can call the following query.

```ts
smplrClient.getPolygonCenter({
  polygon: {
    levelIndex: number,
    x: number,
    z: number
  }[]
}): {
  levelIndex: number,
  x: number,
  z: number
}
```

- `polygon` - the polygon you want to get the center for. It has the same schema as the coordinates from the [polygon data layers](/api-reference/space/data-layers#polygon-layer).

## getPointsBoundingBox

To get the bounding box of a set of points, you can call the following query. The bounding box is defined as a polygon which is always straight with respect to the (x, z) axes.

```ts
smplrClient.getPointsBoundingBox({
  points: {
    levelIndex: number,
    x: number,
    z: number
  }[],
  padding?: number
}): {
  levelIndex: number,
  x: number,
  z: number
}[]
```

- `points` - the array of points you want to compute the bounding box for.
- `padding` - _optional_ - minimum space between the points and the bounding box in meters. _Default value: 0_

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
}): BoundingBox
```

where `spaceId`, `levelIndex`, `padding`, and `BoundingBox` are as defined in `getLevelBoundingBox`.

## getPointsConcaveHull

The concave hull of a set of points is the smallest polygon that contains all the points, similar to a contour. To get the concave hull of a set of points, you can call the following query.

Note that concave hulls are not suitable for sparse points, and you should use a convex hull instead – [get in touch](mailto:support@smplrspace.com) if you need this.

Similarly, walls (or any data represented by lines or polygons) are typically not suitable for pure concave hulls — we have a dedicated query for such data with [getLinesConcaveHull](#getlinesconcavehull) below.

```ts
smplrClient.getPointsConcaveHull({
  points: {
    levelIndex: number,
    x: number,
    z: number
  }[],
  simplify?: boolean,
  simplifyTolerance?: number
}): {
  levelIndex: number,
  x: number,
  z: number
}[]
```

- `points` - the array of points you want to compute the bounding box for.
- `simplify` - _optional_ - whether the returned hull should be simplified, which means consecutive points that are aligned will be removed to keep only the first and the last. _Default value: true_
- `simplifyTolerance` - _optional_ - authorized distance from the alignment used during the simplification process, given in meters. _Default value: 0.005_

## getLinesConcaveHull

The concave hull of a set of lines is the smallest polygon that contains all the lines without "breaking" any of them, which makes it more suitable for "continuous" data (like walls) than the pure concave hulls computed in [getPointsConcaveHull](#getpointsconcavehull). It is similar to a contour. To get the concave hull of a set of lines, you can call the following query.

```ts
smplrClient.getLinesConcaveHull({
  lines: {
    levelIndex: number,
    x: number,
    z: number
  }[][],
  simplify?: boolean,
  simplifyTolerance?: number
}): {
  levelIndex: number,
  x: number,
  z: number
}[]
```

- `lines` - the array of lines you want to compute the bounding box for.
- `simplify` - _optional_ - whether the returned hull should be simplified, which means consecutive points that are aligned will be removed to keep only the first and the last. _Default value: true_
- `simplifyTolerance` - _optional_ - authorized distance from the alignment used during the simplification process, given in meters. _Default value: 0.005_

## isPointInPolygon

To know whether a point is contained within an area defined by a polygon, you can call the following query.

```ts
smplrClient.isPointInPolygon({
  point: {
    levelIndex: number,
    x: number,
    z: number
  },
  polygon: {
    levelIndex: number,
    x: number,
    z: number
  }[]
}): boolean
```

- `point` - the point coordinates in 2D, with the same schema as `polygon` below.
- `polygon` - the definition of the area used as a mask to extract furniture. It has the same schema as the coordinates from the [polygon data layers](/api-reference/space/data-layers#polygon-layer). It is assumed here that all coordinates have the same `levelIndex` value.

A similar query is available for furniture pieces, see [isFurnitureInPolygon](/api-reference/queryclient/furniture#isfurnitureinpolygon).

## Need any other data?

[Get in touch](mailto:support@smplrspace.com) with any use-case that would require new queries to be exposed.
