<template>
  <div class="continer">
    <div class="hader" v-if="!showMenu">
      <div class="logo">
        <img src="../assets/temp_logo.png" alt="logo" />
      </div>
      <div>
        <todayHebrewDate />
      </div>
    </div>
    <!-- תפריט למסכי מחשב -->
    <div class="navigation" v-if="!isMobile">
      <router-link to="/"><button class="nav-button">בית</button></router-link>
      <router-link to="/startCalc"><button class="nav-button">מחשבון</button></router-link>
      <a href="https://angle-project.vercel.app/"><button class="nav-button"> מד זווית</button></a>
      <router-link to="/login" v-if="!loggedIn"><button class="nav-button"> כניסה</button></router-link>
      <router-link to="/Register" v-if="!loggedIn"><button class="nav-button"> הרשמה</button></router-link>
      <router-link to="/showProfile" v-if="loggedIn"><button class="nav-button"> פרופיל</button></router-link>
      <router-link to="/ShowCalculations" v-if="loggedIn"><button class="nav-button"> ההמרות שלי</button></router-link>
      <router-link to="/Products"><button class="nav-button"> מוצרים מומלצים</button></router-link>
      <router-link to="/Contact"><button class="nav-button"> צור קשר</button></router-link>
      <div class="dropdown" v-if="isAdmin">
          <button class="nav-button">ניהול</button>
          <div class="dropdown-content">
            <router-link to="/ShowUsers" >הצג משתמשים</router-link>
            <br>
            <router-link to="/AddProduct">הוסף מוצר</router-link>
            <br>
            <router-link to="/statistics">כניסות לאתר</router-link>

       
            <!-- הוסף כאן קישורים נוספים לתת-תפריט -->
          </div>
      </div>
    </div>

    <!-- תפריט לטלפונים -->
    <div class="mobile-navigation" v-if="isMobile">
      <button @click="toggleMenu" class="hamburger-button">☰</button>
      <div class="mobile-menu" v-if="showMenu">
        <router-link to="/"><button class="nav-button" @click="toggleMenu">בית</button></router-link>
        <router-link to="/startCalc" @click="toggleMenu"><button class="nav-button">מחשבון</button></router-link>
        <a href="https://angle-project.vercel.app/" @click="toggleMenu"><button class="nav-button"> מד
            זווית</button></a>
        <router-link to="/login" v-if="!loggedIn" @click="toggleMenu"><button class="nav-button">
            כניסה</button></router-link>
        <router-link to="/Register" v-if="!loggedIn" @click="toggleMenu"><button class="nav-button">
            הרשמה</button></router-link>
        <router-link to="/showProfile" v-if="loggedIn" @click="toggleMenu"><button class="nav-button">
            פרופיל</button></router-link>
        <router-link to="/ShowCalculations" v-if="loggedIn" @click="toggleMenu"><button class="nav-button"> ההמרות
            שלי</button></router-link>
        <router-link to="/Products" @click="toggleMenu"><button class="nav-button"> מוצריםמומלצים</button></router-link>
        <router-link to="/Contact" @click="toggleMenu"><button class="nav-button"> צור קשר</button></router-link>
        <!-- <router-link to="/ShowUsers" v-if="isAdmin"><button class="nav-button"> הצג משתמשים</button></router-link> -->
        <div class="dropdown">
          <button class="nav-button" v-if="isAdmin">ניהול</button>
          <div class="dropdown-content">
            <router-link to="/ShowUsers" @click="toggleMenu">הצג משתמשים</router-link>
            <router-link to="/AddProduct" @click="toggleMenu">הוסף מוצר</router-link>
          </div>
        </div>
      </div>
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
      loggedIn: false,
      isMobile: false,
      showMenu: false,
      isAdmin: false
    };
  },
  methods: {
    toggleMenu() {
      this.showMenu = !this.showMenu;
    }
  },
  mounted() {
    // check if user is logged in
    // this.loggedIn = true;
    // בדיקה האם המשתמש מחובר
    if (localStorage.getItem("token")) {
      this.loggedIn = true;
    }
    // בדיקה האם המשתמש הוא מנהל
    if (localStorage.getItem("role") == "admin" || localStorage.getItem("role") == "superAdmin") {
      this.isAdmin = true;
    }
    this.isMobile = window.innerWidth <= 800;
    window.addEventListener('resize', () => {
      this.isMobile = window.innerWidth <= 800;
    });


  }
};
</script>

<style scoped>
.continer {
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
.dropdown {
  position: relative;
  display: inline-block;
}

.dropdown-content {
  display: none;
  position: absolute;
  background-color: #f9f9f9;
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
  padding: 12px 16px;
  z-index: 1;
}

.dropdown:hover .dropdown-content {
  display: block;
}

@media (max-width: 800px) {
  .continer {
    /* flex-direction: row; */
  }

  .navigation {
    display: none;
  }

  .mobile-navigation {
    /* position: fixed; */


    display: flex;
    flex-direction: column;
    align-items: flex-start;
    width: 100%;
  }

  .hamburger-button {
    /* position: absolute; */
    background-color: transparent;
    border: none;
    cursor: pointer;
    font-size: 30px;
    color: #000;
  }

  .hamburger-button:hover {
    color: #57a6f4;
  }

  .mobile-menu {
    display: flex;
    flex-direction: column;
    background-color: #f0f0f0;
    /* padding: 10px; */
    width: 100%;
  }

  .mobile-menu a {
    color: #000;
    text-decoration: none;
    /* margin: 10px 0; */
  }

  .mobile-menu a:hover {
    color: #57a6f4;
  }
}
</style>