<template>
  <div class="background">
    <div class="video-container">
      <video autoplay muted loop>
        <source src="../assets/stream.mp4" />
      </video>
      
      <div class="blockHover">
      <div class="rick-container">BLLBLLVBLV</div>
      </div>
    </div>
  </div>
</template>

<script>
import Call from "@/call.js";

export default {
  data() {
    return {
      key: "",
    };
  },
  props: {
    video: Number,
  },
  async created() {
    console.log(this.video);
    let video = await new Call({ language: "it-IT" })
      .makeCall("tv", this.video, "videos")
      .then((res) => {
        return res.results[0].key;
      });

    this.key = video;
  },
};
</script>

<style lang="scss" scoped>
@import "@/variables";
.background {
}

video {
  position: absolute;
  width: 100%;
  z-index: -1;

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
</style>
