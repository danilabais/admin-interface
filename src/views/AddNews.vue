<template>
  <v-container>
    <h2 class="main-title">Добавить новость</h2>
    <v-form lazy-validation ref="form">
      <v-text-field
        v-model="title"
        :error="title.length == 0 && !valid"
        label="Заголовок"
        clearable
        clear-icon="mdi-close-circle"
      ></v-text-field>

      <vue-editor
        class="ta"
        :error="text.length == 0 && !valid"
        v-model="text"
        :editorToolbar="customToolbar"
      ></vue-editor>

      <v-autocomplete
        :items="categories"
        outlined
        dense
        :error="!categ && !valid"
        v-model="categ"
        chips
        small-chips
        label="Категории"
        required
        multiple
      >
      </v-autocomplete>

      <v-text-field
        v-model="date"
        label="Дата в формате мм.дд.гггг"
        required
        type="date"
        :error="date.length == 0 && !valid"
      ></v-text-field>

      <v-file-input
        ref="file"
        chips
        counter
        v-model="filename"
        v-on:change="fileChange"
        multiple
        show-size
        truncate-length="12"
        label="Загрузить фотографии"
        accept="image/*"
      ></v-file-input>

      <div class="wrapper-img"></div>
      <v-btn
        block
        color="success"
        depressed
        elevation="6"
        outlined
        plain
        raised
        rounded
        text
        v-on:click="validate"
        tile
        >Опубликовать</v-btn
      >
      <br />
      <v-btn
        block
        color="red"
        depressed
        elevation="6"
        outlined
        mt-4
        plain
        raised
        rounded
        text
        tile
        v-on:click="reset"
        >Сбросить</v-btn
      >
    </v-form>
    <div
      class="htmlHelper"
      style="display: none"
      ref="htmlHelper"
      v-html="text"
    ></div>
  </v-container>
</template>

<script>
import { VueEditor } from "vue2-editor";
export default {
  data() {
    return {
      date: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
        .toISOString()
        .substr(0, 10),
      title: "",
      text: "",
      mainPhoto: 0,
      categ: null,
      valid: true,
      photos: [],
      filename: null,
      html: this.text,
      customToolbar: [
        [{ header: [false, 1, 2, 3, 4, 5, 6] }],
        ["bold", "italic", "underline", "strike"],
        [
          { align: "" },
          { align: "center" },
          { align: "right" },
          { align: "justify" },
        ],
        ["blockquote", "code-block"],
        [{ list: "ordered" }, { list: "bullet" }, { list: "check" }],
        [{ indent: "-1" }, { indent: "+1" }],
        [{ color: [] }, { background: [] }],
        ["link"],
        ["clean"],
      ],
    };
  },
  components: {
    VueEditor,
  },
  methods: {
    reset() {
      (this.date = ""),
        (this.title = ""),
        (this.text = ""),
        (this.categ = null);
      this.valid = true;
      if (this.$refs.file.value) this.$refs.file.reset();
    },
    validate() {
      this.valid = false;
      if (this.date && this.title && this.text && this.categ) {
        let dateRu = this.date.split("-");
        dateRu = `${dateRu[2]}.${dateRu[1]}.${dateRu[0]}`;
        this.$store.commit("ADD_NEWS", {
          id: Date.now(),
          title: this.title,
          text: [this.text, this.$refs.htmlHelper.innerText],
          category: this.categ.sort(),
          date: dateRu,
          photos: this.photos,
          mainPhoto: this.mainPhoto,
        });
        this.$router.push("/");
      }
    },

    fileChange(e) {
      let wrapper = document.querySelector(".wrapper-img");
      wrapper.innerHTML = "";
      let img = null;
      e.forEach((elem) => {
        let reader = new FileReader();
        reader.readAsDataURL(elem);
        reader.onload = (fileLoadedEvent) => {
          let srcData = fileLoadedEvent.target.result;

          this.photos.push(srcData);
          img = document.createElement("img");
          img.src = reader.result;
          wrapper.appendChild(img);
        };
      });
      wrapper.addEventListener("click", (e) => {
        wrapper.childNodes.forEach((e) => e.classList.remove("selected-photo"));
        if (!e.path[0].classList.contains("wrapper-img"))
          e.path[0].classList.add("selected-photo");
        wrapper.childNodes.forEach((el, idx) => {
          if (el.classList.contains("selected-photo")) {
            this.mainPhoto = idx;
          }
        });
      });
    },
  },
  computed: {
    categories() {
      return this.$store.getters.categories;
    },
  },
};
</script>

<style lang="scss">
.wrapper-img {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
  margin-top: 20px;
  overflow-x: auto;
  overflow: hidden;
  max-height: 160px;
}
.wrapper-img img {
  cursor: pointer;
  max-width: 140px;
  max-height: 140px;
  margin-right: 20px;
  overflow: hidden;
  position: relative;
  border-radius: 50%;

  &:last-child {
    margin-right: 0;
  }
}
.selected-photo {
  transition: all 0.6s ease;
  transform: rotate(360deg);
  border: red solid 6px;
}
.ta {
  margin-bottom: 30px;
}
.main-title {
  text-align: center;
  font-size: 3rem;
  margin-bottom: 20px;
}

@media (max-width: 1000px) {
  .main-title {
    font-size: 2rem;
  }
}
</style>
