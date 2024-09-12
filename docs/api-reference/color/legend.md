---
sidebar_position: 3
sidebar_label: Legends
slug: legend
---

import Legend from '@site/src/components/Legend';
import ColorSwatches from '@site/src/components/ColorSwatches';
import IconsSwatches from '@site/src/components/IconsSwatches';

# Legends

## Numerical scale legends

### React component

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
      name: Color.NumericScale.RdYlBu,
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

### Vanilla javascript

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
    name: Color.NumericScale.RdYlBu,
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
- `...legendProps` represents all other options as per the previous section.

### Example

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

## Categorical scale legends

### React component

To render the legend of a numerical color scale, you can use the `<ColorSwatches>` component as follow:

```tsx
interface ColorSwatchesProps {
  swatches: {
    color: string
    label: string
    group?: string
  }[]
  size?: number
  correctColor?: boolean
  noLabels?: boolean
}
<ColorSwatches {...props: ColorSwatchesProps}>

// example usage with Color from smplr
<smplr.Color.ColorSwatches
  swatches={[
    {
      color: 'red',
      label: 'Alert',
    },
    {
      color: 'orange',
      label: 'Warning',
    },
    {
      color: 'green',
      label: 'All ok',
    },
  ]}
/>
```

- `swatches` defines the colors and labels used for the swatches. Note that an optional group can be provided to create multiple lines with a label ahead of each group. You can refer to the [`ragSwatches`](/api-reference/color/scales#ragscale) and [`categorySwatches`](/api-reference/color/scales#categoryscale) helpers to generate swatches for categorical scales generated with our functions.
- `size` - _optional_ - is the size in pixels of each swatch. _Default value: 10._
- `correctColor` - _optional_ - lets you choose if the colors of the legend should be corrected to match the ones from the viewer as per the explanation in the [color mapping section](./overview#color-mapping). We correct them by default. _Default value: true._
- `noLabels` - _optional_ - set this to true to hide labels. _Default value: false._


### Vanilla javascript

For non-react codebases, we provide a vanilla Javascript function that wraps this component and renders it into a container.

```ts
smplr.Color.drawColorSwatches({
  containerId: string
  ...swatchesProps: ColorSwatchesProps // see above
})

// example usage
smplr.Color.drawColorSwatches({
  containerId: 'smplr-legend',
  swatches: [
    {
      color: 'red',
      label: 'Alert',
    },
    {
      color: 'orange',
      label: 'Warning',
    },
    {
      color: 'green',
      label: 'All ok',
    },
  ]
})
```

- `containerId` is the "id" of the html container where smplr.js should render the legend, something like "smplr-legend" that can be found in your html. Only ids are supported, not classes.
- `...swatchesProps` represents all other options as per the previous section.

### Example

<ColorSwatches />

was rendered with the code below:

```ts
smplr.Color.drawColorSwatches({
  containerId: 'smplr-legend',
  swatches: [
    {
      color: 'red',
      label: 'Alert',
    },
    {
      color: 'orange',
      label: 'Warning',
    },
    {
      color: 'green',
      label: 'All ok',
    },
  ]
});
```

## Icons legends

### React component

To render the legend of a numerical color scale, you can use the `<IconsSwatches>` component as follow:

```tsx
interface IconsSwatchesProps {
  icons: {
    url: string
    label: string
    group?: string
  }[]
  height?: number
  noLabels?: boolean
}
<IconsSwatches {...props: IconsSwatchesProps}>

// example usage with Color from smplr
<smplr.Color.IconsSwatches
  icons={[
    {
      url: 'https://retail.smplrspace.io/img/electric.png',
      label: 'EV charging',
    },
    {
      url: 'https://retail.smplrspace.io/img/wheelchair.png',
      label: 'Reduced mobility',
    }
  ]}
/>
```

- `icons` defines the icons and labels used for the swatches. Note that an optional group can be provided to create multiple lines with a label ahead of each group.
- `height` - _optional_ - is the height in pixels of each swatch. _Default value: 16._
- `noLabels` - _optional_ - set this to true to hide labels. _Default value: false._


### Vanilla javascript

For non-react codebases, we provide a vanilla Javascript function that wraps this component and renders it into a container.

```ts
smplr.Color.drawIconsSwatches({
  containerId: string
  ...swatchesProps: IconsSwatchesProps // see above
})

// example usage
smplr.Color.drawIconsSwatches({
  containerId: 'smplr-legend',
  icons: [
    {
      url: 'https://retail.smplrspace.io/img/electric.png',
      label: 'EV charging',
    },
    {
      url: 'https://retail.smplrspace.io/img/wheelchair.png',
      label: 'Reduced mobility',
    }
  ]
})
```

- `containerId` is the "id" of the html container where smplr.js should render the legend, something like "smplr-legend" that can be found in your html. Only ids are supported, not classes.
- `...swatchesProps` represents all other options as per the previous section.

### Example

<IconsSwatches />

was rendered with the code below:

```ts
smplr.Color.drawIconsSwatches({
  containerId: 'smplr-legend',
  icons: [
    {
      url: 'https://retail.smplrspace.io/img/electric.png',
      label: 'EV charging',
    },
    {
      url: 'https://retail.smplrspace.io/img/wheelchair.png',
      label: 'Reduced mobility',
    }
  ],
  height: 20
});
```