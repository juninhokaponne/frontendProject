import {
  UserActionTypes,
  UserState,
  FETCH_USERS_SUCCESS,
  FETCH_USERS_FAILURE,
  FETCH_USER_SUCCESS,
  UPDATE_USER_SUCCESS,
  DELETE_USER_SUCCESS,
} from "../types";

const initialState: UserState = {
  users: [],
  currentUser: null,
  loading: false,
  error: null,
};

const userReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case "FETCH_USERS_REQUEST":
      return { ...state, loading: true };
    case "FETCH_USERS_SUCCESS":
      return { ...state, loading: false, users: action.payload };
    case "FETCH_USERS_FAILURE":
      return { ...state, loading: false, error: action.payload };
    case "FETCH_USER_SUCCESS":
      return { ...state, currentUser: action.payload, loading: true };
    case "FETCH_ALL_MOVIES_SUCCESS":
      return { ...state, movies: action.payload };
    case "UPDATE_USER_SUCCESS":
      return {
        ...state,
        users: state.users.map((user: any) =>
          user.id === action.payload.id ? action.payload : user
        ),
      };
    case "DELETE_USER_SUCCESS":
      return {
        ...state,
        users: state.users.filter((user: any) => user.id !== action.payload),
      };
    default:
      return state;
  }
};

export default userReducer;
