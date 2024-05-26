<!-- הצגת החישובים השמורים של המשתמש -->
<template>
    <div class="showCalcContiner">
        <h1>חישובים שמורים</h1>
        <hr>

        <!-- <div>
                            <ShowChart />
                        </div> -->

        <div class="grid-card">
            <!-- <div v-for="calculation in calculations" :key="calculation.id"
                :class="{ 'calculation-card': true, 'green-card': isZeroOrLess(calculation) }"> -->
            <div v-for="calculation in calculations" :key="calculation.id"
                :class="{ 'calculation-card': true, 'green-card': isZeroOrLess(calculation), 'expanded-card': calculation.isExpanded }">
                <h2>{{ calculation.bookType }}</h2>
                <div class="progress-bar">
                    <progress :value="calculation.pagesWritten"
                        :max="calculation.booksAmount * calculation.pagesPerBook"></progress>
                    <span class="progress-text">{{ calculation.pagesWritten }} / {{ calculation.booksAmount *
                calculation.pagesPerBook }}</span>
                </div>
                <div class="calculation-info">

                    <div class="calculation-header">

                        <p>תאריך ההגשה המשוער: <b>{{ calculation.estimatedTime }}</b></p>
                        <p> הרווח המשוער הוא: <b>{{ calculation.profitPerPage }}</b></p>
                        <p>כמות הספרים: <b>{{ calculation.booksAmount }}</b> עמודים לספר: <b>{{
                calculation.pagesPerBook }}</b></p>
                        <p>סך העמודים: <b>{{ (calculation.pagesPerBook * calculation.booksAmount) }}</b>
                            נותרו: <b>{{ (calculation.pagesWritten ? ((calculation.pagesPerBook *
                calculation.booksAmount) -
                calculation.pagesWritten) : "לא עודכן") }}</b></p>
                        <p>לפי קצב של <b>{{ calculation.writingRate }}</b> עמודים לשעה</p>
                        <!-- <p>Working Days per Week: {{ calculation.workingDaysPerWeek }}</p> -->
                        <p><b>סה"כ ימים שנותרו: {{ daysLeft(calculation.estimatedTime) }}</b></p>
                        <p><b>אתה צריך לכתוב {{
                ((calculation.booksAmount * calculation.pagesPerBook) /
                    daysLeft(calculation.estimatedTime)).toFixed(2)
            }} עמודים ליום</b></p>
                    </div>

                    <!-- הרחבת כרטיס -->
                    <div v-show="calculation.isExpanded" class="expanded-card">

                        <p>תאריך יצירה: <b>{{ calculation.createdAt }}</b></p>
                        <p>תאריך ההגשה המשוער: <b>{{ calculation.estimatedTime }}</b></p>
                        <p>ימי עבודה בשבוע: <br>
                            <b>{{ translateDaysToHebrew(calculation.workdaysPerWeek) }}</b>
                        </p>
                       
                    </div>
                   
                </div>

                <div class="calculation-details">
                    <!-- <div v-if="calculation.showDetails" class="calculation-details"> -->
                    <input type="number" v-model="calculation.pagesWrittenToday" placeholder="כמה עמודים כתבת היום?" />
                    <button @click="updatePagesWritten(calculation)">עדכן</button>
                </div>
                 <div v-if="calculation.isExpanded">
                            <ShowChart :userInfo="{id:calculation.id}" />
                        </div>
                <button v-show="!calculation.isExpanded" @click="toggleDetails(calculation)">הצג פרטים נוספים</button>
                <button v-show="calculation.isExpanded" @click="toggleDetails(calculation)">הסתר פרטים נוספים</button>



            </div>
        </div>
    </div>

</template>

<script>
import apiService from '../services/api-service.js'; // ייבוא של שירות ה-API
import Alert from '../services/sweetAlert-service.js'; // ייבוא של שירות ה-Alert
import ShowChart from './ShowChart.vue'
export default {
    name: "showCalc",
    components: {
        ShowChart: ShowChart
    },
    data() {
        return {
            calculations: [],
        };
    },
    mounted() {

        this.fetchCalculations();
    },
    methods: {

        // פונקציה לקבלת רשימת החישובים של המשתמש
        async fetchCalculations() {
            if (!localStorage.getItem('id')) {
                Alert.info("אינך מחובר למערכת", 'הינך מועבר לדף התחברות');
                this.$router.push('/login');
                return;
            }
            try {
                const response = await apiService.getData("calculations/user/", localStorage.getItem('id'))
                // this.calculations = response.data
                this.calculations = response.data.map(calculation => ({
                    ...calculation,
                    isExpanded: false,
                }));
            } catch (error) {
                // console.error('Error:', error)
                Alert.info("לא נמצאו חישובים שמורים")
            }
        },

        //פונקציה לחישוב הימים שנותרו עד לסיום הפרויקט
        daysLeft(estimatedTime) {
            const today = new Date();
            const estimatedDate = new Date(estimatedTime);
            const timeDiff = estimatedDate.getTime() - today.getTime();
            const daysLeft = Math.ceil(timeDiff / (1000 * 3600 * 24));
            return daysLeft;
        },

        //  פונקציה לבדיקה הא הפרויקט הושלם
        isZeroOrLess(calculation) {
            let pagesLeft = calculation.pagesPerBook * calculation.booksAmount - (calculation.pagesWritten || 0);
            return pagesLeft <= 0;
        },
        // פונקציה להצגת פרטים נוספים
        toggleDetails(calculation) {
            calculation.isExpanded = !calculation.isExpanded;
        },

        // כפתור לעדכון יומי
        updatePagesWritten(calculation) {
            const data = {
                pagesWritten: calculation.pagesWritten + calculation.pagesWrittenToday,
                userId: localStorage.getItem('id'),
                calculationId: calculation.id,
                pagesWrittenToday: calculation.pagesWrittenToday,
                // hoursWorked: // אופציונלי להכנסת שעות עבודה
                // writingRate: calculation.writingRate, // אופציונלי להכנסת קצב כתיבה מחושב
            }
            apiService.putData(`calculations/progress/${calculation.id}`, data)
                .then(() => {
                    if (calculation.pagesWritten + calculation.pagesWrittenToday >= calculation.pagesPerBook * calculation.booksAmount) {
                        Alert.success("כל הכבוד! הפרויקט הושלם", "חזק ואמץ!")
                    }
                    else {
                        Alert.success("המידע עודכן בהצלחה")
                    }
                    this.fetchCalculations()
                })
                .catch((error) => {
                    console.error('Error:', error)
                    Alert.error("אירעה שגיאה בעדכון המידע", "נסה שוב מאוחר יותר")
                })
        },

        // הצגת פרטים נוספים
        showDetails(calculation) {
            calculation.showDetails = !calculation.showDetails;
        },

        // תרגום ימי השבוע לעברית
        translateDaysToHebrew(days) {
            const dayNamesMap = {
                sunday: 'ראשון',
                monday: 'שני',
                tuesday: 'שלישי',
                wednesday: 'רביעי',
                thursday: 'חמישי',
                friday: 'שישי',
                saturday: 'שבת',
            };

            return days.split(',').map(day => dayNamesMap[day]).join(', ');
        }


    },
};
</script>

<style scoped>
.showCalcContiner {
    position: relative;
    text-align: center;
    margin-bottom: 20px;
    margin-top: 20px;
}

/* עיצוב רשימת כרטיסיות */
.grid-card {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 20px;
}

/* עיצוב כרטיסייה */
.calculation-card {
    background-color: #f9f9f9;
    border: 1px solid #ddd;
    padding: 20px;
    margin-bottom: 20px;
    border-radius: 5px;
}

/* עיצוב כותרת */
.calculation-header h2 {

    font-size: 1.5rem;
    color: #333;
    margin-bottom: 10px;
}

/* עיצוב פרטים נוספים */
.calculation-details {
    display: flex;
    align-items: center;
}

/* עיצוב לכרטסייה שהושלמה */
.green-card {
    background-color: rgba(87, 231, 87, 0.499);
}

.calculation-details input {
    width: 100%;
    flex: 1;
    padding: 5px;
    border: 1px solid #ddd;
    border-radius: 3px;
    margin-right: 5px;
}

.calculation-details button {
    background-color: #007bff;
    color: #fff;
    border: none;
    padding: 5px 10px;
    border-radius: 3px;
    cursor: pointer;
}

.calculation-info {
    display: flex;
    justify-content: space-between;
    align-items: center;
    justify-content: space-evenly;
    align-items: stretch;
}

/* עיצוב כרטיס מורחב */
.expanded-card {
    grid-column: span 2;
}

/* .expanded-card {
    position: relative;
    width: 100%;
    z-index: 1000;
    overflow: auto;
    background-color: rgba(0, 0, 0, 0.5);
    /* display: flex;
    justify-content: center;
    align-items: center; */

/* עיצוב פס התקדמות */
.progress-bar {
    position: relative;
    width: 100%;
    border-radius: 5px;
}

.progress-bar progress {
    width: 100%;
    height: 60px;

}

.progress-bar .progress-text {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    text-align: center;
    line-height: 60px;
    color: #4a4343;
}
</style>
