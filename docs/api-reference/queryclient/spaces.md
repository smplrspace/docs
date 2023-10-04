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

Returns `null` if the furniture is not found in the space.

## Need any other data?

Get in touch with any use-case that would require new queries to be exposed.
