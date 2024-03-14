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

## getSpaceFromCache

This is the synchronous equivalent of the query right above.

```ts
smplrClient.getSpaceFromCache(id: string): Space
```

where `id` and `Space` are as defined in `getSpace`, without the `Promise`.

## getSpaceAssetmap

To get the full assetmap of a space, as saved in the mapper UI, you can call the following query.

```ts
smplrClient.getSpaceAssetmap(id: string): Promise<unknown>
```

- `id` - unique identifier of the space in Smplrspace, something like "fbc5617e-5a27-4138-851e-839446121b2e".

Note that this query is currently not typed as the mapper is still in private beta. You should expect an array of "asset groups", each "asset group" being an object. The return value corresponds to the JSON export from the mapper UI.

## getSpaceAssetmapFromCache

This is the synchronous equivalent of the query right above.

```ts
smplrClient.getSpaceAssetmapFromCache(id: string): unknown
```

where `id` and the return value are as defined in `getSpaceAssetmap`.

## Need any other data?

[Get in touch](mailto:support@smplrspace.com) with any use-case that would require new queries to be exposed.
