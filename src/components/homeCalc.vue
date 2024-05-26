<!-- מסך ראשוני הקורא לכניסה לבחירת מחשבון -->
<template>
  <div>
    <h3>
      כמה עמודים אני צריך לכתוב היום?
      <br />
      איך אני אמור לחשב כשיש לי חול המועד באמצע?
      <br />
      כמה תכלס אני מרוויח ביום על כתיבה?
      <br />
      רוצים לעשות סדר בכל הבלאגן?!
    </h3>
    <router-link to="/startCalc" class="nav-button"><button>לחץ כאן להתחלת החישוב</button></router-link>
  </div>

</template>
<style scoped>
div {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 60vh;
  background-color: #f0f0f0;
}
</style>