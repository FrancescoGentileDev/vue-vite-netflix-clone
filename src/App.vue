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
import axios from "axios";

class Params {
  data = {
    params: {
      api_key: key,
    },
  };

  constructor(queries) {
    for (let key in queries) {
      this.data.params[key] = queries[key];
    }
  }
  addQuery(queries) {
    for (let key in queries) {
      this.data.params[key] = queries[key];
    }
  }
  removeQuery(queries) {
    for (let key in queries) {
      delete this.data.params[key];
    }
  }
  get Params() {
    return this.data
  }
}

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
    };
  },
  created() {},
  methods: {
    inputText(value) {
      console.log(value);
      this.searchText = value;
    },
  },
  asyncComputed: {
    search: function () {
      const searchInput = this.searchText;
      const arr = [];
      if (searchInput !== "") {
        
        let query= new Params({
          query: searchInput
        });
        console.log(query.Params)
        axios.get(this.baseUrl + "/search/movie", query.data).then(({ data }) => {
          arr.push(data);
        });
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
