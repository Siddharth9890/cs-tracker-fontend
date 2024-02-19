import Link, { LinkProps } from "next/link";
import { forwardRef } from "react";

// ----------------------------------------------------------------------

interface RouterLinkProps extends Omit<LinkProps, "to"> {
  href: string;
}

export const RouterLink = forwardRef<HTMLAnchorElement, RouterLinkProps>(
  ({ href, ...other }, ref) => (
    <Link href={href} {...other}>
      <>
      </>
    </Link>
  )
);
