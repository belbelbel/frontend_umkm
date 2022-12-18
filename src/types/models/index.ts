//USER

export interface User {
  id: number;
  email: string;
  password?: string;
  nama: string;
  alamat: string;
  no_telp: string;
  balance: number;
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

//PEMBELIAN BUYER

export interface ListOrder {
  message: string;
  data: {
    current_page: number;
    per_page: number;
    total: number;
    data: [
      {
        id: number;
        user_id: number;
        umkm_id: number;
        no_kuitansi: number;
        total_harga: number;
        status: string;
        payment_code: string;
        no_resi: string;
        review: null;
        paid_at: Date;
        sent_at: Date;
        created_at: Date;
        updated_at: Date;
        details: [
          {
            id: number;
            pembelian_id: number;
            produk_id: number;
            diskon: number;
            jumlah_barang: number;
            total_harga: number;
            created_at: Date;
            updated_at: Date;
          }
        ];
      }
    ];
    buyer: User;
    seller: Umkm;
  };
}

export interface ListOrderDetail {
  message: string;
  data: {
    buyer: User;
    created_at: Date;
    details: [
      {
        id: number;
        pembelian_id: number;
        produk_id: number;
        diskon: number;
        jumlah_barang: number;
        total_harga: number;
        updated_at: number;
        produk: {
          created_at: Date;
          diskon: number;
          foto: Foto[];
          harga: number;
          id: number;
          nama: number;
          umkm: {
            alamat: string;
            created_at: string;
            id: number;
            nama_umkm: string;
            no_telp_umkm: string;
            produks_count: number;
            updated_at: Date;
            user_id: number;
          };
          umkm_id: number;
          updated_at: Date;
        };
      }
    ];
    details_count: number;
    id: number;
    no_kuitansi: number;
    no_resi: null;
    paid_at: Date;
    payment_code: string;
    review: null;
    seller: Umkm;
    sent_at: null;
    status: string;
    total_harga: number;
    umkm_id: number;
    updated_at: Date;
    user_id: number;
  };
}

export interface ListOrderDetailSeller {
  message: string;
  data: {
    current_page: number;
    per_page: number;
    total: number;
    data: [
      {
        created_at: Date;
        buyer: User;
        seller: Umkm;
        details_count: number;
        id: number;
        no_kuitansi: number;
        no_resi: null | number;
        paid_at: Date;
        payment_code: string;
        review: null | string;
        sent_at: Date;
        status: string;
        total_harga: number;
        umkm_id: number;
        updated_at: number;
        user_id: number;
        details: [
          {
            created_at: Date;
            diskon: number;
            id: number;
            jumlah_barang: number;
            pembelian_id: number;
            produk: Product;
            produk_id: number;
            total_harga: number;
            updated_at: Date;
          }
        ];
      }
    ];
  };
}

export interface DetailOrderSeller {
  message: string;
  data: {
    buyer: User;
    seller: Umkm;
    created_at: Date;
    details_count: number;
    id: number;
    no_kuitansi: number;
    no_resi: null | number;
    paid_at: Date;
    payment_code: string;
    sent_at: null;
    status: string;
    total_harga: number;
    umkm_id: number;
    updated_at: Date;
    user_id: number;
    details: [
      {
        created_at: Date;
        diskon: number;
        id: number;
        jumlah_barang: number;
        pembelian_id: number;
        produk: Product;
        produk_id: number;
        total_harga: number;
        updated_at: Date;
      }
    ];
  };
}

export interface ReviewProduct {
  message: string;
  data: [
    {
      created_at: Date;
      review: string;
      user: User;
    }
  ];
}
