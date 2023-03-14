---
sidebar_position: 1
sidebar_label: Overview
slug: overview
---

# Querying your data

Smplr.js makes a `smplr` object available on the global scope. One of the classes provided under this object is `QueryClient`, which exposes selected API endpoints allowing programmatic queries to retrieve or mutate your Smplrspace hosted data.

[SOON] All queries will be typed end-to-end, reducing runtime errors and improving developer experience with auto-completion.

## Constructor

To create a QueryClient instance, initialise it as follow.

```ts
const smplrClient = new smplr.QueryClient({
  organizationId: string,
  clientToken: string,
});
```

- `organizationId` is the unique identifier of your organization in Smplrspace, something like "fbc5617e-5a27-4138-851e-839446121b2e". Personal accounts are also treated as "personal organization". To get your organization's ID, head to the Developers page from the main menu.
- `clientToken` is an API token that is used to authenticate client-side requests. It is safe to have it exposed in your client code. You can manage your organisation's tokens in the Smplrspace app, by heading to the Developers page from the main menu.

## How to use it

Each query exposed via `QueryClient` return a `Promise` ([MDN docs](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)) to the resulting data, and throws structured errors if any. You can consume them and handle errors as per your preference using `Promise.then().catch()` or `async/await` with a `try/catch` block.

### Using async/await

```js
const smplrClient = new smplr.QueryClient({
  organizationId: "...",
  clientToken: "pub_...",
});

try {
  const space = await smplrClient.getSpace("your_space_id");
  // do something with the data
} catch (error) {
  // handle the error
}
```

### Using Promise.then

```js
const smplrClient = new smplr.QueryClient({
  organizationId: "...",
  clientToken: "pub_...",
});

smplrClient
  .getSpace("your_space_id")
  .then((space) => {
    // do something with the data
  })
  .catch((error) => {
    // handle the error
  });
```

### Handling errors

We're finalizing a rework of our error handling on the API side to always throw structured errors. Please do not rely too much on the shape of the errors you are currently receiving, it will be improved and documented soon.

## Queries

The query client has just been released and will be expanded on over the coming months based on user requests. For now, we support `utils` queries to check the connection and version of the API, as well as `spaces` queries to retrieve details about spaces.

Get more details in the dedicated page:

- [Utils queries](./utils)
- [Spaces queries](./spaces)

Get in touch with any use-case that would require new queries to be exposed.
