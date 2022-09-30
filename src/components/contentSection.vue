<template>
  <article class="scroll">
    <div class="scroller">
      <div class="buttons">
        <button @click="scroll('left')"><font-awesome-icon icon="fa-solid fa-angle-left" /></button>
        <button @click="scroll('right')">
          <font-awesome-icon icon="fa-solid fa-angle-left" />
        </button>
      </div>
    </div>
    <div class="card-container">
      <card-component
        class="card"
        v-for="(item, index) in popularFilm"
        :key="index"
        :image="item.image"
        :backdrop="item.backdrop"
        :title="item.title"
        :overview="item.overview"
        :release="item.release_date"
        :popularity="item.popularity"
        :vote="item.vote_average"
        :id="'i' + index"
        :language="item.original_language"
        :flag="item.flag"
        :runtime="item.runtime"
        :seasons="item.seasons"
        :small="true"
      />
    </div>
  </article>
</template>

<script>
import cardComponent from "./cardComponent.vue";
export default {
  components: { cardComponent },
  data() {
    return {};
  },
  created() {
    console.log(this.popularFilm);
  },
  props: {
    popularFilm: Array,
  },
  methods: {
    scroll(direction) {
      console.log("left");
      let carousel = document.querySelector("article.scroll");
      console.log(carousel.scrollWidth);

      if (direction == "right") {
        carousel.scrollBy({
          left: carousel.scrollWidth/4,
          behavior: 'smooth',
        })
        
        }
      if (direction == "left") {
        let scrollto =carousel.scrollLeft - carousel.scrollWidth/4
        carousel.scrollTo({
          left: scrollto,
          behavior: 'smooth',
        })
        
        }
    }
  },
}
</script>

<style lang="scss" scoped>
@import "@/variables";
article {
  position: relative;
  display: flex;
  flex-direction: row;
  width: 100vw;
  overflow: hidden;

  .scroller {
    position: sticky;
    display: inline;
    top: 0;
    left: 0;
    width: 100%;
    color: red;
    z-index: 1000;
    .buttons {
      position: absolute;
      display: flex;
      justify-content: space-between;
      height: 100%;
      width: 100vw;

      button {
        position: relative;
        z-index: 10000;
        height: 100%;
        width: 5.2rem;
        border: none;
        background: rgba($backround-secondary, 0.8);
      }
    }
  }

  .card-container {
    display: flex;
    flex-direction: row;
  }
}
</style>
