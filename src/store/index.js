import Vue from 'vue'
import Vuex from 'vuex'
import GASAPI from '../api/GASAPI'

Vue.use(Vuex)

const state = {
  bookList: {},
  settings: {
    APIURL: "",
    password: ""
  },
  loading: {
    getBasicInfo: false,
    addBook: false,
    getBookList: false,
    lendBook: false,
    returnBook: false
  },
  wait: false,
  error: false,
  success: false,
  errorMessage: "",
  successMessage: ""
}

const mutations = {
  setBookList (state, {list}) {
    state.bookList = list;
  },
  setBasicInfo (state, {basicInfo}) {
    state.basicInfo = basicInfo;
  },

  setLoading (state, { type, v }) {
    state.loading[type] = v;
    state.wait = v;
  },
  setErrorMessage (state, { message, show_window }) {
    state.errorMessage = message;
    state.error = show_window;
  },
  setSuccessMessage (state, { message, show_window }) {
    state.successMessage = message;
    state.success = show_window;
  },
  toggleDialog_error (state) {
    state.error = !state.error;
  },
  toggleDialog_success (state) {
    state.success = !state.success;
  },

  saveSettings (state, {settings}) {
    state.settings = { ...settings };
    const { APIURL, password } = state.settings;
    GASAPI.setURL(APIURL);
    GASAPI.setPassword(password);
    state.bookList = {};
    localStorage.setItem('settings', JSON.stringify(settings));
  },
  loadSettings (state) {
    const settings = JSON.parse(localStorage.getItem('settings'));
    if (settings) {
      state.settings = Object.assign(state.settings, settings);
    }
    const { APIURL, password } = state.settings;
    GASAPI.setURL(APIURL);
    GASAPI.setPassword(password);
  }
}

const actions = {
  async opgetBasicInfo ({ commit }) {
    const type = "getBasicInfo";
    commit('setLoading', { type, v: true });

    try {
      const res = await GASAPI.getBasicInfo()
      commit('setBasicInfo', { basicInfo: res.data });
    } catch (e) {
      commit('setErrorMessage', { message: e, show_window: true })
    } finally {
      commit('setLoading', { type, v: false })
    }
  },

  async opgetBookList ({ commit }, item) {
    const bookListStartsAt = item.bookListStartsAt;
    const bookListEndsAt = item.bookListEndsAt;
    const type = 'getBookList'
    commit('setLoading', { type, v: true })
    try {
      const res = await GASAPI.getBookList(bookListStartsAt, bookListEndsAt)
      commit('setBookList', { list: res.data.list })
    } catch (e) {
      commit('setErrorMessage', { message: e, show_window: true })
      commit('setBookList', { list: {} })
    } finally {
      commit('setLoading', { type, v: false })
    }
  },
  async opgetBookUUIDorID ({ commit }, item) {
    const bookUUIDorID = item.bookUUIDorID;
    const type = 'getBookUUIDorID'
    commit('setLoading', { type, v: true })
    try {
      const res = await GASAPI.getBookUUIDorID(bookUUIDorID)
      commit('setBookList', { list: res.data.list })
    } catch (e) {
      commit('setErrorMessage', { message: e, show_window: true })
      commit('setBookList', { list: {} })
    } finally {
      commit('setLoading', { type, v: false })
    }
  },
  async oplendBook ({ commit }, item) {
    const bookUUID = item.bookUUID;
    const userID = item.userID;
    const type = 'lendBook'
    commit('setLoading', { type, v: true })
    try {
      await GASAPI.lendBook(userID, bookUUID)
      commit('setSuccessMessage', { message: "貸出処理が完了しました", show_window: true })
    } catch (e) {
      commit('setErrorMessage', { message: e, show_window: true })
    } finally {
      commit('setLoading', { type, v: false })
    }
  },
  async opreturnBook ({ commit }, item) {
    const bookUUID = item.bookUUID;
    const type = 'returnBook'
    commit('setLoading', { type, v: true })
    try {
      await GASAPI.returnBook(bookUUID)
      commit('setSuccessMessage', { message: "返却処理が完了しました", show_window: true })
    } catch (e) {
      commit('setErrorMessage', { message: e, show_window: true })
    } finally {
      commit('setLoading', { type, v: false })
    }
  },
  async opaddBook ({ commit }, item) {
    var bookStockNum = item.bookStockNum ? item.bookStockNum : 1;
    const bookType = item.bookType;
    const bookID = item.bookID;
    const bookTitle = item.bookTitle;
    const bookAuthor = item.bookAuthor;
    const bookPublishedYear = item.bookPublishedYear;
    const bookPublishedMonth = item.bookPublishedMonth;
    const bookDesc = item.bookDesc;
    const bookImageURL = item.bookImageURL;
    const bookComment = item.bookComment;
    const type = 'addBook'
    commit('setLoading', { type, v: true })

    try {
      await GASAPI.addBook(bookStockNum, bookType, bookID, bookTitle, bookAuthor, bookPublishedYear, bookPublishedMonth, bookDesc, bookImageURL, bookComment)
      commit('setSuccessMessage', { message: "本の追加処理が完了しました", show_window: true })
    } catch (e) {
      commit('setErrorMessage', { message: e, show_window: true })
    } finally {
      commit('setLoading', { type, v: false })
    }
  },

  async setErrorMessage ({ commit }, item) {
    commit('setErrorMessage', item)
  },
  saveSettings ({ commit }, { settings }) {
    commit('saveSettings', { settings });
  },

  loadSettings ({ commit }) {
    commit('loadSettings');
  }
}
const store = new Vuex.Store({
  state,
  mutations,
  actions,
})

export default store