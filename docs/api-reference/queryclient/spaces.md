---
sidebar_position: 3
---

# Spaces

## createSpace

To create a space programmatically, you can call the following query.

```ts
smplrClient.createSpace({
  organizationId: string
  name: string
  notes?: string
  tags?: string[]
  addToProjectId?: string
}): Promise<{ sid: string }>
```

With `sid` the [Smplrspace ID](/guides/sid) of the space.

- `organizationId` is the unique identifier of your organization in Smplrspace, something like "fbc5617e-5a27-4138-851e-839446121b2e". Personal accounts are also treated as "personal organization". To get your organization's ID, head to the Developers page from the main menu.
- `name` is the name of the space to create.
- `notes` - _optional_ - are internal team notes attached to the space.
- `tags` - _optional_ - an array of tags to add to the space. If a tag doesn't exist, it will be created automatically.
- `addToProjectId` - _optional_ - the unique identifier of a project to add the space to upon creation. This only takes effect when using a project-scoped API token that includes the specified project.

## setSpaceDefinition (beta)

:::warning

This is a beta version. The definition is not validated against a schema yet, only its floor area is checked, and the definition format could change with no backward compatibility. If you rely on this in production, please [get in touch](mailto:support@smplrspace.com) so we can take your usage into account and communicate to you any upcoming changes.

:::

To set the content of a space programmatically, for example from your own conversion of CAD drawings, you can call the following query. It's typically used right after [`createSpace`](#createspace).

```ts
smplrClient.setSpaceDefinition({
  spaceId: string
  definition: Record<string, unknown>
  publish?: boolean
  user: {
    id: string
    name?: string
    picture?: string
  }
}): Promise<{ sid: string; published: boolean }>
```

- `spaceId` - unique identifier of the space in Smplrspace, something like "spc_xxx". Refer to the [page on SIDs](/guides/sid) to learn more.
- `definition` - the full definition of the space, following the [space definition format](https://webshare.smplrspace.io/smplrspace-space-definition.html). It replaces the existing definition entirely.
- `publish` - _optional_ - whether to also publish the definition. By default, the definition is saved as a draft of the space's content, that you can review in the editor and publish from the app or with [`publishSpace`](#publishspace). When set to `true`, the definition is saved and published, and the space status is set to "published" (corresponding to "live" in the platform). _Default value: false_
- `user` - the user making the change, attributed as the last person who modified the space. `id` is your own identifier for that user, `name` and `picture` (a URL) are used for display in the app.

The query is rejected with an explicit error message when:

- the definition has no `levels` array, or a level has no `grounds` array.
- the floor area of the space can't be computed from the definition, which usually means the definition doesn't follow the expected format.
- the space has no billable floor area, i.e. no internal ground on any level.
- the floor area of any level is above 1,000,000 sqft, which usually means the scale of the definition is wrong.
- a floor plan image is embedded in the definition as base64 data. Host the image and reference it with `floorplan.url` instead.

## publishSpace

You can call the following query to programmatically publish the latest saved definition of a space, like publishing from the editor.

```ts
smplrClient.publishSpace({
  spaceId: string
  user: {
    id: string
    name?: string
    picture?: string
  }
}): Promise<{ sid: string }>
```

- `spaceId` - unique identifier of the space in Smplrspace, something like "spc_xxx". Refer to the [page on SIDs](/guides/sid) to learn more.
- `user` - the user publishing the space, attributed as the last person who modified the space. `id` is your own identifier for that user, `name` and `picture` (a URL) are used for display in the app.

Publishing also sets the space status to "published" (corresponding to "live" in the platform). Note that this is different from [`setSpaceStatus`](#setspacestatus), which only changes the status of the space and not its published content.

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
smplrClient.listSpaces({ 
  organizationId: string
  tagged?: string[]
  projects?: string[]
  unit?: 'sqm' | 'sqft'
  includeLevelBreakdown?: boolean
}): Promise<{
  sid: string
  deprecated_id: string
  name: string
  created_at: string
  status: string
  area: number
  projects: {
    project_sid: string
    name: string
  }[]
  levels?: {
    name: string
    area: number
  }[]
}[]>
```

- `organizationId` is the unique identifier of your organization in Smplrspace, something like "fbc5617e-5a27-4138-851e-839446121b2e". Personal accounts are also treated as "personal organization". To get your organization's ID, head to the Developers page from the main menu.
- `tagged` - _optional_ - an array of tags to filter spaces. Only spaces that have **all** the specified tags will be returned (AND logic).
- `projects` - _optional_ - an array of project SIDs to filter spaces. Only spaces belonging to at least one of the specified projects will be returned (OR logic). Note that if you are using a project-scoped client token, the filtering is applied automatically and this parameter is not needed.
- `unit` - _optional_ - the unit for area values in the response. Defaults to `'sqm'`.
- `includeLevelBreakdown` - _optional_ - set to `true` to include a `levels` array in the response with per-level area data. Defaults to `false`.

Each space in the returned array contains:
- `sid` - the [Smplrspace ID](/guides/sid) of the space.
- `deprecated_id` - the legacy UUID identifier. See the [page on SIDs](/guides/sid) for details.
- `name` - the display name of the space.
- `created_at` - the ISO 8601 timestamp when the space was created.
- `status` - one of `'draft'`, `'published'`, or `'archived'`.
- `area` - the total floor area of the published space, in the unit specified by the `unit` parameter.
- `projects` - the list of projects the space belongs to. Each entry includes `project_sid` and `name`.
- `levels` - _present only when `includeLevelBreakdown` is `true`_ - the list of levels in the published space, each with a `name` and `area` (in the specified unit). Ordered from ground level up.

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

## getSpaceLevels

To get the list of levels in a space, you can call the following query.

```ts
smplrClient.getSpaceLevels(spaceId: string): Promise<{
  index: number
  name: string
  initials: string
}[]>
```

- `spaceId` - unique identifier of the space in Smplrspace, something like "spc_xxx". Refer to the [page on SIDs](/guides/sid) to learn more.

Each level in the returned array contains:
- `index` - zero-based position of the level in the space.
- `name` - display name of the level, e.g. "Ground floor". Defaults to "Level N" if not set.
- `initials` - short label for the level, e.g. "GF". Defaults to "LN" if not set.

## getSpaceLevelsFromCache

This is the synchronous equivalent of the query right above.

```ts
smplrClient.getSpaceLevelsFromCache(spaceId: string): {
  index: number
  name: string
  initials: string
}[]
```

where `spaceId` and the return value are as defined in `getSpaceLevels`, without the `Promise`.

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
