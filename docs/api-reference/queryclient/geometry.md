---
sidebar_position: 7
---

# Geometry

## getPolylineLength

To measure the length of a line or polyline, you can call the following query.

```ts
smplrClient.getPolylineLength({
  line: {
    levelIndex: number
    x: number
    z: number
    elevation: number
  }[]
  unit?: 'ft' | 'm' | 'cm' | 'mm'
}): number
```

- `line` - the polyline you want to compute the length for. It has the same schema as the coordinates from the [polyline data layers](/api-reference/space/data-layers#polyline-layer).
- `unit` - _optional_ - your unit of choice. _Default value: m_

## doSegmentsIntersect

To check whether two line segments intersect, you can call the following query.

```ts
smplrClient.doSegmentsIntersect({
  segment1: {
    start: {
      levelIndex: number
      x: number
      z: number
    }
    end: {
      levelIndex: number
      x: number
      z: number
    }
  }
  segment2: {
    start: {
      levelIndex: number
      x: number
      z: number
    }
    end: {
      levelIndex: number
      x: number
      z: number
    }
  }
}): boolean
```

- `segment1` - the first line segment defined by its start and end points.
- `segment2` - the second line segment defined by its start and end points.

Returns `true` if the segments intersect, `false` otherwise.

## getPolygonArea

To measure the area of a polygon, you can call the following query. This will respect holes, so holes area is not included in the result.

```ts
smplrClient.getPolygonArea({
  polygon: {
    levelIndex: number
    x: number
    z: number
  }[] | {
    levelIndex: number
    x: number
    z: number
  }[][]
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
    levelIndex: number
    x: number
    z: number
  }[] | {
    levelIndex: number
    x: number
    z: number
  }[][]
}): {
  levelIndex: number
  x: number
  z: number
}
```

- `polygon` - the polygon you want to get the center for. It has the same schema as the coordinates from the [polygon data layers](/api-reference/space/data-layers#polygon-layer).

## getPointsBoundingBox

To get the bounding box of a set of points, you can call the following query. The bounding box is defined as a polygon which is always straight with respect to the (x, z) axes.

```ts
smplrClient.getPointsBoundingBox({
  points: {
    levelIndex: number
    x: number
    z: number
  }[]
  padding?: number
}): {
  levelIndex: number
  x: number
  z: number
}[]
```

- `points` - the array of points you want to compute the bounding box for.
- `padding` - _optional_ - minimum space between the points and the bounding box in meters. _Default value: 0_

## getPointsConcaveHull

The concave hull of a set of points is the smallest polygon that contains all the points, similar to a contour. To get the concave hull of a set of points, you can call the following query.

Note that concave hulls are not suitable for sparse points, and you should use a convex hull instead – [get in touch](mailto:support@smplrspace.com) if you need this.

Similarly, walls (or any data represented by lines or polygons) are typically not suitable for pure concave hulls — we have a dedicated query for such data with [getLinesConcaveHull](#getlinesconcavehull) below.

```ts
smplrClient.getPointsConcaveHull({
  points: {
    levelIndex: number
    x: number
    z: number
  }[]
  simplify?: boolean
  simplifyTolerance?: number
}): {
  levelIndex: number
  x: number
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
    levelIndex: number
    x: number
    z: number
  }[][]
  simplify?: boolean
  simplifyTolerance?: number
}): {
  levelIndex: number
  x: number
  z: number
}[]
```

- `lines` - the array of lines you want to compute the bounding box for.
- `simplify` - _optional_ - whether the returned hull should be simplified, which means consecutive points that are aligned will be removed to keep only the first and the last. _Default value: true_
- `simplifyTolerance` - _optional_ - authorized distance from the alignment used during the simplification process, given in meters. _Default value: 0.005_

## isPointInPolygon

To know whether a point is contained within an area defined by a polygon, you can call the following query. This will respect holes, so if the point is in the hole of the polygon, it will return false.

```ts
smplrClient.isPointInPolygon({
  point: {
    levelIndex: number
    x: number
    z: number
  }
  polygon: {
    levelIndex: number
    x: number
    z: number
  }[] | {
    levelIndex: number
    x: number
    z: number
  }[][]
}): boolean
```

- `point` - the point coordinates in 2D, with the same schema as `polygon` below.
- `polygon` - the polygon in which the point should be located or not. It has the same schema as the coordinates from the [polygon data layers](/api-reference/space/data-layers#polygon-layer). It is assumed here that all coordinates have the same `levelIndex` value.

A similar query is available for furniture pieces, see [isFurnitureInPolygon](/api-reference/queryclient/furniture#isfurnitureinpolygon).

## isPolygonAInPolygonB

To check whether a polygon is completely contained within another polygon, you can call the following query. This function ignores holes, so it only relies on the outer ring of the polygons.

```ts
smplrClient.isPolygonAInPolygonB({
  a: {
    levelIndex: number
    x: number
    z: number
  }[] | {
    levelIndex: number
    x: number
    z: number
  }[][]
  b: {
    levelIndex: number
    x: number
    z: number
  }[] | {
    levelIndex: number
    x: number
    z: number
  }[][]
}): boolean
```

- `a` - the polygon that should be checked if it's inside polygon B. It has the same schema as the coordinates from the [polygon data layers](/api-reference/space/data-layers#polygon-layer).
- `b` - the polygon that should contain polygon A. It has the same schema as the coordinates from the [polygon data layers](/api-reference/space/data-layers#polygon-layer).

Returns `true` if polygon A is completely inside polygon B, `false` otherwise.

## fitRectangleInPolygon

To find the optimal position and rotation for a rectangle within a polygon, you can call the following query. This is useful for a number of applications: space planning, furniture placement, or to optimize the size of logos to specific spaces (units) when using the [poster data layer](/api-reference/space/data-layers#poster-layer). This function ignores holes, so it only relies on the outer ring of the polygon.

```ts
smplrClient.fitRectangleInPolygon({
  polygon: {
    levelIndex: number
    x: number
    z: number
  }[] | {
    levelIndex: number
    x: number
    z: number
  }[][]
  width: number
  height: number
  rotationRange?: number | [number, number]
  gridSize?: number
  paddingPercent?: number
}): {
  center: {
    levelIndex: number
    x: number
    z: number
  }
  width: number
  height: number
  rotation: number
}
```

- `polygon` - the polygon in which to fit the rectangle. It has the same schema as the coordinates from the [polygon data layers](/api-reference/space/data-layers#polygon-layer).
- `width` & `height` - the width and height of the rectangle. It is only used to maintain its aspect ratio.
- `rotationRange` - _optional_ - the range of allowed rotation of the resulting rectangle. Can be a single number (tested range will be `[-value, value]`) or a tuple of `[min, max]`. Values are in degree. The algorithm tests rotation angles that are multiples of 15° within the specified range. _Default value: 0 (no rotation)_
- `gridSize` - _optional_ - the number of rows and columns in the grid used to search the best location. Bigger values are more precise but slower. _Default value: 50_
- `paddingPercent` - _optional_ - padding to add around the fitted rectangle, expressed as a percentage of the size. For example, 10 means 10% padding on each side. _Default value: 0_

Returns an object with the optimal `center` position, `width` and `height` in meters, and `rotation` (in degrees) of the fitted rectangle. Use [getRectangleCorners](#getrectanglecorners) to get the corner coordinates.

## getRectangleCorners

To get the corner coordinates of a rectangle given its center, dimensions, and rotation, you can call the following query. This is particularly useful after calling [fitRectangleInPolygon](#fitrectangleinpolygon).

```ts
smplrClient.getRectangleCorners({
  center: {
    levelIndex: number
    x: number
    z: number
  }
  width: number
  height: number
  rotation: number
}): {
  levelIndex: number
  x: number
  z: number
}[]
```

- `center` - the center point of the rectangle.
- `width` - the width of the rectangle in meters.
- `height` - the height of the rectangle in meters.
- `rotation` - the rotation of the rectangle in degrees.

Returns an array of 4 corner coordinates in counter-clockwise order starting from the bottom-left corner.

## Need any other data?

[Get in touch](mailto:support@smplrspace.com) with any use-case that would require new queries to be exposed.
