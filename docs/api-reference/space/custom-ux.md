---
sidebar_position: 3
---

# Custom UX

Smplr.js provides a few options that help you customize the floor plan experience to your requirements. We're regularly adding new options, so [reach out](https://www.smplrspace.com/support) and share what you'd like to do with it.

## Adapting the look & feel and experience

### Render options

To customize how the viewer renders the space, you can pass in a number of options to the rendering engine. Below are the options currently exposed. Render options should be passed through `startViewer` as described [right below](#viewer-options), or updated dynamically as described [further](#update-render-options-dynamically).

```ts
interface RenderOptions {
  backgroundColor?: string;
  grounds?: {
    render?: boolean;
  };
  walls?: {
    render?: boolean;
    alpha?: number;
    maxHeightCm?: number;
    showStructuralWalls?: boolean;
  };
  objects?: boolean;
  annotations?: boolean;
  compass?: boolean;
  skybox?: boolean;
  floorplan?: {
    render?: boolean;
    alpha?: number;
    elevationInCm?: number;
  };
}
```

- `backgroundColor` - _optional_ - lets you change the background color used by the viewer. You can pass any valid CSS color string, such as 'pink' or '#81b1b3'. We advise to set the same background color on the container element to keep the load screen consistent. As for the preview image, you can change its background color to match in the editor: go to the 'Services' tab and click 'Create preview image'.
- `grounds.render` - _optional_ - set this value to control whether the grounds are rendered or not. _Default value: true_
- `walls.render` - _optional_ - set this value to control whether the walls are rendered or not. Note that with `render: false`, doors and windows will not be rendered either. You can use `alpha: 0` instead if you want to render doors and windows but not walls. _Default value: true_
- `walls.alpha` - _optional_ - is a number between 0 and 1 setting the opacity of the walls, 0 being transparent and 1 opaque. _Default value: 1_
- `walls.maxHeightCm` - _optional_ - will cap the rendering of walls to the height provided in centimeter, ignoring the actual height of walls.
- `walls.showStructuralWalls` - _optional_ - set this value to control whether the structural walls (if any) are rendered or not. This also removes the controls from the viewer. _Default value: unset (use button control)_
- `objects` - _optional_ - set this value to control whether the furniture and objects (if any) are rendered or not. _Default value: true_
- `annotations` - _optional_ - set this value to control whether the annotations (if any) are rendered or not. This also removes the show/hide annotations button from the viewer. _Default value: unset (use button control)_
- `compass` - _optional_ - set this value to control whether the compass (if any) is rendered or not. This also removes the show/hide compass button from the viewer. _Default value: unset (use button control)_
- `skybox` - _optional_ - set this value to control whether the skybox is rendered or not. _Default value: false_
- `floorplan.render` - _optional_ - set this value to control whether the floor plan image (if any) is rendered or not. Note that for multi-storey spaces, all levels will have their floor plan image rendered. _Default value: false_
- `floorplan.alpha` - _optional_ - is a number between 0 and 1 setting the opacity of the floor plan image, 0 being transparent and 1 opaque. _Default value: 0.5_
- `floorplan.elevationInCm` - _optional_ - is a number in centimeter setting the elevation from the ground at which the floor plan image is rendered. _Default value: 2_

[Get in touch](mailto:support@smplrspace.com) if you have thoughts on other parameters we could expose to better support your needs.

### Viewer options

You can set a number of options when starting the viewer. They are listed below in addition to the basic viewer controls documented in the [overview](./overview#start-the-viewer) page.

```ts
space.startViewer({
  // ...basicControls
  renderOptions?: RenderOptions,
  topShownLevel?: number,
  includeLevels?: number[],
  cameraPlacement?: {
    alpha: number,
    beta: number,
    radius: number,
    target: {
      x: number,
      y: number,
      z: number
    }
  },
  disableCameraControls?: boolean,
  disableCameraRotation?: boolean,
  autoRotate?: boolean,
  hideNavigationButtons?: boolean
}) => void
```

- `...basicControls` - refer to the [overview](./overview#start-the-viewer) page.
- `renderOptions` - _optional_ - is described above in [Render options](#render-options). _Default value: `{}`_.
- `topShownLevel` - _optional_ - lets you set the initial level the viewer should navigate to. See details in [Navigating levels](#navigate-levels).
- `includeLevels` - _optional_ - list of zero-based indices of the levels to render. See [`includeLevels`](#control-which-levels-are-included-in-the-render) for details.
- `cameraPlacement` - _optional_ - set the initial position and direction of the camera. See [camera controls](./custom-ux#camera-controls) for more details.
- `disableCameraControls` - _optional_ - set this to true so the camera placement cannot be changed by the user. This disables mouse, touch and keyboard inputs as well as removes the zoom control buttons. _Default value: false_
- `disableCameraRotation` - _optional_ - set this to true to force a top view of the scene. It essentially gets the interactivity to match the 2D mode, but in 3D mode. _Default value: false_
- `autoRotate` - _optional_ - set this to true to have the viewer spin around the space automatically. You can also start, set the rotation speed, and stop the rotation as described [below](#auto-rotate-the-viewer). _Default value: false_
- `hideNavigationButtons` - _optional_ - set this to true if you want the user to control the camera but want to remove the navigation buttons. Mouse, touch and keyboard inputs will work while the buttons are hidden. _Default value: false_

## Viewer controls

### Update render options dynamically

Render options are described in details in [Render options](#render-options). They can be set when the viewer starts, but if you need to update them dynamically, you should use the method below:

```ts
space.updateRenderOptions(options: RenderOptions) => void
```

- `options` is an object of the [`RenderOptions`](#render-options) interface, which is deeply merged with the current options used by the viewer. To "unset" an optional value, you can pass `undefined` explicitely.

### Navigate levels

This is the programmatic equivalent to pressing the level buttons in the bottom-left controls:

```ts
space.showUpToLevel(levelIndex: number) => void
```

- `levelIndex` - zero-based index of the top level you want to see. For example, setting `levelIndex` to `2` is equivalent to pressing the `L3` button.

You can also reset the viewer back to showing all the levels with:

```ts
space.showAllLevels() => void
```

### Control which levels are included in the render

When you have a multi-storey building but would like to only render a few floors, you can call this method:

```ts
space.includeLevels(levelIndices: number[]) => void
```

- `levelIndices` - list of zero-based indices of the levels to render. See [Navigating levels](#navigate-levels) to learn more about `levelIndex` or level indices.

You can also reset the viewer back to rendering all levels with:

```ts
space.includeAllLevels() => void
```

## Camera controls

### Get the camera placement

`space.startViewer` lets you define the initial placement of the camera using the `cameraPlacement` option. You would typically embed the viewer and have an interface to retrieve one or more placement(s) to be stored in your database. You can then load any placement object from your database to set the initial value. The camera placement can be retrieved with the following function:

```ts
space.getCameraPlacement() => ({
  alpha: number,
  beta: number,
  radius: number,
  target: {
    x: number,
    y: number,
    z: number
  }
})
```

The "placement" is a Javascript object that includes the position and direction of the camera. It is defined as an orbit position (alpha, beta, radius) around a target point which the camera points towards.

- `alpha` is the angle given in radians of the camera's position in the horizontal plane. `-Math.PI/2` corresponds to position of the 2D editor.
- `beta` is the angle given in radians of the camera's position in the vertical plane. `0` corresponds to a top down view, while `Math.PI/2` corresponds to a view from the ground.
- `radius` is the distance in meters between the camera and the target point.
- `target` is an object providing the `(x,y,z)` coordinates of the target point, which is the point where the camera is pointed towards.

### Set the camera placement

You can move the camera to a specific position and have it target a specific point as well by calling the following function:

```ts
space.setCameraPlacement({
  alpha?: number | (currentValue: number) => number,
  beta?: number | (currentValue: number) => number,
  radius?: number | (currentValue: number) => number,
  target?: {
    x?: number | (currentValue: number) => number,
    y?: number | (currentValue: number) => number,
    z?: number | (currentValue: number) => number
  },
  animate?: boolean,
  animationDuration?: number
}) => void
```

- placement parameters (see description above) can be provided as the new desired value, or a function taking the current value as sole argument and returning the desired value. All parameters are _optional_ and the ones that are not provided will keep their current value.
- `animate` - _optional_ - should be set to false to jump to the new placement and true to animate the camera to the new placement. _Default value: false_
- `animationDuration` - _optional_ - defines the duration of the camera animation in seconds and should be used with animate set to true. _Default value: 0.6_

See the [controlled camera](/examples/controlled-camera) example to see this used in action.

### Center the camera on the space

This is the programmatic equivalent to pressing the center camera button in the bottom-left controls:

```ts
space.centerCamera() => void
```

### Zoom in/out

This is the programmatic equivalent to pressing the zoom buttons in the bottom-left controls:

```ts
space.zoomIn() => void
space.zoomOut() => void
```

### Auto-rotate the viewer

You can get the viewer to spin around the building at a certain speed. To start the rotation:

```ts
space.startAutoRotation(speed?: number) => void
```

- `speed` - _optional_ - sets how fast the rotation goes. _Default value: 0.8_.

To stop the rotation:

```ts
space.stopAutoRotation() => void
```

## Reacting to events from the viewer

You can add event listeners on the viewer to react to interactions happenning in it. The list of event types that can be observed is limited at the moment, and we'll be adding more based on users needs and demand.

### Event types available

The event types currently available are as follow:

- `CameraStartedMoving` - emitted once when the camera starts moving (rotate, pan, zoom)
- `CameraStoppedMoving` - emitted once when the camera stops moving

Event types can be specified as `string` value or via the `EventType` Typescript enum. Both methods are type checked if you use Typescript.

### Add a listener

```ts
space.addEventListener(event: EventType | string, handler: () => void): number
```

- `event` - one of the event type listed above.
- `handler` - a function that will be called each time the event of the provided type is emitted.

The function returns a unique `listenerId` that can be used to remove the listener.

### Remove a listener

```ts
space.removeEventListener(listenerId: number): void
```

- `listenerId` - unique id of the listener to remove, it is provided as return value when calling `addEventListener`.

### Clear listeners for a given event type

```ts
space.clearEventListeners(event: EventType | string): void
```

- `event` - one of the event type listed above.

### Clear all listeners

```ts
space.clearAllEventListeners(): void
```
