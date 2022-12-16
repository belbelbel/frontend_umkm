import {
  Box,
  Container,
  Divider,
  IconButton,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { CreateSellerAppBar } from "../../../../components/AppBar/CreateSellerAppBar";
import { Buttons } from "../../../../components/Button/Button";
import { useHoldingId } from "../../../../swr-cache/useHoldingId";
import { useUmkmByHoldingId } from "../../../../swr-cache/useUmkmByHoldingId";
import { useUser } from "../../../../swr-cache/useUser";
import { BaseParams } from "../../../../types/query";

const HoldingDetail = () => {
  const router = useRouter();
  const { user } = useUser();
  const { holdingId } = router.query as BaseParams;
  const { umkmByHolding } = useUmkmByHoldingId(parseInt(holdingId));
  const { holdingDetail } = useHoldingId(parseInt(holdingId));
  const [isEditting, setIsEditting] = useState(false);

  useEffect(() => {
    if (!user) {
      router.replace("/login");
    }
  }, [router, user]);

  if (!user) {
    return <></>;
  }
  return (
    <>
      <CreateSellerAppBar link="/seller/dashboard" />
      <Container maxWidth="lg" sx={{ marginTop: 12 }}>
        <Typography variant="h4" fontWeight={600}>
          Detail UMKM
        </Typography>
        <Typography variant="subtitle2" color="GrayText" marginTop={2}>
          Menampilkan Detail UMKM Parent serta UMKM terkait. Anda dapat
          menambahkan atau menghapus UMKM non-parent.
        </Typography>
        <Divider sx={{ marginTop: 3, marginBottom: 6 }} />

        <Typography variant="caption" color="GrayText">
          Nama
        </Typography>
        <Typography variant="body1" fontWeight={600} marginBottom={3}>
          {holdingDetail?.nama}
        </Typography>
        <Stack direction="row" spacing={4} marginBottom={6}>
          {holdingDetail?.foto === null ? (
            <Box
              sx={{
                width: 280,
                height: 180,
                background: "#EFEFEF",
                borderRadius: 3,
              }}
            />
          ) : (
            <Image src={holdingDetail?.foto} alt={holdingDetail?.foto} />
          )}

          <Stack direction="column" spacing={3}>
            <Typography variant="subtitle2" color="GrayText">
              Unggah foto profil UMKM anda
            </Typography>
            <Stack direction="row" spacing={1}>
              <Buttons variation="outlined">Simpan</Buttons>
              <Buttons variation="contained">Hapus</Buttons>
            </Stack>
          </Stack>
        </Stack>
        <Typography variant="caption" color="GrayText">
          UMKM terdaftar
        </Typography>
        <Stack direction="column">
          {umkmByHolding?.length === 0 && (
            <Typography>Belum ada UMKM terdaftar</Typography>
          )}
          {umkmByHolding?.map((item, index) => (
            <>
              <Stack
                direction="row"
                // justifyContent="space-between"
                alignItems="center"
                spacing={90}
                key={item.id}
              >
                <Stack direction="row" spacing={3}>
                  <Typography variant="body1" fontWeight={600} marginBottom={4}>
                    {index + 1}
                  </Typography>
                  <Typography variant="body1" fontWeight={600} marginBottom={4}>
                    {item.nama_umkm}
                  </Typography>
                </Stack>
                <Stack direction="row" spacing={1}>
                  <Tooltip title="lihat">
                    <IconButton
                      onClick={() =>
                        router.push(
                          `/seller/holding/${holdingId}/umkm/${item.id}`
                        )
                      }
                    >
                      <i className="bx bx-show" />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="lihat">
                    <IconButton>
                      <i className="bx bx-trash" />
                    </IconButton>
                  </Tooltip>
                </Stack>
              </Stack>
            </>
          ))}
        </Stack>
      </Container>
    </>
  );
};

export default HoldingDetail;
