import {
  Autocomplete,
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { Form, Formik } from "formik";
import React, { useState } from "react";
import { addUmkmToHolding } from "../../repositories/repo";
import { useUmkmByHolding } from "../../swr-cache/useUmkmByHolding";
import { useUmkmList } from "../../swr-cache/useUmkmList";
import { Buttons } from "../Button/Button";
import { LoadingButtons } from "../Button/LoadingButton";

interface Props {
  umkm_parent: string;
  holdingId: number;
  open: boolean;
  onClose: () => void;
}

export const DialogAddUmkmToHolding: React.FC<Props> = ({
  holdingId,
  umkm_parent,
  open,
  onClose,
}) => {
  const { umkm } = useUmkmList();
  const { umkms } = useUmkmByHolding(holdingId);
  const [selectedUmkm, setSelectedUmkm] = useState("");

  const handleUmkm = (event: SelectChangeEvent) => {
    setSelectedUmkm(event.target.value);
    console.log(event.target.value);
  };

  return (
    <>
      <Formik
        initialValues={{ umkm_id: "" }}
        onSubmit={async (values, { setSubmitting }) => {
          console.log(holdingId, selectedUmkm);
          setSubmitting(true);
          try {
            addUmkmToHolding(holdingId, { umkm_id: parseInt(selectedUmkm) });
          } catch (error: any) {
            console.log(error);
          } finally {
            setSubmitting(false);
          }
        }}
      >
        {({
          values,
          isSubmitting,
          handleBlur,
          submitForm,
          handleChange,
          setFieldValue,
          errors,
          touched,
        }) => (
          <Form>
            <Dialog open={open} onClose={onClose} maxWidth="lg">
              <DialogTitle>
                <Typography variant="h6" fontWeight={600}>
                  Tambah Umkm
                </Typography>
              </DialogTitle>
              <DialogContent>
                <Stack direction="column" spacing={3}>
                  <Typography variant="subtitle1" width={600} color="#000000">
                    Pilih Umkm untuk di tambahkan ke parent Umkm {umkm_parent}
                  </Typography>

                  <FormControl>
                    <InputLabel>Umkm</InputLabel>
                    <Select
                      value={selectedUmkm}
                      label="Umkm"
                      // onChange={(event) => {
                      //   setFieldValue("umkm_id", event.target.value);
                      //   console.log(values.umkm_id);
                      // }}
                      onChange={handleUmkm}
                    >
                      {umkm
                        ?.filter((x) => x.parent_id !== holdingId)
                        .map((y) => (
                          <MenuItem key={y.id} value={y.id}>
                            {y.nama_umkm}
                          </MenuItem>
                        ))}
                      {/* {umkms?.map((i) =>
                        i.pivot.filter((x) => x.holding_id !== holdingId)
                      )} */}
                    </Select>
                  </FormControl>
                </Stack>
              </DialogContent>
              <DialogActions>
                <Stack direction="row" spacing={1} marginBottom={2}>
                  <LoadingButtons
                    variation="outlined"
                    loading={isSubmitting}
                    onClick={submitForm}
                  >
                    Simpan
                  </LoadingButtons>
                  <Buttons variation="contained" onClick={onClose}>
                    Tutup
                  </Buttons>
                </Stack>
              </DialogActions>
            </Dialog>
          </Form>
        )}
      </Formik>
    </>
  );
};
