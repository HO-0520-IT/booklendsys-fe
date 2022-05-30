<template>
  <v-app>
    <v-app-bar
      app
      color="green"
      dark
    >
      <v-app-bar-nav-icon @click="drawer=true">
      </v-app-bar-nav-icon>
      <v-toolbar-title>図書貸出返却システム</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon to="/connectsettings">
        <v-icon>mdi-database-settings</v-icon>
      </v-btn>
    </v-app-bar>
    <v-navigation-drawer
      v-model="drawer"
      fixed
      temporary
    >
      <v-list-item-group
        color="green"
      >
        <v-list-item to="/" >
          <v-list-item-icon>
            <v-icon>mdi-home</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>ホーム</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-divider></v-divider>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.link"
        >
          <v-list-item-icon>
            <v-icon v-text="item.icon"></v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title v-text="item.text"></v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
    </v-navigation-drawer>
    <v-main>
      <v-container fluid>
        <router-view></router-view>
      </v-container>
    </v-main>
    <v-snackbar v-model="snackbar" color="error" timeout=-1>
      {{ errorMessage }}
      <template v-slot:action="{ attrs }">
        <v-btn
          text
          v-bind="attrs"
          @click="snackbar = false"
        >
          Close
        </v-btn>
      </template>
    </v-snackbar>
    <v-snackbar v-model="snackbar_s" color="green" timeout=-1>
      {{ successMessage }}
      <template v-slot:action="{ attrs }">
        <v-btn
          text
          v-bind="attrs"
          @click="snackbar_s = false"
        >
          Close
        </v-btn>
      </template>
    </v-snackbar>
    <v-dialog
      v-model="this.$store.state.success"
      width="500"
    >
      <v-card>
        <v-card-title>
          <v-icon
            color="green"
            class="headline"
          >
            mdi-check
          </v-icon>
          <span class="headline">
            処理が完了しました
          </span>
        </v-card-title>
        <v-card-text>
          {{ successMessage }}
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darker" text @click="close_dialog_success">
            OK
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog
      v-model="this.$store.state.error"
      width="500"
    >
      <v-card>
        <v-card-title>
          <v-icon
            color="red"
            class="headline"
          >
            mdi-alert-circle
          </v-icon>
          <span class="headline">
            処理が失敗しました
          </span>
        </v-card-title>
        <v-card-text>
          {{ errorMessage }}
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red darker" text @click="close_dialog_error">
            OK
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog
      v-model="dialog_wait"
      persistent
      width="500"
    >
      <v-card>
        <v-card-title>
          <span class="headline">
            処理中です
          </span>
        </v-card-title>
        <div class="text-center">
          <v-progress-circular
            indeterminate
            color="green"
          ></v-progress-circular>
          <v-card-text>
            処理中です。しばらくお待ちください。
          </v-card-text>
        </div>
      </v-card>
    </v-dialog>
  </v-app>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: "app",
  data() {
    return {
      drawer: false,
      snackbar: false,
      snackbar_s: false,
      dialog_success: false,
      dialog_error: false,
      dialog_wait: false,
      items: [
        { text: "サーバーに接続", icon: "mdi-database-settings", link: "/connectsettings" },
        { text: "蔵書一覧", icon: "mdi-book", link: "/booklist" },
        { text: "ユーザー一覧", icon: "mdi-account", link: "/userlist" },

      ]
    }
  },
  computed: {
    ...mapState({
      appName: state => state.settings.appName,
      wait: state => state.wait,
      errorMessage: state => state.errorMessage,
      successMessage: state => state.successMessage,
      showErrorMessage: state => state.error,
      showSuccessMessage: state => state.success,
    }),
  },
  watch: {
    wait (val) {
      this.dialog_wait = val;
    },
    showErrorMessage () {
      this.dialog_error = true;
      state=>state.error = false;
    },
    showSuccessMessage () {
      this.dialog_success = true;
      state=>state.success = false;
    },
  },
  methods :{
    close_dialog_error () {
      this.$store.commit("toggleDialog_error")
    },
    close_dialog_success () {
      this.$store.commit("toggleDialog_success")
    },
  },
  beforeCreate () {
    this.$store.dispatch('loadSettings')
  },
}
</script>
