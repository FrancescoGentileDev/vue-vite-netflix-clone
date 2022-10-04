<template>
  <div class="background">
    <div class="video-container">
      <video autoplay muted loop :src="require(`../assets/${video}`)"></video>

      <div class="blockHover">
      </div>
        <div class="rick-container">
          <img class="w-100" :src="require(`../assets/${logo}`)" alt="" srcset="" />
          <div class="details">
            <div class="description">
              <div class="title-line">
                {{title}}
              </div>
            </div>
            <div class="buttons">
              <button>
                <font-awesome-icon class="play" icon="fa-solid fa-play" />
                Play
              </button>
              <button class="darker d-flex">
                <font-awesome-icon icon="fa-solid fa-info" />
                <div class="mb-1">More Info</div>
              </button>
            </div>
          </div>
        </div>
    </div>
  </div>
</template>

<script>

export default {
  data() {
    return {
      key: "",
    };
  },
  props: {
    video: String,
    logo: String,
    title: String
  }
};
</script>

<style lang="scss" scoped>
@import "@/variables";

video {
  position: absolute;
    width: 115%;
    z-index: -1;
    top: -166px;

  source {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 60px;
  }
}
.video-container {
  display: inline-block;
  width: 100%;
  position: relative;
  aspect-ratio: 16 / 6;
}

.blockHover {
  position: absolute;
  top: 0;
  z-index: -1;
  width: 100%;
  height: 150%;
  background-image: linear-gradient(180deg, transparent, $backround-primary);
}

.rick-container {
  margin-top: 100px;
  height: 80%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-left: 7rem;
  max-width: 800px;
  img {
    max-width: 70%;
  }
  .details {
    margin-left: 2rem;
    .title-line {
      margin-top: 2rem;
      font-size: 1.8rem;
    }
    .buttons {
      display: flex;
      gap: 2rem;
      margin-top: 1.5rem;
      button {
        position: relative;
        z-index: 10000000000000;
        .play {
          color: black;
        }
        background-color: $white-color;
        color: $backround-secondary;
        padding: 0.7rem 3rem;
        padding-left: 1.5rem;
        border-radius: 0.7rem;
        font-size: 1.6rem;
        font-weight: bold;
        border: none;
        &.darker {
          gap: 0.5rem;
          background-color:rgba($head-text-color, .8);
          color: $white-color;
          
        }
        &:hover {
          background-color:$head-text-color
        }
      }
    }
  }
}

.fa-info {
  aspect-ratio: 1/1;
  padding: 0.2rem;
  border: 3px solid $white-color;
  border-radius: 50%;
}
</style>
