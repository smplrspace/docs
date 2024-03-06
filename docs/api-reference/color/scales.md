---
sidebar_position: 2
sidebar_label: Scales
slug: scales
---

# Color scales

## Numerical scales

### numericScale

This function lets you quickly create scales that map numerical values to colors, and comes with a number of [best practice](./overview#a-little-context) scales, as well as options to customize them.

```ts
smplr.Color.numericScale({
  name: NumericScale | string
  domain?: [number, number]
  invert?: boolean
  padding?: number | [number, number]
  gamma?: number
  brighten?: number
  saturate?: number
  nodata?: string
  classes?: number | number[]
}) => ((n: number | null | undefined) => string)

// example
smplr.Color.numericScale({
  name: smplr.Color.NumericScale.RdYlBu,
  domain: [10, 30],
  invert: true,
})
```

- `name` is the identifier of the scale. See below for the list of available scales. You can either pass it as a string - `'OrRd'`, or using our provided enum for typesafety and autocompletion - `smplr.Color.NumericScale.OrRd`.
- `domain` - _optional_ - is typically the range of values that will be passed to the scale. It is an array of 2 numbers, where the first number is mapped to the start of the scale, and the second number is mapped to the end of the scale. Values lower than the domain will be mapped to the start of the scale, and values higher to the end. _Default value: `[0,1]`._
- `invert` - _optional_ - is a boolean used to invert the scale, or swap its start and end. _Default value: false._
- `padding` - _optional_ - reduces the color range by cutting off a fraction of the scale. A single number applies the same padding to both ends, while an array lets you pad differently on the start and the end of the scale. Negative values can be used to compress the scale and extend its extreme values. _Default value: 0._
- `gamma` - _optional_ - is used to "shift" a scale's center more the the beginning (gamma < 1) or end (gamma > 1). _Default value: 1._
- `brighten` - _optional_ - is used to change the lightness of the scale. Positive values brightens it, while negative values darkens it. _Default value: 0._
- `saturate` - _optional_ - is used to change the saturation of the scale. Positive values saturates it, while negative values desaturates it. _Default value: 0._
- `nodata` - _optional_ - is the color used when the value passed to the scale is not valid. _Default value: #6a6c6c._
- `classes` - _optional_ - is used to return a distinct set of colors instead of a continuous scale. A number generates a scale broken into equi-distant classes, while an array lets you choose the "breakpoints" to use for the classes.

The scales available are:

- single hue sequential scales: Oranges, Reds, Greens, Purples, Greys, Blues - from [ColorBrewer](https://colorbrewer2.org).
- multi-hue sequential scales: OrRd, PuBu, BuPu, BuGn, YlOrBr, YlGn, RdPu, YlGnBu, GnBu, YlOrRd, PuRd, PuBuGn – from [ColorBrewer](https://colorbrewer2.org), and Viridi initially from [Matplotlib](https://bids.github.io/colormap/).
- diverging scales: Spectral, RdYlGn, RdBu, PiYG, PRGn, RdYlBu, BrBG, RdGy, PuOr - from [ColorBrewer](https://colorbrewer2.org).

The [air quality](/examples/air-quality) example uses `numericScale` and can be used as a code playground to test out the options.

## Categorical scales

### categoryScale

This function lets you quickly map a discrete number of named categories to colors. It comes with fallback color built-in, as well as type safe categories.

```ts
smplr.Color.numericScale<C extends string>({
  categories: Record<C, string>
  nodata?: string
}): ((category: C) => string)

// example
smplr.Color.categoryScale({
  categories: {
    sunny: 'yellow',
    rainy: 'blue',
    cloudy: 'grey'
  },
})
```

- `categories` is an object matching category names to colors.
- `nodata` - _optional_ - is the color used when the value passed to the scale is not a known category. _Default value: #6a6c6c._

Typescript tip: You may disable category typesafety by passing a "loose" type hint to the function: `categoryScale<string>({...})`.

### ragScale

This function is built on top of `categoryScale` and provide a shortcut for red/amber/green scenarios. Here, the scale comes with pre-defined and optimized RAG colors, that can be customized. And the values "red", "amber", and "green" are always valid for quick testing.

```ts
smplr.Color.ragScale<C extends string | 'red' | 'amber' | 'green'>({
  categories?: Partial<Record<'red' | 'amber' | 'green', C>>
  colors?: {
    red?: string
    amber?: string
    green?: string
  }
  nodata?: string
}): ((category: C) => string)

// example
smplr.Color.ragScale({
  categories: {
    red: 'vacant',
    amber: 'expiring',
    green: 'occupied',
  },
})
```

- `categories` - _optional_ - is an object matching category names to the RAG classes. _Default value: `{ red: 'red', amber: 'amber', green: 'green' }`._
- `colors` - _optional_ - is an object used to provide custom RAG colors. _Default value: `{ red: '#ff3f34', amber: '#c77a15', green: '#3aa655' }`._
- `nodata` - _optional_ - is the color used when the value passed to the scale is not a known category. _Default value: #6a6c6c._

Typescript tip: You may disable category typesafety by passing a "loose" type hint to the function: `ragScale<string>({...})`.
