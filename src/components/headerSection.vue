<template>
  <div>
    <div class="mb-3">
      <label for="" class="form-label">Search Film</label>
      <input
        type="text"
        class="form-control"
        name=""
        id=""
        aria-describedby="helpId"
        placeholder=""
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
