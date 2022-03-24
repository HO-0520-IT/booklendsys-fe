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
    getBookList: false,
    lendBook: false,
    returnBook: false
  },
  errorMessage: "",
  successMessage: ""
}

const mutations = {
  setBookList (state, {list}) {
    state.bookList = list;
  },

  setLoading (state, { type, v }) {
    state.loading[type] = v;
  },
  setErrorMessage (state, { message }) {
    state.errorMessage = message;
  },
  setSuccessMessage (state, { message }) {
    state.successMessage = message;
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
  async opgetBookList ({ commit }, item) {
    const bookListStartsAt = item.bookListStartsAt;
    const bookListEndsAt = item.bookListEndsAt;
    const type = 'getBookList'
    commit('setLoading', { type, v: true })
    try {
      const res = await GASAPI.getBookList(bookListStartsAt, bookListEndsAt)
      commit('setBookList', { list: res.data.list })
    } catch (e) {
      commit('setErrorMessage', { message: e })
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
      commit('setSuccessMessage', { message: "貸出処理が完了しました" })
    } catch (e) {
      commit('setErrorMessage', { message: e })
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
      commit('setSuccessMessage', { message: "返却処理が完了しました" })
    } catch (e) {
      commit('setErrorMessage', { message: e })
    } finally {
      commit('setLoading', { type, v: false })
    }
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