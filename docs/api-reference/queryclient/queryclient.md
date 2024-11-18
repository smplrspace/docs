---
sidebar_position: 1
sidebar_label: Overview
slug: overview
---

# Querying your data

Smplr.js provides a `smplr` object. One of the classes provided under this object is `QueryClient`, which exposes capabilities generally related to the extraction of information out of your floor plans and spatial data. Here are a few examples:

- call selected backend API endpoints allowing programmatic queries to retrieve or mutate your Smplrspace hosted data,
- extract furniture listings or information from the floor plans,
- compute distances, areas, and the like from mapped data,
- compute centers, bounding boxes, concave hulls,
- ask if a point or a piece of furniture is located within a given boundary,
- and we're adding queries based on demand, so [get in touch](mailto:support@smplrspace.com) and share your use-case.

Most queries are typed end-to-end, reducing runtime errors and improving developer experience with auto-completion.

## Constructor

To create a QueryClient instance, initialise it as follow.

```ts
const smplrClient = new smplr.QueryClient({
  organizationId: string,
  clientToken: string,
});
```

- `organizationId` is the unique identifier of your organization in Smplrspace, something like "fbc5617e-5a27-4138-851e-839446121b2e". Personal accounts are also treated as "personal organization". To get your organization's ID, head to the Developers page from the main menu.
- `clientToken` is an API token that is used to authenticate client-side requests. It is safe to have it exposed in your client code. You can manage your organisation's tokens in the Smplrspace app, by heading to the Developers page from the main menu. [More info](/guides/embedding#client-tokens).

## How to use it

Some queries exposed via `QueryClient` are synchronous, while others return a `Promise` ([MDN docs](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)) to the resulting data, and throw structured errors if any. You can consume such queries and handle errors as per your preference using `Promise.then().catch()` or `async/await` with a `try/catch` block.

We also provide a synchronous version for most asynchronous queries, relying on the caching of the space information fetched from the API. So, e.g., if you need to get the location of a bunch of furniture pieces, you can call `getSpace` once and then map over furniture synchronously to extract the location with `getFurnitureByIdFromCache`.

### Using async/await

```js
const smplrClient = new smplr.QueryClient({
  organizationId: "xxx",
  clientToken: "pub_xxx",
});

try {
  const space = await smplrClient.getSpace("spc_xxx");
  // do something with the data
} catch (error) {
  // handle the error
}
```

### Using Promise.then

```js
const smplrClient = new smplr.QueryClient({
  organizationId: "xxx",
  clientToken: "pub_xxx",
});

smplrClient
  .getSpace("spc_xxx")
  .then((space) => {
    // do something with the data
  })
  .catch((error) => {
    // handle the error
  });
```

## Queries

The query client is pretty recent and will fast evolving based on user requests. Below are the type of queries currently supported. Get more details in the dedicated page.

- [Utility queries](./utils): check the connection and version of the API.
- [Spaces queries](./spaces): retrieve details about your spaces.
- [Furniture queries](./furniture): extract furniture from your spaces.
- [Geometry queries](./geometry): compute dimensions and perform geometrical simplifications of your data.

[Get in touch](mailto:support@smplrspace.com) with any use-case that would require new queries to be exposed.
