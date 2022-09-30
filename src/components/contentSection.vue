<template>
  <div>
    <card-component class="card"
      v-for="(item, index) in popularFilm" :key="index"
      :image="item.image"
      :backdrop="item.backdrop"
      :title="item.title"
      :overview="item.overview"
      :release="item.release_date"
      :popularity="item.popularity"
      :vote="item.vote_average"
      :id="'i'+index"
      :language="item.original_language"
      :flag="item.flag"
      :runtime="item.runtime"
      :seasons="item.seasons"
      :small="true"
    />
  </div>
</template>

<script>
import cardComponent from "./cardComponent.vue";
export default {
  components: { cardComponent },
  data() {
    return {
    }
  },
  created() {
    console.log(this.popularFilm)
  },
  props: {
    popularFilm: Array,
  },
  methods: {
  
  }
};
</script>

<style lang="scss" scoped>





</style>
