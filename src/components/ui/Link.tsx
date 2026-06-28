// Local wrapper around next/link that disables RSC prefetching by default.
//
// Why: Next.js 16 has an open bug (#85374) where the on-disk RSC payload path for
// static exports (`__next/<route>/__PAGE__.txt`) does not match the path the client
// router requests (`__next.<route>.__PAGE__.txt`). This produces noisy 404s in the
// console on every prefetch. Disabling prefetch suppresses the 404s; navigation
// still works because clicking the link triggers a full HTML fetch from the static
// export, which is fast on a CDN.
//
// When Next.js fixes #85374, this wrapper can be deleted and imports reverted to
// `next/link` directly.

import NextLink, { type LinkProps as NextLinkProps } from "next/link";
import { forwardRef, type AnchorHTMLAttributes, type ReactNode } from "react";

type Props = Omit<NextLinkProps, "prefetch"> &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof NextLinkProps> & {
    prefetch?: boolean;
    children?: ReactNode;
  };

const Link = forwardRef<HTMLAnchorElement, Props>(function Link(
  { prefetch = false, ...rest },
  ref
) {
  return <NextLink ref={ref} prefetch={prefetch} {...rest} />;
});

export default Link;
