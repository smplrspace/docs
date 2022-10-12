---
sidebar_position: 2
---

# Embedding spaces

## Embed options

### Iframe

The simplest and least powerful way to embed a Smplrspace floor plan is to use our iframe embeds. If all you require is to showcase the floor plan, with no particular option or custom data / UI, this might be what you need. Head to the [getting started section](/#iframe-embeds) to learn how.

### Custom embeds via smplr.js

In order to customize the experience of the floor plans or layer on your own data on top of them, you should be using our Javascript library, smplr.js. Head to the [getting started section](/#smplrjs-embeds) to learn how.

### Loading smplr.js in React

For React users, you're in luck! Smplrspace is a React house as well so you can use our home made hooks to load smplr.js. The hooks source code is available on the docs repo in the [hooks folder](https://github.com/smplrspace/docs/tree/main/src/hooks). We suggest you copy these hooks in your source code directly.

You can use the default export or the named one `useSmplrJsUMD` which relies on `useScript` to load the UMD bundle and `useStylesheet` to load the CSS file. You can also use the named export `useSmplrJsESM` to load the ESM bundle (recommended) as well as the CSS file.

You can refer to the [hello world example](/examples/hello-world) to see a minimal page using this approach. All [examples](/examples) provided in this docs are using the `useSmplrJs` hook.

### Other frameworks

We imagine that you should be able to adapt the instructions for vanilla JS and React above to adapt tp your framework of choice. Of course we welcome any contributions to add guides for other frontend frameworks – click "Edit this page" below and open a PR anytime!

## Securing your data

We take the security and privacy of your data with great importance. Smplrspace was built from the get go with the mindset that you should own your data and it should not transit through our servers when not necessary. This is why the data layers are built around frontend APIs that let you "stitch" data that you pull yourself from your own storage. That data never transits through our servers, neither do we have visibility over it even existing.

In addition, we do our best to protect the data that we do store (your floor plans) from unintended access. Below are the few features that you can rely on to secure their access.

### Client tokens

Client tokens are keys required when requesting a floor plan. The request will only be processed if the token provided [in the Space object](/api-reference/space/overview#constructor) matches one of the organisation's token. To manage your tokens, head to your [account settings](https://app.smplrspace.com/account) and scroll down to the "Organisation settings" section (see screenshot below). You can create as many tokens as needed and revoke them anytime. We advise to rotate the tokens on a regular basis for increased protection.

### Authorised domains

Another efficient way to secure access to your floor plans is to restrict which domains are authorised to make requests to access them. To manage the authorised domains, head to your [account settings](https://app.smplrspace.com/account) and scroll down to the "Organisation settings" section (see screenshot below). The domains are set as a comma-separated list such as `app.example.com,www.site.io`. You can use wildcards such as `*.smplrspace.com` to allow multiple subdomains. We use glob patterns and match them using [minimatch](https://github.com/isaacs/minimatch). The default value is `*` and allows any domain. An empty value behaves like `*`.

![Organisation settings](/img/guides/org-settings.png)

### Content Security Policy (CSP)

Adding a CSP directive to your app is an added layer of security that helps to detect and mitigate certain types of attacks, including Cross-Site Scripting (XSS) and data injection attacks. It can be configured through having your server return the `Content-Security-Policy` HTTP header, or by adding a `<meta>` element to the `<head>` section of your page. Below is the minimal CSP required to be able to use smplr.js.

```html
<meta
  http-equiv="Content-Security-Policy"
  content="default-src 'self'; script-src 'self' 'unsafe-inline' 'wasm-unsafe-eval' 'unsafe-eval' *.smplrspace.com; style-src 'self' 'unsafe-inline'; font-src 'self' *.smplrspace.com; img-src * data:; media-src * data:; connect-src *; worker-src 'self' blob:;"
/>
```

Here is a breakdown of the directive:

- `*.smplrspace.com` is added as a domain to load the library and the fonts used in the viewer.
- `unsafe-inline` for scripts and styles is commonly used for React app, our viewer is React based.
- `img-src * data:` and `media-src * data:` are needed to load assets from storage locations.
- `connect-src *` is needed to load other assets and supports error reporting.
- `wasm-unsafe-eval` allows the usage of the draco decoder [over WASM](https://github.com/WebAssembly/content-security-policy/issues/7). _It can be omitted if your floor plans do not use non-parametric 3D furniture models_.
- `unsafe-eval` allows the usage of the draco decoder [over WASM in iOS Safari](https://bugs.webkit.org/show_bug.cgi?id=235408). _It can be omitted if your floor plans do not use non-parametric 3D furniture models or do not target iOS Safari as a browser_.
- `worker-src 'self' blob:` is required by the draco decoder as well. _It can be omitted if your floor plans do not use non-parametric 3D furniture models_.
