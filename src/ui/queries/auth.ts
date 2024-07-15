import { useMutation } from "@tanstack/react-query";
import {
  IAuthGateway,
  LoginUserDto,
} from "../../infra/gateways/contracts/auth";
import { useDeps } from "../hooks/use-deps";

export const useLogin = () => {
  const auth = useDeps<IAuthGateway>("AuthGateway");
  const { mutateAsync, data, isError, error } = useMutation({
    mutationFn: async (data: LoginUserDto) => {
      const response = await auth.login(data);
      if (response && response.token) {
        localStorage.setItem("token", response.token);
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

export const useResetPassword = () => {
  const auth = useDeps<IAuthGateway>("AuthGateway");

  const { mutateAsync, data, isPending } = useMutation({
    mutationFn: async ({ token, newPassword }: { token:string, newPassword: string }) => {
      const response = await auth.resetPassword(token,newPassword);
      return response;
    },
  });
  return {
    mutateAsync,
    data,
    isPending,
  };
};

export const useValidateToken = () => {
  const auth = useDeps<IAuthGateway>("AuthGateway");

  const { mutateAsync, data, isPending, isError, error } = useMutation({
    mutationFn: async (token: string) => {
      const response = await auth.validateToken(token);
      return response;
    },
  });

  return {
    mutateAsync,
    data,
    isPending,
    isError,
    error,
  };
};
export const useChangePassword = () => {
  const authGateway = useDeps<IAuthGateway>("AuthGateway");

  const { mutateAsync, data, isError, error } = useMutation({
    mutationFn: async (data: {
      currentPassword: string | null;
      newPassword: string;
    }) => {
      const response = await authGateway.changePassword(
        data.currentPassword,
        data.newPassword,
      );
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
