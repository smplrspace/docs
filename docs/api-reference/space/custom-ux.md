---
sidebar_position: 3
---

# Custom UX

Smplr.js provides a few options that help you customize the floor plan experience to your requirements. We're regularly adding new options, so [reach out](https://www.smplrspace.com/support) and share what you'd like to do with it.

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
