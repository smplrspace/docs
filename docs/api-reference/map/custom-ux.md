---
sidebar_position: 3
---

# Custom UX

Smplr.js provides a few options that help you customize the map experience to your requirements. We're regularly adding new options, so [reach out](https://www.smplrspace.com/support) and share what you'd like to do with it.

## Adapting the look & feel and experience

### Render options

## Viewer controls

### Get the camera placement

`map.setCameraPlacement` lets you position the camera. You would typically embed the map viewer and have an interface to retrieve one or more placement(s) to be stored in your database. You can then load any placement object from your database to set the initial value. The camera placement can be retrieved with the following function:

```ts
map.getCameraPlacement() => ({
  pitch: number
  bearing: number
  zoom: number
  center: {
    lng: number
    lat: number
  }
})
```

The "placement" is a Javascript object that includes the position and direction of the camera. It is defined as an orbit position (pitch, bearing, zoom) around a center point which the camera points towards. It is fully compatible with the [native Mapbox camera values](https://docs.mapbox.com/android/maps/guides/camera-and-animation/camera/).

- `pitch` is the angle given in degrees of the camera's position in the vertical plane. `0` corresponds to a top down view, while `90` corresponds to a view from the ground.
- `bearing` is the angle given in degrees of the camera's position in the horizontal plane. `0` faces North, `90` faces East, and `-90` or `270` faces West.
- `zoom` represents the distance to the center point. It has a value between `0` and `22`, with `0` showing the whole Earth, and `15` showing buildings.
- `center` contains the GPS coordinates of the center point in `{ lat, lng }` format.

### Set the camera placement

You can move the camera to a specific position and have it target a specific point as well by calling the following function:

```ts
map.setCameraPlacement({
  pitch?: number,
  bearing?: number,
  zoom?: number,
  center?: {
    lng: number
    lat: number
  },
  animate?: boolean,
  speed?: number
}) => void
```

- placement parameters (see description above) are the new desired value. All parameters are _optional_ and the ones that are not provided will keep their current value.
- `animate` - _optional_ - should be set to false to jump to the new placement and true to animate the camera to the new placement. _Default value: false_
- `speed` - _optional_ - defines the speed of the camera animation and should be used with animate set to true. _Default value: 1.2_