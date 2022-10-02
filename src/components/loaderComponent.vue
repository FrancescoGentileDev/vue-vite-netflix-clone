<template>
  <div class="loader">
    <div class="animation">
      <lottie-animation
        class="lottie"
        ref="anim"
        :animationData="require('../assets/animation.json')"
        :loop="true"
      />
    </div>
  </div>
</template>

<script>
import LottieAnimation from "lottie-web-vue";
export default {
  components: {
    LottieAnimation,
  },
};
</script>

<style lang="scss" scoped>
@import "@/variables.scss";

.loader {
  position: absolute;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: $backround-primary;
  overflow: hidden !important;

  .animation {
    position: absolute;
    width: 64%;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    .lottie {
      width: 100%;
    }
  }
}
</style>
