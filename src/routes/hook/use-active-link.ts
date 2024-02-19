import { useRouter } from "next/router";

type ReturnType = boolean;

export function useActiveLink(path: string, deep = true): ReturnType {
  const router = useRouter();
  const { asPath } = router;

  const normalActive = path ? !!asPath.match(new RegExp(`^${path}$`)) : false;
  const deepActive = path
    ? !!asPath.match(new RegExp(`^${path}(\/.*)?$`))
    : false;

  return deep ? deepActive : normalActive;
}
