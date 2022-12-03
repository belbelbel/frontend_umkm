import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  IconButton,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { KeyedMutator } from "swr";
import { fetchUmkmById, removeUmkmFromHolding } from "../../repositories/repo";
import { useHoldingId } from "../../swr-cache/useHoldingId";
import { useUmkmByHoldingId } from "../../swr-cache/useUmkmByHoldingId";
import { useUmkmList } from "../../swr-cache/useUmkmList";
import { Umkm } from "../../types/models";
import { Buttons } from "../Button/Button";
import { DialogAlert } from "../Dialog/DialogAlert";
import { DialogDetailUmkm } from "../Dialog/DialogDetailUmkm";

interface Props {
  id: number;
  nama_umkm: string;
}

export const AccordionHolding: React.FC<Props> = ({ id, nama_umkm }) => {
  const router = useRouter();
  const { umkmByHolding } = useUmkmByHoldingId(id);
  const [selectedId, setSelectedId] = useState<number>();
  const [selectedName, setSelectedName] = useState<string>("");
  // const [detailUmkm, setDetailUmkm] = useState(false);

  // const handleDetailUmkm = (idUmkm: number, name: string) => {
  //   setSelectedId(idUmkm);
  //   setSelectedName(name);
  //   setDetailUmkm(true);
  //   console.log(selectedId);
  // };

  const [dialogDelete, setDialogDelete] = useState(false);

  const handleDialogDelete = (idUmkm: number, name: string) => {
    setSelectedId(idUmkm);
    setSelectedName(name);
    setDialogDelete(true);
  };

  const handleDeleteUmkm = async () => {
    try {
      await removeUmkmFromHolding(id, selectedId);
      setDialogDelete(false);
      router.push("/seller/dashboard");
    } catch (error: any) {
      throw error;
    }
  };

  return (
    <>
      {umkmByHolding?.map((i) => (
        <>
          <Accordion
            key={i.id}
            variant="outlined"
            elevation={0}
            sx={{
              // backgroundColor: "rgba(198, 167, 235, 0.5)",
              backgroundColor: "#EFEFEF",
              px: 3,
              py: 1,
              border: "none",
              "&:before": {
                display: "none",
              },
            }}
          >
            <AccordionSummary
              expandIcon={
                <i
                  className="bx bx-chevron-down"
                  style={{ fontSize: 23, color: "#000000" }}
                />
              }
              sx={{
                border: "none",
                borderRadius: 3,
                // backgroundColor: "rgba(198, 167, 235, 0.5)",
                color: "#000000",
              }}
            >
              <Typography fontWeight={600}>{i.nama_umkm}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Stack direction="row" spacing={5}>
                <Box
                  sx={{
                    width: 300,
                    height: 200,
                    backgroundColor: "#FFFFFF",
                    borderRadius: 4,
                  }}
                />
                <Stack direction="column">
                  <Typography variant="caption" color="GrayText">
                    Alamat
                  </Typography>
                  <Typography variant="body1" marginBottom={4}>
                    {i.alamat}
                  </Typography>
                  <Typography variant="caption" color="GrayText">
                    No Telepon
                  </Typography>
                  <Typography variant="body1">{i.no_telp_umkm}</Typography>
                </Stack>
              </Stack>
              <Stack direction="row" spacing={2} marginTop={3}>
                <Button
                  startIcon={
                    <i className="bx bxs-detail" style={{ fontSize: "13px" }} />
                  }
                  sx={{
                    textTransform: "initial",
                    backgroundColor: "#FFFFFF",
                    borderRadius: 100,
                    px: 2,
                    fontSize: "13px",
                    color: "#000000",
                  }}
                >
                  Lihat Detail Umkm
                </Button>
                <Button
                  onClick={() => handleDialogDelete(i.id, i.nama_umkm)}
                  startIcon={
                    <i className="bx bx-trash" style={{ fontSize: "14px" }} />
                  }
                  sx={{
                    textTransform: "initial",
                    backgroundColor: "#FFFFFF",
                    borderRadius: 100,
                    px: 2,
                    fontSize: "13px",
                    color: "#000000",
                  }}
                >
                  Hapus Umkm
                </Button>
              </Stack>
            </AccordionDetails>
          </Accordion>
        </>
      ))}
      <DialogAlert
        open={dialogDelete}
        onClose={() => setDialogDelete(false)}
        onClicks={handleDeleteUmkm}
        variation="doubleButton"
        buttonText="Hapus"
        title="Hapus UMKM"
        message={
          "Anda ingin menghapus" +
          " " +
          selectedName +
          " " +
          "dari UMKM Holding" +
          " " +
          nama_umkm +
          "?"
        }
      />
    </>
  );
};
