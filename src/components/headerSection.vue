<template>
  <div class="d-flex head p-2 px-4 justify-content-between">
    <div class="d-flex">
      <div class="logo w-25">
        <img class="w-100" src="@/assets/netflix_logo.png" alt="" srcset="" @click="returnHome"/>
      </div>

      <div class="link">
        <ul>
          <li><a class="active" href="#"  @click="returnHome" >Home</a></li>
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
      <font-awesome-icon class="fs-4 magnifying-glass" icon="fa-solid fa-magnifying-glass" @click="entered"/>
      <div class="dvd">
      <a href="">DVD</a>
      </div>
      <font-awesome-icon class="fs-3" icon="fa-solid fa-bell" />
      <div class="profile-pic d-flex align-items-center">
      <img class="w-100" :src="profile" alt="">
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
  props: {
    profile: String,

  },

  methods: {
    entered() {
      this.$emit("text", this.textInput);
    },
    returnHome() {
      if(this.textInput!== "") {
        this.textInput = ""
        this.entered()
        }
    }
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
    user-select: none;
    cursor: pointer;
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

    }
  }
  .rightHead {
gap: 2rem;
    input {
      background-color: $backround-primary;
      color: white;
    }
    .magnifying-glass {
      cursor: pointer;

    }
    .profile-pic {
      max-width: 45px;
      img {
      border-radius: 10px;
      }
    }
  }
}
</style>
