import { Button, Container, Stack } from "@mui/material";
import Link from "next/link";

import { routes } from "@/routes/routes";

export default function LayoutHeader() {
  return (
    <Container sx={{ mt: 1 }}>
      <Stack direction="row" spacing={{ xs: 0.5, sm: 1.5 }}>
        <Button variant="outlined" component={Link} href={routes.home} sx={{}}>
          The Problem
        </Button>
        <Button variant="outlined" component={Link} href={routes.sheet}>
          Sheet
        </Button>
        <Button variant="outlined" component={Link} href={routes.customSheet}>
          Custom Sheet
        </Button>
        <Button variant="outlined" component={Link} href={routes.revision}>
          Revision
        </Button>
        <Button variant="outlined" component={Link} href={routes.readingList}>
          Reading List
        </Button>
      </Stack>
    </Container>
  );
}
