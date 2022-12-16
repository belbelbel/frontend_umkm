//USER

export interface User {
  id: number;
  email: string;
  password?: string;
  nama: string;
  alamat: string;
  no_telp: string;
}

export interface FetchUser {
  message: string;
  data: User;
}

//Umkm

export interface Umkm {
  id: number;
  user_id: number;
  nama_umkm: string;
  alamat: string;
  no_telp_umkm: string;
  parent_id?: number;
  produks_count: number;
  created_at: Date;
  updated_at: Date;
}

export interface ListUmkm {
  code: number;
  message: string;
  data: Umkm[];
}

export interface ListUmkms {
  code: number;
  message: string;
  data: Umkm;
}

//Holding

export interface PivotHolding {
  holding_id: number;
  umkm_id: number;
}

export interface UmkmInHolding {
  id: number;
  user_id: number;
  nama_umkm: string;
  alamat: string;
  no_telp_umkm: string;
  created_at: Date;
  updated_at: Date;
  pivot: PivotHolding[];
}

export interface Holding {
  id: number;
  user_id: number;
  nama: string;
  foto: string;
  created_at: Date;
  updated_at: Date;
  umkms_count: number;
}

export interface ListHolding {
  code: number;
  message: string;
  data: Holding[];
}

export interface ListHoldings {
  code: number;
  message: string;
  data: Holding;
}

//Product
export interface ListProduct {
  code: number;
  message: string;
  data: Product[];
}

export interface ProductDetail {
  code: number;
  message: string;
  data: Product;
}

export interface Foto {
  id: number;
  created_at: Date;
  path_foto: string;
  produk_id: number;
  updated_at: Date;
}

export interface Product {
  id: number;
  umkm_id: number;
  nama: string;
  harga: number;
  diskon: number;
  deleted_at: Date;
  created_at: Date;
  updated_at: Date;
  umkm: Umkm;
  foto: Foto[];
}

export interface ResponsePhotos {
  message: string;
  data: number;
}

//Product Public

export interface Pagination {
  current_page: number;
  per_page: number;
  total: number;
  data: Product[];
}

export interface ResponsePublicProduct {
  message: string;
  data: Pagination;
}

export interface MakeOrder {
  orders: [
    {
      produk_id: number;
      jumlah: number;
    }
  ];
}
