# Haleyouth Foundation

Official website for **Haleyouth Foundation** — a registered non-profit (CAC/IT/NO 154820) empowering youth through mentorship, advancing STEM education, and fostering community development in Nigeria and across Africa.

**Live:** [haleyouthfoundation.org](https://haleyouthfoundation.org) | [haleyouth-foundation.web.app](https://haleyouth-foundation.web.app)

## Tech Stack

- **Framework:** Next.js 16 (App Router, TypeScript)
- **Styling:** Tailwind CSS v4, Framer Motion
- **Backend:** Firebase (Firestore, Auth, Storage, Hosting)
- **UI:** Custom premium design system with glassmorphism, animated counters, scroll transitions

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Deployment

```bash
npm run build
firebase deploy --only hosting
```

## Project Structure

```
src/
├── app/              # Pages (About, Programs, Impact, Gallery, Contact, Admin...)
├── components/       # Reusable components (layout, home sections, UI, admin)
├── hooks/            # Custom hooks (scroll animation, counter, auth)
├── lib/              # Config, constants, utilities, Firebase
└── types/            # TypeScript interfaces
```

## License

All rights reserved. Haleyouth Foundation.
