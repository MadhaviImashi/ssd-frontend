import { getRequest, postRequest } from "../util";

const BASE_URL = "https://localhost:4000";

export const getMessageHistory = (uri, id) => getRequest(BASE_URL, uri, id);

export const saveMessages = (uri, data) => postRequest(BASE_URL, uri, data);

