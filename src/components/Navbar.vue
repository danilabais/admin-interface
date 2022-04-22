<template>
  <v-container fluid>
    <v-app-bar color="deep-purple accent-4" dense dark>
      <v-toolbar-title>Административный интерфейс</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn class="mx-2" v-on:click="addNews" dark color="dark">
        <v-icon dark> mdi-plus </v-icon>
      </v-btn>

      <v-btn
        class="mx-2"
        v-on:click="search"
        dark
        color="dark"
        v-if="$route.name !== '/add-news'"
      >
        <v-icon dark> mdi-magnify </v-icon>
      </v-btn>
    </v-app-bar>
  </v-container>
</template>

<script>
export default {
  name: "Navbar",
  methods: {
    addNews() {
      this.$router.push("/add-news");
    },
    search() {
      this.$router.push("/");
    },
  },
};
</script>
