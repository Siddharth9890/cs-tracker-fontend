import Link from "next/link";

import { routes } from "@/routes/routes";
import { ListItemButton, Stack, Typography } from "@mui/material";

export default function NotFound() {
  return (
    <div>
      <Stack
        direction={"column"}
        justifyContent={"center"}
        alignItems={"center"}
        sx={{ mt: "10%" }}
      >
        <Typography variant="h4">Not Found</Typography>
        <Typography variant="h6">Could not find requested resource</Typography>

        <Typography sx={{ color: "text.secondary", mt: 2 }}>
          We are currently working hard on this page!
        </Typography>
        <ListItemButton
          component={Link}
          href={routes.home}
          target={"_self"}
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            color: "text.secondary",
            borderRadius: 1,
            svg: {
              color: "primary.dark",
            },
            span: {
              color: "primary.dark",
            },
          }}
        >
          <Typography component={"span"} variant="subtitle1">
            Not Found
          </Typography>
        </ListItemButton>
      </Stack>
    </div>
  );
}
