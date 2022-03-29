<template>
  <div>
    <v-dialog v-model="dialog" persistent max-width="290">
      <template v-slot:activator="{ on }">
        <v-btn text color="error" class="ma-2" v-on="on">
          <v-icon> mdi-delete </v-icon>
        </v-btn>
      </template>
      <v-card>
        <v-card-title class="text-h5 text-nowrap">
          Вы действительно хотите удалить новость?
        </v-card-title>
        <v-card-text
          >Новость с ID: <slot></slot> <br />
          будет удалена</v-card-text
        >
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" text @click="dialog = false">
            Отмена
          </v-btn>
          <v-btn color="green darken-1" text @click="deleteNews">
            Удалить
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dialog: false,
    };
  },
  props: {
    id: Number,
  },
  methods: {
    deleteNews() {
      this.$store.commit("DELETE_NEWS", this.id);
    },
  },
};
</script>

<style>
.text-nowrap {
  word-wrap: normal;
  word-break: break-word !important;
}
</style>
