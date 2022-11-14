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
          @keyup.enter="onClickGetInformationButton"
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
    <!--
    <v-text-field
      v-if="showDataField"
      label="出版社"
      v-model="bookPublisher"
    />
    -->
    <v-row
      v-if="showDataField"
    >
      <v-col
        cols="6"
      >
        <v-text-field
          label="出版年"
          v-model="bookPublishedYear"
        />
      </v-col>
      <v-col
        cols="6"
      >
        <v-text-field
          label="出版月"
          v-model="bookPublishedMonth"
        />
      </v-col>
    </v-row>
    <v-text-field
      v-if="showDataField"
      label="画像 URL"
      v-model="bookImageURL"
    />
    <v-textarea
      v-if="showDataField"
      v-model="bookDesc"
    >
      <template v-slot:label>
        <div>
          説明
        </div>
      </template>
    </v-textarea>
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
//axios
import axios from 'axios';

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
      bookID: this.$route.query.bookID ? this.$route.query.bookID : "",
      bookTitle: this.$route.query.bookTitle ? this.$route.query.bookTitle : "",
      bookAuthor: this.$route.query.bookAuthor ? this.$route.query.bookAuthor : "",
      bookPublisher: this.$route.query.bookPublisher ? this.$route.query.bookPublisher : "",
      bookPublishedYear: this.$route.query.bookPublishedYear ? this.$route.query.bookPublishedYear : "",
      bookPublishedMonth: this.$route.query.bookPublishedMonth ? this.$route.query.bookPublishedMonth : "",
      bookImageURL: this.$route.query.bookImageURL ? this.$route.query.bookImageURL : "",
      bookDesc: "",
      bookComment: this.$route.query.bookComment ? this.$route.query.bookComment : "",
      UUID: this.$route.query.UUID ? this.$route.query.UUID : "",
    }
  },
	computed: {
    ...mapState({
      loading: state => state.loading.addBook,
    }),
  },
  methods: {
    ...mapActions([
      "opaddBook",
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
      item.bookType = this.bookTypeSelect;
      item.bookID = this.bookID;
      item.bookTitle = this.bookTitle;
      item.bookAuthor = this.bookAuthor;
      item.bookPublisher = this.bookPublisher;
      item.bookPublishedYear = this.bookPublishedYear;
      item.bookPublishedMonth = this.bookPublishedMonth;
      item.bookImageURL = this.bookImageURL;
      item.bookDesc = this.bookDesc;
      item.bookComment = this.bookComment;
      item.UUID = this.UUID;
      if (this.modeSelect == "register") {
        this.opaddBook(item);
      } else if (this.modeSelect == "edit") {
        //何もしない
      } else if (this.modeSelect == "remove") {
        //何もしない
      }
    },
    onClickGetInformationButton() {
      let item = {};
      item.bookID = this.bookID;
      //OpenBDへのリクエストを行う
      var endpoint = "https://api.openbd.jp/v1/get?isbn=" + this.bookID;
      //axiosでリクエストを行う
      axios.get(endpoint)
        .then(response => {
          //レスポンスを表示する
          console.log(response.data);
          if (response.data[0]["onix"]["DescriptiveDetail"]["TitleDetail"]["TitleElement"]["TitleText"]["content"] === undefined) {
            this.bookTitle = "";
          } else {
            this.bookTitle = response.data[0]["onix"]["DescriptiveDetail"]["TitleDetail"]["TitleElement"]["TitleText"]["content"];
            //サブタイトルもあれば結合
            if ("Subtitle" in response.data[0]["onix"]["DescriptiveDetail"]["TitleDetail"]["TitleElement"]) {
              this.bookTitle = this.bookTitle + " " + response.data[0]["onix"]["DescriptiveDetail"]["TitleDetail"]["TitleElement"]["Subtitle"]["content"];
            }
          }
          if (response.data[0]["onix"]["DescriptiveDetail"]["Contributor"] === undefined) {
            this.bookAuthor = "";
          } else {
            this.bookAuthor = function() {
              var author = "";
              for (var i = 0; i < response.data[0]["onix"]["DescriptiveDetail"]["Contributor"].length; i++) {
                author += response.data[0]["onix"]["DescriptiveDetail"]["Contributor"][i]["PersonName"]["content"];
                if (i < response.data[0]["onix"]["DescriptiveDetail"]["Contributor"].length - 1) {
                  author += ",";
                }
              }
              return author;
            }();
          }
          if (response.data[0]["onix"]["PublishingDetail"]["Imprint"]["ImprintIdentifier"]["ImprintName"] === undefined) {
            this.bookPublisher = "";
          } else {
            this.bookPublisher = response.data[0]["onix"]["PublishingDetail"]["Imprint"]["ImprintIdentifier"]["ImprintName"] ;
          }
          this.bookImageURL = "https://cover.openbd.jp/"+this.bookID+".jpg";
          this.bookDesc = function() {
            let comment = "";
            if ("CollateralDetail" in response.data[0]["onix"]) {
              for (var i = 0; i < response.data[0]["onix"]["CollateralDetail"]["TextContent"].length; i++) {
                comment += response.data[0]["onix"]["CollateralDetail"]["TextContent"][i]["Text"];
                if (i < response.data[0]["onix"]["CollateralDetail"]["TextContent"].length - 1) {
                  comment += "\n";
                }
              }
            } else {
              comment = "";
            }
            return comment;
          }();
        })
        .catch(error => {
          //国会図書館APIから情報取得
          /*
          var endpoint = "https://iss.ndl.go.jp/api/sru?operation=searchRetrieve&recordPacking=xml&query=isbn=" + this.bookID;
          //axiosでリクエストを行う
          axios.get(endpoint)
            .then(response => {

            })
          */
          console.log(error);
          return false;
        });
    },
  }
}
</script>
