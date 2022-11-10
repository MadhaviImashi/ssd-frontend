import { postRequest } from "../util";

const BASE_URL = "http://localhost:4000";

export const SignIn = (uri, data) => postRequest(BASE_URL, uri, data);

export const SignUp = (uri, data) => postRequest(BASE_URL, uri, data);

