// import http from "./base";

// /**
//  * @description: signup
//  * @param {type}
//  * @return:
//  */
// const SignUp = (data)=>{
//     return http.post("/signup",data);
// }

// /*
//  * @description: login
//  * @param {type}
//  */
// const SignIn = (data)=>{
//     return http.post("/login",data)
// }


// const all ={
//     SignUp,
//     SignIn
// }

// export default all;

import { postRequest } from "../util";

const BASE_URL = "http://localhost:4000";

export const SignIn = (uri, data) => postRequest(BASE_URL, uri, data);

export const SignUp = (uri, data) => postRequest(BASE_URL, uri, data);

