import axiosClient from "./axiosClient";

const useAPI = {
  getListUsers: (params) => {
    const url = "/user";
    return axiosClient.get(url, { params });
  },
  getUser: (id, params) => {
    const url = `/user/${id}`;
    return axiosClient.get(url, { params });
  },
  deleteUser: (id, params) => {
    const url = `/delete/${id}`;
    return axiosClient.get(url, { params });
  },
  logout: (params) => {
    const url = `/auth/logout`;
    return axiosClient.get(url, { params });
  },
  editUSer: (id, user, params) => {
    const url = `/edituser/${id}`;
    return axiosClient.post(url, user, { params });
  },
  loginUser: (user, params) => {
    const url = "/auth/login";

    return axiosClient.post(url, user, { params });
  },
  registerUser: (user, params) => {
    const url = "/auth/register";
    return axiosClient.post(url, user, { params });
  },
};

export default useAPI;
