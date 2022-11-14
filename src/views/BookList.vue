<template>
  <div>
    <v-card>
      <v-card-title>
        <v-col>
          <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            label="検索"
            single-line
            hide-details
          />
        </v-col>
      </v-card-title>
      <BookDetail ref="bookDetail"/>
      <v-data-table
        class="text-no-wrap"
        :headers="tableHeaders"
        :items="tableData"
        :search="search"
        :footer-props="footerProps"
        :loading="loading"
        loading-text="Loading... Please wait"
        :sort-desc="false"
        :items-per-page="30"
        @click:row="clickRow"
        mobile-breakpoint="0"
      >
        <template v-slot:item.bookImageURL="{ item }">
          <v-img :src="item.bookImageURL" v-on:error="item.bookImageURL='data:image/svg+xml;charset=utf8,%3C%3Fxml%20version%3D%221.0%22%20encoding%3D%22windows-1252%22%3F%3E%3Csvg%20version%3D%221.1%22%20id%3D%22Layer_1%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20x%3D%220px%22%20y%3D%220px%22%20viewBox%3D%220%200%20473.931%20473.931%22%20style%3D%22enable-background%3Anew%200%200%20473.931%20473.931%3B%22%20xml%3Aspace%3D%22preserve%22%3E%3Ccircle%20style%3D%22fill%3A%23D7DABA%3B%22%20cx%3D%22236.966%22%20cy%3D%22236.966%22%20r%3D%22236.966%22%2F%3E%3Cpath%20style%3D%22fill%3A%23327477%3B%22%20d%3D%22M354.154%2C359.291c0%2C3.618-2.93%2C6.541-6.537%2C6.541H127.908c-3.607%2C0-6.537-2.922-6.537-6.541V101.937%20c0-3.611%2C2.93-6.541%2C6.537-6.541h219.709c3.607%2C0%2C6.537%2C2.93%2C6.537%2C6.541V359.291z%22%2F%3E%3Cpath%20style%3D%22fill%3A%233B7F89%3B%22%20d%3D%22M354.154%2C376.967c0%2C3.611-2.93%2C6.537-6.537%2C6.537H140.282V140.555h207.331%20c3.607%2C0%2C6.537%2C2.93%2C6.537%2C6.541v229.871H354.154z%22%2F%3E%3Crect%20x%3D%22137.633%22%20y%3D%22137.158%22%20style%3D%22fill%3A%234699A1%3B%22%20width%3D%223.977%22%20height%3D%22246.35%22%2F%3E%3Cpath%20style%3D%22fill%3A%232A646E%3B%22%20d%3D%22M138.292%2C95.396h-10.383c-3.607%2C0-6.537%2C2.93-6.537%2C6.541v275.031c0%2C3.611%2C2.93%2C6.537%2C6.537%2C6.537%20h10.383V95.396z%22%2F%3E%3Cpath%20style%3D%22fill%3A%23E9E9EA%3B%22%20d%3D%22M342.371%2C140.473H143.706c-6.773%2C0-12.262-5.497-12.262-12.269v-8.056%20c0-6.773%2C5.489-12.262%2C12.262-12.262h186.403c6.773%2C0%2C12.262%2C5.493%2C12.262%2C12.262L342.371%2C140.473z%22%2F%3E%3Cg%3E%20%3Cpath%20style%3D%22fill%3A%232A646E%3B%22%20d%3D%22M284.46%2C251.574h-73.503c-8.677%2C0-15.734-7.061-15.734-15.734v-38.147%20c0-8.67%2C7.057-15.73%2C15.734-15.73h73.503c8.673%2C0%2C15.734%2C7.061%2C15.734%2C15.73v38.143C300.19%2C244.513%2C293.133%2C251.574%2C284.46%2C251.574%20z%22%2F%3E%20%3Cpath%20style%3D%22fill%3A%232A646E%3B%22%20d%3D%22M309.683%2C290.84c0%2C2.821-2.196%2C5.111-4.909%2C5.111H188.443c-2.713%2C0-4.913-2.29-4.913-5.111l0%2C0%20c0-2.829%2C2.2-5.115%2C4.913-5.115h116.331C307.49%2C285.725%2C309.683%2C288.011%2C309.683%2C290.84L309.683%2C290.84z%22%2F%3E%20%3Cpath%20style%3D%22fill%3A%232A646E%3B%22%20d%3D%22M309.683%2C309.81c0%2C2.821-2.196%2C5.111-4.909%2C5.111H188.443c-2.713%2C0-4.913-2.29-4.913-5.111l0%2C0%20c0-2.821%2C2.2-5.111%2C4.913-5.111h116.331C307.49%2C304.699%2C309.683%2C306.989%2C309.683%2C309.81L309.683%2C309.81z%22%2F%3E%20%3Cpath%20style%3D%22fill%3A%232A646E%3B%22%20d%3D%22M289.017%2C338.031c0%2C1.893-1.482%2C3.435-3.304%2C3.435h-78.21c-1.826%2C0-3.304-1.542-3.304-3.435l0%2C0%20c0-1.897%2C1.482-3.439%2C3.304-3.439h78.21C287.539%2C334.592%2C289.017%2C336.134%2C289.017%2C338.031L289.017%2C338.031z%22%2F%3E%3C%2Fg%3E%3Cg%3E%3C%2Fg%3E%3Cg%3E%3C%2Fg%3E%3Cg%3E%3C%2Fg%3E%3Cg%3E%3C%2Fg%3E%3Cg%3E%3C%2Fg%3E%3Cg%3E%3C%2Fg%3E%3Cg%3E%3C%2Fg%3E%3Cg%3E%3C%2Fg%3E%3Cg%3E%3C%2Fg%3E%3Cg%3E%3C%2Fg%3E%3Cg%3E%3C%2Fg%3E%3Cg%3E%3C%2Fg%3E%3Cg%3E%3C%2Fg%3E%3Cg%3E%3C%2Fg%3E%3Cg%3E%3C%2Fg%3E%3C%2Fsvg%3E'"
            max-height="48" max-width="48" contain />
        </template>
        <template v-slot:item.UUIDList="{ item }">
          <div v-for="(UUID_individual, UUID_individual_key) in item.UUIDList" :key="UUID_individual_key">
            {{UUID_individual.UUID + " "}}
          </div>
        </template>
        <template v-slot:no-results>
          <v-card>
            <v-card-text>該当する資料などがありませんでした。</v-card-text>
              <v-card-text>
                <v-btn
                  outlined
                  color="grey darken-1"
                  @click="onClickRequest"
                >
                  <v-icon
                    left
                  >
                    mdi-email-fast
                  </v-icon>
                  書籍リクエスト
                </v-btn>
                してみませんか?
              </v-card-text>
          </v-card>
        </template>
      </v-data-table>
    </v-card>
  </div>
</template>

<script>
import BookDetail from '../components/BookDetail.vue';
import { mapState, mapActions } from 'vuex';

export default {
  name: 'BookList',
  components: {
    BookDetail
  },
  data (){
    return {
      search: this.$route.query.q ? this.$route.query.q :"",
      tableData: [],
      RequestFormURL: this.$store.state.settings.RequestFormURL != undefined ? this.$store.state.settings.RequestFormURL : "",
      tableHeaders: 
      [
        { text: "画像", value: "bookImageURL", sortable: false, width: "70px" },
        { text: "書名", value: "bookTitle" },
        { text: "著者", value: "bookAuthor" },
        { text: "蔵書数", value: "bookStockNum", width: "30"},
        { text: "説明", value: "bookDesc", align: ' d-none'},
        { text: "UUID", value: "UUIDListAllCSV", sortable: false, align: ' d-none'},
        { text: "書籍ID", value: "bookID", sortable: false,  align: ' d-none'},
      ] ,
    }
  },
  computed: {
    ...mapState({
      bookList: state => state.bookList,
      loading: state => state.loading.getBookList,
    }),
    /*
    tableHeaders () {
      return [
        { text: "画像", value: "bookImageURL", sortable: false, width: "70px" },
        { text: "書名", value: "bookTitle" },
        { text: "著者", value: "bookAuthor" },
        { text: "蔵書数", value: "bookStockNum", width: "30"},
      ]
    },
    */
  },
  methods: {
    clickRow(item) {
      this.$refs.bookDetail.open(item);
    },
    ...mapActions([
      "opgetBookList"
    ]),

    async updateBookList () {
      let item = {};
      item.bookListStartsAt = 0;
      item.bookListEndsAt = -1;
      await this.opgetBookList(item);
      this.tableData = this.bookList;
    },
    onClickRequest: function () {
      //this.$store.state.settings.RequestFormURLにリクエストフォームのURLが設定されている場合はそちらを使用する
      if (this.$store.state.settings.RequestFormURL != undefined) {
        window.open(this.$store.state.settings.RequestFormURL, '_blank');
      } 
    },
  },
  created () {
    this.updateBookList();
  }
}
</script>
