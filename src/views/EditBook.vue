<template>
  <div>
    <h1>書籍登録・編集・削除画面</h1>
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
    <v-select
      :items="items"
      v-model="bookTypeSelect"
      @change="onBookTypeSelect"
      item-text="bookTypeName"
      item-value="bookType"
    >
    </v-select>
  </div>
</template>

<script>
export default {
  name: 'EditBook',
  data (){
    return {
      bookTypeSelect: { bookTypeName: '書籍', bookType: 'CBook' },
      items: [
        { bookTypeName: '書籍', bookType: 'CBook' },
        { bookTypeName: '雑誌', bookType: 'CMag' },
        { bookTypeName: '冊子・マルチメディア (ISBN なし)', bookType: 'CJAN' },
        { bookTypeName: '同人誌', bookType: 'Dojin' },
        { bookTypeName: 'その他', bookType: '' },
      ],
    }
  },
}
</script>
