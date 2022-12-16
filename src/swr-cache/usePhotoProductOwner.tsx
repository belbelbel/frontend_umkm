import useSWR from "swr";
import { fetchPhotoProductOwner } from "../repositories/repo";

export const usePhotoProductOwnerList = (id: number) => {
  const {
    data: photo,
    mutate,
    error,
  } = useSWR([`/umkm/${id}/produk`, id], (url, id) =>
    fetchPhotoProductOwner(id)
  );

  const loading = !photo && !error;

  return {
    photo,
    loading,
    mutate,
    error,
  };
};
