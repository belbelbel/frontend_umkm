import {
  AccordionSummary,
  IconButton,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { useUmkmbyId } from "../../swr-cache/useUmkmbyId";
import { useUmkmList } from "../../swr-cache/useUmkmList";

interface Props {
  id: number;
  nama_umkm: string;
}

export const AccordionHolding: React.FC<Props> = ({ id, nama_umkm }) => {
  const { umkm } = useUmkmList();
  const { umkms } = useUmkmbyId(id);
  const [selectedId, setSelectedId] = useState<number>(0);
  const [detailUmkm, setDetailUmkm] = useState(false);

  const handleDetailUmkm = (idUmkm: number) => {
    setSelectedId(idUmkm);
    setDetailUmkm(true);
  };

  return (
    <>
      {umkm?.map((i) => (
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          key={i.id}
          sx={{ marginLeft: 9, marginRight: 6 }}
        >
          <AccordionSummary key={i.id}>
            <Typography>{i.nama_umkm}</Typography>
          </AccordionSummary>
          <Tooltip title="lihat">
            <IconButton onClick={() => handleDetailUmkm(i.id)}>
              <i className="bx bx-show" />
            </IconButton>
          </Tooltip>
        </Stack>
      ))}
      {/* {umkm
        ?.filter((x) => x.parent_id === id)
        .map((y) => (
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            key={i.id}
            sx={{ marginLeft: 9, marginRight: 6 }}
          >
            <AccordionSummary key={y.id}>
              <Typography>{y.nama_umkm}</Typography>
            </AccordionSummary>
            <Tooltip title="lihat">
              <IconButton>
                <i className="bx bx-show" />
              </IconButton>
            </Tooltip>
          </Stack>
        ))} */}
    </>
  );
};
