import { apiEcom } from "../pages/api/hello";
import {
  DetailOrderSeller,
  FetchUser,
  Foto,
  Holding,
  ListHolding,
  ListHoldings,
  ListOrder,
  ListOrderDetail,
  ListOrderDetailSeller,
  ListProduct,
  ListUmkm,
  ListUmkms,
  PivotHolding,
  Product,
  ProductDetail,
  ResponsePhotos,
  ResponsePublicProduct,
  ReviewProduct,
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

export const fetchUser = async () => {
  try {
    const res = await apiEcom.get<FetchUser>("/user/me");
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

export const fetchUmkmHolding = async (id: number) => {
  //useUmkmByHoldingId
  try {
    const res = await apiEcom.get<ListUmkm>("/umkm", {
      params: {
        holding_id: id,
      },
    });
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
    return res.data.data;
  } catch (error: any | AxiosError) {
    if (axios.isAxiosError(error)) {
      throw error.response;
    }
    throw error;
  }
};

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

export const removeUmkmFromHolding = async (
  holdingId: number,
  umkmId: number
) => {
  try {
    await apiEcom.post(`/holding/${holdingId}/remove-umkm?umkm_id=${umkmId}`);
  } catch (error: any | AxiosError) {
    if (axios.isAxiosError(error)) {
      throw error.response;
    }
    throw error;
  }
};

//PRODUCT OWNER
export const fetchProductOwner = async (id: number) => {
  try {
    const res = await apiEcom.get<ListProduct>(`/umkm/${id}/produk`);
    console.log(res);
    return res.data.data;
  } catch (error: any | AxiosError) {
    if (axios.isAxiosError(error)) {
      throw error.response;
    }
    throw error;
  }
};

export const fetchPhotoProductOwner = async (id: number) => {
  try {
    const res = await apiEcom.get<Product>(`/umkm/${id}/produk`);
    console.log(res);
    return res.data.foto;
  } catch (error: any | AxiosError) {
    if (axios.isAxiosError(error)) {
      throw error.response;
    }
    throw error;
  }
};

export const uploadPhoto = async (umkmId: number, data: File) => {
  try {
    const body = new FormData();
    body.append("foto", data);
    const res = await apiEcom.post(`/umkm/${umkmId}/foto/produk`, body, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    const response = res.data;
    return response;
  } catch (error: any | AxiosError) {
    if (axios.isAxiosError(error)) {
      throw error.response;
    }
    throw error;
  }
};

export const createProduct = async (umkmId: number, data: Partial<Product>) => {
  try {
    const res = await apiEcom.post<Product>(`/umkm/${umkmId}/produk`, data);
    console.log(res.data);
    return res.data;
  } catch (error: any | AxiosError) {
    if (axios.isAxiosError(error)) {
      throw error.response;
    }
    throw error;
  }
};

//PRODUCT PUBLIC

export const fetchProductPublic = async () => {
  try {
    const res = await apiEcom.get<ResponsePublicProduct>(
      `/public/produk?perpage=10&orderby=id&order=desc`
    );
    return res.data.data.data;
  } catch (error: any | AxiosError) {
    if (axios.isAxiosError(error)) {
      throw error.response;
    }
    throw error;
  }
};

export const fetchProductDetailPublic = async (id: number) => {
  try {
    const res = await apiEcom.get<ProductDetail>(`/public/produk/${id}`);
    // console.log(res);
    return res.data.data;
  } catch (error: any | AxiosError) {
    if (axios.isAxiosError(error)) {
      throw error.response;
    }
    throw error;
  }
};

export const fetchReviewProduct = async (id: number) => {
  try {
    const res = await apiEcom.get<ReviewProduct>(
      `/public/produk/${id}/reviews`
    );
    console.log(res.data);
    return res.data.data;
  } catch (error: any | AxiosError) {
    if (axios.isAxiosError(error)) {
      throw error.response;
    }
    throw error;
  }
};

//PEMBELIAN BUYER

export const BuyerListOrder = async () => {
  try {
    const res = await apiEcom.get<ListOrder>(
      `/pembelian?perpage=30&orderby=id&order=desc`
    );
    console.log(res.data.data.data);
    return res.data.data.data;
  } catch (error: any | AxiosError) {
    if (axios.isAxiosError(error)) {
      throw error.response;
    }
    throw error;
  }
};

export const BuyerOrderDetail = async (id: number) => {
  try {
    const res = await apiEcom.get<ListOrderDetail>(`/pembelian/${id}`);
    // console.log(res.data);
    return res.data.data;
  } catch (error: any | AxiosError) {
    if (axios.isAxiosError(error)) {
      throw error.response;
    }
    throw error;
  }
};

export const receiveOrder = async (id: number) => {
  try {
    const res = await apiEcom.post(`/public/pembelian/${id}/received`);
    console.log(res.data);
    return res.data;
  } catch (error: any | AxiosError) {
    if (axios.isAxiosError(error)) {
      throw error.response;
    }
    throw error;
  }
};

export const doneOrder = async (id: number) => {
  try {
    const res = await apiEcom.post(`/pembelian/${id}/done`);
    console.log(res.data);
    return res.data;
  } catch (error: any | AxiosError) {
    if (axios.isAxiosError(error)) {
      throw error.response;
    }
    throw error;
  }
};

export const reviewOrder = async (id: number, data: Object) => {
  try {
    const res = await apiEcom.post(`/pembelian/${id}/review`, data);
    console.log(res.data);
    return res.data;
  } catch (error: any | AxiosError) {
    if (axios.isAxiosError(error)) {
      throw error.response;
    }
    throw error;
  }
};

//PEMBELIAN SELLER
export const fetchOrderList = async () => {
  try {
    const res = await apiEcom.get<ListOrderDetailSeller>(
      `/umkm/all/pembelian?perpage=30&orderby=id&order=desc`
    );
    console.log(res.data.data.data);
    return res.data.data.data;
  } catch (error: any | AxiosError) {
    if (axios.isAxiosError(error)) {
      throw error.response;
    }
    throw error;
  }
};

export const fetchOrderListDetail = async (id: number) => {
  try {
    const res = await apiEcom.get<DetailOrderSeller>(
      `/umkm/all/pembelian/${id}`
    );
    // console.log(res.data);
    return res.data;
  } catch (error: any | AxiosError) {
    if (axios.isAxiosError(error)) {
      throw error.response;
    }
    throw error;
  }
};

export const updateResi = async (id: number, data: Object) => {
  try {
    const res = await apiEcom.post(`/umkm/all/pembelian/${id}/resi`, data);
    console.log(res.data);
    return res.data;
  } catch (error: any | AxiosError) {
    if (axios.isAxiosError(error)) {
      throw error.response;
    }
    throw error;
  }
};
