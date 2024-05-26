<template>
   
<!-- תפריט בחירה בין סוגי מחשבונים -->
  <div id="Screen2" v-show="showScreen2">
    <h1>בחר את סוג החישוב הרצוי</h1>
    <button @click="calculatorDate">לחישוב תאריך הגשה</button>
    <button @click="pagesCalculator">לחישוב כמות כתיבה</button>
  </div>
  <div v-show="showCalculatorDate">
    <CalDate @click-back="funcBack" />
  </div>
  <div v-show="showPagesCalculator">
    <pagesCalc @click-back="funcBack" />
  </div>
</template>

<script>
import CalDate from "./calculatorDate.vue";
import pagesCalc from "./pagesCalculator.vue";

export default {
  components: {
    CalDate: CalDate,
    pagesCalc: pagesCalc

  },
  data() {
    return {
      //הגדרת תצוגת מסכים
      // showScreen1: true,
      showScreen2: true,
      showCalculatorDate: false,
      showPagesCalculator: false
    }
  },
  methods: {
    // startCalculator() {
    //   this.showScreen1 = !this.showScreen1;
    //   this.showScreen2 = !this.showScreen2;
    // },
    calculatorDate() {
      this.showScreen2 = false;
      this.showCalculatorDate = true;
    },
    pagesCalculator() {
      this.showScreen2 = false;
      this.showPagesCalculator = true;
    },
    funcBack() {
      // this.showScreen1 = false
      this.showScreen2 = true
      this.showCalculatorDate = false
      this.showPagesCalculator = false
    }

  }
}
</script>


<style></style>
