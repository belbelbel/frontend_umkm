import {
  Autocomplete,
  Container,
  FormControl,
  FormControlLabel,
  FormLabel,
  Stack,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import { Form, Formik } from "formik";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { CreateSellerAppBar } from "../../components/AppBar/CreateSellerAppBar";
import { Buttons } from "../../components/Button/Button";
import { LoadingButtons } from "../../components/Button/LoadingButton";
import { createHolding, createUmkm } from "../../repositories/repo";
import { useUmkmList } from "../../swr-cache/useUmkmList";
import { useUser } from "../../swr-cache/useUser";

export const CreateHolding = () => {
  const router = useRouter();
  const { user } = useUser();
  const { umkm } = useUmkmList();
  const [parentUmkm, setParentUmkm] = useState(false);

  const handleParent = (event: React.ChangeEvent<HTMLInputElement>) => {
    setParentUmkm(event.target.checked);
  };

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
          Buat UMKM
        </Typography>
        <Formik
          initialValues={{
            nama: "",
            nama_umkm: "",
            alamat: "",
            no_telp_umkm: "",
          }}
          onSubmit={async (data, { setSubmitting }) => {
            console.log(data);
            setSubmitting(true);
            try {
              parentUmkm === true
                ? await createHolding({
                    ...data,
                  })
                : await createUmkm({
                    ...data,
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
                <FormControl component="fieldset" variant="standard">
                  <FormControlLabel
                    label="Jadikan parent UMKM"
                    control={<Switch onChange={handleParent} />}
                  />
                </FormControl>

                {parentUmkm === true ? (
                  <>
                    <TextField
                      label="Nama umkm"
                      fullWidth
                      id="nama"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.nama}
                      error={touched.nama && Boolean(errors.nama)}
                      helperText={touched.nama && errors.nama}
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
                  </>
                ) : (
                  <>
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
                      error={
                        touched.no_telp_umkm && Boolean(errors.no_telp_umkm)
                      }
                      helperText={touched.no_telp_umkm && errors.no_telp_umkm}
                    />
                  </>
                )}
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

export default CreateHolding;
