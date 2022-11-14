<template>
  <div>
    <v-card>
      <v-card-title>
        <v-row
          align="center"
          justify="center"
        >
          <v-col
            cols="12"
          >
            <v-text-field
              v-model="search"
              append-icon="mdi-id-card-outline"
              label="検索"
              single-line
              hide-details
              @keydown.enter="onClickSearch"
            >
              <template v-slot:append>
                <v-form>
                <v-btn
                  @click="onClickSearch"
                  color="primary"
                  icon
                  small
                >
                  <v-icon>mdi-magnify</v-icon>
                </v-btn>
                </v-form>
              </template>
            </v-text-field>
          </v-col>
        </v-row>

      </v-card-title>
      <v-row>
        <v-col
          cols="12"
          md="4"
          class="text-center"
        >
          <v-icon size="200">mdi-barcode</v-icon>
          <div class="text-h5">バーコードで検索する場合</div>
          <div class="body-1">書籍の場合は、「上側のバーコード(ISBN)」を読み込むようにしてください。</div>
        </v-col>
        <v-col
          cols="12"
          md="4"
          class="text-center"
        >
          <v-icon size="200">mdi-qrcode</v-icon>
          <div class="text-h5">QRコードで検索する場合</div>
          <div class="body-1">書籍などに貼付されている「UUID QRコード」を使用してください。</div>
        </v-col>
        <v-col
          cols="12"
          md="4"
          class="text-center"
        >
          <v-icon size="200">mdi-cancel</v-icon>
          <div class="text-h5">いずれもない場合</div>
          <div class="body-1">
            <v-btn
              outlined
              :to="{name: 'BookList'}"
            >
              <v-icon
                left
              >
                mdi-book
              </v-icon>
              蔵書一覧
            </v-btn>
            から検索してください。</div>
        </v-col>
      </v-row>
      <BookDetail ref="bookDetail"/>
    </v-card>
  </div>
</template>

<script>
import BookDetail from '../components/BookDetail.vue';
import { mapState, mapActions } from 'vuex';

export default {
  name: 'BookList',
  components: {
    BookDetail,
  },
  data (){
    return {
      search: this.$route.query.q ? this.$route.query.q :"",
      tableData: [],
      tableHeaders: this.$route.query.IDsearch ?
      [
        { text: "画像", value: "bookImageURL", sortable: false, width: "70px" },
        { text: "書名", value: "bookTitle" },
        { text: "UUID", value: "UUIDListAllCSV", sortable: false, width: "30", align: ' d-none'},
        { text: "書籍ID", value: "bookID", sortable: false, width: "30"},
      ] :
      [
        { text: "画像", value: "bookImageURL", sortable: false, width: "70px" },
        { text: "書名", value: "bookTitle" },
        { text: "著者", value: "bookAuthor" },
        { text: "蔵書数", value: "bookStockNum", width: "30"},
        { text: "説明", value: "bookDesc", align: ' d-none'},
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
    ...mapActions([
      "opgetBookUUIDorID",
      "setErrorMessage",
    ]),

    async searchBookList(search) {
      let item = {};
      item.bookUUIDorID = search;
      await this.opgetBookUUIDorID(item);
      console.log(this.bookList);
      if (this.bookList.length !== 0) {
        this.$refs.bookDetail.open(this.bookList[0]);
      } else {
        this.setErrorMessage({ message: "書籍が見つかりませんでした。", show_window: true });
      }
    },

    onClickSearch() {
      this.searchBookList(this.search);
    },
  },
  created () {
  },
  mounted () {
  },
}
</script>
