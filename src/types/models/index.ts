//USER

export interface User {
  email: string;
  password?: string;
  nama: string;
  alamat: string;
  no_telp: string;
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
