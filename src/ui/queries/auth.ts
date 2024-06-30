import { useMutation } from "@tanstack/react-query";
import { IAuthGateway, LoginUserDto } from "../../infra/gateways/contracts/login";
import { useDeps } from "../hooks/use-deps";

export const useLogin = () => {
  const auth = useDeps<IAuthGateway>('AuthGateway');

  const { mutateAsync, data, isPending } = useMutation({
    mutationFn: async (data: LoginUserDto) => {
      console.log(data, 'hook');
      const response = await auth.login(data);
      return response;
    },
  });

  return {
    mutateAsync,
    data,
    isPending
  };
};
