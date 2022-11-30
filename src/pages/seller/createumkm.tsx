import { Container, Stack, TextField, Typography } from "@mui/material";
import { Form, Formik } from "formik";
import { useRouter } from "next/router";
import React from "react";
import { CreateSellerAppBar } from "../../components/AppBar/CreateSellerAppBar";
import { Buttons } from "../../components/Button/Button";
import { LoadingButtons } from "../../components/Button/LoadingButton";
import { createUmkm } from "../../repositories/repo";

export const CreateUmkm = () => {
  const router = useRouter();
  return (
    <>
      <CreateSellerAppBar />
      <Container maxWidth="lg" sx={{ marginTop: 12 }}>
        <Typography variant="h4" fontWeight={600}>
          Buat UMKM
        </Typography>
        <Formik
          initialValues={{
            nama_umkm: "",
            alamat: "",
            no_telp_umkm: "",
          }}
          onSubmit={async (data, { setSubmitting }) => {
            console.log(data);
            setSubmitting(true);
            try {
              await createUmkm({
                ...data,
                nama_umkm: data.nama_umkm.toLowerCase(),
              });
              router.push("/seller/dashboard");
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
            handleChange,
            handleBlur,
            touched,
            errors,
          }) => (
            <Form>
              <Stack direction="column" marginTop={5} spacing={2}>
                <TextField
                  label="Nama umkm"
                  fullWidth
                  id="nama_umkm"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.nama_umkm}
                  error={touched.nama_umkm && Boolean(errors.nama_umkm)}
                  helperText={touched.nama_umkm && errors.nama_umkm}
                />
                <TextField
                  label="Alamat"
                  fullWidth
                  id="alamat"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.alamat}
                  error={touched.alamat && Boolean(errors.alamat)}
                  helperText={touched.alamat && errors.alamat}
                />
                <TextField
                  label="No Telepon"
                  fullWidth
                  id="no_telp_umkm"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.no_telp_umkm}
                  error={touched.no_telp_umkm && Boolean(errors.no_telp_umkm)}
                  helperText={touched.no_telp_umkm && errors.no_telp_umkm}
                />
              </Stack>
              <LoadingButtons
                variation="contained"
                sx={{ px: 8, marginLeft: 138, marginTop: 4, width: 100 }}
                type="submit"
                loading={isSubmitting}
              >
                Buat
              </LoadingButtons>
            </Form>
          )}
        </Formik>
      </Container>
    </>
  );
};

export default CreateUmkm;
