import axios from 'axios';

const GASAPI = axios.create({
  headers: { 'content-type': 'application/x-www-form-urlencoded' }
});

GASAPI.interceptors.response.use(res => {
  if (res.data.error) {
    return Promise.reject(res.data.error);
  }
  return Promise.resolve(res);
}, err => {
  return Promise.reject(err);
});

const setURL = URL => {
  GASAPI.defaults.baseURL = URL;
}

let password = "";
const setPassword = pass => {
  password = pass;
}

const getBookList = (bookListStartsAt, bookListEndsAt) => {
  return GASAPI.post("", {
    opmode: "getBookList",
    password,
    params: {
      bookListStartsAt,
      bookListEndsAt
    }
  });
}

const lendBook = (userID, bookUUID) => {
  return GASAPI.post("", {
    opmode: "lendBook",
    password,
    params: {
      userID,
      bookUUID
    }
  });
}

const returnBook = (bookUUID) => {
  return GASAPI.post("", {
    opmode: "returnBook",
    password,
    params: {
      bookUUID
    }
  });
}

export default {
  setURL,
  setPassword,
  getBookList,
  lendBook,
  returnBook
}