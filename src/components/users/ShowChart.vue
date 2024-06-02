<template>
  <div class="showChartTitle">
    <h1>סטטיסטיקת עבודה</h1>
    <hr>
  </div>

  <div id="chart">
    <canvas id="myChart"></canvas>
  </div>
</template>

<script>
//   import { Chart, LineController, LinearScale, CategoryScale, PointElement, LineElement } from 'chart.js';
//   Chart.register(LineController, LinearScale, CategoryScale, PointElement, LineElement);


import apiService from '../services/api-service.js'; // ייבוא של שירות ה-API
import Alert from '../services/sweetAlert-service.js'; // ייבוא של שירות ה-Alert
import Chart from 'chart.js/auto';
export default {
  props: ['userInfo'],
  data() {
    return {
      days: [],
      data: [],
      type: 'line',
    }
  },

  methods: {
    async getData() {
      this.resetData();
      try {
        console.log(this.userInfo.id);
        apiService.getData('calculations/progress/', this.userInfo.id)
          .then(response => {

            // הקוד הבא מכניס את כל הימים גם אם יש כמה עידכונים ביום
            // response.data.forEach(item => {
            //     this.days.push((new Date(item.createdAt).getDate()).toString().padStart(2, '0') + '/' + ((new Date(item.createdAt).getMonth() + 1).toString().padStart(2, '0')));   
            //     this.data.push(item.pagesWrittenToday)                 
            // });

            // הקוד הבא מאחד מספר עידכונים שבאותו יום לעדכון 1
            let map = new Map();
            response.data.forEach(item => {
              console.log(map)
              let date = (new Date(item.createdAt).getDate()).toString().padStart(2, '0') + '/' + ((new Date(item.createdAt).getMonth() + 1).toString().padStart(2, '0'));

              if (map.has(date)) {
                map.set(date, map.get(date) + item.pagesWrittenToday);
              } else {
                map.set(date, item.pagesWrittenToday);
              }
            });

            this.days = Array.from(map.keys());
            this.data = Array.from(map.values());

            // console.log("day is" + this.days);
            // console.log("data is" + this.data);
            // console.log(response);
            this.showChart()
          })
      } catch (error) {
        if (error.response.status === 404) {
          Alert.info('לא נמצאו עידכונים לחישוב זה')
        }
        else {
          Alert.error('שגיאה בהתחברות', 'נסה שוב מאוחר יותר')
        }
      }

    },

    // איפוס נתונים
    resetData() {
      this.days = [];
      this.data = [];
    },
    showChart() {
      const ctx = document.getElementById('myChart').getContext('2d');
      new Chart(ctx, {
        type: this.type,
        data: {
          //   labels: ['ראשון', 'שני', 'שלישי', 'רביעי', 'חמישי', 'שישי', 'שבת', 'ראשון', 'שני', 'שלישי', 'רביעי', 'חמישי', 'שישי', 'שבת', 'ראשון', 'שני', 'שלישי', 'רביעי', 'חמישי', 'שישי', 'שבת'],
          labels: this.days,
          datasets: [{
            label: 'מספר דפים שנכתבו',
            data: this.data,
            // data: Array.from({length: 21}, () => Math.floor(Math.random() * 10)),
            backgroundColor: 'blue',
            // backgroundColor: 'rgba(75, 192, 192, 0.2)',
            // borderColor: 'red',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 3
          }]
        },
        options: {
          scales: {
            y: {
              type: 'linear',
              beginAtZero: true
            },
            x: {
              type: 'category',
              beginAtZero: true
            }
          }
        }
      });
    }
  },
  async mounted() {
    await this.getData()


  }
}
</script>

<style scoped>
.showChartTitle {
  position: relative;
  text-align: center;
  margin-bottom: 20px;
  margin-top: 20px;
}

#chart {
  background-color: rgba(255, 255, 255, 0.5);
}
</style>