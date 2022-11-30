import {
  Box,
  Toolbar,
  Typography,
  AppBar,
  Button,
  IconButton,
  Container,
  Stack,
  Link,
} from "@mui/material";
import Image from "next/image";
import React from "react";
import logo from "../../../public/images/logo.png";
import { useRouter } from "next/router";

export const AuthAppBar: React.FC = () => {
  const router = useRouter();
  return (
    <AppBar
      variant="outlined"
      sx={{ backgroundColor: "#FFFFFF", height: 80, py: 3, border: "none" }}
    >
      <Container maxWidth="lg">
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <Link
            onClick={() => router.push("/")}
            underline="none"
            sx={{
              "&:hover": {
                cursor: "pointer",
              },
            }}
          >
            <Image src={logo} alt="umkm" width={80} />
          </Link>
        </Stack>
      </Container>
    </AppBar>
  );
};
