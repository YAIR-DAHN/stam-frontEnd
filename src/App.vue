=<template>

  <!-- טעינת אייקונים -->
  <link rel="stylesheet"
    href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />
  <!-- <ModalsContainer /> -->
  <div class="Continer">
    <div id="heder" class="row">
      <MainHeder />

    </div>
    <!-- אזור מודעות ימני -->
    <section class="row">
      <div class="col-3 d-none d-xl-flex flex-column">
        <rightAds />
      </div>

      <!-- (ראוטר) אזור מרכזי -->
      <div id="containerCalculatur" class="col-xl-6">
        <router-view />
      </div>

      <!-- אזור מודעות שמאלי -->
      <div class="col-3 d-none d-xl-flex flex-column ">
        <leftAds />
      </div>
    </section>
  </div>

</template>

<script>
import MainHeder from "./components/MainHeder.vue";
import rightAds from "./components/rightAds.vue";
import leftAds from "./components/leftAds.vue";
// import { ModalsContainer } from 'vue-final-modal'

export default {
  name: "App",
  components: {
    MainHeder: MainHeder,
    rightAds: rightAds,
    leftAds: leftAds,
    // ModalsContainer
  },
  methods: {

  },
  compatConfig: { MODE: 3 }
};
</script>


<style>
@import url('https://fonts.googleapis.com/css2?family=Noto+Serif+Hebrew:wght@100;200;300;400;500;600;700;800;900&display=swap');

#app {
  /* width: 100%; */
  font-family: 'Noto Serif Hebrew', serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;

  /* margin-top: 60px; */
  /* padding: 20px; */
}

/* .container {
  width: 100%; 
  margin-top: 60px;
} */

#app #containerCalculatur {
  background-color: #f0f0f0;
  border-radius: 10px;
  box-shadow: 0 0 10px #000;
  padding: 10px;
}

.Title {
  position: relative;
  text-align: center;
  margin-bottom: 20px;
  margin-top: 20px;
}

.row {
  --bs-gutter-x: 0;
}

@media (max-width: 1000px) {
  #app .adds {
    display: none;
  }

  /* #app #heder {
     display: block; 
  } */
  #app {
    padding: 10px;
  }

  .Continer {
    padding: 15px;
  }

}


#app section {
  margin-top: 50px;
}
</style>