import { useMutation } from "@tanstack/react-query";
import {
  IAuthGateway,
  LoginUserDto,
} from "../../infra/gateways/contracts/auth";
import { useDeps } from "../hooks/use-deps";
import { useAuthStore } from "client/store";

export const useLogin = () => {
  const auth = useDeps<IAuthGateway>("AuthGateway");
  const { login, setActiveState } = useAuthStore();

  const { mutateAsync, data, isError, error } = useMutation({
    mutationFn: async (data: LoginUserDto) => {
      const response = await auth.login(data);
      if (response && response.accessToken) {
        const profile = await auth.getProfile(response.accessToken);
        localStorage.setItem('token', response.accessToken);
        login(response.accessToken, profile);
        setActiveState('logged')
      }
      return response;
    },
  });

  return {
    mutateAsync,
    data,
    isError,
    error,
  };
};

export const useRequestReset = () => {
  const auth = useDeps<IAuthGateway>("AuthGateway");

  const { mutateAsync, data, isPending } = useMutation({
    mutationFn: async (email: { email: string }) => {
      const response = await auth.requestReset(email);
      return response;
    },
  });

  return {
    mutateAsync,
    data,
    isPending,
  };
};