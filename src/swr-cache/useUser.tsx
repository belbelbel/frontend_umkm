import useSWR from "swr";
import { fetchUser } from "../repositories/repo";

export const useUser = () => {
  const { data, error, mutate } = useSWR("/user/me", fetchUser);

  const loading = !data && !error;
  const loggedOut = error && error.status === 401;
  // console.log(data);

  return {
    user: data,
    loggedOut,
    loading,
    error,
    mutate,
  };
};
