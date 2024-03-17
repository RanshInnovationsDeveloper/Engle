// const BASE_URL = process.env.BASE_URL
const BASE_URL = "http://localhost:4000/api/v1";

// AUTH ENDPOINTS
export const authEndpoints = {
  SIGNUP_API: BASE_URL + "/auth/signup",
  LOGIN_API: BASE_URL + "/auth/login",
  RESETPASSWORD_API: BASE_URL + "/auth/reset-password",
};

export const favouriteEndpoints = {
  //favouriteRoute Endpoints
  REMOVE_FAVOURITE_API: BASE_URL + "/favourite/remove",
  ADD_FAVOURITE_API: BASE_URL + "/favourite/add",
  GET_FAVOURITE_API: BASE_URL + "/favourite/fetchItems",
  GET_FAVOURITE_STATUS_API: BASE_URL + "/favourite/fetchStatus",
};
export const notesEndpoints = {
  //mynotesRoute Endpoints
  CREATENOTES_API: BASE_URL + "/notes/createnote",
  GETNOTES_API: BASE_URL + "/notes/getnotes",
};

export const contactEndpoints = {
  //unseenRoute Endpoints
  CONTACT_API: BASE_URL + "/contact/",
};

export const flashCardEndpoints = {
  FETCHWORD_API: BASE_URL + "/word/fetchword",
  ADDWORD_API: BASE_URL + "/word/addword",
};
