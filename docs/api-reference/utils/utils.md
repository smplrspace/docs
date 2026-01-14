---
sidebar_label: Overview
slug: overview
sidebar_position: 1
---

# Utilities

Smplr.js makes a `smplr` object available on the global scope. `Utils` is a namespace available under this object. It provides a variety of small utility functions and types that can be useful when working with Smplrspace.

## Working with Smplrspace IDs

The guiding principles of Smplrspace IDs are documented on [this page](/guides/sid). In your code, the Space ID is used a lot and we provide a type and a function to valid strings against this type.

```ts
type SpaceSid = `spc_${string}`
function isSpaceSid: (s: string) => s is SpaceSid
```