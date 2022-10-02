<template>
  <div class="franco-container">
    <div class="logo w-25">
      <img class="w-100" src="@/assets/netflix_logo.png" alt="" srcset="" />
    </div>

    <div class="picker">
      <h1>Who's watching?</h1>
      <div class="profile-container">
        <button ref="profile1" value="1" @click="picked($event)">
          <img src="@/assets/profile_1.jpg" alt="" />
          <p>Pippo</p>
        </button>
        <button  ref="profile2" value="2"  @click="picked($event)">
          <img src="@/assets/profile_2.jpg" alt="" />
          <p>Franco</p>
        </button>
        <button  ref="profile3" value="3"  @click="picked($event)">
          <img src="@/assets/profile_3.jpg" alt="" />
          <p>Qualcun'altro</p>
        </button>
        <button  ref="profile4" value="4"  @click="picked($event)">
          <img src="@/assets/profile_4.jpg" alt="" />
          <p>Sofia</p>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {

  methods: {
    picked(event) {
      this.$emit("pickedProfile", event.target.src) 
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/variables";

* {
  user-select: none;
  -webkit-user-drag: none;
}
.logo {
  max-width: 200px;
  position: absolute;
}
h1 {
  font-size: 4rem;
  margin-bottom: 1.5rem;
}
.picker {
  position: absolute;
  display: flex;
  flex-direction: column;
  text-align: center;
  height: 100vh;
  width: 100vw;
  justify-content: center;
  align-items: center;

  .profile-container {
    display: flex;
    gap: 30px;
    button {
      max-width: 300px;
      border: none;
      padding: 0;
      border-radius: 20px;
      display: flex;
      flex-direction: column;
      position: relative;

      img {
        width: 100%;
        border-radius: 20px;
      }
      p {
        position: absolute;
        bottom: -80px;
        left: 50%;
        transform: translateX(-50%);
        color: white;
        font-size: 2rem;
        

      }
      &:hover {
        border: 5px solid $brand-color-dark;
        border-radius: 20px;
      }
    }
  }
}
</style>
