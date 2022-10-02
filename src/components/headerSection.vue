<template>
  <div class="d-flex head p-2 px-4 justify-content-between">
    <div class="d-flex">
      <div class="logo w-25">
        <img class="w-100" src="@/assets/netflix_logo.png" alt="" srcset="" />
      </div>

      <div class="link">
        <ul>
          <li><a class="active" href="#">Home</a></li>
          <li><a href="#">Tv Shows</a></li>
          <li><a href="#">Movies</a></li>
          <li><a href="#">New & popular</a></li>
          <li><a href="#">My List</a></li>
        </ul>
      </div>
    </div>
    <div class="d-flex align-items-center rightHead me-4">
      <input
        type="text"
        class="form-control my-4"
        name=""
        id=""
        aria-describedby="helpId"
        placeholder="Search Film"
        v-model="textInput"
        @keyup.enter="entered"
      />
      <font-awesome-icon class="fs-4" icon="fa-solid fa-magnifying-glass" />
      <div class="dvd">
      <a href="">DVD</a>
      </div>
      <font-awesome-icon class="fs-3" icon="fa-solid fa-bell" />
      <div class="profile-pic d-flex align-items-center">
      <img class="w-100" src="@/assets/profile_pic1.png" alt="">
      <font-awesome-icon class="ms-2" icon="fa-solid fa-caret-down" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      textInput: "",
    };
  },
  methods: {
    entered() {
      this.$emit("text", this.textInput);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/variables";
.head {
  position: fixed;
  z-index: 100000;
  width: 101%;
  background-color: rgba($backround-primary, $alpha: 0.7);

  .logo {
    max-width: 200px;
  }
   a {
          text-decoration: none;
          color: $head-text-color;
          &.active {
            color: $white-color;
          }
        }
  .link {
    display: flex;
    flex-direction: column;
    justify-content: center;
    ul {
      list-style: none;
      display: flex;
      gap: 1rem;
      margin: 0;
      li {

      }
    }
  }
  .rightHead {
    gap: 2rem;
    .profile-pic {
      max-width: 45px;
      img {
      border-radius: 10px;
      }
    }
  }
}
</style>
