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

It checks the [space definition format](https://webshare.smplrspace.io/smplrspace-space-definition.html) of the current schema version, and returns every problem it finds. `path` tells you where the problem is and `reason` what is wrong. Every problem is an error: a definition you send this way is treated as finished, like a published space. A definition with no errors is never rejected by [`setSpaceDefinition`](/api-reference/queryclient/spaces#setspacedefinition-beta) for its content. The checks that read the content of the definition, like repeated ids or the floor area, only run when the definition has no format error.

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

Once the format errors are fixed, the checks on the content run and can report more. For example:

```ts
// [
//   { path: 'levels[0].grounds[1].segments[3].end', reason: 'The ring is not closed: the id is 4f2a…, expected 9c1b…' },
// ]
```

What counts as valid:

- A key the format does not define is an error, so a typo is caught. Two keys accept any content, and only in these places:
  - `extras`, on `grounds`, `walls`, wall `openings`, `roofs`, `stairs`, `annotations` and `objects`. Every value in it must be valid JSON. For example `levels[0].walls[1].segments[0].openings[0].extras`.
  - `configuration`, on `objects` only, as an object or `null`. For example `levels[0].objects[2].configuration`.
- Fields that have a default value can be left out. Ids cannot: every feature, wall segment, opening and point needs an `id`, and consecutive segments share their joint by point `id`. Each level also needs a `grounds` array, which can be empty.
- Every `id` is a string, and unique in the space: grounds, holes, walls, wall segments, openings, roofs, roof segments, stairs, annotations and objects. Reusing an id can make points merge and walls deform. A point `id` is the only one meant to repeat, where two consecutive segments share a joint.
- Ground `options.style` is one of `indoor`, `grass`, `water`, `white` or `darkgrey`. A door's `options.style` is one of `normal`, `sliding`, `revolving`, `roller-shutter`, `railing`, `frame-only` or `nothing`, and a window's one of `normal`, `multi-panels`, `railing` or `open-air`. `options.openFrom` is `left`, `center` or `right`.
- A stair's `bottomSegment` and `topSegment` each have exactly two points.
- An opening is not wider than its segment (`dimensions.width`, in centimeters, against the length of the segment in meters), within 5 mm of rounding.
- Each opening is measured from the end of its segment that is closest to it: `position.from` is `start` when the opening is nearer the start, and `end` when it is nearer the end. The position is the same either way, but the walls are cut around an opening that touches the end of its wall only when it is measured from that end.
- An opening stays within its segment: its distance from the end it is measured from, plus or minus half its width, is between 0 and the length of the segment (within 5 mm), and it does not overlap another opening on the same segment.
- The segments of a wall follow each other: each one starts at the end point of the previous one, with the same `id` and coordinates.
- A level's `initials` has at most 3 characters.
- A ground or a hole is closed: its last segment ends where its first one starts, with the same `id` and coordinates. One that is not closed is not drawn.
- A point `id` is used only where two consecutive segments meet, or where a ground, hole or wall closes on its start. It is not reused anywhere else in the space, on any level.
- An object's `levelIndex` is the index of the level that holds it.
- The floor area can be computed and is not too large. The space needs a ground that is not external, with its `segments` filled in, or an automatic ground. An automatic ground (an `id` starting with `autoground-`) is derived from the walls of its level: leave its `segments` empty, and the validator computes it from the walls, and `setSpaceDefinition` saves it recomputed. A level with no automatic ground has it disabled, and then needs a ground of its own. A level above 1,000,000 sqft is refused, which also catches coordinates given in centimeters instead of meters.
- Floor plan images are referenced with `floorplan.url`. A `floorplan.data` key is an error.
- Only the current schema version is checked.

What it does not check:

- The geometry beyond the above: self-intersecting polygons, a partition that ends on the centerline of the wall it meets, acute angles under 30 degrees, a ground that follows the inside of the walls, doubled exterior walls.
- That `catalogId` is an existing catalog item, and matches `configuration`.
- Options that only apply to some opening types or styles, a round `cap` on a wall that is not a pillar, `autoFacade`, `partOfFacade` and `contour`.
- The shape of roofs, which are not a public feature. Only their ids are checked for uniqueness.
