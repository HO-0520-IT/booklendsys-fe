<template>
  <div>
    <h1>接続設定</h1>
    <v-text-field
      label="API URL"
      v-model="settings.APIURL"
    />
    <v-text-field
      label="Password"
      v-model="settings.password"
    />
    <v-row>
      <v-spacer/>
      <v-btn color="green" dark @click="onClickSave">保存</v-btn>
    </v-row>
  </div>
</template>

<script>
export default {
  name: 'ConnectSettings',
  data() {
    return {
      settings: {
        APIURL: "",
        password: "",
        ...this.$store.state.settings
      }
    }
  },
  methods: {
    onClickSave () {
      this.$store.dispatch('saveSettings', { settings: this.settings });
    }
  }
}
</script>
