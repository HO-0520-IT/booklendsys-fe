<template>
  <div>
    <h1>貸出・返却処理画面</h1>
    <v-radio-group
      row
      v-model="modeSelect"
      hide-details
      @change="onModeSelect"
    >
      <v-radio label="貸出" value="lend"/>
      <v-radio label="返却" value="return"/>
    </v-radio-group>
    <v-text-field
      v-if="showUserIDField"
      label="ユーザー ID"
      v-model.trim="userID"
    />
    <v-text-field
      label="UUID"
      v-model.number="UUID"
      pattern="[0-9a-fA-F\-]*"
    />
    <v-btn color="green" dark @click="onClickRunButton">
      {{displayRunButtonText(this.modeSelect)}}
    </v-btn>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  name: 'LendReturn',
  data (){
    return {
      showUserIDField: this.$route.query.modeSelect=="return" ? false : true,
			modeSelect: this.$route.query.modeSelect ? this.$route.query.modeSelect : "lend",
      userID: "",
			UUID: this.$route.query.UUID ? this.$route.query.UUID : "",
		}
	},
	computed: {
    ...mapState({
      loading: state => state.loading.fetch,
    }),
  },
	methods: {
    ...mapActions([
      "oplendBook",
      "opreturnBook"
    ]),
    displayRunButtonText(modeSelect) {
			if (modeSelect == "lend") {
				return "貸出処理実行";
			} else {
				return "返却処理実行";
			}
		},
    onModeSelect() {
			if (this.modeSelect == "return") {
				this.showUserIDField = false;
			} else {
				this.showUserIDField = true;
			}
		},
    onClickRunButton() {
      let item = {};
      item.bookUUID = this.UUID;
      item.userID = this.userID;
			if (this.modeSelect == "return") {
				this.opreturnBook(item);
			} else if (this.modeSelect == "lend") {
				this.oplendBook(item);
			}
    }
	},
  watch: {

  }
}
</script>