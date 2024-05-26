<template>
    <div>
        <h2>{{ dateHE }}</h2>
    </div>
</template>
   
<script>

export default {
    name: 'todayHebrewDate',
    data() {
        return {
            dateHE: "טוען תאריך עברי...",
        };
    },
    mounted() {
        setTimeout(() => {
            this.getDateHE()
        }, 1000);
    },
    methods: {
        //פונקצייה להמרת התאריך לפורמט מתאים לAPI
        fixFormat(date) {
            let dateStr = date.toLocaleDateString("en-GB");
            let DataStr = `${dateStr[6]}${dateStr[7]}${dateStr[8]}${dateStr[9]}&gm=${dateStr[3]}${dateStr[4]}&gd=${dateStr[0]}${dateStr[1]}`;
            return DataStr
        },
        async getDateHE() {
            let d = new Date();
            let date = this.fixFormat(d);
            let url = `https://www.hebcal.com/converter?cfg=json&gy=${date}&g2h=1`;
            let response = await fetch(url);
            let data = await response.json();
            this.dateHE = data.hebrew;
        }
    },
};
</script>
   
<style scoped></style>
   