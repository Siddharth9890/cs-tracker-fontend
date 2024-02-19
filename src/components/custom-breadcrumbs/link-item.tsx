// @mui
import Box from "@mui/material/Box";
import Link from "next/link";
// routes
//
// import { any } from './types';

// ----------------------------------------------------------------------

type Props = {
  link: any;
  activeLast?: boolean;
  disabled: boolean;
};

export default function BreadcrumbsLink({ link, activeLast, disabled }: any) {
  const { name, href, icon } = link;

  const styles = {
    typography: "body2",
    alignItems: "center",
    color: "text.primary",
    display: "inline-flex",
    ...(disabled &&
      !activeLast && {
        cursor: "default",
        pointerEvents: "none",
        color: "text.disabled",
      }),
  };

  const renderContent = (
    <>
      {icon && (
        <Box
          component="span"
          sx={{
            mr: 1,
            display: "inherit",
            "& svg": { width: 20, height: 20 },
          }}
        >
          {icon}
        </Box>
      )}

      {name}
    </>
  );

  if (href) {
    return <Link href={href}>{renderContent}</Link>;
  }

  return <Box sx={styles}> {renderContent} </Box>;
}
