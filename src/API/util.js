
/**APIs calls of all CRUD http requests are implemented in this class */
let userID = localStorage.getItem('user_id');
const axios = require("axios").default;

export const getRequest = (BASE_URL, uri) => {

  return new Promise((resolve, reject) => {
    axios
      .get(`${BASE_URL}${uri}`,
        {
          params: {
            user_id: userID,
      }
    })
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        console.log(error);
        reject(error);
      })
      .then(() => {
        //always get executed
      });
  });
};

export const getByIDRequest = (BASE_URL, uri, id) => {
  return new Promise((resolve, reject) => {
    axios
      .get(`${BASE_URL}${uri}${id}`, {
        params: {
          user_id: userID,
    }
      })
      .then(function (response) {
        resolve(response);
      })
      .catch(function (error) {
        reject(error);
      })
      .then(function () {
        // always executed
      });
  });
};

export const postRequest = (BASE_URL, uri, data) => {
  console.log('baseurl, uri', BASE_URL, uri, data);
  return new Promise((resolve, reject) => {
    axios
      .post(`${BASE_URL}${uri}`, data)
      .then(function (response) {
        console.log('response', response);
        resolve(response);
      })
      .catch(function (error) {
        reject(error);
      });
  });
};

export const updateRequest = (BASE_URL, uri, id, data) => {
  return new Promise((resolve, reject) => {
    axios
      .put(`${BASE_URL}${uri}${id}`, data, {
        params: {
          user_id: userID,
    }
      })
      .then(function (response) {
        resolve(response);
      })
      .catch(function (error) {
        reject(error);
    })
  })
}

export const deleteRequest = (BASE_URL, uri, id) => {
  return new Promise((resolve, reject) => {
    axios
      .delete(`${BASE_URL}${uri}${id}`, {
        params: {
          user_id: userID,
    }
      })
      .then(function (response) {
        resolve(response);
      })
      .catch(function (error) {
        reject(error);
      })
      .then(function () {
        // always executed
      });
  });
}

export const postRequestForMovies = (BASE_URL, uri, data) => {
  return new Promise((resolve, reject) => {
    axios
      .post(`${BASE_URL}${uri}`, data, {
        headers: { "Content-Type": "multipart/form-data" },
        params: {
          user_id: userID,
    }
      })
      .then(function (response) {
        resolve(response);
      })
      .catch(function (error) {
        console.log(error);
        reject(error);
      });
  });
};
