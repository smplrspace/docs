---
sidebar_position: 3
---

# Spaces

## getSpace

To query all details about a given space, you can call the following query.

⚠️ **UPCOMING BREAKING CHANGE** ⚠️ — This API is considered beta and will change very soon. Please avoid to rely on it in production. Contact support to know more.

```ts
smplrClient.getSpace(id: string): Promise<{
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

## Need any other data?

Get in touch with any use-case that would require new queries to be exposed.
