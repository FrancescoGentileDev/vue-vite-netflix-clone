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
            <a :class="{ active: currentTab == tab.name }" href="#" @click="gotoTab(tab.name)">{{
              tab.text
            }}</a>
          </li>
        </ul>
      </div>
    </div>
    <div class="d-flex align-items-center rightHead me-4">
      <select
        v-if="showSelect"
        class="form-select form-select"
        name=""
        id=""
        @change="selectCategory"
      >
        <option :value="-1">Category</option>
        <option
          v-for="genre in genres"
          :selected="genre.id == sel"
          :value="genre.id"
          :key="genre.id"
        >
          {{ genre.name }}
        </option>
      </select>

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
import Call from "@/call";
export default {
  data() {
    return {
      textInput: "",
      colorBackground: true,
      allMovieCategory: [],
      showSelect: false,
      allTVCategory: [],
      genres: [],
      sel: "",
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
  async created() {
    window.addEventListener("scroll", () => {
      let scroll = window.scrollY;
      this.colorBackground = scroll > 0 ? false : true;
    });

    let categoryMovie = new Call({ language: "it-IT", adult: false });

    let allCategoryMovie = await categoryMovie.makeCall("genre", "movie", "list");

    this.allMovieCategory = allCategoryMovie;

    let categoryTV = new Call({ language: "it-IT", adult: false });

    let allCategoryTV = await categoryTV.makeCall("genre", "tv", "list");

    this.allTVCategory = allCategoryTV;
  },
  methods: {
    entered() {
      this.sel = -1;
      this.$emit("selectCategory", "-1");
      this.$emit("text", this.textInput);
    },
    returnHome() {
      if (this.textInput !== "") {
        this.textInput = "";
        this.entered();
      }
    },
    gotoTab(tab) {
      this.sel = -1
      this.currentTab = tab;
      this.textInput = ""
      this.$emit("text", "");
      this.$emit("selectCategory", "-1");

      if (tab == "tvShow") {
        this.genres = this.allTVCategory.genres;
        this.showSelect = true;
      } else if (tab === "movie") {
        this.genres = this.allMovieCategory.genres;
        this.showSelect = true;
      } else this.showSelect = false;

      this.$emit("clickTab", tab);
    },
    selectCategory(event) {
      this.textInput = ""
      this.$emit("text", "");

      if (event.target.value !== -1) {
        this.$emit("selectCategory", event.target.value);
        this.sel = event.target.value;
      }
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
    input,
    select {
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
