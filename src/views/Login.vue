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
                prepend-icon="mdi-server"
                required
              ></v-text-field>
            </v-form>
            <!--
            <v-form>
              <v-text-field
                v-model="settings.username"
                label="ユーザー名"
                prepend-icon="mdi-account"
                required
              ></v-text-field>
            </v-form>
            -->
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
    <v-dialog
      v-model="dialog_wait"
      persistent
      width="500"
    >
      <v-card>
        <v-card-title>
          <span class="headline">
            ログイン中です
          </span>
        </v-card-title>
        <div class="text-center">
          <v-progress-circular
            indeterminate
            color="green"
          ></v-progress-circular>
          <v-card-text>
            ログイン中です。しばらくお待ちください。
          </v-card-text>
        </div>
      </v-card>
    </v-dialog>
  </v-app>
</template>

<script>
import { mapActions, mapState } from 'vuex';

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
        username: this.$route.query.username != undefined ? this.$route.query.username : (this.$store.state.settings.username != undefined ? this.$store.state.settings.username : ""),
        password: this.$route.query.password != undefined ? this.$route.query.password : (this.$store.state.settings.password != undefined ? this.$store.state.settings.password : ""),
        message: this.$store.state.settings.message != undefined ? this.$store.state.settings.message : "",
        RequestFormURL: this.$store.state.settings.RequestFormURL != undefined ? this.$store.state.settings.RequestFormURL : "",
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
      loading: state => state.loading.getBasicInfo,
      basicInfo: state => state.basicInfo,
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
    ...mapActions([
      "opgetBasicInfo",
    ]),
    close_dialog_error () {
      this.$store.commit("toggleDialog_error")
    },
    close_dialog_success () {
      this.$store.commit("toggleDialog_success")
    },
    async onClickLogin () {
      await this.opgetBasicInfo();
      this.settings.message = this.basicInfo.message;
      this.settings.RequestFormURL = this.basicInfo.RequestFormURL;
      await new Promise(resolve =>{
        //this.$store.commit("toggleWait", true);
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
