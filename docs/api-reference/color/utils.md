---
sidebar_position: 4
sidebar_label: Utilities
slug: utils
---

# Color utilities

## cssToSmplrColor

As explained in the [color mapping section](./overview#color-mapping), colors in the viewer are matching one to one to their CSS value. To convert a CSS color into its **approximate perceived** value in the viewer, you can call this function:

```ts
smplr.Color.cssToSmplrColor(c: string) => string
```

where `c` is the color string in CSS. Accepted formats are the hexadecimal value (e.g. "#2393d4") or the name of the color (e.g. "pink").

## smplrToCssColor

This is the opposite function of `cssToSmplrColor` and converts a color value as it is **approximately perceived** in the viewer, into its CSS equivalent.

```ts
smplr.Color.smplrToCssColor(c: string) => string
```
