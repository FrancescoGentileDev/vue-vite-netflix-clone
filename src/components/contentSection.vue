<template>
  <div>
    <card-component class="card"
      v-for="(item, index) in popularFilm" :key="index"
      :image="item.image"
      :title="item.title"
      :overview="item.overview"
      :release="item.release_date"
      :popularity="item.popularity"
      :vote="item.vote_averange"
      :id="item.id"
      :language="item.original_language"
      :flag="item.flag"
    />
  </div>
</template>

<script>
import cardComponent from "./cardComponent.vue";
export default {
  components: { cardComponent },
  props: {
    popularFilm: Array,
  },
  mounted() {
  },
};
</script>

<style lang="scss" scoped>





</style>
