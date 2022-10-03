<template>
  <div id="app">
    <!-- <div v-if="false"> -->
      <loader-component v-if="loading" />
      <pick-profile-component v-show="!loading" v-if="!pickProfile" @pickedProfile="profileSel" />
    <!-- </div> -->
    <header-section
      v-if="pickProfile"
      @text="inputText"
      :profile="pickedProfile"
      @clickTab="switchTab"
      :current="currentTab"
    />
    <div class="fg-container" v-if="!loading" v-show="pickProfile  && searchText === ''" v-cloak>
      <keep-alive>
        <component :is="currentTab" :current="currentTab"></component>
      </keep-alive>
    </div>

    <div>
      <content-section class="search" :titles="search" :small="true" :showCarousel="false" />
    </div>
  </div>
</template>

<script>
import ContentSection from "./components/contentSection.vue";
import HeaderSection from "./components/headerSection.vue";
import Call from "./call";
import VideoSection from "./components/videoSection.vue";
import LoaderComponent from "./components/loaderComponent.vue";
import PickProfileComponent from "./components/pickProfileComponent.vue";
import homeTab from "@/components/routes/homeTab";
import movieTab from "@/components/routes/movieTab";
import tvShowTab from "@/components/routes/tvShowTab";
export default {
  name: "App",
  components: {
    HeaderSection,
    ContentSection,
    VideoSection,
    LoaderComponent,
    PickProfileComponent,
    homeTab,
    movieTab,
    tvShowTab,
  },

  data() {
    return {
      currentTab: "homeTab",

      pickProfile: false,
      pickedProfile: "",
      baseUrl: "https://api.themoviedb.org/3",
      searchText: "",
      loading: true,
    };
  },
  async mounted() {
    this.$nextTick(() => {
      setTimeout(() => {
        this.loading = false;
      }, 2500);
    });
  },
  methods: {
    inputText(value) {
      this.searchText = value.trim().toLowerCase();
    },
    profileSel(prof) {
      console.log(prof);
      this.pickProfile = true;
      this.pickedProfile = prof;
    },
    switchTab(tab) {
      this.currentTab = tab + "Tab";
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
.fg-container {
  position: relative;
  z-index: 10;
}
#app {
  font-family: "Twemoji Country Flags", Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  padding-bottom: 15rem;
}
.search {
  padding-top: 140px;
}
</style>
