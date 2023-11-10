---
sidebar_position: 3
---

# Spaces

## getSpace

To get all details about a space, you can call the following query.

```ts
smplrClient.getSpace(id: string, options?: { useCache?: boolean }): Promise<{
  id: string
  created_at: string
  modified_at: string
  name: string
  public_link_enabled: boolean
  status: 'draft' | 'published' | 'archived'
  definition: object | null
  embed_image: string | null
  short_code: string | null
  assetmap: object | null
}>
```

- `id` - unique identifier of the space in Smplrspace, something like "fbc5617e-5a27-4138-851e-839446121b2e".
- `options` - _optional_ - as described below.
- `options.useCache` - _optional_ - set this to control whether the request should use the client's local cache. _Default value: false_

## getAllFurnitureInSpace

To list all furniture from a space, you can call the following query.

```ts
smplrClient.getAllFurnitureInSpace(id: string): Promise<{
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
}[]>
```

- `id` - unique identifier of the space in Smplrspace, something like "fbc5617e-5a27-4138-851e-839446121b2e".

See [`getFurnitureById`](#getfurniturebyid) for notes about the returned data.

## getFurnitureById

To get a furniture from a space by its unique identifier, you can call the following query.

```ts
smplrClient.getFurnitureById({
    spaceId: string
    furnitureId: string
  }): Promise<{
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
} | null>
```

- `spaceId` - unique identifier of the space in Smplrspace, something like "fbc5617e-5a27-4138-851e-839446121b2e".
- `furnitureId` - unique identifier of the furniture in the space, has a similar format to `spaceId`.

Notes about the returned data:

- `levelIndex` - zero-based index of the level where the furniture is located. For example, `levelIndex` equals to `2` means the furniture is on `L3`.
- `position` - location of the center of the furniture in the floor plan. Values are given in meter. The absolute value has no meaning since the coordinate `(0,0,0)` is arbitrary. So these values are only relevant relatively to each other.
- `rotation` - angle of rotation of the furniture in degrees. `yaw` would typically be the only non-null value as it represents the rotation around the vertical axis.
- `dimensions` - size of the furniture in centimeters. `length` and `width` are the dimensions in the 2D horizontal plane, while `height` is the vertical height in the 3D space.

Returns `null` if the furniture is not found in the space.

## Need any other data?

Get in touch with any use-case that would require new queries to be exposed.
