import axios from "axios";
const prodURL = import.meta.env.VITE_PROD_URL;

const token = `Bearer ${localStorage.getItem("token")}`;
const baseUrl = prodURL || "http://localhost:3001";

export const createUser =
  (name: string, email: string, password: string) => async (dispatch: any) => {
    try {
      const response = await axios.post(`${baseUrl}/api/users`, {
        name,
        email,
        password,
      });
      dispatch({ type: "CREATE_USER_SUCCESS", payload: response.data });
    } catch (error: any) {
      console.error(error);
    }
  };

export const loginUser =
  (email: string, password: string) => async (dispatch: any) => {
    try {
      const response = await axios.post(`${baseUrl}/api/login`, {
        email,
        password,
      });
      dispatch({ type: "LOGIN_USER_SUCCESS", payload: response.data });
    } catch (error: any) {
      console.error(error);
    }
  };

export const fetchUsers = () => async (dispatch: any) => {
  dispatch({ type: "FETCH_USERS_REQUEST" });
  try {
    const response = await axios.get(`${baseUrl}/api/users`, {
      headers: {
        Authorization: token,
      },
    });
    dispatch({ type: "FETCH_USERS_SUCCESS", payload: response.data });
    return response.data;
  } catch (error: any) {
    dispatch({ type: "FETCH_USERS_FAILURE", payload: error.message });
  }
};

export const fetchUserDetails = (id: string) => async () => {
  try {
    const response = await axios.get(`${baseUrl}/api/users/${id}`, {
      headers: {
        Authorization: token,
      },
    });

    return response.data;
  } catch (error: any) {
    console.error(error);
  }
};

export const updateUser =
  (id: string, userData?: any) => async (dispatch: any) => {
    try {
      const response = await axios.put(`${baseUrl}/api/users/${id}`, userData, {
        headers: {
          Authorization: token,
        },
      });

      dispatch({ type: "UPDATE_USER_SUCCESS", payload: response.data });
    } catch (error: any) {
      console.error(error);
    }
  };

export const deleteUser = (id: any) => async (dispatch: any) => {
  try {
    await axios.delete(`${baseUrl}/api/users/${id}`, {
      headers: {
        Authorization: token,
      },
    });
    dispatch({ type: "DELETE_USER_SUCCESS", payload: id });
  } catch (error: any) {
    console.error(error);
  }
};

export const fetchAllMovies = () => async (dispatch: any) => {
  try {
    const response = await axios.get(`${baseUrl}/api/films`, {
      headers: {
        Authorization: token,
      },
    });

    dispatch({ type: "FETCH_ALL_MOVIES_SUCCESS", payload: response.data });
    return response.data;
  } catch (error: any) {
    console.error(error);
  }
};
