import { useQuery, useMutation } from "@tanstack/react-query";
import { iocContainer } from "@ioc/index";
import {
  CreateUserDTO,
  UserDTO,
  IUserGateway,
} from "../../infra/gateways/contracts/user";
import { IAuthGateway } from "@infra/gateways/contracts/auth";
import { useAuthStore } from "client/store";

export async function getProfile() {
  const gateway = iocContainer.get<IAuthGateway>("AuthGateway");
  const response = await gateway.getProfile();
  return response;
}

export const useGetProfile = (token?: string | null) => {
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["getProfile"],
    queryFn: () => getProfile(),
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    enabled: !!token,
  });

  return { data, isLoading, refetch };
};

export const useCreateUser = () => {
  const userGateway = iocContainer.get<IUserGateway>("UserGateway");

  const mutation = useMutation<any, Error, CreateUserDTO>({
    mutationFn: async (user: CreateUserDTO) => {
      const response = await userGateway.createUser(user);
      if (!response) {
        throw new Error("User creation failed");
      }
      return response;
    },
  });

  return mutation;
};

export const useUpdateProfileImage = () => {
  const userGateway = iocContainer.get<IUserGateway>("UserGateway");

  const mutation = useMutation<
    any,
    Error,
    { token: string; base64Image: string }
  >({
    mutationFn: async ({ base64Image }) => {
      const response = await userGateway.changeAvatar(base64Image);
      if (!response) {
        throw new Error("Profile image update failed");
      }
      return response;
    },
  });

  return mutation;
};

export const useUpdateBio = () => {
  const userGateway = iocContainer.get<IUserGateway>("UserGateway");

  const mutation = useMutation<any, Error, { newBio: string }>({
    mutationFn: async ({ newBio }) => {
      const response = await userGateway.updateBio(newBio);
      if (!response) {
        throw new Error("Bio update failed");
      }
      return response;
    },
  });

  return mutation;
};

export const useUpdateAt = () => {
  const userGateway = iocContainer.get<IUserGateway>("UserGateway");

  const mutation = useMutation<any, Error, { newAt: string }>({
    mutationFn: async ({ newAt }) => {
      const response = await userGateway.updateAt(newAt);
      if (!response) {
        throw new Error("At update failed");
      }
      return response;
    },
  });

  return mutation;
};

export const useUpdateUserDetails = () => {
  const userGateway = iocContainer.get<IUserGateway>("UserGateway");
  const auth = iocContainer.get<IAuthGateway>("AuthGateway");
  const { setUser } = useAuthStore();
  const mutation = useMutation<any, Error, any>({
    mutationFn: async (details) => {
      const response = await userGateway.updateUserDetails(details);
      const userProfile = await auth.getProfile();
      setUser(userProfile.data)
      return response;
    },
  });

  return mutation;
};
