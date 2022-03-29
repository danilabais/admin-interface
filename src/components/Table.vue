<template>
  <div>
    <div v-if="news.length !== 0">
      <h2 class="main-title">Коллекция новостей</h2>
      <v-row  class="margins">
        <v-autocomplete
          :items="categories"
          outlined
          dense
          deletable-chips
          v-on:change="paramByCat"
          chips
          small-chips
          label="Поиск по Категории"
          required
          multiple
        >
        </v-autocomplete>
      </v-row>

      <v-row class="margins">
        <v-col cols="6">
          <v-text-field
            label="Поиск по заголовку"
            clearable
            v-on:input="paramByTitle"
            clear-icon="mdi-close-circle"
          ></v-text-field>
        </v-col>
        <v-col cols="6">
          <v-text-field
            label="Поиск по тексту"
            v-on:input="paramByText"
            clearable
            clear-icon="mdi-close-circle"
          ></v-text-field>
        </v-col>

        <v-text-field
          v-on:input="paramByDate"
          label="Поиск по дате"
          required
          type="date"
        ></v-text-field>
      </v-row>

      <v-simple-table>
        <template v-slot:default>
          <thead>
            <tr>
              <th class="text-left">ID</th>
              <th class="text-left">Фото</th>
              <th class="text-left">Категории</th>
              <th class="text-left">Названание</th>
              <th class="text-left">Описание</th>
              <th class="text-left">Дата записи</th>
              <th class="text-left">Редактировать</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in paginatedNews" :key="item.id">
              <td>{{ item.id }}</td>
              <td>
                <v-img
                  :src="
                    item.photos == 0
                      ? require('@/assets/no_photo.png')
                      : item.photos[item.mainPhoto]
                  "
                  max-height="80px"
                  max-width="80px"
                ></v-img>
              </td>
              <td>{{ item.category.join(", ") }}</td>
              <td class="text-scroll" v-html="item.title"></td>
              <td class="text-scroll" v-html="item.text[1]"></td>
              <td class="text-scroll" v-html="item.date"></td>
              <td>
                <v-row class="nowrap">
                  <router-link :to="{ path: `/news/${item.id}` }"
                    ><Button-edit
                  /></router-link>
                  <Button-delete :id="item.id">{{
                    item.id
                  }}</Button-delete></v-row
                >
              </td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
      <v-pagination
        v-on:input="page"
        v-model="currPage"
        :length="pages"
      ></v-pagination>
    </div>
    <div class="dflex" v-else>
      <span class="dflex-title">Новостей нет, добавьте первую</span><br />
      <router-link class="dflex-link" to="/add-news"> Добавить </router-link>
    </div>
  </div>
</template>

<script>
import ButtonEdit from "./ButtonEdit.vue";
import ButtonDelete from "./ButtonDelete.vue";
export default {
  components: { ButtonEdit, ButtonDelete },
  data() {
    return {
      sortCateg: null,
      sortTitle: null,
      paramText: null,
      sortDate: null,
      pageNumber: 1,
      newsPerPage: 10,
      currPage: null,
    };
  },
  methods: {
    test() {
      console.log(this.sortedList.length);
    },
    paramByCat(e) {
      this.sortCateg = e.sort();
    },
    paramByTitle(e) {
      this.sortTitle = e;
    },
    paramByText(e) {
      this.paramText = e;
    },
    paramByDate(e) {
      if (e == "") {
        return (this.sortDate = null);
      }
      let arr = e.split("-");
      this.sortDate = `${arr[2]}.${arr[1]}.${arr[0]}`;
    },
    page() {
      this.pageNumber = this.currPage;
    },
  },
  computed: {
    news() {
      return this.$store.getters.news;
    },
    categories() {
      return this.$store.getters.categories;
    },

    sortedList() {
      let arrNew = this.news;
      if (!this.sortCateg || this.sortCateg.length == 0) {
      } else
        arrNew = this.news.filter(
          (element) =>
            JSON.stringify(element.category) == JSON.stringify(this.sortCateg)
        );
      if (!this.sortTitle) {
      } else
        arrNew = arrNew.filter((element) =>
          element.title.toLowerCase().startsWith(this.sortTitle.toLowerCase())
        );
      if (!this.paramText) {
      } else
        arrNew = arrNew.filter((element) =>
          element.text[1].toLowerCase().startsWith(this.paramText.toLowerCase())
        );
      if (!this.sortDate) {
      } else arrNew = arrNew.filter((element) => element.date == this.sortDate);

      return arrNew;
    },

    pages() {
      return Math.ceil(this.sortedList.length / 10);
    },
    paginatedNews() {
      let from = (this.pageNumber - 1) * this.newsPerPage;
      let to = from + this.newsPerPage;
      return this.sortedList.slice(from, to);
    },
  },
};
</script>

<style lang="scss">
tr {
  .text-scroll {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 10px;
  }
  * {
    font-size: 1rem !important;
  }
}
.nowrap {
  flex-wrap: nowrap;
}
.dflex {
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  margin-top: 50px;
  text-align: center;
  .dflex-title {
    font-size: 2rem;
  }
  .dflex-link {
    font-size: 3rem;
    text-decoration: none;
    transition: 0.3s all;
    &:hover {
      color: rgb(103, 11, 223);
      transform: scale(1.3);
      text-decoration: underline;
    }
  }
}
.margins {
  margin: 0 20px;
}
</style>
>
