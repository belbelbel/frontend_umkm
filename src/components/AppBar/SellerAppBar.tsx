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

export const SellerAppBar: React.FC = () => {
  const router = useRouter();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleOpenMyAccount = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMyAccount = () => {
    setAnchorEl(null);
  };

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
          <Stack direction="row" spacing={2}>
            <Tooltip title="Notifikasi">
              <IconButton>
                <i className="bx bx-bell" />
              </IconButton>
            </Tooltip>
            <Tooltip title="Pesan">
              <IconButton>
                <i className="bx bx-message-square-dots" />
              </IconButton>
            </Tooltip>
            <Buttons
              onClick={() => router.push("/home")}
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
              Kembali mode pembeli
            </Buttons>
          </Stack>
        </Stack>
      </Container>
    </AppBar>
  );
};
