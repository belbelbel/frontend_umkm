import {
  Box,
  Button,
  Container,
  Input,
  Paper,
  SelectChangeEvent,
  Stack,
  Step,
  StepContent,
  StepLabel,
  Stepper,
  TextField,
  Typography,
} from "@mui/material";
import axios, { AxiosError } from "axios";
import { Form, Formik, validateYupSchema } from "formik";
import { NextPage } from "next";
import Image from "next/image";
import { useRouter } from "next/router";
import React, {
  ChangeEvent,
  RefObject,
  use,
  useEffect,
  useRef,
  useState,
} from "react";
import { CreateSellerAppBar } from "../../../../../../components/AppBar/CreateSellerAppBar";
import { Buttons } from "../../../../../../components/Button/Button";
import { LoadingButtons } from "../../../../../../components/Button/LoadingButton";
import {
  createProduct,
  uploadPhoto,
} from "../../../../../../repositories/repo";
import { useUser } from "../../../../../../swr-cache/useUser";
import { Product, ResponsePhotos } from "../../../../../../types/models";
import { BaseParams } from "../../../../../../types/query";
import { apiEcom } from "../../../../../api/hello";

const stepper = [
  {
    label: "Unggah Foto Produk",
    description: "Anda dapat mengunggah lebih dari satu foto.",
  },
  {
    label: "Nama Produk",
    description: "Gunakan nama produk yang menarik dan mudah dicari.",
  },
  {
    label: "Harga Produk",
  },
  {
    label: "Diskon Produk",
    description: "Anda dapat memberikan potongan harga satuan produk.",
  },
];

export const CreateProduct = () => {
  const router = useRouter();
  const { user } = useUser();
  const { holdingId, umkmId } = router.query as BaseParams;
  const [image, setImage] = useState<File>();
  const [createObjectUrl, setCreateObjectUrl] = useState<string>("");
  const [activeStep, setActiveStep] = useState(0);
  const fileInput = useRef();
  const [idFoto, setIdFoto] = useState<ResponsePhotos>();
  const [nama, setNama] = useState("");
  const [harga, setHarga] = useState("");
  const arr = [];

  useEffect(() => {
    if (!user) {
      router.replace("/login");
    }
  }, [router, user]);

  if (!user) {
    return <></>;
  }

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  // const handleGetImage = async (event: React.ChangeEvent<HTMLInputElement>) => {
  //   if (event.target.files !== null) {
  //     setImage(event.target.files[0]);
  //     // arr?.push(image);

  //     console.log(event.target.files[0]);
  //     try {
  //       await uploadPhoto(
  //         parseInt(umkmId),
  //         event.target.files[0] as unknown as File
  //       ).then()
  //     } catch (error: any) {
  //       throw error;
  //     }
  //   }
  // };

  const uploadPhoto = async (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const body = new FormData();
      if (event.target.files !== null) {
        body.append("foto", event.target.files[0]);
        setCreateObjectUrl(URL.createObjectURL(event.target.files[0]));
      }
      const res = await apiEcom.post(`/umkm/${umkmId}/foto/produk`, body, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setIdFoto(res.data);

      // console.log(arrId);
    } catch (error: any | AxiosError) {
      if (axios.isAxiosError(error)) {
        throw error.response;
      }
      throw error;
    }
  };

  arr.push(idFoto);
  const arrId = arr.map((val, idx) => {
    return val?.data;
  });
  // console.log(arrId);

  const handleName = (event: SelectChangeEvent) => {
    setNama(event.target.value);
    console.log(event.target.value);
  };

  const handleHarga = (event: SelectChangeEvent) => {
    setHarga(event.target.value);
    console.log(event.target.value);
  };

  return (
    <>
      <CreateSellerAppBar
        link={`/seller/holding/${holdingId}/umkm/${umkmId}`}
      />
      <Container maxWidth="lg" sx={{ marginTop: 12 }}>
        <Typography variant="h4" fontWeight={600} marginBottom={4}>
          Buat Produk
        </Typography>
        <Stepper activeStep={activeStep} orientation="vertical">
          {stepper.map((step, index) => (
            <Step key={step.label}>
              <StepLabel
                optional={
                  index === 3 ? (
                    <Typography variant="caption">Step Terakhir</Typography>
                  ) : null
                }
              >
                <Typography variant="h6">{step.label}</Typography>
              </StepLabel>
              <StepContent>
                <Typography variant="subtitle2" color="GrayText">
                  {step.description}
                </Typography>
                {index === 0 && (
                  <>
                    <Stack
                      direction="row"
                      alignItems="center"
                      spacing={4}
                      marginTop={3}
                    >
                      {!createObjectUrl ? (
                        <Box
                          sx={{
                            width: 200,
                            height: 150,
                            backgroundColor: "#EFEFEF",
                            borderRadius: 4,
                            "&:hover": {
                              backgroundColor: "rgba(0,0,0, 0.2)",
                            },
                          }}
                        />
                      ) : (
                        <Image
                          src={createObjectUrl}
                          alt="img"
                          width={200}
                          height={150}
                          style={{ borderRadius: 5 }}
                        />
                      )}
                      <Stack direction="column" spacing={2}>
                        <Typography variant="subtitle2" color="#000000">
                          Pastikan Anda memilih gambar yang benar.
                        </Typography>
                        <Box>
                          <input
                            ref={fileInput}
                            id="foto"
                            type="file"
                            name="foto"
                            style={{ display: "none" }}
                            // onChange={getImage}
                            onChange={uploadPhoto}
                          />
                          <label htmlFor="foto">
                            <Buttons
                              variation="outlined"
                              onClick={() => fileInput?.current?.click()}
                              startIcon={<i className="bx bx-image-add" />}
                              sx={{ width: 180, height: 30, px: 2 }}
                            >
                              Pilih File
                            </Buttons>
                          </label>
                        </Box>
                      </Stack>
                    </Stack>
                  </>
                )}
                <>
                  <Formik
                    initialValues={{
                      nama: nama,
                      harga: harga,
                      diskon: "",
                      foto: arrId,
                    }}
                    onSubmit={async (data, { setSubmitting }) => {
                      console.log(data);
                      setSubmitting(true);
                      try {
                        await createProduct(parseInt(umkmId), { ...data });
                        router.push(
                          `/seller/holding/${holdingId}/umkm/${umkmId}`
                        );
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
                        <>
                          {index === 1 && (
                            <TextField
                              id="nama"
                              onChange={handleName}
                              value={nama}
                              onBlur={handleBlur}
                              sx={{ marginTop: 3 }}
                            />
                          )}
                        </>
                        <>
                          {index === 2 && (
                            <TextField
                              id="harga"
                              onChange={handleHarga}
                              value={harga}
                              onBlur={handleBlur}
                              sx={{ marginTop: 3 }}
                            />
                          )}
                        </>
                        <>
                          {index === 3 && (
                            <TextField
                              id="diskon"
                              onChange={handleChange}
                              value={values.diskon}
                              onBlur={handleBlur}
                              sx={{ marginTop: 3 }}
                            />
                          )}
                          <Box sx={{ mb: 2, mt: 5 }}>
                            <div>
                              {index !== stepper.length - 1 ? (
                                <Buttons
                                  variation="outlined"
                                  onClick={handleNext}
                                  sx={{
                                    mt: 1,
                                    mr: 1,
                                    width: 130,
                                    px: 1,
                                    height: 40,
                                  }}
                                >
                                  Berikutnya
                                </Buttons>
                              ) : (
                                <LoadingButtons
                                  variation="outlined"
                                  type="submit"
                                  loading={isSubmitting}
                                  sx={{
                                    mt: 1,
                                    mr: 1,
                                    width: 130,
                                    px: 1,
                                    height: 40,
                                  }}
                                >
                                  Simpan
                                </LoadingButtons>
                              )}

                              <Buttons
                                variation="contained"
                                disabled={index === 0}
                                onClick={handleBack}
                                sx={{
                                  mt: 1,
                                  mr: 1,
                                  width: 130,
                                  px: 1,
                                  height: 40,
                                }}
                              >
                                Kembali
                              </Buttons>
                            </div>
                          </Box>
                        </>
                      </Form>
                    )}
                  </Formik>
                </>
              </StepContent>
            </Step>
          ))}
        </Stepper>
        {activeStep === stepper.length && (
          <Paper square elevation={0} sx={{ p: 3 }}>
            <Typography>All steps completed - you&apos;re finished</Typography>
            <Button onClick={handleReset} sx={{ mt: 1, mr: 1 }}>
              Reset
            </Button>
          </Paper>
        )}
      </Container>
    </>
  );
};

export default CreateProduct;
