<template>
  <div>
    <v-container>
      <v-main>
        <h2 class="main-title">Просмотр новости</h2>
        <span class="main-info">Заголовок:</span>
        <h1 class="main-title">{{ oneNews.title }}</h1>
        <v-divider />
        <span class="main-info">Текст:</span>
        <p class="main-text" v-html="oneNews.text[0]"></p>
        <v-divider />
        <span class="main-info">Дата:</span>
        <p class="main-text">{{ oneNews.date }}</p>
        <v-divider />
        <span class="main-info">Категории:</span>
        <p class="main-text">{{ oneNews.category.join(", ") }}</p>
        <v-divider />
        <span class="main-info"
          >Фотографии (главное фото под индексом
          {{ oneNews.mainPhoto + 1 }}):</span
        >
        <div class="container-img" v-if="oneNews.photos.length">
          <img
            v-for="img in oneNews.photos"
            :key="img"
            :src="img"
            class="img"
          />
        </div>
        <img class="photo" src="@/assets/no_photo.png" v-else />

        <router-link :to="{ path: `/news/${oneNews.id}/edit` }">
          <v-btn
            block
            color="info"
            depressed
            elevation="6"
            mt="2"
            plain
            raised
            rounded
            text
            tile
            >Редактировать</v-btn
          ></router-link
        >
      </v-main>
    </v-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      oneNews: null,
    };
  },
  computed: {
    news() {
      return this.$store.getters.news;
    },
  },

  created() {
    const oneNews = this.news.find((news) => news.id == this.$route.params.id);
    if (oneNews) {
      this.oneNews = oneNews;
    }
  },
};
</script>

<style lang="scss">
.main-title {
  font-size: 2rem;
  text-align: center;
  margin-bottom: 20px;
}
.main-text {
  font-size: 2rem;
  text-align: center;
  margin-bottom: 20px;
}
.container-img {
  display: flex;
  justify-content: space-around;
  flex-direction: row;
  margin: 20px 0;
  overflow: auto;
  img {
    object-fit: cover;
    display: block;
    width: 150px;
    height: 150px;
  }
}
.photo {
  display: block;
  margin: 0 auto;
  width: 10vw;
}
.main-info {
  font-size: 2rem;
  display: block;
  padding-top: 10px;
}
</style>
