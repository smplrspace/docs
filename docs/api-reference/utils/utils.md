---
sidebar_label: Overview
slug: overview
sidebar_position: 1
---

# Utilities

Smplr.js makes a `smplr` object available on the global scope. `Utils` is a namespace available under this object. It provides a variety of small utility functions and types that can be useful when working with Smplrspace.

## Working with Smplrspace IDs

The guiding principles of Smplrspace IDs are documented on [this page](/guides/sid). In your code, the Space ID is used a lot and we provide a type and a function to valid strings against this type.

```ts
type SpaceSid = `spc_${string}`
function isSpaceSid: (s: string) => s is SpaceSid
```

## Validating a space definition

To check that a JSON payload is a valid space definition, call `validateSpaceDefinition`. It runs in your code, with no network call and no client, so you can check a definition before you send it with [`setSpaceDefinition`](/api-reference/queryclient/spaces#setspacedefinition-beta).

```ts
type SpaceDefinitionError = { path: string; reason: string }
function validateSpaceDefinition(args: {
  definition: unknown
}): { valid: true } | { valid: false; errors: SpaceDefinitionError[] }
```

It checks the [space definition format](https://webshare.smplrspace.io/smplrspace-space-definition.html) of the current schema version, and returns every problem it finds. `path` tells you where the problem is and `reason` what is wrong.

```ts
const result = smplr.Utils.validateSpaceDefinition({ definition })
if (!result.valid) {
  console.log(result.errors)
  // [
  //   { path: 'levels[0].objects[3].position.elevation', reason: 'Required' },
  //   { path: 'levels[0].objects[3].position.elevaton', reason: 'Unknown key' },
  // ]
}
```

What counts as valid:

- A key the format does not define is an error, so a typo is caught. Two keys accept any content, and only in these places:
  - `extras`, on `grounds`, `walls`, wall `openings`, `roofs`, `stairs`, `annotations` and `objects`. Every value in it must be valid JSON. For example `levels[0].walls[1].segments[0].openings[0].extras`.
  - `configuration`, on `objects` only, as an object or `null`. For example `levels[0].objects[2].configuration`.
- Fields that have a default value can be left out. Ids cannot: every feature, wall segment, opening and point needs an `id`, and consecutive segments share their joint by point `id`. Each level also needs a `grounds` array, which can be empty.
- Floor plan images are referenced with `floorplan.url`. A `floorplan.data` key is an error.
- Only the current schema version is checked.

What it does not check yet:

- That ids are unique. Reusing an id can make points merge and walls deform, so keep every ground, hole, wall, wall segment, opening, roof, stair, annotation and object id unique in the space. A point id is the only one meant to repeat, where two consecutive segments share a joint. The validator reports none of this today.
- The geometry: that a ground polygon closes, that the segments of a wall form a continuous chain, or that an opening fits inside its segment.
