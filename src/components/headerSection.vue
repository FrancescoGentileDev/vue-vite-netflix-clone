<template>
  <div class="row head">
    <div class="mb-3 col-2">
      <label for="" class="form-label">Search Film</label>
      <input
        type="text"
        class="form-control"
        name=""
        id=""
        aria-describedby="helpId"
        placeholder="Search Film"
        v-model="textInput"
        @keyup.enter="entered"
      />
    </div>
  </div>
</template>

<script>
export default {
data() {
    return {
        textInput: ""
    }
},
methods: {
    entered() {
        this.$emit("text", this.textInput)
    }
}

};
</script>

<style lang="scss" scoped>
@import "@/variables";
.head {
  position: fixed;
  z-index: 100000;
  width: 101%;
  background-color: rgba($backround-primary, $alpha: 0.7);
  
}
</style>
