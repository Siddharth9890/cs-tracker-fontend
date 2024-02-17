import { useMemo } from "react";
import { useRouter as Router } from "next/router";

// ----------------------------------------------------------------------

export function useRouter() {
  const navigate = Router();

  const router = useMemo(
    () => ({
      back: () => navigate.back(),
      forward: () => window.history.forward(),
      reload: () => window.location.reload(),
      push: (href: string) => navigate.push(href),
      replace: (href: string) => navigate.replace(href),
    }),
    [navigate]
  );

  return router;
}
