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
  Tooltip,
  Menu,
  MenuItem,
  Divider,
} from "@mui/material";
import Image from "next/image";
import React from "react";
import logo from "../../../public/images/logo.png";
import { useRouter } from "next/router";
import { Buttons } from "../Button/Button";

interface Props {
  link: string;
}

export const CreateSellerAppBar: React.FC<Props> = ({ link }) => {
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
            underline="none"
            sx={{
              "&:hover": {
                cursor: "pointer",
              },
            }}
          >
            <Image src={logo} alt="umkm" width={80} />
          </Link>
          <Stack direction="row" spacing={2}>
            <Buttons
              onClick={() => router.push(link)}
              variation="contained"
              startIcon={<i className="bx bx-left-arrow-alt" />}
              sx={{
                backgroundColor: "#CACCD9",
                border: "none",
                "&:hover": {
                  backgroundColor: "#CACCD9",
                  border: "none",
                  boxShadow: "none",
                },
              }}
            >
              Kembali
            </Buttons>
          </Stack>
        </Stack>
      </Container>
    </AppBar>
  );
};
