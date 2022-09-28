<template>
  <div class="row">
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

<style lang="scss" scoped></style>
