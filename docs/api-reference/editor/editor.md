---
sidebar_label: Overview
slug: overview
sidebar_position: 1
---

# Embedding the editor

Smplr.js makes a `smplr` object available on the global scope. One of the classes provided under this object is the `Editor` class. It provides the API necessary to embed the Smplrspace editor into your app and manage 3rd-party authenticated sessions to edit a space. By 3rd-party authenticated, we mean that you authenticate and identify the users, not us.

## Constructor

To create an Editor instance, initialise it as follow.

```ts
const editor = new smplr.Editor({
  spaceId: string
  user: {
    id: string
    name?: string
    picture?: string
  }
  clientToken: string
  containerId: string
  disableErrorReporting?: boolean
  whiteLabel?: boolean
}) => Editor
```

- `spaceId` is the unique identifier of the space in Smplrspace, something like "spc_xxx". Refer to the [page on SIDs](/guides/sid) to learn more.
- `user` is an object used to identify who is making the changes on the space.
  - `id` is a required unique identifier for the user. It does not represent anything on the Smplrspace side, it should most likely be your own internal `id`. It is used to track who made the changes.
  - `name` is an optional user-readable name for the user. The value is used in the Smplrspace app to indicate who made the changes. If you decide not to indicate the name, the app will indicate that "Someone" made the changes. This is purely an optional to improve your team's user experience of the Smplrspace app.
  - `picture` is an optional URL used as the avatar of the person who made changes in the app. If you decide not to provide a picture, the avatar will not be displayed in the app. This is purely an optional to improve your team's user experience of the Smplrspace app.
- `clientToken` is an API token that is used to authenticate client-side requests. It is safe to have it exposed in your client code. You can manage your organisation's tokens in the Smplrspace app, by heading to the Developers page from the main menu. [More info](/guides/embedding#client-tokens).
- `containerId` is the "id" of the html "div" container where smplr.js should render the editor, something like "smplr-container" that can be found in your html. Only ids are supported, not classes.
- `disableErrorReporting` - _optional_ - can be set to "true" to disable the automated reporting of errors to our 3rd party error tracking tool, [Sentry](https://sentry.io/). We have discovered that Sentry's instrumentation could make it seem as if all network requests originated from smplr.js. Unfortunately, there is nothing simple we can do on our side to avoid that. If this is an issue for you, you can disable Sentry altogether. The tradeoff is that we will not automatically detect errors hapenning in your integration, and you may need to be more proactive to report them for us to roll out fixes.
- `whiteLabel` - _optional_ - can be set to "true" to remove the "Powered by Smplrspace" attribution from the editor. This is a paid add-on. You can check if it is enabled from the Organization settings page. [Get in touch](mailto:hello@smplrspace.com) to learn more. _Note: there is currently no attribution in the editor, but there might be in the future._

See also the [live example](/examples/embedded-editor).

## Editor sessions

### Start a session

To initiate an editor session, use the following code.

```ts
editor.startSession({
  loadingMessage?: string
  onReady?: () => void
  onError?: (errorMessage: string) => void
}) => void
```

- `loadingMessage` - _optional_ - lets you override the text displayed while the space is loading. _Default value: "Loading the editor"_.
- `onReady` - _optional_ - is called once the editor has successfully initialized.
- `onError` - _optional_ - is called if an error occur while starting the editor.

### End a session

To stop the session, dispose of resources it allocated, and clear the container in which it is rendered back to its original state, call the following function.

```ts
editor.remove() => void
```
