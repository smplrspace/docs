---
sidebar_position: 2
---

# Embedding spaces

## Embed options

### Iframe

The simplest and least powerful way to embed a Smplrspace floor plan is to use our iframe embeds. If all you require is to showcase the floor plan, with no particular option or custom data / UI, this might be what you need. Head to the [getting started section](/#iframe-embeds) to learn how.

### Loading smplr.js using our loader NPM package 🥇

💡 This is the **best and recommended** way to use smplr.js. It provides a typed library which will autocomplete in your editor and help you avoid some mistakes. It is also in line with all our examples.

👉 To learn how to use the smplr-loader NPM package, please refer to the [getting started section](/#use-our-npm-package).

### Loading smplr.js (UMD) from our CDN

This loads a single JS file (bundle) containing all the required frontend code at once. Learn more in the [getting started section](/#umd-vs-esm-bundles--tree-shaking).

Smplr.js will not be typed using this method.

```html
<!-- in the <head> section of your HTML -->
<script src="https://app.smplrspace.com/lib/smplr.js"></script>
<link href="https://app.smplrspace.com/lib/smplr.css" rel="stylesheet" />

<!-- at the end of the <body> section of your HTML -->
<script>
  const space = new smplr.Space({
    spaceId: "spc_xxx",
    clientToken: "pub_xxx",
    containerId: "xxx",
  });
  space.startViewer({
    preview: true,
    onReady: () => console.log("Viewer is ready"),
    onError: (error) => console.error("Could not start viewer", error),
  });
</script>
```

### Loading smplr.js (ESM) from our CDN

This lazy loads our code at runtime as ES Modules (ESM) and supports tree shaking for faster load times. Learn more in the [getting started section](/#umd-vs-esm-bundles--tree-shaking).

Smplr.js will not be typed using this method.

```html
<!-- in the <head> section of your HTML -->
<link href="https://app.smplrspace.com/lib/smplr.css" rel="stylesheet" />

<!-- at the end of the <body> section of your HTML -->
<!-- this technique uses dynamic imports -->
<script>
  import("https://app.smplrspace.com/lib/smplr.mjs").then((smplr) => {
    const space = new smplr.Space({
      spaceId: "spc_xxx",
      clientToken: "pub_xxx",
      containerId: "xxx",
    });
    space.startViewer({
      preview: true,
      onReady: () => console.log("Viewer is ready"),
      onError: (error) => console.error("Could not start viewer", error),
    });
  });
</script>
```

### Embed in a Next.js app

We're not Next.js developers ourselves, but from what we understand from users building on Next.js, the `smplr-loader` package may not work due to its use of dynamic imports.

Here is how they've approached it.

- Use the [`Script` component](https://nextjs.org/docs/pages/api-reference/components/script) to load the library.
- Optionally use `smplr-loader` to get the types, but do not load the library with it.

You can refer to [this gist](https://gist.github.com/sean-ocallahan/48bed44902c0bc7eda6de42af14d9d25) shared by the amazing Sean at Strella!

Another thing to note is that you may need to disable TurboPack in recent versions of Next.js as it seems to be incompatible with on-the-fly loading of libraries.

## Securing your data

We take the security and privacy of your data with great importance. Smplrspace was built from the get go with the mindset that you should own your data and it should not transit through our servers when not necessary. This is why the data layers are built around frontend APIs that let you "stitch" data that you pull yourself from your own storage. That data never transits through our servers, neither do we have visibility over it even existing.

In addition, we do our best to protect the data that we do store (your floor plans) from unintended access. Below are the few features that you can rely on to secure their access.

### Client tokens

Client tokens are keys required when requesting a floor plan. The request will only be processed if the token provided [in the Space object](/api-reference/space/overview#constructor) matches one of the organisation's token. To manage your tokens, head to the Developers page in the Smplrspace app, which is accessible from the main menu. You can create as many tokens as needed and revoke them anytime. We advise to rotate the tokens on a regular basis for increased protection.

### Authorized domains

Another efficient way to secure access to your floor plans is to restrict which domains are authorized to make requests to access them. To manage the authorized domains, head to the Developers page in the Smplrspace app, which is accessible from the main menu. You can add as many authorized domains or subdomains as you need. You can use wildcards such as `*.smplrspace.com` to allow multiple subdomains. We use glob patterns and match them using [minimatch](https://github.com/isaacs/minimatch). The default value is `*` and allows any domain. An empty value behaves like `*`.

### Content Security Policy (CSP)

Adding a CSP directive to your app is an added layer of security that helps to detect and mitigate certain types of attacks, including Cross-Site Scripting (XSS) and data injection attacks. It can be configured through having your server return the `Content-Security-Policy` HTTP header, or by adding a `<meta>` element to the `<head>` section of your page. Below is the minimal CSP required to be able to use smplr.js.

```html
<meta
  http-equiv="Content-Security-Policy"
  content="default-src 'self'; script-src 'self' 'unsafe-inline' 'wasm-unsafe-eval' 'unsafe-eval' *.smplrspace.com; style-src 'self' 'unsafe-inline'; font-src 'self' *.smplrspace.com; img-src * data: blob:; media-src * data:; connect-src *; worker-src 'self' blob:;"
/>
```

Here is a breakdown of the directive:

- `*.smplrspace.com` is added as a domain to load the library and the fonts used in the viewer.
- `unsafe-inline` for scripts and styles is commonly used for React app, our viewer is React based.
- `img-src * data:` and `media-src * data:` are needed to load assets from storage locations.
- `connect-src *` is needed to load other assets and supports error reporting.
- `wasm-unsafe-eval` allows the usage of the draco decoder [over WASM](https://github.com/WebAssembly/content-security-policy/issues/7). _It can be omitted if your floor plans do not use non-parametric 3D equipment models_.
- `unsafe-eval` allows the usage of the draco decoder [over WASM in iOS Safari](https://bugs.webkit.org/show_bug.cgi?id=235408). _It can be omitted if your floor plans do not use non-parametric 3D equipment models or do not target iOS Safari as a browser_.
- `worker-src 'self' blob:` is required by the draco decoder as well. _It can be omitted if your floor plans do not use non-parametric 3D equipment models_.
