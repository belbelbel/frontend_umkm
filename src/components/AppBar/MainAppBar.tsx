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
import { logout } from "../../repositories/repo";
import { useUser } from "../../swr-cache/useUser";
import { DialogAlert } from "../Dialog/DialogAlert";

export const MainAppBar: React.FC = () => {
  const router = useRouter();
  const { user, loggedOut, mutate } = useUser();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [dialogAlert, setDialogAlert] = React.useState(false);
  const open = Boolean(anchorEl);

  const handleOpenMyAccount = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMyAccount = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    try {
      setDialogAlert(false);
      await logout();
      mutate();
      router.reload();
    } catch (e) {
    } finally {
      router.push("/");
    }
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
            <Tooltip title="Keranjang">
              <IconButton onClick={() => router.push("/buyer/cart")}>
                <i className="bx bx-basket" />
              </IconButton>
            </Tooltip>
            <Tooltip title="Status pembelian">
              <IconButton onClick={() => router.push("/buyer/order")}>
                <i className="bx bx-package" style={{ fontSize: "25px" }} />
              </IconButton>
            </Tooltip>
            {/* <Tooltip title="Pesan">
              <IconButton>
                <i className="bx bx-message-square-dots" />
              </IconButton>
            </Tooltip> */}
            <Tooltip title="Akun saya">
              <IconButton onClick={handleOpenMyAccount}>
                <i className="bx bx-user-circle" />
              </IconButton>
            </Tooltip>
            <Menu
              anchorEl={anchorEl}
              open={open}
              onClose={handleCloseMyAccount}
            >
              <MenuItem>
                <Stack direction="column">
                  <>Halo, </>
                  <>{user?.nama}</>
                </Stack>
              </MenuItem>
              <Divider />
              <MenuItem onClick={() => router.push("/seller/dashboard")}>
                Mode Penjual
              </MenuItem>
              <MenuItem onClick={() => setDialogAlert(true)}>
                <Stack direction="row" spacing={1} alignItems="center">
                  <i className="bx bx-log-out" />
                  <Typography>Keluar</Typography>
                </Stack>
              </MenuItem>
            </Menu>
          </Stack>
        </Stack>
      </Container>
      <DialogAlert
        onClicks={handleLogout}
        onClose={() => setDialogAlert(false)}
        open={dialogAlert}
        variation="doubleButton"
        buttonText="Keluar"
        title="Keluar"
        message="Anda yakin ingin keluar ?"
      />
    </AppBar>
  );
};
