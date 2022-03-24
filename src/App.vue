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
      items: [
        { text: "サーバーに接続", icon: "mdi-database-settings", link: "/connectsettings" },
        { text: "蔵書一覧", icon: "mdi-book", link: "/booklist" },
        { text: "ユーザー一覧", icon: "mdi-account", link: "/userlist" },

      ]
    }
  },
  computed: mapState({
    appName: state => state.settings.appName,
    errorMessage: state => state.errorMessage,
    successMessage: state => state.successMessage
  }),
  beforeCreate () {
    this.$store.dispatch('loadSettings')
  },
  watch: {
    errorMessage () {
      this.snackbar = true;
    },
    successMessage () {
      this.snackbar_s = true;
    }
  }
}
</script>
