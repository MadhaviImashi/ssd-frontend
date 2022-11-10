import { getByIDRequest,postRequest, deleteRequest } from "../util";

const BASE_URL = "http://localhost:4001";

export const getCartByUserId = (uri, id) => getByIDRequest(BASE_URL, uri, id);

export const addToCart = (uri, data) => postRequest(BASE_URL, uri, data);

export const removeFromCart = (uri, id) => deleteRequest(BASE_URL, uri, id);

export const clearCart = (uri, id) => deleteRequest(BASE_URL, uri, id);
