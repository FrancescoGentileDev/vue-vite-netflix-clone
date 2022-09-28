<template>
  <div id="app">
    <header-section @text="inputText" />

    <content-section />
  </div>
</template>

<script>
import ContentSection from "./components/contentSection.vue";
import HeaderSection from "./components/headerSection.vue";
import key from "./key";
import Call from "./call"
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
      displayFilm: [],
      popularFilm: [],
      callPopular: Call,
      callSearch: Call
    };
  },
  created() {
    let popular = new Call({language:"it"})
    popular.makeCall("movie", "popular")
    .then((value) =>{
      this.displayFilm.push(value)      
    })
    this.callPopular = popular
  },
  methods: {
    inputText(value) {
      this.searchText = value;
    },
  },
  asyncComputed: {
    search: function () {
      const searchInput = this.searchText;
      const arr = [];
      if (searchInput !== "") {
       
       
       let search = new Call({
          query: searchInput,
        }).makeCall("search", "movie").then((value)=> {
          console.log(value)
          arr.push(value)
        });
      this.callSearch = search
      }
      return arr;
    },
  },
};
</script>

<style lang="scss">
//@import "/node_modules/bootstrap/scss/bootstrap.scss";
@import "@/variables";
body {
  background-color: #221f1f;
  color: $white-color;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
