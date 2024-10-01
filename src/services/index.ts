import { api } from "../http/axios";
import { Endpoints } from "../utils/endpoints";
import { loginProps, registerProps, updateUserProps } from "./types/";

export const Services = {
  login: async (data: loginProps) => {
    const response = await api.post(Endpoints.login, data);

    return response.data;
  },
  register: async (data: registerProps) => {
    const response = await api.post(Endpoints.register, data);

    return response.data;
  },
  getAllUsers: async () => {
    const response = await api.get(Endpoints.getAllUsers);

    return response.data;
  },
  getUserById: async (id: string) => {
    const response = await api.get(Endpoints.getUserById(id));

    return response.data;
  },
  updateUser: async (id: string, data: updateUserProps) => {
    const response = await api.put(Endpoints.updateUser(id), data);

    return response.data;
  },
  deleteUser: async (id: string) => {
    const response = await api.delete(Endpoints.deleteUser(id));

    return response.data;
  },
};
