import { useMemo } from "react";
import { useRouter } from "next/router";

export function usePathname() {
  const router = useRouter();

  const pathname = useMemo(() => router.asPath, [router.asPath]);

  return pathname;
}
