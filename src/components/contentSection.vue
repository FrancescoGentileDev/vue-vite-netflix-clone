<template>
  <div class="content">
  <h3 class="mx-5 mb-2 mt-4" >{{title}}</h3>
    <article class="scroll">
      <div v-if="showCarousel" class="scroller">
        <div class="buttons">
          <button @click="scroll('left')" :disabled="scrolledCarousel === 0" class="left">
            <font-awesome-icon icon="fa-solid fa-angle-left left" />
          </button>
          <button
            @click="scroll('right')"
            :disabled="scrolledCarousel <= scrollLimit"
            class="right"
          >
            <font-awesome-icon icon="fa-solid fa-angle-right right" />
          </button>
        </div>
      </div>
      <div  ref="carousel" :style="carouselStyle" :class="{noCarousel: !showCarousel, 'card-container' : showCarousel}">
        <card-component
          class="card"
          v-for="(item, index) in titles"
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
          :small="small"
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
      carousel: "",
      scrolledCarousel: 0,
      scrollWidth: 1600,
      scrollLimit: -4400,
      carouselStyle: {
        left: "0px",
      },
    };
  },
  mounted() {
  },
  props: {
    titles: Array,
    sectionTitle: String,
    carouselId: String,
    small: Boolean,
    showCarousel: Boolean,
    title: String,
  },
  methods: {
    scroll(direction) {
      let carousel = this.$refs.carousel;
      console.log(this.$refs.carousel, carousel.scrollWidth);
      let number = 4;

      if (direction == "right") {
        this.scrolledCarousel = this.scrolledCarousel - carousel.scrollWidth / number;
        carousel.style.left = `${this.scrolledCarousel}px`;
      }
      if (direction == "left") {
        this.scrolledCarousel = this.scrolledCarousel + carousel.scrollWidth / number;
        carousel.style.left = `${this.scrolledCarousel}px`;
      }

      if (this.scrolledCarousel < -4400) {
        carousel.style.left = `${-4370}px`;
      }
      console.log(carousel.scrollWidth, this.scrolledCarousel, this.scrollLimit);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/variables";
h3 {
  text-transform: capitalize;
}
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
        height: 80%;
        width: 3rem;
        border: none;
        background: rgba($backround-secondary, 0.8);

        &.right {
          position: absolute;
          top: 50%;
          left: 100vw;
           width: 5rem;
          transform: translate(-100%, -50%);
        }
        &.left {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
        }
        &:disabled {
          display: none;
        }
      }
    }
  }

  .card-container {
    margin-left: 3rem;
    overflow-y: visible;
    display: flex;
    position: relative;
    transition: left 0.5s linear;
    .card {
      margin: 0.2rem;
    }
  }


  .noCarousel {
    display: flex;
    flex-wrap: wrap;
    max-width: 1700px;
    margin: 0 auto;
    gap: 10px;
    justify-content: center;

    .card {
      margin: 0 auto;
      max-width: 200px;
      min-height: 190px;
    }
  }





}
</style>
