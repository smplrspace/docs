---
sidebar_position: 5
---

# Doors & windows

## Opening interface

Doors and windows are the same thing under the hood in Smplrspace, we call them wall "openings". Multiple queries in this page return objects of the type `Opening` described below:

```ts
interface Opening {
  id: string;
  name: string;
  dimensions: {
    width: number;
    height: number;
    baseHeight: number;
  };
  options: object;
  coordinates: {
    levelIndex: number;
    x: number;
    z: number;
    elevation: number;
  }[];
}
```

- `id` - unique identifier of this particular opening.
- `name` - name given to the furniture in the editor. It could be an empty string.
- `dimensions.width` - horizontal width of the opening in centimeters.
- `dimensions.baseHeight` - distance between the ground and the bottom of the opening. It is usually 0 for doors and positive for windows.
- `dimensions.height` - distance between the bottom and the top of the opening.
- `options` - contains all sorts of options selected in the editor and used to render the opening.

## getAllDoorsInSpace

To list all doors from a space, you can call the following query.

```ts
smplrClient.getAllDoorsInSpace(spaceId: string): Promise<Opening[]>
```

- `spaceId` - unique identifier of the space in Smplrspace, something like "spc_xxx".
- `Opening` - this main interface is described [here](#opening-interface).

## getAllDoorsInSpaceFromCache

This is the synchronous equivalent of the query right above.

```ts
smplrClient.getAllDoorsInSpaceFromCache(spaceId: string): Opening[]
```

where `spaceId` and `Opening` are as defined in `getAllDoorsInSpace`.

## getDoorsOnLevel

To list all doors from a single level in a space, you can call the following query.

```ts
smplrClient.getDoorsOnLevel({
  spaceId: string,
  levelIndex: number
}): Promise<Opening[]>
```

- `spaceId` - unique identifier of the space in Smplrspace, something like "spc_xxx".
- `levelIndex` - zero-based index of the level. Refer to the [Opening interface](#opening-interface) to learn more.
- `Opening` - this main interface is described [here](#opening-interface).

## getDoorsOnLevelFromCache

This is the synchronous equivalent of the query right above.

```ts
smplrClient.getDoorsOnLevelFromCache({
  spaceId: string,
  levelIndex: number
}): Opening[]
```

where `spaceId`, `levelIndex`, and `Opening` are as defined in `getDoorsOnLevel`.

## getAllWindowsInSpace

To list all windows from a space, you can call the following query.

```ts
smplrClient.getAllWindowsInSpace(spaceId: string): Promise<Opening[]>
```

- `spaceId` - unique identifier of the space in Smplrspace, something like "spc_xxx".
- `Opening` - this main interface is described [here](#opening-interface).

## getAllWindowsInSpaceFromCache

This is the synchronous equivalent of the query right above.

```ts
smplrClient.getAllWindowsInSpaceFromCache(spaceId: string): Opening[]
```

where `spaceId` and `Opening` are as defined in `getAllWindowsInSpace`.

## getWindowsOnLevel

To list all windows from a single level in a space, you can call the following query.

```ts
smplrClient.getWindowsOnLevel({
  spaceId: string,
  levelIndex: number
}): Promise<Opening[]>
```

- `spaceId` - unique identifier of the space in Smplrspace, something like "spc_xxx".
- `levelIndex` - zero-based index of the level. Refer to the [Opening interface](#opening-interface) to learn more.
- `Opening` - this main interface is described [here](#opening-interface).

## getWindowsOnLevelFromCache

This is the synchronous equivalent of the query right above.

```ts
smplrClient.getWindowsOnLevelFromCache({
  spaceId: string,
  levelIndex: number
}): Opening[]
```

where `spaceId`, `levelIndex`, and `Opening` are as defined in `getDoorsOnLevel`.

## Need any other data?

[Get in touch](mailto:support@smplrspace.com) with any use-case that would require new queries to be exposed.
