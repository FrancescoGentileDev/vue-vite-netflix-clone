<template>
  <div
    class="d-flex head p-2 px-4 justify-content-between"
    :class="{ nobackground: colorBackground }"
  >
    <div class="d-flex">
      <div class="logo w-25">
        <img class="w-100" src="@/assets/netflix_logo.png" alt="" srcset="" @click="returnHome" />
      </div>

      <div class="link">
        <ul>
          <li v-for="(tab, index) in tabs" :key="index">
            <a :class="{ active: currentTab === tab.name }" href="#" @click="gotoTab(tab.name)">{{
              tab.text
            }}</a>
          </li>
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
      <font-awesome-icon
        class="fs-4 magnifying-glass"
        icon="fa-solid fa-magnifying-glass"
        @click="entered"
      />
      <div class="dvd">
        <a href="">DVD</a>
      </div>
      <font-awesome-icon class="fs-3" icon="fa-solid fa-bell" />
      <div class="profile-pic d-flex align-items-center">
        <img class="w-100" :src="profile" alt="" />
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
      colorBackground: true,
      currentTab: this.current.slice(0, this.current.length - 3),
      tabs: [
        { name: "home", text: "Home" },
        { name: "tvShow", text: "Tv shows" },
        { name: "movie", text: "Movies" },
        { name: "new", text: "New & popular" },
        { name: "list", text: "My List" },
      ],
    };
  },
  props: {
    profile: String,
    current: String,
  },
  mounted() {
    window.addEventListener("scroll", () => {
      let scroll = window.scrollY;
      this.colorBackground = scroll > 0 ? false : true;
    });
  },
  methods: {
    entered() {
      this.$emit("text", this.textInput);
    },
    returnHome() {
      if (this.textInput !== "") {
        this.textInput = "";
        this.entered();
      }
    },
    gotoTab(tab) {
      this.currentTab = tab;
      this.$emit("clickTab", tab);
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
  background-color: rgba($backround-primary, 0.7);
  transition: background-color 0.2s linear;
  &.nobackground {
    background-color: rgba($backround-primary, 0);
  }

  .logo {
    max-width: 200px;
    user-select: none;
    cursor: pointer;
  }
  a {
    font-weight: 600;
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
