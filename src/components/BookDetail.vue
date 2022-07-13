<template>
	<v-dialog
		v-model="show"
		scrollable
		persistent
		eager
		:max-width="$vuetify.breakpoint.xs ? '100%' : '80%'"
	>
		<v-card>
			<v-card-title>
				<div>
					<v-row>
					<v-col cols="3" v-if="$vuetify.breakpoint.xs">
						<v-img :src="bookImageURL" v-on:error="item.bookImageURL='https://www.svgrepo.com/show/81644/book.svg'"
							max-height="100" max-width="100" contain/>
					</v-col>
					<v-col :cols="$vuetify.breakpoint.xs ? '9' : '12'">
						書籍詳細情報
					</v-col>
					</v-row>
				</div>
				<v-spacer/>
				<v-btn icon
					@click="onClickClose"
				>
					<v-icon>mdi-close</v-icon>
				</v-btn>
			</v-card-title>
			<v-divider/>
			<v-card-text>
				<v-container>
					<v-row style="height: 100%;">
						<v-col cols="2" v-if="!$vuetify.breakpoint.xs">
							<v-img :src="bookImageURL" v-on:error="item.bookImageURL='https://www.svgrepo.com/show/81644/book.svg'"
							max-height="256" max-width="256" contain/>
						</v-col>
						<v-col :cols="$vuetify.breakpoint.xs ? '12' : '10'">
							<v-data-table
								class="text-wrap:normal"
								:items-per-page="-1"
								hide-default-header
								hide-default-footer
								mobile-breakpoint="0"
							>
								<template v-slot:body="{}">
									<tbody>
										<tr><td>書名</td><td>{{bookTitle}}</td></tr>
										<tr><td>著者</td><td>{{bookAuthor}}</td></tr>
										<tr><td>発行年月</td><td>{{bookPublishedYear}}年{{bookPublishedMonth}}月</td></tr>
										<tr><td>種類</td><td>{{displayBookType}}</td></tr>
										<tr><td>{{displayBookIDName}}</td><td>{{bookID}}</td></tr>
										<tr><td>説明</td><td style="white-space: pre-wrap;">{{bookDesc}}</td></tr>
										<tr><td>追加者</td><td>{{bookAddedBy}}</td></tr>
										<tr><td>コメント</td><td>{{bookComment}}</td></tr>
									</tbody>
								</template>
							</v-data-table>
							<v-data-table
								class="text-no-wrap"
								:headers="BDLentListtableHeaders"
								:items="UUIDList"
								:sort-by="'isLent'"
								:sort-desc="true"
								:items-per-page="-1"
								hide-default-footer
								mobile-breakpoint="0"
							>
								<template v-slot:item="{item}">
									<tr>
										<td>
											<v-btn 
												:to="{name: 'LendReturn', query: {modeSelect: selectModeText(item.isLent), UUID: item.UUID}}"
												:color="item.isLent == '-1' ? 'orange lighten-3' : 'light-blue lighten-3'"
											>
												{{displayButtonText(item.isLent)}}
											</v-btn>
										</td>
										<td>{{fixisLentText(item.isLent)}}</td>
										<td>{{item.UUID}}</td>
									</tr>
								</template>
							</v-data-table>
						</v-col>
					</v-row>
				</v-container>
			</v-card-text>
			<v-divider/>
			<v-card-actions>
				<v-spacer/>
				<v-btn
					color="green"
					text
					@click="onClickClose"
				>
					閉じる
				</v-btn>
			</v-card-actions>
		</v-card>
	</v-dialog>
</template>

<script>
export default {
  name: 'BookDetail',
  data (){
    return {
			show: false,
      search: "",
			isLent: "",
			UUID: "",
			bookImageURL: "",
			bookTitle: "",
			bookAuthor: "",
			bookPublishedYear: "",
			bookPublishedMonth: "",
			bookType: "",
			bookID: "",
			bookDesc: "",
			bookAddedBy: "",
			bookComment: "",
			UUIDList: []
		}
	},
	computed: {
		BDLentListtableHeaders () {
			return [
				{ text: "貸出・返却操作", value: "actions" },
				{ text: "貸出中", value: "isLent" },
				{ text: "UUID", value: "UUID" },
			]
		},
		displayBookType: function() {
			if (this.bookType == "CBook") {
				return "書籍";
			} else if (this.bookType == "CMag") {
				return "雑誌";
			} else if (this.bookType == "CJAN") {
				return "冊子・マルチメディア (ISBN なし)";
			} else if (this.bookType == "Dojin") {
				return "同人誌";
			} else {
				return "その他";
			}
		},
		displayBookIDName: function() {
			if (this.bookType == "CBook") {
				return "ISBN";
			} else if (this.bookType == "CMag") {
				return "ISSN";
			} else if (this.bookType == "CJAN") {
				return "JANコード";
			} else if (this.bookType == "Dojin") {
				return "ISDN (国際標準同人誌番号)";
			} else {
				return "ID";
			}
		},
	},
	methods: {
		open (item) {
			this.show = true;
			this.resetForm(item);
		},
		onClickClose () {
			this.show = false;
		},
		resetForm (item = {}) {
			this.bookImageURL = item.bookImageURL;
			this.bookTitle = item.bookTitle;
			this.bookAuthor = item.bookAuthor;
			this.bookPublishedYear = item.bookPublishedYear;
			this.bookPublishedMonth = item.bookPublishedMonth;
			this.bookType = item.bookType;
			this.bookID = item.bookID;
			this.bookDesc = item.bookDesc;
			this.bookAddedBy = item.bookAddedBy;
			this.bookComment = item.bookComment;
			this.UUIDList = item.UUIDList;
		},
		displayButtonText(isLent) {
			if (isLent == "-1") {
				return "貸出処理へ";
			} else {
				return "返却処理へ";
			}
		},
		selectModeText(isLent) {
			if (isLent == "-1") {
				return "lend";
			} else {
				return "return";
			}
		},
		fixisLentText(isLent) {
			if (isLent == "-1") {
				return "未貸出";
			} else {
				return isLent;
			}
		}
	}
}
</script>