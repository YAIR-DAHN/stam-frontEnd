<template>
  <div class="header">
    <div class="logo">
      <img src="../assets/temp_logo.png" alt="logo" />
    </div>
    <div>
      <todayHebrewDate />
    </div>

    <div class="navigation">
      <router-link to="/"><button class="nav-button">בית</button></router-link> 
      <router-link to="/startCalc"><button class="nav-button">מחשבון</button></router-link>
      <a href="https://angle-project.vercel.app/"><button class="nav-button"> מד זווית</button></a>
      <router-link to="/login" v-if="!loggedIn"><button class="nav-button"> כניסה</button></router-link> 
      <router-link to="/Register"><button class="nav-button"> הרשמה</button></router-link>
      <router-link to="/showProfile"><button class="nav-button"> פרופיל</button></router-link>
      <router-link to="/ShowCalculations"><button class="nav-button"> ההמרות שלי</button></router-link>
      <button class="nav-button">צור קשר</button>
    </div>
  </div>
</template>
<script>
import todayHebrewDate from "./todayHebrewDate.vue";

export default {
  components: {
    todayHebrewDate: todayHebrewDate
  },
  data() {
    return {
      loggedIn: false
    };
  },
  mounted() {
    // check if user is logged in
    // this.loggedIn = true;
    if (localStorage.getItem("token")) {
      this.loggedIn = true;
    }
    
  }};
</script>
  
<style scoped>
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: row-reverse;
  background-color: #f0f0f0;
  padding: 10px;
}

img {
  width: 60px;
  height: 60px;
}

.navigation {
  display: flex;
}

.nav-button {
  background-color: transparent;
  border: none;
  margin: 0 10px;
  cursor: pointer;
  color: #000;
}

.nav-button:hover {
  /* color: #ff0000; */
  color: #57a6f4;
  /* צבע כאשר מעבירים את העכבר מעל הכפתור */
}
</style>
  