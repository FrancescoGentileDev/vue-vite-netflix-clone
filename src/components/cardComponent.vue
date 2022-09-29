<template>
  <div class="mother">
    <div class="card" :id="id">
      <img :src="image" :alt="title" @load="prova" />
      <div class="content p-2 pt-4 d-flex flex-column justify-content-between">
        <div class="buttons d-flex justify-content-between">
          <div class="">
            <button>O</button>
            Riproduci
          </div>
          <div>
            <button>O</button>
            <button>O</button>
          </div>

          <div class="">
            <button>O</button>
          </div>

          <div class="align-self-center">
            {{ flag }}
          </div>
        </div>
        <div class="title fw-bold">
          {{ title }}
        </div>
        <div class="overview mt-2">
          {{ overview }}
        </div>
        <div class="foot d-flex align-items-center justify-content-between">
          <div class="date">
            {{ toHoursAndMinutes(runtime) }}
          </div>
          <div class="stars">
            <p :style="getStars" class="m-0 bars">★★★★★</p>
            <p class="m-0">★★★★★</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    image: String,
    title: String,
    overview: String,
    release: String,
    popularity: Number,
    vote: Number,
    id: String,
    language: String,
    flag: String,
    runtime: Number,
  },
  data() {
    return {
      getStars: {
        width: this.vote * 10 + "%"
      }
    }
  },
  methods: {
    toHoursAndMinutes(totalMinutes) {
      const minutes = totalMinutes % 60;
      const hours = Math.floor(totalMinutes / 60);

      return `${this.padTo2Digits(hours)} h ${this.padTo2Digits(minutes)} min`;
    },

    padTo2Digits(num) {
      return num.toString().padStart(2, "0");
    },
    prova() {
      console.log("load");
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/variables";
/*
.mother + .mother {
  display: none;
}*/

div {
  max-width: 300px;
  background-color: transparent;
  $borderSize: 2px;
  .card {
    transition: transform 500ms linear;
    position: relative;
    img {
      object-fit: cover;
      object-position: bottom;
      width: 100%;
      height: 100%;
    }
    .content {
      display: none !important;
      position: absolute;
      bottom: -150px;
      left: -$borderSize;
      width: calc(100% + $borderSize * 2);
      height: 30%;
      background-color: transparent;
      background: linear-gradient(180deg, rgba(54, 50, 50, 0) 0%, rgba($backround-secondary, 1) 8%);

      .overview {
        font-size: 0.8rem;
        display: -webkit-box;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
        overflow: hidden;
      }
      .foot {
        .date {
          font-size: 0.8rem;
          letter-spacing: -0.5px;
        }

        .stars {
          font-size: 1.5rem;
          color: transparent;
          position: relative;
          background-color: $brand-color-dark;
          background-clip: text;
          z-index: 3;
          color: transparent;
          .bars {
            white-space: nowrap;
            color: transparent;
            position: absolute;
            width: 0%;
            height: 100%;
            background: yellow;
            background-clip: text;
            top: 0;
          }
        }

      }
    }

    &:hover {
      transform: scale(1.1);
      z-index: 1000;
      border: $borderSize solid $brand-color;

      .content {
        display: flex !important;
        border: $borderSize solid $brand-color;
        border-top: none;
        height: 200px;
      }
    }
  }
}
</style>
