import { useMutation } from "@tanstack/react-query";
import { useDeps } from "../hooks/use-deps";
import { IChatGateway } from "@infra/gateways/contracts/chat";

export const useChatGpt = () => {
  const chatGateway = useDeps<IChatGateway>('ChatGateway');

  const { mutateAsync,data, isPending } = useMutation({
    mutationFn: async (message: string) => {
      const response =  await chatGateway.getCompletion(message);
      return response;
    },}
  );

  return {
    mutateAsync,
    data,
    isPending
  };
};
