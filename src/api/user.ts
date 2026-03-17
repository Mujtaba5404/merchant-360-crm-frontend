import { upperFirst } from "@mantine/hooks";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { UseQueryResult, UseMutationResult } from "@tanstack/react-query";
import { showNotification } from "@mantine/notifications";
import api from ".";

// ----------------- Types -----------------
export interface User {
  _id: string;
  name: string;
  email: string;
  role?: string;
  [key: string]: any;
}

export interface CreateUserPayload {
  name: string;
  email: string;
  password: string;
  role?: string;
  [key: string]: any;
}

export interface UpdateUserPayload {
  userId: string;
  payload: Partial<User>;
}

export interface UserQueryParams {
  [key: string]: any;
}

// ----------------- Queries -----------------

export const useGetAllUsersQuery = (params?: UserQueryParams): UseQueryResult<User[], unknown> => {
  return useQuery<User[]>({
    queryKey: ["users", "all", params],
    queryFn: async () => {
      const { data } = await api.get<User[]>("users/all", { params });
      return data;
    },
  });
};

export const useGetUsersWithPaginationQuery = (params?: UserQueryParams): UseQueryResult<User[], unknown> => {
  return useQuery<User[]>({
    queryKey: ["users", params],
    queryFn: async () => {
      const { data } = await api.get<User[]>("users", { params });
      return data;
    },
  });
};

// ----------------- Mutations -----------------

export const useCreateUserMutation = (): UseMutationResult<any, any, CreateUserPayload> => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: CreateUserPayload) => api.post("users", payload),
    onSuccess: () => {
      queryClient.invalidateQueries(["users"]);
      showNotification({
        title: upperFirst("done!"),
        message: upperFirst("user successfully created"),
        type: "success",
      });
    },
    onError: (error: any) => {
      showNotification({
        title: upperFirst("error!"),
        message: upperFirst(error.response?.data?.message || "error creating user"),
        type: "error",
      });
    },
  });
};

export const useUpdateUserMutation = (): UseMutationResult<any, any, UpdateUserPayload> => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ userId, payload }: UpdateUserPayload) => api.patch(`users/${userId}`, payload),
    onSuccess: () => {
      queryClient.invalidateQueries(["users"]);
      showNotification({
        title: upperFirst("done!"),
        message: upperFirst("user successfully updated"),
        type: "success",
      });
    },
    onError: (error: any) => {
      showNotification({
        title: upperFirst("error!"),
        message: upperFirst(error.response?.data?.message || "error updating user"),
        type: "error",
      });
    },
  });
};