<template>
  <div id="app">
    <header-section @text="inputText" />
    <div v-if="loading">COCCOBELLO</div>

    <div class="fg-container" v-if="searchText === '' && !loading">
      <content-section
        :popularFilm="popularTV.results"
        :small="false"
        :showCarousel="true"
        :title="popularTV.title"
      />
      <content-section
        :popularFilm="popularFilm.results"
        :showCarousel="true"
        :small="true"
        :title="popularFilm.title"
      />

      <content-section v-for="(item, index) in byCategoryMovie" :key="index"
        :popularFilm="item.results"
        :showCarousel="true"
        :small="true"
        :title="item.title"
      />
    </div>
    <div>
      <content-section :popularFilm="search" :small="true" :showCarousel="false" />
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
      byCategoryMovie: [],

      callFilm: [],
      callTV: [],
    };
  },
  async mounted() {
      const getByCategoryMovie = (async (genres) =>  {
      let category = new Call({ language: "it-IT", adult: false, with_genres: genres });

      let res =await  new Promise((resolve)=> {
       category.makeCall("discover", "movie").then(async (res) => {
         category.moreInformationAllMovie(res).then((value) => {
          resolve(value)
          // this.category.push({ results: value.results, title: "Last Release" });
        });
      });
      })
      .then((value) => value)
      return res

    })
    let popularMovie = new Call({ language: "it-IT", adult: false });

    await popularMovie.makeCall("movie", "popular").then(async (res) => {
      await popularMovie.moreInformationAllMovie(res).then((value) => {
        this.popularFilm = { results: value.results, title: "Popular Now" };
        this.callFilm = popularMovie;
      });
    });

    let popularTV = new Call({ language: "it-IT", adult: false });

    await popularTV.makeCall("tv", "popular").then(async (res) => {
      await popularTV.moreInformationAllTV(res).then((value) => {
        this.popularTV = { results: value.results, title: "Last Release" };
        this.callTv = popularTV;
      });
    });


    let allCategoryMovie = new Call({ language: "it-IT", adult: false });

    allCategoryMovie= await allCategoryMovie.makeCall("genre","movie","list")
    let randomCategoryMovie = allCategoryMovie.genres.filter(() => {
      let rand = Math.round(Math.random())
      return rand
    })

  console.log("random",randomCategoryMovie)

  randomCategoryMovie.forEach((genre) => {

    getByCategoryMovie(genre.id).then((value) => {
      this.byCategoryMovie.push({ results: value.results, title: genre.name });
      console.log("category", this.byCategoryMovie);
    });
  })
    

    this.loading = false;
  },
  methods: {
    inputText(value) {
      this.searchText = value.trim().toLowerCase();
    },
  },

  asyncComputed: {
    async search() {
      const searchInput = this.searchText;
      let arr = [];
      if (searchInput !== "") {
        let search = new Call({
          query: searchInput,
          adult: false,
          language: "it-IT",
        });

        await search.makeCall("search", "multi").then(async (res) => {
          await search.moreInformationAllMulti(res).then((value) => {
            arr = value.results;
          });
        });
        console.log("arr", arr);
        return arr;
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
  overflow-x: hidden;
}
#app {
  font-family: "Twemoji Country Flags", Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  padding-bottom: 15rem;
}
</style>
