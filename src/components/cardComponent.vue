<template>
  <div>
  <img :src="image" alt="">
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
        vote: Number

    }

}
</script>

<style lang="scss" scoped>
@import "@/variables";
div{
}
</style>