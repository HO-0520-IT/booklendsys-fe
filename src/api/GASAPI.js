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

const getBasicInfo = () => {
  return GASAPI.post("",{
    opmode: "getBasicInfo",
    password,
  });
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

const getBookUUIDorID = (bookUUIDorID) => {
  return GASAPI.post("", {
    opmode: "getBookUUIDorID",
    password,
    params: {
      bookUUIDorID
    }
  });
}

const addBook = (bookStockNum, bookType, bookID, bookTitle, bookAuthor, bookPublishedYear, bookPublishedMonth, bookDesc, bookImageURL, bookComment) => {
  return GASAPI.post("", {
    opmode: "addBook",
    password,
    params: {
      bookStockNum,
      bookType,
      bookID,
      bookTitle,
      bookAuthor,
      bookPublishedYear,
      bookPublishedMonth,
      bookDesc,
      bookImageURL,
      bookComment
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
  getBasicInfo,
  getBookList,
  getBookUUIDorID,
  addBook,
  lendBook,
  returnBook
}