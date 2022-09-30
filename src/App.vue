<template>
  <div id="app">
    <header-section @text="inputText" />
    <div v-if="loading">COCCOBELLO</div>
    <div class="fg-container">
      <content-section v-if="!loading" :popularFilm="popularTV"/>
      <content-section v-if="!loading" :popularFilm="popularTV" />
    </div>
  </div>
</template>

<script>
import ContentSection from "./components/contentSection.vue";
import HeaderSection from "./components/headerSection.vue";
import key from "./key";
import Call from "./call";
// eslint-disable-next-line no-unused-vars
import axios from "axios";

export default {
  name: "App",
  components: {
    HeaderSection,
    ContentSection,
  },

  data() {
    return {
      apiKey: key,
      baseUrl: "https://api.themoviedb.org/3",
      searchText: "",
      loading: true,

      popularFilm: [],
      popularTV: [],

      callPopular: Call,
      callSearch: Call,
    };
  },
  async created() {
    setTimeout(async () => {
      let popularMovie = new Call({ language: "it-IT", adult: false });

      await popularMovie.makeCall("movie", "popular").then((res) => {
        popularMovie.moreInformationAllMovie(res).then((value) => {
          this.popularFilm = value.results;
        });
      });
    }, 500);

    setTimeout(async () => {
      let popularTV = new Call({ language: "it-IT", adult: false });
      await popularTV.makeCall("tv", "popular").then((res) => {
        popularTV.moreInformationAllTV(res).then((value) => {
          console.log(value);
          this.popularTV = value.results;
        });
      });
    }, 500);
  },
  mounted() {
    this.$nextTick(() => {
      setTimeout(() => {
        this.loading = false;
      }, 500);
    });
  },
  methods: {
    inputText(value) {
      this.searchText = value.trim().toLowerCase();
    },
  },
  asyncComputed: {
    async search() {
      const searchInput = this.searchText;
      let arr = this.popularFilm;
      if (searchInput !== "") {
        let search = await new Call({
          query: searchInput,
          adult: false,
          language: "it-IT",
        })
          .makeCall("search", "movie")
          .then((value) => {
            console.log(value);
            arr = value.results;
            console.log(arr);
          });

        this.callSearch = search;
      }
      return arr;
    },
  },
};
</script>

<style lang="scss">
@import "/node_modules/bootstrap/scss/bootstrap.scss";
@import "@/variables";
body {
  background-color: #221f1f;
  color: $white-color;
  overflow: hidden;
}
#app {
  font-family: "Twemoji Country Flags", Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
