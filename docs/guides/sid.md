---
sidebar_position: 3
---

# Smplrspace IDs

## General concept

From [v2.29.0](https://changelog.smplrspace.com/v2-29-0) onward, we've started to introduce the Smplrspace ID, or SID, for our spaces (and soon other objects). This will gradually replace the UUIDs we've been using until now.

SIDs are inspired by the Object IDs used at Stripe, which are known for their superior developer experience (DX). You can learn more about their design in this excellent [blog post](https://dev.to/stripe/designing-apis-for-humans-object-ids-3o5a) by Paul Asjes. We've combined this approach with the work on [cuid2](https://github.com/paralleldrive/cuid2) by Eric Elliott and co.

This gives us IDs that are:
- shorter: `spc_hhlsysya` vs `8d33f509-323b-411f-9dda-69e6cf75efde`
- secure and collision resistant at scale
- offline compatible
- url friendly
- human readable and clear about intent, thanks to the prefix
- less prone to human errors, thanks to the prefix
- helpful to build internal tools, thanks to the prefix
- and last but not least: easy to copy, double click a SID and it works 🎉

_TL;DR: better DX and better UX._

## Prefixes in use

```
spc_    space
prj_    project
rpt_    report
rpg_    report page
ds_     data source
eqmt_   equipment
wlk_    walkthrough
pic_    picture
pano_   panorama (360° picture)
dj_     digitization job
```

That's it, pretty short list ;). More will come soon.

## Migrating from UUIDs

Right now, the deprecated UUIDs are supported to ensure backward compatiblity, but you should start planning to update your data to the new SIDs. To help you retrieve the SID for all your spaces at once, we've added the [`listSpaces`](/api-reference/queryclient/spaces#listspaces) endpoint to the QueryClient.

You can either use smplr.js and the QueryClient to help you call the endpoint in Javascript. Alternatively, below is the corresponding curl command to get the same data:

```bash
curl --request GET \
  --url https://api.smplrspace.com/smplrjs/listSpaces \
  --header 'x-smplrspace-organization-id: xxx' \
  --header 'x-smplrspace-client-token: pub_xxx'
```

- `x-smplrspace-organization-id` corresponds to `organizationId` in QueryClient and is the unique identifier of your organization in Smplrspace, something like "spc_xxx". Personal accounts are also treated as "personal organization". To get your organization's ID, head to the Developers page from the main menu.
- `x-smplrspace-client-token` corresponds to `clientToken` in QueryClient and is an API token that is used to authenticate requests. You can manage your organisation's tokens in the Smplrspace app, by heading to the Developers page from the main menu. [More info](/guides/embedding#client-tokens).