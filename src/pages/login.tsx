import React, { useEffect } from "react";
import {
  Stack,
  Container,
  Box,
  TextField,
  Grid,
  Typography,
} from "@mui/material";
import * as Yup from "yup";
import { Formik, Form } from "formik";
import { login } from "../repositories/repo";
import { LoadingButtons } from "../components/Button/LoadingButton";
import { AuthAppBar } from "../components/AppBar/AuthAppBar";
import { useRouter } from "next/router";
import { useUser } from "../swr-cache/useUser";

const validationSchema = Yup.object({
  email: Yup.string().email("Email harus valid").required("Email harus diisi"),
  password: Yup.string().required("Password harus diisi"),
});

const Login = () => {
  const router = useRouter();
  const { user } = useUser();

  useEffect(() => {
    if (user) {
      router.replace("/home");
    }
  }, [router, user]);

  if (user) {
    return <></>;
  }

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
              Masuk
            </Typography>
            <Formik
              initialValues={{
                email: "",
                password: "",
              }}
              validationSchema={validationSchema}
              onSubmit={async (data, { setSubmitting }) => {
                console.log(data);
                setSubmitting(true);
                try {
                  await login({ ...data, email: data.email.toLowerCase() });
                  await router.push("/home");
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
                      label="email"
                      fullWidth
                      id="email"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.email}
                      error={touched.email && Boolean(errors.email)}
                      helperText={touched.email && errors.email}
                    />
                    <TextField
                      label="password"
                      type="password"
                      fullWidth
                      id="password"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.password}
                      error={touched.password && Boolean(errors.password)}
                      helperText={touched.password && errors.password}
                    />
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
                      Masuk
                    </LoadingButtons>
                  </Stack>
                </Form>
              )}
            </Formik>
          </Stack>
        </Container>
      </Grid>
    </Box>
  );
};

export default Login;
