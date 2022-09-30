<template>
  <div class="mother" >
    <div class="card" :id="id">
      <img :src="usedImage()" :alt="title" @load="prova" :class="{smallImg: small}"/>
      <div class="content p-2 pt-4 d-flex flex-column justify-content-between">
        <div class="buttons d-flex justify-content-between">
          <div class="">
            <button><font-awesome-icon icon="fa-solid fa-play" /></button>
            Riproduci
          </div>
          <div>
            <button><font-awesome-icon icon="fa-regular fa-thumbs-up" /></button>
            <button><font-awesome-icon icon="fa-regular fa-thumbs-down" /></button>
          </div>

          <div class="">
            <button><font-awesome-icon icon="fa-solid fa-plus" /></button>
          </div>

          <div class="align-self-center flag">
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
            <span class="fw-bold">{{ year(release) }}⠀</span>

            {{seasonsOrMinutes() }}
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
    backdrop: String,
    small: Boolean,
    seasons: Number,
  },
  data() {
    return {
      getStars: {
        width: this.vote * 10 + "%",
      },
      usedImage() {

        if (this.image!==null && this.backdrop!== null){
        if (this.small) return this.backdrop;
        else {
           return this.image;
        }}
      },
      seasonsOrMinutes() {
        if(this.runtime)
          return this.toHoursAndMinutes(this.runtime)
        else
          return `${this.seasons} Seasons`
      }
    };
  },
  mounted() {},
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
    year(release) {
        if(typeof release === "string"){
        let year = release.split("-")|| ''
        return year[0]}
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/variables";

/*.mother + .mother {
  display: none;
}*/

button {
  $size: 35px;
  width: $size;
  height: $size;
  padding: 0;
  margin: 3px;
  background: $backround-primary;
  text-align: center !important;
  justify-content: center;
  align-items: center;

  color: $white-color;
  font-weight: 100;
  border: 3px solid $white-color;
  border-radius: 50%;
  transition: all 0.3s linear;
  &:hover {
    border: 0px;
    background-color: $brand-color;
  }
}

div {
  max-width: 300px;
  background-color: transparent;
  $borderSize: 2px;

  .card {
    transition: transform 500ms linear;
    position: relative;
    img {
      object-fit: cover;
      object-position: left;
      width: 100%;
      //height: 180px;
      &.smallImg {
        height: 180px;
      }
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

      .flag {
        font-size: 1.5rem;
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
