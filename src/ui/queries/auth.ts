import { useMutation } from "@tanstack/react-query";
import {
  IAuthGateway,
  LoginUserDto,
} from "../../infra/gateways/contracts/auth";
import { useDeps } from "../hooks/use-deps";
import { useAuthStore } from "client/store";

export const useLogin = () => {
  const auth = useDeps<IAuthGateway>("AuthGateway");
  const { login } = useAuthStore();

  const { mutateAsync, data, isPending } = useMutation({
    mutationFn: async (data: LoginUserDto) => {
      const response = await auth.login(data);
      if (response && response.accessToken) {
        const profile = await auth.getProfile(response.userId);
        login(response.accessToken, profile);
      }
      return response;
    },
  });

  return {
    mutateAsync,
    data,
    isPending,
  };
};
