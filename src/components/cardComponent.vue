<template>
  <div class="">
    <div class="card" :id="id">
      <img :src="image" :alt="title" />
      <div class="content">{{ title }}</div>
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
    id: Number,
  },
};
</script>

<style lang="scss" scoped>
@import "@/variables";

div {
  position: relative;
  max-width: 400px;
  background-color: transparent;
  .card {
    img {
      width: 100%;
      height: 100%;
    }
    .content {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba($backround-primary, 0.8);
      display: none;
    }
    &:hover .content {
      display: inline-block;
    }
  }
}
</style>
