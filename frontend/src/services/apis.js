// const BASE_URL = process.env.BASE_URL
const BASE_URL = "http://localhost:4000/api/v1";


export const favouriteEndpoints = {
  //favouriteRoute Endpoints
  REMOVE_FAVOURITE_API: BASE_URL + "/favourite/remove",
  ADD_FAVOURITE_API: BASE_URL + "/favourite/add",
  GET_FAVOURITE_API: BASE_URL + "/favourite/fetchItems",
  GET_FAVOURITE_STATUS_API: BASE_URL + "/favourite/fetchStatus",
};

export const rememberEndpoints = {
  //rememberRoute Endpoints
  REMOVE_REMEMBER_API: BASE_URL + "/remember/remove",
  ADD_REMEMBER_API: BASE_URL + "/remember/add",
  GET_REMEMBER_API: BASE_URL + "/remember/fetchAllItems",
  GET_REMEMBER_STATUS_API: BASE_URL + "/remember/fetchStatus",
};

export const unrememberEndpoints = {
  //rememberRoute Endpoints
  REMOVE_UNREMEMBER_API: BASE_URL + "/unremember/remove",
  ADD_UNREMEMBER_API: BASE_URL + "/unremember/add",
  GET_UNREMEMBER_API: BASE_URL + "/unremember/fetchAllItems",
  GET_UNREMEMBER_STATUS_API: BASE_URL + "/unremember/fetchStatus",
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
};

export const storyEndpoints = {
  FETCHALLSTORIES_API: BASE_URL + "/story/getAll",
  FETCHSTORYBYID_API: BASE_URL + "/story/getById",
}