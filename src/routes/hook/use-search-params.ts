import { useRouter } from "next/router";
import { useMemo } from "react";

// ----------------------------------------------------------------------

export function useSearchParams() {
  const router = useRouter();
  const searchParams = router.query;
  
  return useMemo(() => searchParams, [searchParams]);
}
