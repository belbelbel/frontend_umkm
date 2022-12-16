import useSWR from "swr";
import { fetchProductOwner } from "../repositories/repo";

export const useProductOwnerList = (id: number) => {
  const {
    data: productOwnerList,
    mutate,
    error,
  } = useSWR([`/umkm/${id}/produk`, id], (url, id) => fetchProductOwner(id));

  const loading = !productOwnerList && !error;
  const foto = productOwnerList?.map((x) => x.foto[0]);
  const fotos = foto?.map((x) => x.path_foto);

  return {
    productOwnerList,
    fotos,
    loading,
    mutate,
    error,
  };
};
