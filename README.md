# Delego — Landing Page

The recruiting/waitlist site for **Delego**, a hyperlocal city-discovery app (currently targeting Indore, Pune, and Jaipur). This repo is the marketing front door, not the product itself — see [`delego-mobile`](https://github.com/ajmanimanish/delego-mobile) for the actual app and [`local-discovery-scoring`](https://github.com/ajmanimanish/local-discovery-scoring) for its backend.

## What it does

A single-page pitch for Delego's premise — locally-validated recommendations over generic review-site noise — built around one conversion goal: a **Founding Influencer Application** form that recruits Instagram-style micro-influencers by city, neighborhood, follower count, and reach. Submissions go straight to email via Web3Forms, no backend required.

## Tech stack

React 19 + Vite 7, Tailwind CSS. No router, no state library — a single component with `useState`.

## Running it locally

```bash
npm install
npm run dev      # dev server
npm run build    # production build
npm run lint
```

No environment variables are required for the public form.

## The interesting part

There's an abandoned pivot worth knowing about if you're reading the code: an earlier commit wired the admin dashboard to a real backend endpoint for reviewing applications, then a later commit switched the public form over to Web3Forms for simplicity — but never updated the admin view to match. The admin dashboard (behind a hardcoded password) is currently pointed at a data source nothing in this repo writes to. It's a good, honest example of how a fast pivot on the customer-facing half of a product can leave the internal-tooling half orphaned.

## Status

The public landing page and application form are finished and working. The admin dashboard is not — it needs to either be reconnected to Web3Forms's submission data or removed. A few unused image assets are also left over from earlier iterations.
