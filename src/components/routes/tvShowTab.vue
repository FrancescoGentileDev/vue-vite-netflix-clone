<template>
  <div>
    <video-section
      logo="cobra_kai.svg"
      title='la rivalità tra Johnny e Daniel si riaccende in questo sequel della saga di "Karate Kid".'
      video="cobra_kai_trailer.mp4"
    />

    <content-section
      :titles="popularTV.results"
      :small="false"
      :showCarousel="true"
      :title="popularTV.title"
    />
    <content-section
      :titles="trendingTV.results"
      :showCarousel="true"
      :small="true"
      :title="trendingTV.title"
    />

    <content-section
      v-for="(item, index) in byCategoryTV"
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

      popularTV: [],
      trendingTV: [],
      byCategoryTV: [],

      callTV: [],

      allTVCategory: [],
    };
  },
  async mounted() {
    let popularTV = new Call({ language: "it-IT", adult: false });

    await popularTV.getArrayTitle("Last release", "tv", "popular").then((res) => {
      this.popularTV = res;
    });

    let trendingTV = new Call({ language: "it-IT", adult: false });

    await trendingTV.getArrayTitle("Trending Now", "trending", "tv", "week").then((res) => {
      this.trendingTV = res;
    });
    console.log("trend", this.trendingTV)

    let categoryTV = new Call({ language: "it-IT", adult: false });

    let allCategoryTV = await categoryTV.makeCall("genre", "tv", "list");

    this.allTVCategory = allCategoryTV;

    let randomCategoryTV = allCategoryTV.genres.filter(() => {
      let rand = Math.round(Math.random());
      return rand;
    });

    let category = new Call({ language: "it-IT", adult: false });
    category.type = "tv";
    randomCategoryTV.forEach((genre) => {
      category.getByCategory(genre.id).then((value) => {
        this.byCategoryTV.push({ results: value.results, title: genre.name });
      });
    });
  },
};
</script>

<style lang="scss" scoped></style>
