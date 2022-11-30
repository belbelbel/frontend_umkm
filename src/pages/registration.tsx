import React, { useState } from "react";
import {
  Stack,
  Container,
  Box,
  TextField,
  Grid,
  Typography,
  Link,
} from "@mui/material";
import * as Yup from "yup";
import { Formik, Form } from "formik";
import { registration } from "../repositories/repo";
import { LoadingButtons } from "../components/Button/LoadingButton";
import { AuthAppBar } from "../components/AppBar/AuthAppBar";
import { useRouter } from "next/router";
import { Buttons } from "../components/Button/Button";
import { DialogAlert } from "../components/Dialog/DialogAlert";

const Registration = () => {
  const router = useRouter();
  const [alertOpen, setAlertOpen] = useState(false);

  // const handleAlertOpen = () => {
  //   setAlertOpen(true);
  // };

  return (
    <Box>
      <AuthAppBar />
      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
        spacing={2}
        marginTop={15}
      >
        <Container maxWidth="lg" sx={{ justifyContent: "center" }}>
          <Stack direction="column" alignItems="center" spacing={3}>
            <Typography variant="h4" fontWeight={600} justifyContent="center">
              Daftar
            </Typography>
            <Formik
              initialValues={{
                nama: "",
                email: "",
                alamat: "",
                no_telp: "",
                password: "",
              }}
              onSubmit={async (data, { setSubmitting }) => {
                console.log(data);
                setSubmitting(true);
                try {
                  await registration({
                    ...data,
                    email: data.email.toLowerCase(),
                  });
                  setAlertOpen(true);
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
                  <Stack direction="column" spacing={3} width={450}>
                    <TextField
                      label="nama"
                      fullWidth
                      id="nama"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.nama}
                      // error={touched.email && Boolean(errors.email)}
                      helperText={touched.nama && errors.nama}
                    />
                    <TextField
                      label="email"
                      fullWidth
                      id="email"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.email}
                      // error={touched.email && Boolean(errors.email)}
                      helperText={touched.email && errors.email}
                    />
                    <TextField
                      label="alamat"
                      fullWidth
                      id="alamat"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.alamat}
                      // error={touched.email && Boolean(errors.email)}
                      helperText={touched.alamat && errors.alamat}
                    />
                    <TextField
                      label="nomor telepon"
                      fullWidth
                      id="no_telp"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.no_telp}
                      // error={touched.email && Boolean(errors.email)}
                      helperText={touched.no_telp && errors.no_telp}
                    />
                    <TextField
                      label="password"
                      type="password"
                      fullWidth
                      id="password"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.password}
                      // error={touched.password && Boolean(errors.password)}
                      helperText={touched.password && errors.password}
                    />
                    <Stack direction="row" spacing={1} justifyContent="left">
                      <Typography variant="body2">Sudah punya akun?</Typography>
                      <Link
                        onClick={() => router.push("/login")}
                        sx={{
                          color: "#5C4EBD",
                          "&:hover": { cursor: "pointer" },
                        }}
                      >
                        <Typography variant="body2">Masuk</Typography>
                      </Link>
                    </Stack>
                    <LoadingButtons
                      variation="contained"
                      sx={{
                        borderRadius: "100px",
                        // width: 150,
                        py: 1,
                      }}
                      type="submit"
                      loading={isSubmitting}
                    >
                      Daftar
                    </LoadingButtons>
                  </Stack>
                </Form>
              )}
            </Formik>
            {/* <Buttons variation="outlined" onClick={handleAlertOpen}>
              Test
            </Buttons> */}
            <DialogAlert
              open={alertOpen}
              onClose={() => setAlertOpen(false)}
              title="Verifikasi Email"
              message="Kami telah mengirim verifikasi ke email Anda, silakan cek email."
            />
          </Stack>
        </Container>
      </Grid>
    </Box>
  );
};

export default Registration;
