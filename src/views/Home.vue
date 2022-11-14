<template>
  <div>
    <v-container fill-height>
      <v-row>
        <v-col>
          <div class="text-h3">ようこそ</div>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" md="8">
          <v-text-field
            v-model="smartSearch"
            label="かんたん検索"
            solo
            @keyup.enter="onClickSmartSearch"
          >
            <template v-slot:append>
              <v-btn
                type="submit"
                :to="{name: 'BookList', query: {q: smartSearch}}"
                color="primary"
                icon
                x-large
              >
                <v-icon>mdi-magnify</v-icon>
              </v-btn>
            </template>
          </v-text-field>
        </v-col>
        <!--
        <v-col cols="6" md="2">
          <v-btn
            block
            x-large
            @click="onClickSearch"
          >
            <v-icon
              black
              left
            >
              mdi-magnify-scan
            </v-icon>
            詳細検索
          </v-btn>
        </v-col>
        -->
        <v-col cols="12" md="4">
          <v-btn
            block
            x-large
            @click="onClickRequest"
          >
            <v-icon
              black
              left
            >
              mdi-email-fast
            </v-icon>
            書籍リクエスト
          </v-btn>
        </v-col>
      </v-row>
      <v-row>
        <v-col
          cols="12"
          md="4"
          fill-height
        >
          <v-row>
            <v-col cols="12">
              <v-btn 
                height="100%"
                width="100%"
                :to="{name: 'CodeSearch'}"
                class="text-center"
              >
                <v-icon>mdi-line-scan</v-icon>
                <v-icon>mdi-barcode</v-icon>
                <v-icon>mdi-qrcode</v-icon>
                バーコード<br>
                QRコード<br>
                を使用した手続き
              </v-btn>
            </v-col>
          </v-row>
        </v-col>
        <v-col cols="12" md="8">
          <v-card>
            <v-card-title>
              お知らせ
            </v-card-title>
            <v-card-text>
              <div class="body-1" style="white-space: pre-line;">{{message}}</div>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  name: 'Home',
  data() {
    return {
      smartSearch: '',
      message: this.$store.state.settings.message != undefined ? this.$store.state.settings.message : "",
      RequestFormURL: this.$store.state.settings.RequestFormURL != undefined ? this.$store.state.settings.RequestFormURL : "",
    };
  },
  methods: {
    onClickSmartSearch: function () {
      this.$router.push({
        name: 'BookList',
        query: {
          q: this.smartSearch
        }
      });
    },
    onClickRequest: function () {
      //this.$store.state.settings.RequestFormURLにリクエストフォームのURLが設定されている場合はそちらを使用する
      if (this.$store.state.settings.RequestFormURL != undefined) {
        window.open(this.$store.state.settings.RequestFormURL, '_blank');
      } 
    },
  }
}
</script>
