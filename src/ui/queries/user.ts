import { useQuery, useMutation } from "@tanstack/react-query";
import { iocContainer } from "@ioc/index";
import { CreateUserDTO, UserDTO, IUserGateway  } from "../../infra/gateways/contracts/user";

export async function getProfile(params: any) {
  const gateway = iocContainer.get<IUserGateway>("UserGateway");
  const response = await gateway.getProfile(params);
  return response;
}

export const useSearchGames = (name: string) => {
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["getProfile"],
    queryFn: () => getProfile(name),
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });

  return { data, isLoading, refetch };
};


export const useCreateUser = () => {
  const authGateway = iocContainer.get<IUserGateway>("UserGateway");

  const mutation = useMutation<UserDTO | null, Error, CreateUserDTO>({
    mutationFn: async (user: CreateUserDTO) => {
      const response = await authGateway.createUser(user);
      if (!response) {
        throw new Error("User creation failed");
      }
      return response;
    },
  });

  return mutation;
};