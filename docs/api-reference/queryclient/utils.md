---
sidebar_position: 2
---

# Utils

## checkApiConnection

To check the connection to the API and validate your client configuration, you can call the following method. It will either return "OK" or throw an error.

```ts
smplrClient.checkApiConnection() => Promise<"OK">
```

## getApiVersion

You can request the API version to programmatically validate that your client (smplr.js in this case) is at the same version as the API.

```ts
smplrClient.getApiVersion() => Promise<string>
```

## Need anything else?

Get in touch with any use-case that would require new queries to be exposed.
