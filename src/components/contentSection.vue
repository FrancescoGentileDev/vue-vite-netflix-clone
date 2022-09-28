<template>
  <div>
    <card-component

      :image="displayFilm[0].image"
      :title="displayFilm[0].title"
      :overview="displayFilm[0].overview"
      :release="displayFilm[0].release_date"
      :popularity="displayFilm[0].popularity"
      :vote="displayFilm[0].vote_averange"
    />
  </div>
</template>

<script>
import cardComponent from "./cardComponent.vue";
export default {
  components: { cardComponent },
  props: {
    displayFilm: Array,
  },
  mounted() {
    console.log(this.displayFilm);
  },
};
</script>

<style lang="scss" scoped></style>
