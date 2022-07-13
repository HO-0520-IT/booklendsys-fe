<template>
  <div>
    <!--<h1>書籍登録・編集・削除画面</h1>-->
    <h1>書籍登録画面</h1>
    <!--
    <v-radio-group
      row
      v-model="modeSelect"
      hide-details
      @change="onModeSelect"
    >
      <v-radio label="登録" value="register"/>
      <v-radio label="編集" value="edit"/>
      <v-radio label="削除" value="remove"/>
    </v-radio-group>
    -->
    <v-text-field
      v-if="showUUIDField"
      label="UUID"
      v-model="UUID"
    />
    <v-select
      v-if="showDataField"
      label="種類"
      :items="bookTypeSelectItems"
      v-model="bookTypeSelect"
      @change="onBookTypeSelect"
      item-text="bookTypeName"
      item-value="bookType"
    >
    </v-select>
    <v-row
      v-if="showDataField"
    >
      <v-col cols="8">
        <v-text-field
          v-model="bookID"
        >
        <template v-slot:label>
          <div>
            {{displayIDText(bookTypeSelect)}}
          </div>
        </template>
        </v-text-field>
      </v-col>
      <v-spacer/>
      <v-col class="text-right" cols="4">
        <v-btn
          color="green"
          dark
          @click="onClickGetInformationButton"
        >
          情報取得
        </v-btn>
      </v-col>
    </v-row>
    <v-text-field
      v-if="showDataField"
      label="タイトル"
      v-model="bookTitle"
    />
    <v-text-field
      v-if="showDataField"
      label="著者"
      v-model="bookAuthor"
    />
    <v-text-field
      v-if="showDataField"
      label="出版社"
      v-model="bookPublisher"
    />
    <v-text-field
      v-if="showDataField"
      label="画像 URL"
      v-model="bookURL"
    />
    <v-textarea
      v-if="showDataField"
      v-model="bookComment"
    >
      <template v-slot:label>
        <div>
          コメント
        </div>
      </template>
    </v-textarea>
    <v-btn color="green" dark @click="onClickRunButton">
      {{displayRunButtonText(this.modeSelect)}}
    </v-btn>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  name: 'EditBook',
  data (){
    return {
      modeSelect: this.$route.query.modeSelect ? this.$route.query.modeSelect : "register",
      showUUIDField: (this.$route.query.modeSelect=="register"  || !this.$route.query.modeSelect) ? false : true,
      showDataField: this.$route.query.modeSelect=="remove" ? false : true,
      bookTypeSelect: 'CBook' ,
      bookTypeSelectItems: [
        { bookTypeName: '書籍', bookType: 'CBook' },
        { bookTypeName: '雑誌', bookType: 'CMag' },
        { bookTypeName: '冊子・マルチメディア (ISBN なし)', bookType: 'CJAN' },
        { bookTypeName: '同人誌', bookType: 'Dojin' },
        { bookTypeName: 'その他', bookType: '' },
      ],
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
    displayIDText(bookTypeSelect) {
      if (bookTypeSelect == 'CBook') {
        return "ISBN";
      } else if (bookTypeSelect == 'CMag') {
        return "ISSN";
      } else if (bookTypeSelect == 'CJAN') {
        return "JANコード";
      } else if (bookTypeSelect == 'Dojin') {
        return "ISDN (国際標準同人誌番号)";
      } else {
        return "";
      }
    },
    onModeSelect() {
			if (this.modeSelect == "register") {
				this.showUUIDField = false;
			} else {
				this.showUUIDField = true;
			}
      if (this.modeSelect == "remove") {
        this.showDataField = false;
      } else {
        this.showDataField = true;
      }
		},
    displayRunButtonText(modeSelect) {
			if (modeSelect == "register") {
				return "新規登録処理実行";
			} else if (modeSelect == "edit") {
				return "編集登録処理実行";
			} else if (modeSelect == "remove") {
        return "削除処理実行";
      } else {
        return "";
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
    },
    onClickGetInformationButton() {
      let item = {};
      item.bookID = this.bookID;
      this.oplendBook(item);
    },
  }
}
</script>
