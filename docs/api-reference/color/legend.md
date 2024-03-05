---
sidebar_position: 3
sidebar_label: Legend
slug: legend
---

import Legend from '@site/src/components/Legend';

# Legend

## React component

To render the legend of a numerical color scale, you can use the `<Legend>` component as follow:

```tsx
interface LegendProps {
  colorScale: (n: number | null | undefined) => string
  domain?: [number, number]
  ticks?: Record<number, number | string>
  barStyle?: CSSProperties
  labelStyle?: CSSProperties
  correctColor?: boolean
}
<Legend {...props: LegendProps}>

// example usage with Color from smplr
<div width={200}>
  <smplr.Color.Legend
    colorScale={Color.numericScale({
      name: Color.NumericScale.Blues,
      domain: [10, 30],
    })}
    domain={[10, 30]}
    ticks={{
      10: '10°C',
      20: '20°C',
      30: '30°C',
    }}
  />
</div>
```

- `colorScale` is the numerical color scale for which the legend is rendered. It can come from our [`numericScale`](./scales#numerical-scales), or be a custom function that takes a numerical value and returns a color string.
- `domain` - _optional_ - is the range of values to render the scale for. _Default value: `[0,1]`._
- `ticks` - _optional_ - are the values to label at the bottom of the legend. It is defined as an object where the keys are the numerical values where the tick should be and the value are the labels. By default, there is one tick at each end of the legend with the numerical value displayed without formatting.
- `barStyle` - _optional_ - react style object that will be applied to the bar containing the colors.
- `labelStyle` - _optional_ - react style object that will be applied to the container of the labels. It is merged with ours: `{ fontSize: '0.8em', opacity: 0.5, height: 18 }`. We set the height manually as the labels are absolutely positioned. You may need to change the height if you change the font or its size.
- `correctColor` - _optional_ - lets you choose if the colors of the legend should be corrected to match the ones from the viewer as per the explanation in the [color mapping section](./overview#color-mapping). We correct them by default. _Default value: true._

Note that the Legend will fill the width of its container. [Get in touch](mailto:support@smplrspace.com) if you have ideas on improvements or pragmatic options we may have missed.

## Vanilla javascript

For non-react codebases, we provide a vanilla Javascript function that wraps this component and renders it into a container.

```ts
smplr.Color.drawLegend({
  containerId: string
  ...legendProps: LegendProps // see above
})

// example usage
smplr.Color.drawLegend({
  containerId: 'smplr-legend',
  colorScale: Color.numericScale({
    name: Color.NumericScale.Blues,
    domain: [10, 30],
  }),
  domain: [10, 30],
  ticks: {
    10: '10°C',
    20: '20°C',
    30: '30°C',
  },
})
```

- `containerId` is the "id" of the html container where smplr.js should render the legend, something like "smplr-legend" that can be found in your html. Only ids are supported, not classes.
- `...legendProps` represents all other options as per the [react component section](#react-component).

## Example legend

<Legend />

was rendered with the code below:

```ts
smplr.Color.drawLegend({
  containerId: "legend",
  colorScale: smplr.Color.numericScale({
    name: smplr.Color.NumericScale.RdYlBu,
    domain: [10, 30],
    invert: true,
  }),
  domain: [10, 30],
  ticks: {
    10: "10°C",
    20: "20°C",
    30: "30°C",
  },
});
```
