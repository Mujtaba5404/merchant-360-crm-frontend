import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import api from ".";

export const useCreateMerchantMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: {
      title: string;
      type: string;
      isActive: boolean;
      credentials: Record<string, any>;
    }) => {
      const response = await api.post("/merchants", payload);
      console.log("Response from Create API", response.data);
      return response.data;
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["merchants"] });
      queryClient.invalidateQueries({ queryKey: ["merchants", "types"] });
    },
  });
};

export const useUpdateMerchantMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, payload }: { id: string; payload: any }) => {
      const response = await api.patch(`/merchants/${id}`, payload);
      return response.data;
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["merchants"] });
    },
  });
};

export const useGetAllMerchantsTypesQuery = (): any => {
  return useQuery<any>({
    queryKey: ["merchants", "types"],
    queryFn: async () => {
      const data = await api
        .get<any>("/merchants/types")
        .then(({ data }) => data);
      return data;
    },
  });
};

export const useGetAllMerchantsQuery = (): any => {
  return useQuery<any>({
    queryKey: ["merchants"],
    queryFn: async () => {
      const response = await api.get<any>("/merchants");
      return response.data;
    },
  });
};
