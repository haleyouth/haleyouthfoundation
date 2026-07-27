# Haleyouth Foundation, Ad Grants re-review and fixes (2026-07-09)

**Context:** The Ad Grants activation request was rejected with:

> "Your organisation's website doesn't meet the Ad Grants website policy standards.
> Change the website to load quickly and have clear navigation. Include substantial,
> up-to-date content and calls to action."

The earlier review (`AD_GRANTS_REVIEW.md`, May 2026) covered the machine-readable and
legal gaps (sitemap, robots, JSON-LD, metadata, cookie banner, not-found/error pages),
and those are now in the codebase. This rejection is about a different set of criteria:
**load speed, navigation, content substance and freshness, and calls to action.** A
full security pass was done at the same time.

This document records what was changed in this pass and the manual steps that only you
can complete.

---

## 1. What was fixed in this pass (done in code)

### Load speed (the primary rejection reason)

- **Images converted to WebP at web sizes.** `output: "export"` disables Next.js image
  optimisation, so the browser was downloading raw JPEGs up to 566 KB each. Added
  `scripts/optimize-images.mjs` (uses `sharp`, already installed) which compresses
  `public/images/events` and `public/images/partners` to WebP. It runs automatically on
  every build via the `prebuild` npm script.
  - Event photos: **4.61 MB → 1.99 MB (-57%)**. Hero images dropped from ~505-566 KB to ~225-264 KB.
  - Partner logos: crushed 85-95% (e.g. `prelli.png` 215 KB → 10 KB).
- **SDG icons resized in place**: `public/images/sdgs` **867 KB → 53 KB** (were 192px+ PNGs rendered at ~96px).
- **All image references rewired to `.webp`** in `src/lib/constants.ts`, `src/app/news/page.tsx`,
  `src/components/home/AboutPreview.tsx`, and the `about/*` pages. Verified: the built HTML
  contains zero leftover `.jpg`/`.jpeg` event references.
- **Raw `<img>` on the impact page** (SDG tiles) now has `width`, `height`, `loading="lazy"`,
  `decoding="async"`, and a descriptive alt, removing layout shift and eager loading.

### Security

- **`firebase.json` security headers added.** Previously only `X-Frame-Options`. Now also:
  `Content-Security-Policy` (scoped to the Firebase/Analytics/Flipsnack origins the app
  actually uses), `Strict-Transport-Security`, `X-Content-Type-Options: nosniff`,
  `Referrer-Policy`, `Permissions-Policy`, and `Cross-Origin-Opener-Policy`.
- **`firestore.rules` locked down (this was a real data-exposure issue).** The rules
  previously had `allow read, update, delete: if true` on every submissions collection and
  `allow read, write: if true` on every admin collection, meaning **anyone on the internet
  could read all donor/volunteer personal data and edit or delete site content.** Now:
  - Public visitors can only **create** submissions (never read/update/delete them).
  - Site content stays public-read, but **writes require Firebase authentication**.
  - Field-count guards added to limit junk writes.
- **Admin login migrated to Firebase Authentication (done in code).** The hardcoded email
  and password and the `localStorage` "auth" flag are gone. New `src/lib/admin-auth.ts`
  wraps Firebase Auth (`signInWithEmailAndPassword`, `onAuthStateChanged`, `signOut`) and
  is dynamically imported so `firebase/auth` stays out of the public site bundle. The login
  page and admin layout now use it, and admin Firestore writes carry the signed-in auth
  token, satisfying the new rules. Two console steps remain (see below).

### Content freshness and calls to action

- **News page updated.** Added two current 2026 items (CIL Academy partnership, Voices of
  the Middle Belt Ebira corpus) so the newest content is recent, not December 2025.
- **Removed the "more news coming soon" line** and replaced it with a real call-to-action
  block (Donate + Volunteer buttons). Google specifically flagged missing CTAs.

### Dependency security

- **`npm audit`: 8 vulnerabilities → 2.** Ran `npm audit fix` (patched the critical
  `protobufjs` code-execution advisory, the high `@grpc/grpc-js` crash, and the `js-yaml`
  and `brace-expansion` DoS issues) and bumped `next` 16.2.2 → 16.2.10 (a same-minor patch)
  to clear the Next.js DoS advisory. The remaining 2 (moderate) are a `postcss` advisory
  bundled inside Next.js itself; `npm audit fix --force` would *downgrade* Next to 9.3.3
  (a breaking change), so they are left as-is. They are a build-time CSS tool with no
  runtime exposure on a static site, and clear when Next.js ships its own postcss bump.

### Ad Grants conversion tracking (GA4)

- **Added `logConversion` in `src/lib/firebase.ts`** and wired conversion events into every
  form: `contact_submitted`, `volunteer_applied`, `partner_applied`, `newsletter_signup`,
  and `donate_intent` + `donate_submitted` (with amount, currency, and program params).
  Events respect cookie consent, load `firebase/analytics` dynamically, and never block a
  form submission. Ad Grants requires at least one valid conversion event to keep the
  account active. One GA4 console step remains (see below).

Verified with a clean production build (all 44 routes prerender, including `sitemap.xml`,
`robots.txt`, and all 11 program pages) and a clean lint pass on the changed files.

---

## 2. Manual steps you must complete (cannot be done in code)

These are required before or right after resubmitting.

1. **Deploy the changes.** Run `npm run deploy:full` (this deploys hosting AND the new
   Firestore rules). Deploying only hosting will leave the open database rules live.

2. **Add a phone number.** `SITE_CONFIG.phone` in `src/lib/constants.ts` is still empty.
   Ad Grants reviewers treat a verifiable phone line as a strong legitimacy signal. Add a
   real number (a Google Voice or VOIP line routing to the office is fine), then it will
   render on Contact and in the Footer. I did not invent one, because a fake number is
   worse than none.

3. **Finish the admin auth setup in the Firebase console.** The code migration to Firebase
   Authentication is done (see §1), and Email/Password sign-in is now enabled. One step
   remains before admin login works:
   - **Create the admin user:** Authentication → Users → Add user, with the admin email and
     a **new strong password** (do not reuse `Main@Admin54321`, which is in git history).
   - After deploying, sign in at `/admin/login/` with that user. Admin content saving will
     then work because writes carry the authenticated token the new rules require.

4. **Mark the GA4 events as Conversions.** In Google Analytics 4 → Admin → Events, after
   the events have fired at least once on the live site, toggle these to "Mark as key
   event / conversion": `donate_submitted`, `volunteer_applied`, `contact_submitted`,
   `partner_applied`, `newsletter_signup`. Ad Grants requires at least one valid
   conversion. (Note: events only fire for visitors who accept the cookie banner.)

5. **Google Search Console.** Verify ownership of `haleyouthfoundation.org`, submit
   `https://haleyouthfoundation.org/sitemap.xml`, and confirm there are no crawl errors.
   This is a soft prerequisite for Ad Grants.

6. **Re-run Lighthouse** on the deployed site (mobile). The image work should move the
   Performance score up materially; confirm before resubmitting.

---

## 3. Resubmission checklist

- [ ] `npm run deploy:full` run (hosting + Firestore rules live)
- [ ] Phone number added and visible on Contact + Footer
- [x] Firebase console: Email/Password enabled
- [ ] Firebase console: admin user created (new password); sign-in tested at `/admin/login/`
- [x] `npm audit fix` run (8 vulns → 2 build-only)
- [ ] GA4: conversion events marked as key events after they fire on the live site
- [ ] Search Console verified; sitemap submitted; no crawl errors
- [ ] Lighthouse mobile Performance re-checked on the live site
- [ ] Smoke-test these URLs load fast: `/`, `/about/`, `/programs/`,
      `/programs/pad-a-girl/`, `/news/`, `/contact/`, `/get-involved/donate/`
- [ ] Resubmit the Ad Grants activation request
