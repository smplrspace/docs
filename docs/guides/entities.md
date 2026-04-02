---
sidebar_position: 2
---

# Mapping entities to your space

A Smplrspace floor plan stores the layout — walls, doors, windows, and placed equipment. It does not store your business data. If you want to visualise which desk belongs to which employee, display room availability, or show sensor readings on the map, you need to map your database entities to locations in the space first.

This mapping typically happens once per entity (or whenever an entity moves) and produces coordinates or furniture IDs that you store in your own database alongside the rest of your data.

## What needs to be mapped

The data you need depends on the [data layer type](/api-reference/space/data-layers#types-of-layers) you intend to render:

| What you want to render | Layer type | What you need to store |
|---|---|---|
| Sensors, markers, badges | `point`, `icon`, `image` | `{ levelIndex, x, z, elevation }` |
| Rooms, zones, areas | `polygon` | Array of `{ levelIndex, x, z, elevation }` vertices |
| Paths, routes, cable runs | `polyline`, `dotted-polyline` | Ordered array of `{ levelIndex, x, z, elevation }` coordinates |
| Desks, seats, equipment | `furniture` | `furnitureId` string |

Once stored, these values are passed directly into your data layer's `data` array every time you render the space — Smplrspace doesn't need to store them on your behalf, but you can store them on the platform to simplify collaborative management.


## Approaches

There are three ways to do the mapping:

- **[Entity manager](#entity-manager)** — an in-app UI for picking locations, with import/export and API access for collaborative workflows
- **[Picking mode API](#picking-mode-api)** — integrate the mapping step directly into your own application
- **[Managed service](#managed-service)** — have Smplrspace do the mapping for you

### Entity manager

The Entity manager is a built-in tool in the Smplrspace app. Open your space, click **Edit** in the top-right corner, then select **Manage entities**. It is well suited for collaborative workflows — including when using our [managed service](#managed-service), which deposits the mapped data directly into the entity manager so you can review and edit it.

From there you create **entity groups** — one per entity type and use-case. Each group has a type that matches the kind of data you want to collect:

- **`point`** — for sensors, markers, or any entity tied to a single location. Click anywhere in the space to record coordinates.
- **`polyline`** — for paths, routes, or cable runs. Click a sequence of points to build the line.
- **`polygon`** — for rooms or zones. Enable **one-click room** to automatically detect and trace room boundaries with a single click on any room. Polygons can also be drawn manually for zones that don't match an existing enclosed room.
- **`furniture`** — for desks or other placed equipment. Click any furniture item to capture its `furnitureId`.
- **`image`** — for entities represented by an image placed at a specific location. Click anywhere in the space to set the position. Each image entity stores a URL, dimensions (width and height in meters), orientation (yaw, pitch, roll in degrees), and coordinates (x, z, elevation).

Depending on the entity group type, automated extraction options may be available under the **`...`** menu of the group — for example, automatically extracting all rooms from the floor plan geometry rather than clicking them one by one.

You can choose to save the data on the platform, or keep it out of Smplrspace entirely and use the import/export workflows described below — for example if the entity data is sensitive and should only live in your own systems.

#### Import and export

The entity manager supports several formats for moving data in and out:

- **CSV** — import or export entity groups with your own database IDs preserved alongside the spatial data. You can download a ready-made CSV template from the **`...`** menu of the entity manager — it includes the expected columns and one example row per entity type to get you started. Note that any extra fields you include in an import may not be visible in the app, but they will be preserved and included in subsequent exports.
- **Google Sheets sync** — sync entity groups directly with a Google Sheet for collaborative editing without leaving a spreadsheet.
- **JSON export** — exports the full entity group structure in the same format returned by the [`getAssetmap`](/api-reference/queryclient/spaces#getspaceassetmap-entities) API. Handy for quickly generating fixture data when prototyping an integration.

#### Reading entity data via API

Data saved in the entity manager can be read programmatically using the [`getAssetmap`](/api-reference/queryclient/spaces#getspaceassetmap-entities) API. The response format mirrors the JSON export, making it easy to go from prototyping in the UI to consuming the data in your application.

### Picking mode API

💡 **This is the recommended approach** if you are building a self-service mapping flow — either for internal tooling or for your end users.

The [Picking mode API](/api-reference/space/overview#picking-mode) fires an event every time the user clicks in the viewer. Each event includes the 3D coordinates of the click and, when the user clicked on a furniture item, its `furnitureId`. You can write that data directly to your database, skipping the need to export and re-import CSVs.

```ts
space.enablePickingMode({
  onPick: ({ coordinates, furnitureId }) => {
    // coordinates: { levelIndex, x, z, elevation }
    // furnitureId: string | undefined (set when clicking equipment)
    saveToMyDatabase({ coordinates, furnitureId })
  }
})
```

Call `space.disablePickingMode()` to stop listening for picks — for example, inside `onPick` itself if you only need one pick per entity.

Because you own the full workflow, you can build exactly the experience you need. A few examples:

- **Guided mapping** — preload the list of entities to map and automatically advance to the next one after each pick, so the user moves through the list efficiently without extra steps.
- **Polygon drawing** — accumulate clicked points in local state, re-render a polygon data layer after each click so the user sees the shape forming in real time, then offer a "close polygon" button to finalise it and move on.
- **In-line review** — render already-mapped entities as a data layer while mapping, so users can see what has been done and correct mistakes on the spot. Most layer types support `onDrag`, `onDrop`, and `disableReshape` options to make entities directly editable in the viewer.

These are just examples — the API gives you the raw click events and coordinates, and your application logic handles the rest.

Refer to the [Add data elements](/examples/add-data-elements) example to see picking mode in action.

### Managed service

If you would rather have Smplrspace handle the mapping, we offer this as a service. The mapped data is deposited directly into your entity manager so you can review and edit it, and export it in whichever format suits your workflow. Pricing is listed in the second half of [this page](https://www.smplrspace.com/pricing/software-companies). Email [digitization@smplrspace.com](mailto:digitization@smplrspace.com) to learn more or place an order — we provide a quote upfront.

When reaching out, please include:

- **Floor plans** to digitize, along with a description of the expected level of detail in the output.
- **A description of the entities to map** — what they are, the use-case, and how they are marked or identified on the floor plans. If you have different groups of entities, please provide the group names.
- **A CSV of the entities** if available — you can use the CSV template from the [entity manager](#entity-manager) as a starting point. This is ideal as it lets us include your database IDs in the output, making it straightforward to import the data back into your system.
