import { apiEcom } from "../pages/api/hello";
import {
  Holding,
  ListHolding,
  ListHoldings,
  ListUmkm,
  ListUmkms,
  PivotHolding,
  Umkm,
  User,
} from "../types/models";
import axios, { AxiosError } from "axios";
import { useState } from "react";

//AUTH

interface loginProps {
  email: string;
  password: string;
}

export const login = async (data: loginProps): Promise<User> => {
  try {
    const res = await apiEcom.post("/auth/login", data);
    return res.data;
  } catch (error: any | AxiosError) {
    if (axios.isAxiosError(error)) {
      throw error.response;
    }
    throw error;
  }
};

export const registration = async (data: Partial<User>): Promise<User> => {
  try {
    const res = await apiEcom.post<User>("/auth/register", data);
    return res.data;
  } catch (error: any | AxiosError) {
    if (axios.isAxiosError(error)) {
      throw error.response;
    }
    throw error;
  }
};

export const logout = async () => {
  try {
    await apiEcom.post("/auth/logout");
  } catch (error: any | AxiosError) {
    if (axios.isAxiosError(error)) {
      throw error.response;
    }
    throw error;
  }
};

//UMKM
export const fetchUmkm = async () => {
  try {
    const res = await apiEcom.get<ListUmkm>("/umkm");
    // console.log(res.data.data);
    // console.log(res);
    return res.data.data;
  } catch (error: any | AxiosError) {
    if (axios.isAxiosError(error)) {
      throw error.response;
    }
    throw error;
  }
};

//useUmkmByHoldingId
export const fetchUmkmHolding = async (id: number) => {
  try {
    const res = await apiEcom.get<ListUmkm>("/umkm", {
      params: {
        holding_id: id,
      },
    });
    // console.log(res.data.data);
    // console.log(res);
    return res.data.data;
  } catch (error: any | AxiosError) {
    if (axios.isAxiosError(error)) {
      throw error.response;
    }
    throw error;
  }
};

export const fetchUmkmById = async (id: number) => {
  try {
    const res = await apiEcom.get<ListUmkms>(`/umkm/${id}`);
    return res.data.data;
  } catch (error: any | AxiosError) {
    if (axios.isAxiosError(error)) {
      throw error.response;
    }
    throw error;
  }
};

export const createUmkm = async (data: Partial<Umkm>): Promise<Umkm> => {
  try {
    const res = await apiEcom.post<Umkm>("/umkm", data);
    return res.data;
    console.log(res.data);
  } catch (error: any | AxiosError) {
    if (axios.isAxiosError(error)) {
      throw error.response;
    }
    throw error;
  }
};

//Holding
export const fetchHolding = async () => {
  try {
    const res = await apiEcom.get<ListHolding>("/holding");
    // console.log(res.data.data);
    // console.log(res);
    return res.data.data;
  } catch (error: any | AxiosError) {
    if (axios.isAxiosError(error)) {
      throw error.response;
    }
    throw error;
  }
};

export const fetchHoldingId = async (id: number) => {
  try {
    const res = await apiEcom.get<ListHoldings>(`/holding/${id}`);
    console.log(res.data.data.umkms);
    console.log(res);
    return res.data.data.umkms;
  } catch (error: any | AxiosError) {
    if (axios.isAxiosError(error)) {
      throw error.response;
    }
    throw error;
  }
};

// export const fetchUmkmHoldingById = async (id: number) => {
//   try {
//     const res = await apiEcom.get<ListHoldings>(`/holding/${id}`);
//     console.log(res.data.data.umkms);
//     return res.data.data.umkms;
//   } catch (error: any | AxiosError) {
//     if (axios.isAxiosError(error)) {
//       throw error.response;
//     }
//     throw error;
//   }
// };

// export const fetchUmkmHoldingById = async (id: number) => {
//   try {
//     const res = await apiEcom.get<ListHoldings>(`/holding/${id}`);
//     // const resData = res.data.data.map((i) => i.umkms);
//     // console.log(res.data.data);
//     // console.log(id);
//     // console.log(res);
//     return res.data.data.umkms;
//   } catch (error: any | AxiosError) {
//     if (axios.isAxiosError(error)) {
//       throw error.response;
//     }
//     throw error;
//   }
// };

export const createHolding = async (
  data: Partial<Holding>
): Promise<Holding> => {
  try {
    const res = await apiEcom.post<Holding>("/holding", data);
    return res.data;
    console.log(res.data);
  } catch (error: any | AxiosError) {
    if (axios.isAxiosError(error)) {
      throw error.response;
    }
    throw error;
  }
};

export const addUmkmToHolding = async (
  id: number,
  data: Partial<PivotHolding>
) => {
  try {
    const res = await apiEcom.post<PivotHolding>(
      `/holding/${id}/add-umkm`,
      data
    );
    return res.data;
    console.log(res.data);
  } catch (error: any | AxiosError) {
    if (axios.isAxiosError(error)) {
      throw error.response;
    }
    throw error;
  }
};
