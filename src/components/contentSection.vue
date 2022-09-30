<template>
  <div class="content">
    <article class="scroll">
      <div class="scroller">
        <div class="buttons">
          <button @click="scroll('left')" :disabled="scrollCarousel === 0" class="left">
            <font-awesome-icon icon="fa-solid fa-angle-left left" />
          </button>
          <button @click="scroll('right')" :disabled="scrollCarousel <= scrollLimit" class="right">
            <font-awesome-icon icon="fa-solid fa-angle-right right" />
          </button>
        </div>
      </div>
      <div class="card-container" id="carousel">
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
  </div>
</template>

<script>
import cardComponent from "./cardComponent.vue";
import "@/pop-out";
export default {
  components: { cardComponent },
  data() {
    return {
      scrollCarousel: 0,
      get scrollLimit() {
        return -this.scrollWidth + this.scrollWidth / 4;
      },

      scrollWidth() {
        let carousel = document.getElementById("carousel");
        return carousel.scrollWidth;
      },
    };
  },
  created() {
    console.log(this.popularFilm);
    let carousel = document.getElementById("carousel");
    this.scrollWidth = carousel.scrollWidth;
  },
  props: {
    popularFilm: Array,
    sectionTitle: String,
  },
  methods: {
    scroll(direction) {
      let carousel = document.getElementById("carousel");

      if (direction == "right") {
        this.scrollCarousel = this.scrollCarousel - carousel.scrollWidth / 4;
        carousel.style.left = `${this.scrollCarousel}px`;
      }
      if (direction == "left") {
        this.scrollCarousel = this.scrollCarousel + carousel.scrollWidth / 4;
        carousel.style.left = `${this.scrollCarousel}px`;
      }

      if (carousel.scrollWidth >= this.scrollCarousel) {
        document.getElementsByClassName("left");
      }
      console.log(carousel.scrollWidth, this.scrollCarousel, this.scrollLimit);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/variables";

article {
  position: relative;
  display: flex;
  flex-direction: row;
  width: 100vw;
  overflow: visible;

  .scroller {
    position: sticky;
    display: inline;
    top: 0;
    left: 0;
    width: 100%;
    color: red;
    z-index: 10000;
    .buttons {
      position: absolute;
      display: flex;
      height: 100%;
      top: 0;
      left: 0;
      button {
        height: 100%;
        width: 3rem;
        border: none;
        background: rgba($backround-secondary, 0.8);

        &.right {
          position: absolute;
          top: 0;
          left: 100vw;
          transform: translateX(-100%);
        }
        &:disabled {
          display: none;
        }
      }
    }
  }

  .card-container {
    display: flex;
    position: relative;
    left: 0;
    flex-direction: row;
    margin-left: 2rem;
    overflow-y: visible;
    transition: left .5s linear;
  }
}
</style>
