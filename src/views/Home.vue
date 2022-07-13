<template>
  <div>
    <v-container fill-height>
      <v-row>
        <v-col>
          <h1>ようこそ</h1>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" md="8">
          <v-text-field
            v-model="smartSearch"
            label="かんたん検索"
            solo
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
        <v-col cols="6" md="2">
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
            <v-col
              cols="6"
              md="12"
            >
              <v-btn
                block
                x-large
                @click="onClickLend"
                color="orange lighten-3"
              >
                貸出
              </v-btn>
            </v-col>
            <v-col
              cols="6"
              md="12"
            >
              <v-btn
                block
                x-large
                @click="onClickReturn"
                color="light-blue lighten-3"
              >
                返却
              </v-btn>
            </v-col>
          </v-row>
        </v-col>
        <v-col cols="12" md="8">
          <v-card>
            <v-card-title>
              お知らせ
            </v-card-title>
          </v-card>
          <v-data-table>
          </v-data-table>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  name: 'Home'
}
</script>
