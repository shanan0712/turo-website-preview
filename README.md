This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

### Production video

The original Turó story video is tracked with Git LFS and is approximately 104 MB.
For Vercel deployments, upload that unchanged MP4 to a public object-storage or
CDN URL that supports byte-range requests, then set this Vercel environment
variable:

```text
NEXT_PUBLIC_STORY_VIDEO_URL=https://your-video-host.example/turo-story.mp4
```

The URL must point directly to the MP4 (not a player page), return
`Content-Type: video/mp4`, and support `Range` requests. The local Git-LFS asset
remains as the development fallback when the variable is not set. No video
re-encoding or compression is required.

The email API routes also require these server-only Vercel environment
variables:

```text
RESEND_API_KEY=
CONTACT_FROM_EMAIL=
CONTACT_TO_EMAIL=
NEXT_PUBLIC_SITE_URL=https://www.clubturo.com
```

`RESEND_API_KEY` must not be exposed to client-side code.
