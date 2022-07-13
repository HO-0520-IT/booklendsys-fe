<template>
  <v-app>
    <v-main>
      <v-container
        fluid
         fill-height
      >
      <v-row
        justify="center"
        align-content="center"
      >
        <v-col
        cols="12"
        md="8"
        >
        <v-card
        >
          <v-toolbar
            color="primary"
            dark
            flat
            app-toolbar
          >
            <v-toolbar-title>図書貸出返却システム ログイン</v-toolbar-title>
            <v-spacer></v-spacer>
          </v-toolbar>
          <v-card-text>
            <v-form
              v-model="isValid"
              ref="form"
            >
              <v-text-field
                v-model="settings.APIURL"
                :rules="rules.APIURL"
                label="API URL"
                required
              ></v-text-field>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-btn
              type="submit"
              :disabled="!isValid"
              color="primary"
              @click="onClickLogin"
            >
              ログイン
            </v-btn>
          </v-card-actions>
        </v-card>
        </v-col>
      </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: "Login",
  data() {
    return {
      isValid: false,
      drawer: false,
      snackbar: false,
      snackbar_s: false,
      dialog_success: false,
      dialog_error: false,
      dialog_wait: false,
      settings: {
        APIURL: this.$route.query.apiurl != undefined ? this.$route.query.apiurl : (this.$store.state.settings.APIURL != undefined ? this.$store.state.settings.APIURL : ""),
        password: this.$route.query.password != undefined ? this.$route.query.password : (this.$store.state.settings.password != undefined ? this.$store.state.settings.password : ""),
      },
      rules: {
        APIURL: [
          v => !!v || 'API URLを入力してください',
          v => /^https?:\/\/[\w-]+(\.[\w-]+)+.*$/.test(v) || 'API URLを正しく入力してください',
        ],
      },
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
    async onClickLogin () {
      await new Promise(resolve =>{
        this.$store.commit("toggleWait", true);
        this.$store.dispatch('saveSettings', { settings: this.settings });
        resolve();
      }).then(() => {
        this.$router.push("/home");
      });
    },
  },
  beforeCreate () {
    this.$store.dispatch('loadSettings')
  },
}
</script>
