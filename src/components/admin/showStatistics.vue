<template>
    <div class="Title">
        <h1>סטטיסטיקת כניסות</h1>
        <hr>
    </div>
    <div class="statistics">

        <div class="data" v-for="(data, index) in loginCount" :key="index">
            <h2>התבצעו {{ data.loginCounter }} כניסות מ {{ data.loginDeviceType }}</h2>

            <!-- <p>מכשיר: {{ data.loginDeviceType}}</p>
            <p>כמות הכניסות: {{ data.loginCounter }}</p> -->
        </div>
    </div>
    <div id="chart">
        <canvas id="myChart"></canvas>
    </div>
</template>

<script>
// import Chart from 'chart.js/auto';

import apiService from '../services/api-service.js'; // ייבוא של שירות ה-API
import Alert from '../services/sweetAlert-service.js'; // ייבוא של שירות ה-Alert
export default {
    data() {
        return {
            loginCount: [],
            days: [],
            data: [],
            type: 'line',
        };
    },
       async mounted() {
        this.getInfPerDevice("mobile");
        this.getInfPerDevice("desktop");
        console.log(this.loginCount);
        // await this.getData()
    },
    methods: {
        async getInfPerDevice(type) {
            try {
                const response = await fetch('http://localhost:3000/counter/', {
                    method: 'post',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + localStorage.getItem('token')
                    },
                    body: JSON.stringify({ "loginDeviceType": type, })
                })
                const data = await response.json();
                const info = {
                    loginDeviceType: type,
                    loginCounter: data
                }
                this.loginCount.push(info);
                console.log(`data: ${data} type: ${type}`);
            } catch (error) {
                console.error(error);
            }
        },
        async getData() {
            this.resetData();
            try {
                console.log(this.userInfo.id);
                apiService.getData('counter/')
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
                                map.set(1);
                            } else {
                                map.set(date, 1);
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
        resetData() {
            this.days = [];
            this.data = [];
        },
        // showChart() {
        //     const ctx = document.getElementById('myChart').getContext('2d');
        //     new Chart(ctx, {
        //         type: this.type,
        //         data: {
        //             //   labels: ['ראשון', 'שני', 'שלישי', 'רביעי', 'חמישי', 'שישי', 'שבת', 'ראשון', 'שני', 'שלישי', 'רביעי', 'חמישי', 'שישי', 'שבת', 'ראשון', 'שני', 'שלישי', 'רביעי', 'חמישי', 'שישי', 'שבת'],
        //             labels: this.days,
        //             datasets: [{
        //                 label: 'מספר דפים שנכתבו',
        //                 data: this.data,
        //                 // data: Array.from({length: 21}, () => Math.floor(Math.random() * 10)),
        //                 backgroundColor: 'blue',
        //                 // backgroundColor: 'rgba(75, 192, 192, 0.2)',
        //                 // borderColor: 'red',
        //                 borderColor: 'rgba(75, 192, 192, 1)',
        //                 borderWidth: 3
        //             }]
        //         },
        //         options: {
        //             scales: {
        //                 y: {
        //                     type: 'linear',
        //                     beginAtZero: true
        //                 },
        //                 x: {
        //                     type: 'category',
        //                     beginAtZero: true
        //                 }
        //             }
        //         }
        //     });
        // }
    },
};
</script>

<style scoped>
.statistics {
    text-align: center;
}

.data {
    margin-top: 20px;
}
</style>
