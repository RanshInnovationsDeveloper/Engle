
const BASE_URL=process.env.REACT_APP_BACKEND_URL;

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

export const seenEndpoints = {
  //seenRoute Endpoints
  ADD_SEEN_API: BASE_URL + "/seen/add",
};

export const notesEndpoints = {
  //mynotesRoute Endpoints
  CREATENOTES_API: BASE_URL + "/notes/createnote",
  GETALLNOTES_API: BASE_URL + "/notes/getallnotes",
  GETRECENT_5_NOTES_API:BASE_URL+"/notes/getrecentnotes",
  DELETENOTE_API:BASE_URL+"/notes/deletenote",
  UPDATENOTE_API:BASE_URL+"/notes/updatenote",
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

export const subscriptionEndpoints = {
  CREATE_SUBSCRIPTION_API: BASE_URL + "/subscription/create",
  UPDATE_SUBSCRIPTION_API: BASE_URL + "/subscription/update",
  GET_SUBSCRIPTION_TOKEN_API: BASE_URL + "/subscription/generatetoken",
  VALIDATE_SUBSCRIPTION_TOKEN_API: BASE_URL + "/subscription/validatetoken",
  GET_SUBSCRIPTION_DATA_API: BASE_URL + "/subscription/getsubscriptiondata",
}


export const paymentEndpoints = {
  CHECKOUT_API: BASE_URL + "/payment/checkout",
  PAYMENT_VERIFICATION_API: BASE_URL + "/payment/verify",
}
