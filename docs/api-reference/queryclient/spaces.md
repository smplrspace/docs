---
sidebar_position: 3
---

# Spaces

## createSpace

To create a space programmatically, you can call the following query.

```ts
smplrClient.createSpace({
  name: string
  notes?: string
  tags?: string[]
}): Promise<{ sid: string }>
```

With `sid` the [Smplrspace ID](/guides/sid) of the space.

- `name` is the name of the space to create.
- `notes` - _optional_ - are internal team notes attached to the space.
- `tags` - _optional_ - an array of tags to add to the space. If a tag doesn't exist, it will be created automatically.

## setSpaceStatus

You can call the following query to programmatically publish, set as draft, or archive a space.

```ts
smplrClient.setSpaceStatus({ 
  spaceId: string; 
  status: 'published' | 'draft' | 'archived' 
}): Promise<{ status: string }>
```

- `spaceId` - unique identifier of the space in Smplrspace, something like "spc_xxx". Refer to the [page on SIDs](/guides/sid) to learn more.
- `status` - one of the possible statuses, with "published" corresponding to "live" in the platform.

## deleteSpace

You can call the following query to programmatically delete a space.

```ts
smplrClient.deleteSpace(spaceId: string): Promise<void>
```

- `spaceId` - unique identifier of the space in Smplrspace, something like "spc_xxx". Refer to the [page on SIDs](/guides/sid) to learn more.


## listSpaces

To list all the spaces on your organization account, you can call the following query.

```ts
smplrClient.listSpaces(options?: { tagged?: string[] }): Promise<{
  sid: string
  deprecated_id: string
  name: string
  created_at: string
  status: string
}[]>
```

- `options` - _optional_ - as described below.
- `options.tagged` - _optional_ - an array of tags to filter spaces. Only spaces that have **all** the specified tags will be returned (AND logic).

You can learn more about `sid` and `deprecated_id` in the dedicated [page on SIDs](/guides/sid).

## getSpace

To get all details about a space, you can call the following query.

```ts
smplrClient.getSpace(spaceId: string, options?: { useCache?: boolean }): Promise<{
  sid: string // spaceId
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

- `spaceId` - unique identifier of the space in Smplrspace, something like "spc_xxx". Refer to the [page on SIDs](/guides/sid) to learn more.
- `options` - _optional_ - as described below.
- `options.useCache` - _optional_ - set this to control whether the request should use the client's local cache. _Default value: false_

## getSpaceFromCache

This is the synchronous equivalent of the query right above.

```ts
smplrClient.getSpaceFromCache(spaceId: string): Space
```

where `spaceId` and `Space` are as defined in `getSpace`, without the `Promise`.

## getSpaceAssetmap (entities)

:::info
"Assets" are gradually being renamed to "Entities". You'll read entity/ies is the app and asset(s) here, until the change is complete. They are one and the same concept. Except this API to be deprecated soon, and a much wider API surface to be introduced as the entity manager enters general availability.
:::

To get the full assetmap (list of entities) of a space, as saved in the entity manager (previously mapper) in the app, you can call the following query.

```ts
smplrClient.getSpaceAssetmap(spaceId: string): Promise<unknown>
```

- `spaceId` - unique identifier of the space in Smplrspace, something like "spc_xxx".

Note that this query is currently not typed as the entity manager (previously mapper) is still in private beta. You should expect an array of "entity groups" (previously asset groups), each "entity group" being an object. The return value corresponds to the JSON export from the entity manager (previously mapper) in the app.

## getSpaceAssetmapFromCache

This is the synchronous equivalent of the query right above.

```ts
smplrClient.getSpaceAssetmapFromCache(spaceId: string): unknown
```

where `spaceId` and the return value are as defined in `getSpaceAssetmap`.

## Need any other data?

[Get in touch](mailto:support@smplrspace.com) with any use-case that would require new queries to be exposed.
