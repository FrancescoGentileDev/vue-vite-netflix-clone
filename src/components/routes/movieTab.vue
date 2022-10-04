<template>
  <div>
    <video-section
      logo="elvis.png"
      title="L'uomo. La leggenda. Il Re del Rock & Roll."
      video="elvis_trailer.mp4"
    />

    <content-section
      :titles="popularFilm.results"
      :small="false"
      :showCarousel="true"
      :title="popularFilm.title"
    />
    <content-section
      :titles="trendingFilm.results"
      :showCarousel="true"
      :small="true"
      :title="trendingFilm.title"
    />

    <content-section
      v-for="(item, index) in byCategoryMovie"
      :key="index"
      :titles="item.results"
      :showCarousel="true"
      :small="true"
      :title="item.title"
    />
  </div>
</template>

<script>
import ContentSection from "../contentSection.vue";
import Call from "@/call";
// eslint-disable-next-line no-unused-vars
import axios from "axios";
import VideoSection from "../videoSection.vue";
export default {
  components: {
    ContentSection,
    VideoSection,
  },
  data() {
    return {
      pickProfile: false,
      pickedProfile: "",
      baseUrl: "https://api.themoviedb.org/3",
      searchText: "",
      loading: true,

      popularFilm: [],
      trendingFilm: [],
      byCategoryMovie: [],

      callFilm: [],

      allMovieCategory: [],
    };
  },
  async mounted() {
    let popularMovie = new Call({ language: "it-IT", adult: false });

    await popularMovie.getArrayTitle("Last release", "movie", "popular").then((res) => {
      this.popularFilm = res;
    });

    let trendingFilm = new Call({ language: "it-IT", adult: false });

    await trendingFilm.getArrayTitle("Trending Now", "trending", "movie", "week").then((res) => {
      this.trendingFilm = res;
    });

    let categoryMovie = new Call({ language: "it-IT", adult: false });

    let allCategoryMovie = await categoryMovie.makeCall("genre", "movie", "list");

    this.allMovieCategory = allCategoryMovie;

    let randomCategoryMovie = allCategoryMovie.genres.filter(() => {
      let rand = Math.round(Math.random());
      return rand;
    });

    let category = new Call({ language: "it-IT", adult: false });
    category.type = "movie";
    randomCategoryMovie.forEach((genre) => {
       let rand= Math.floor(Math.random()* 15 + 1)

      category.data.params.page= rand
      category.getByCategory(genre.id).then((value) => {
        this.byCategoryMovie.push({ results: value.results, title: genre.name });
      });
    });
  },
};
</script>

<style lang="scss" scoped></style>
