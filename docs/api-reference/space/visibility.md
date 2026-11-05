---
sidebar_position: 4
---

# Visibility

Smplr.js can tell you which points and surfaces can see each other in a space. The checks run in the browser, in the viewer that is already loaded: rays are cast against what the viewer currently renders. They work for indoor spaces only.

Typical uses are checking which shopfront panels can be seen from a set of vantage points, or which viewpoints have a clear line of sight to a sign or a camera.

All positions are `SmplrCoord3d` values, the same coordinates you get from [picking mode](./overview#picking-mode): the zero-based `levelIndex`, the `x` and `z` position in the floor plan in meters, and the `elevation` in meters above the floor of that level.

```ts
interface SmplrCoord3d {
  levelIndex: number
  x: number
  z: number
  elevation: number
}
```

## Before you start

- A check reports whether there is a clear line of sight. It does not tell you whether the target is legible, or whether anyone actually looks at it.
- The viewing angle is ignored. A panel seen edge-on counts as visible.
- glTF furniture made of several parts counts as transparent only when its first material is transparent.
- Checks require the 3D mode and throw in 2D.

### What blocks a line of sight

Everything the viewer renders that is not transparent blocks it: walls, the floors between levels, solid doors, stairs, railings, furniture and equipment. Doors count as rendered, so an open swing door leaves its doorway clear.

These do not block it:

- glass, meaning window panes, glass doors, and furniture whose materials are all transparent
- overlays, meaning data layers, annotations and the floor plan image

Wall transparency set with the [`walls.alpha`](./custom-ux#render-options) render option does not count as glass. Those walls still block.

A target placed on a surface, for example a point on a shopfront wall, is not blocked by that surface: rays stop 5 cm short of the target.

### Wait for the render, and prepare it

Both checks wait for the viewer to finish rendering before they start. You can therefore change the render and check again directly. For example, this gives you the result without furniture:

```ts
space.updateRenderOptions({ objects: { render: false } })
const results = await space.checkVisibility({ viewpoints, targets })
```

The viewer does not always render everything. For performance it can render the interior and furniture of the top visible level only, levels can be hidden or excluded, and walls can be cut at a height. A check only sees what is rendered, so use [`renderForVisibility`](#render-for-a-check) to render what your inputs need. When a check crosses a level that is not fully rendered, it logs a console warning pointing you to it.

### While a check runs

The viewer ignores user input (camera, controls) and shows a "Checking visibility" message. Calls made through the API are not blocked, so avoid changing the render from your code until the promise resolves.

## Check points

```ts
interface VisibilityViewpoint {
  id: string
  position: SmplrCoord3d
}

interface VisibilityTarget {
  id: string
  position: SmplrCoord3d
}

interface TargetVisibility {
  targetId: string
  visibleFrom: string[]
}

space.checkVisibility({
  viewpoints: VisibilityViewpoint[]
  targets: VisibilityTarget[]
  maxDistance?: number
}) => Promise<TargetVisibility[]>
```

- `viewpoints` - the points to look from. Each has an `id` of your choosing, which is how you will recognize it in the result.
- `targets` - the points to look at, each with an `id` of your choosing.
- `maxDistance` - _optional_ - the distance in meters beyond which a viewpoint and a target count as not visible from one another. _Default value: unlimited_

The returned promise resolves with one entry per target, in the same order as the input. `visibleFrom` lists the ids of the viewpoints that have a clear line of sight to that target. It is empty when none do.

## Check panels

A panel is a vertical rectangle, which suits signs, shopfront windows and screens.

```ts
interface VisibilityPanel {
  id: string
  bottomStart: SmplrCoord3d
  bottomEnd: SmplrCoord3d
  height: number
}

interface PanelVisibility {
  panelId: string
  visibleFrom: { viewpointId: string; fraction: number }[]
}

space.checkPanelVisibility({
  viewpoints: VisibilityViewpoint[]
  panels: VisibilityPanel[]
  samplesPerMeter?: number
  maxDistance?: number
}) => Promise<PanelVisibility[]>
```

- `viewpoints` - same as above.
- `panels` - the panels to look at. A panel stands on the segment from `bottomStart` to `bottomEnd`, which must be on the same level, and extends upward by `height`, in meters. Each panel has an `id` of your choosing.
- `samplesPerMeter` - _optional_ - how finely each panel is sampled. The panel is covered with a grid of sample points taken at the center of each cell, with this many samples per meter along both its width and its height, and at least one sample per direction. It must be positive. _Default value: 2_ (one sample every 50 cm)
- `maxDistance` - _optional_ - same as above. _Default value: unlimited_

The returned promise resolves with one entry per panel, in the same order as the input. `fraction` is a number between 0 and 1: the share of the panel's samples that the viewpoint sees. Viewpoints that see none of the panel are left out of `visibleFrom`.

## Render for a check

```ts
space.renderForVisibility({
  viewpoints: VisibilityViewpoint[]
  targets?: VisibilityTarget[]
  panels?: VisibilityPanel[]
}) => Promise<{ restore: () => Promise<void> }>
```

This renders what a check over these inputs needs. It finds the levels spanned vertically by the viewpoints, targets and panels, and for those levels it:

- includes them and shows them in 3D
- renders their interior walls and furniture
- renders walls at full height
- turns the facade model off, so that real walls and windows are used

Levels below that span are left as they are, and levels above it are hidden: a straight line between your inputs cannot reach either.

The promise resolves once rendering is done, with a `restore` function. Calling it puts the previous render back: levels, mode, render options and facade.

## Example

```ts
const viewpoints = [
  { id: 'entrance', position: { levelIndex: 0, x: 12.5, z: -8.2, elevation: 1.6 } },
  { id: 'escalator', position: { levelIndex: 0, x: 24, z: -3.5, elevation: 1.6 } },
  { id: 'food-court', position: { levelIndex: 0, x: 31.2, z: -14, elevation: 1.6 } },
]
const panels = [
  {
    id: 'shopfront-12',
    bottomStart: { levelIndex: 0, x: 18, z: -10, elevation: 0.5 },
    bottomEnd: { levelIndex: 0, x: 22, z: -10, elevation: 0.5 },
    height: 2.4,
  },
]

// render everything the check needs, whatever the viewer was showing
const { restore } = await space.renderForVisibility({ viewpoints, panels })

const results = await space.checkPanelVisibility({
  viewpoints,
  panels,
  samplesPerMeter: 4,
  maxDistance: 40,
})

results.forEach(({ panelId, visibleFrom }) => {
  visibleFrom.forEach(({ viewpointId, fraction }) => {
    console.log(`${panelId} is ${Math.round(fraction * 100)}% visible from ${viewpointId}`)
  })
})

// put the previous render back
await restore()
```
