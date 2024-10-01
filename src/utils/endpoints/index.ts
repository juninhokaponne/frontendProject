export const Endpoints = {
  login: "/login",
  register: "/users",
  getAllUsers: "/users",
  getUserById: (id: string) => `/users/${id}`,
  updateUser: (id: string) => `/users/${id}`,
  deleteUser: (id: string) => `/users/${id}`,
};
