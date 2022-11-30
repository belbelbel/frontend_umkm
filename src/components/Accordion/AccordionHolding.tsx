import {
  AccordionSummary,
  IconButton,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { useUmkmByHolding } from "../../swr-cache/useUmkmByHolding";
import { useUmkmList } from "../../swr-cache/useUmkmList";
import { DialogDetailUmkm } from "../Dialog/DialogDetailUmkm";

interface Props {
  id: number;
  nama_umkm: string;
}

export const AccordionHolding: React.FC<Props> = ({ id, nama_umkm }) => {
  const { umkm } = useUmkmList();
  const { umkms } = useUmkmByHolding(id);
  const [selectedId, setSelectedId] = useState<number>();
  const [selectedName, setSelectedName] = useState<string>("");
  const [detailUmkm, setDetailUmkm] = useState(false);

  const handleDetailUmkm = (idUmkm: number, name: string) => {
    setSelectedId(idUmkm);
    setSelectedName(name);
    setDetailUmkm(true);
    console.log(selectedId);
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
            <IconButton onClick={() => handleDetailUmkm(i.id, i.nama_umkm)}>
              <i className="bx bx-show" />
            </IconButton>
          </Tooltip>
        </Stack>
      ))}
      <DialogDetailUmkm
        open={detailUmkm}
        id={selectedId}
        parent={selectedName}
        onClose={() => {
          setDetailUmkm(false);
          setSelectedId(0);
        }}
      />
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
