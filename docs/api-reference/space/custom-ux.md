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
