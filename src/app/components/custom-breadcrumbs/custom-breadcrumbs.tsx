// @mui
import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Breadcrumbs from "@mui/material/Breadcrumbs";
//
import LinkItem from "./link-item";

// ----------------------------------------------------------------------

export default function CustomBreadcrumbs({
  links,
  action,
  heading,
  activeLast,
  sx,
  ...other
}: any) {
  const lastLink = links[links.length - 1].name;

  return (
    <Box sx={{ ...sx }}>
      <Stack direction="row" alignItems="center">
        <Box sx={{ flexGrow: 1 }}>
          {/* HEADING */}
          {heading && (
            <Typography variant="h4" gutterBottom>
              {heading}
            </Typography>
          )}

          {/* BREADCRUMBS */}
          {!!links.length && (
            <Breadcrumbs separator={<Separator />} {...other}>
              {links.map((link: any) => (
                <LinkItem
                  key={link.name || ""}
                  link={link}
                  activeLast={activeLast}
                  disabled={link.name === lastLink}
                />
              ))}
            </Breadcrumbs>
          )}
        </Box>

        {action && <Box sx={{ flexShrink: 0 }}> {action} </Box>}
      </Stack>
    </Box>
  );
}

// ----------------------------------------------------------------------

function Separator() {
  return (
    <Box
      component="span"
      sx={{
        width: 4,
        height: 4,
        borderRadius: "50%",
        bgcolor: "text.disabled",
      }}
    />
  );
}
