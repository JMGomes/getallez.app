# getallez.app

The website of the Allez interval timer. Three static pages, no build step.

| Path | Purpose |
|---|---|
| `/` | The landing page. |
| `/privacy/` | The privacy policy. Both app stores link to it. |
| `/support/` | The support page. The App Store links to it, and the app opens it from Settings. |

GitHub Pages serves the `main` branch as it is. The `CNAME` file binds the
custom domain, and `.nojekyll` stops Pages from running Jekyll over the
files.

## DNS at the registrar

The domain is registered at GoDaddy. Pages needs these records:

| Type | Name | Value |
|---|---|---|
| A | `@` | `185.199.108.153` |
| A | `@` | `185.199.109.153` |
| A | `@` | `185.199.110.153` |
| A | `@` | `185.199.111.153` |
| CNAME | `www` | `jmgomes.github.io` |

Delete the parked A record and the parked `www` record that GoDaddy adds
by default. The mail records for `support@getallez.app` come from iCloud+
and live next to these.

## Brand assets

The favicons, the app icon and the social card in `assets/` are copies from
the design package at `allez/logos_design/app_icons_allez` (v2, Space
Grotesk wordmark). When that package changes, copy the files again; do not
edit them here.

## Keeping the privacy policy true

The policy states what the app does. When the app changes in a way the
policy covers, change the policy in the same week and move the date at the
top. The cases to watch: adding analytics, adding a crash reporter, adding
any network call that is not the purchase, and asking for a new permission.
