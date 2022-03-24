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
          <v-img :src="item.bookImageURL" v-on:error="item.bookImageURL='https://www.svgrepo.com/show/81644/book.svg'"
            max-height="48" max-width="48" contain />
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
      search: "",
      tableData: [],
    }
  },
  computed: {
    ...mapState({
      bookList: state => state.bookList,
      loading: state => state.loading.getBookList,
    }),
    tableHeaders () {
      return [
        { text: "画像", value: "bookImageURL", sortable: false, width: "70px" },
        { text: "書名", value: "bookTitle" },
        { text: "著者", value: "bookAuthor" },
        { text: "蔵書数", value: "bookStockNum", width: "30"},
      ]
    },
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

  },
  created () {
    this.updateBookList();
  }
}
</script>
