<template>
    <div id="Screen2" v-show="showScreen2">
        <form id="fromScreen2">
            <fieldset>
                <h2>מחשבון תאריך הגשה</h2>
                <legend>בחר סוג פרויקט</legend>
                <!-- אזור בחירת סוג ספר -->
                <div id="selctBook">
                    <!-- <a-checkbox v-model:checked="userData.book">Checkbox</a-checkbox> -->
<!--                    
                    <b-form-checkbox value="ספר תורה" v-model="userData.book" @click="setAmunt($event.target.value)">ספר
                        תורהF</b-form-checkbox> -->

                    <input type="radio" id="SeferTorah" name="item1" value="ספר תורה" v-model="userData.book"
                        @click="setAmunt($event.target.value)" required />
                    <label for="SeferTorah">ספר תורה</label>
                    <input type="radio" id="Tfilin" name="item1" value="תפילין" v-model="userData.book"
                        @click="setAmunt($event.target.value)" required />
                    <label for="Tfilin">תפילין</label>
                    <input type="radio" id="Mezuzot" name="item1" value="מזוזות" v-model="userData.book"
                        @click="setAmunt($event.target.value)" required />
                    <label for="Mezuzot">מזוזות</label>
                    <input type="radio" id="MegilatEster" name="item1" value="מגילת אסתר"
                        @click="setAmunt($event.target.value)" v-model="userData.book" required />
                    <label for="MegilatEster">מגילת אסתר</label>
                    <input type="radio" id="SeferHaftarot" name="item1" value="ספר הפטרות"
                        @click="setAmunt($event.target.value)" v-model="userData.book" required />
                    <label for="SeferHaftarot">ספר הפטרות</label>
                    <input type="radio" id="Other" name="item1" value="אחר" v-model="userData.book"
                        @click="setAmunt($event.target.value)" required />
                    <label for="Other">אחר</label>
                    <hr />
                </div>
                <!-- אזור בחירת נתונים נוספים -->
                <div class="row g-3">
                    <div class="col">
                        <label for="Amount"> הזן כמות </label>
                        <input type="number" min="1" id="Amount" v-model="userData.info.AmountSelct" />
                    </div>
                    <div class="col">
                        <label for="pages"> מספר עמודים (לספר 1) </label>
                        <input type="number" id="pages" v-model="userData.info.pagesSelct" />
                    </div>
                </div>
                <div class="row g-3 ">
                    <div class="col">
                        <label for="profit"> רווח משוער </label>
                        <input type="number" id="profit" v-model="userData.info.profitSelct" />
                    </div>
                    <div class="col">
                        <label for="workHours">שעות עבודה ליום </label>
                        <input type="number" id="workHours" min="0" max="24" v-model="userData.info.workHoursSelct" />
                    </div>
                </div>
                <div class="row justify-content-md-center">
                    <div class="col-md-5">
                        <label for="speed">כמה עמודים אתה כותב בשעה?</label>
                        <input type="number" id="speed" required v-model="userData.info.speedSelct" />
                    </div>
                    <div class="col-md-3">
                        <p>אירועים</p>
                        <div class="form-check form-switch">
                            <label for="workInTzom" class="form-check-label"> עבודה בצומות</label>
                            <input type="checkbox" role="switch" id="workInTzom" class="form-check-input"
                                v-model="userData.info.workInTzom" />
                        </div>
                    </div>

                    <!-- הזנת ימי עבודה בשבוע -->
                    <div class="col-md-auto">
                        <h3>ימי עבודה בשבוע</h3>
                        <ul class="list-days list-group list-group-horizontal">
                            <li class="list-group-item ">
                                <label for="workDay1" class="form-check-label">יום ראשון</label>
                                <input type="checkbox" id="workDay1" name="workDays" value="sunday" checked
                                    v-model="userData.workDays" />
                            </li>
                            <li class="list-group-item">
                                <label for="workDay2">יום שני</label>
                                <input type="checkbox" id="workDay2" name="workDays" value="monday"
                                    v-model="userData.workDays" />
                            </li>
                            <li class="list-group-item">
                                <label for="workDay3">יום שלישי</label>
                                <input type="checkbox" id="workDay3" name="workDays" value="tuesday"
                                    v-model="userData.workDays" />
                            </li>
                            <li class="list-group-item">
                                <label for="workDay4">יום רביעי</label>
                                <input type="checkbox" id="workDay4" name="workDays" value="wednesday"
                                    v-model="userData.workDays" />
                            </li>
                            <li class="list-group-item">
                                <label for="workDay5">יום חמישי</label>
                                <input type="checkbox" id="workDay5" name="workDays" value="thursday"
                                    v-model="userData.workDays" />
                            </li>
                            <li class="list-group-item">
                                <label for="workDay6">יום שישי</label>
                                <input type="checkbox" id="workDay6" name="workDays" value="friday"
                                    v-model="userData.workDays" />
                            </li>
                            <li class="list-group-item">
                                <label for="workDay7">מוצאי שבת</label>
                                <input type="checkbox" id="workDay7" name="workDays" value="saturday"
                                    v-model="userData.workDays" />
                            </li>
                        </ul>
                    </div>
                </div>
            </fieldset>
        </form>
        <button @click="$emit('clickBack')">חזור לשלב קודם</button>
        <button @click="submitScreen2">סיים וחשב</button>
    </div>
    <!-- מסך טעינה -->
    <div v-show="loader">
        <DotLoader />
    </div>
    <!-- מסך התוצאה -->
    <div v-show="showScreen3">
        <h1><b>פרויקט {{ userData.book }}</b></h1>
        <h1>תאריך ההגשה המשוער הוא <br> <b>{{ calculatData.DeadLinStr }}</b> </h1>
        <h3>נתרו לך <b>{{ calculatData.totalWorkDay }}</b> ימי עבודה</h3>
        <h3>אתה צריך לכתוב <b>{{ calculatData.pageSpeedPerOneDay }}</b> עמודים ליום</h3>
        <h3>הרווח המשוער הוא <b>{{ calculatData.profitPerDay.toFixed(1) }}</b> שקלים ליום</h3>
        <h3>בהתחשב בקצב כתיבה של <b>{{ userData.info.speedSelct }}</b> עמודים לשעה</h3>
        <details>
            <ul class="list-group">
                <li class="list-group-item" v-for="(item, i) in calculatData.holidayList" :key="i">
                    {{ item }}
                </li>
            </ul>
            <summary><b>להצגת רשימת החגים שחלים בטווח התאריך</b></summary>
        </details>
        <button @click="sendData">שמירה</button>
        <button @click="backToCalc">חזרה למחשבון</button>
        <button @click="startCalculator">חישוב חדש</button>
    </div>
</template>

<script>
import DotLoader from "./DotLoader.vue";
import apiService from './services/api-service.js'; // ייבוא של שירות ה-API
import Alert from './services/sweetAlert-service.js'; // ייבוא של שירות ה-Alert
export default {
    components: {
        DotLoader: DotLoader,
    },
    defineProps: {
        funcBack: Function
    },
    data() {
        return {
            //הגדרת תצוגת מסכים
            showScreen2: true,
            showScreen3: false,
            loader: false,

            userData: {
                book: [],
                info: {
                    AmountSelct: 1,
                    dateSelct: "",
                    profitSelct: "",
                    pagesSelct: "",
                    workHoursSelct: "",
                    workInTzom: false,
                },
                workDays: [],
            },
            saveData: [], //לכאן ידחף כל נתוני המשתמש בלחיצה על כפתור החישוב
            calculatData: {
                RangeOfDates: [], //מערך המחיל טווח ימי העבודה
                newDate: "",  //תאריך נוכחי
                userDate: "", //תאריך הגשה
                JewishCalData: [], //מכיל נתונים מלוח העברי
                totalWorkDay: 0,
                pagePerDay: 0,
                profitPerDay: 0,
                writePagePerHour: 0,
                holidayList: [],
                tzom: "",
                pageSpeedPerOneDay: "",
                pageSpeedPerOneWeek: "",
                WeekWork: "",
                dayWork: 0,
                SumPages: "",
                EndDateTemp: "",
                holidayIn: 0,
                IdArry: 0,
                DeadLine: "",
                DeadLinStr: "",
                holidayListLi: "",
            },
        };
    },
    methods: {
        setAmunt(type) {
            console.log(type);
            switch (type) {
                case "ספר תורה":
                    this.userData.info.pagesSelct = 245
                    break;
                case "תפילין":
                    this.userData.info.pagesSelct = 4
                    break;
                case "מזוזות":
                    this.userData.info.pagesSelct = 1
                    break;
                case "מגילת אסתר":
                    this.userData.info.pagesSelct = 18
                    break;
                case "ספר הפטרות":
                    this.userData.info.pagesSelct = 200
                    break;
                default:
                    this.userData.info.pagesSelct = 1
                    break;
            }
        },
        // איפוס המחשבון
        startCalculator() {
            location.reload()
        },
        //חזרה למחשבון
        backToCalc() {
            this.showScreen2 = !this.showScreen2;
            this.showScreen3 = !this.showScreen3;
        },
        //מעבר לביצוע פעולות החישוב
        submitScreen2() {
            this.showScreen2 = !this.showScreen2;
            this.loader = !this.loader;
            this.saveData.push({ ...this.userData });
            this.powerFunc()
        },
        //קריאה לפונקציות הנדרשות
        async powerFunc() {
            this.pageSpeedPerOneDay() //חישוב מהירות כתיבת עמודים ליום
            this.pageSpeedPerOneWeek() //חישוב כמות עמודים לשבוע
            this.calSumPages() // חישוב כמות העמודים בפרויקט 
            this.calWeekWork() // חישוב שבועות העבודה
            this.calDayWork() // חישוב ימי העבודה
            this.tzom() //פונקציה לבדיקה עבודה בצומות
            this.calEndDate() //חישוב תאריך הגשה לפני פילטור חגים
            this.dayCalc() //הכנסת טווח ימי העבודה למערך
            let JewishCalData = await this.habcal() //קריאה לקבלת נתוני חגים
            this.holidayToList(JewishCalData) //דחיפת נתוני החגים למערך
            this.holidayList() //הכנסת רשימת החגים למערך
            this.dayWork() //דחיפת ימי העבודה בשבוע למערך
            this.findHoliday() //מציאת חגים בטווח התאריכים
            await this.updateWorkDay()

        },
        pageSpeedPerOneDay() {
            this.calculatData.pageSpeedPerOneDay = (this.userData.info.speedSelct * this.userData.info.workHoursSelct)
        },
        pageSpeedPerOneWeek() {
            const workingDay = (this.userData.workDays.length)
            this.calculatData.pageSpeedPerOneWeek = (this.calculatData.pageSpeedPerOneDay * workingDay)
        },
        calSumPages() {
            this.calculatData.SumPages = (this.userData.info.pagesSelct * this.userData.info.AmountSelct)
        },
        calWeekWork() {
            this.calculatData.WeekWork = (this.calculatData.SumPages / this.calculatData.pageSpeedPerOneWeek)
        },
        calDayWork() {
            this.calculatData.dayWork = (this.calculatData.WeekWork * 7)
        },
        calEndDate() {
            let minWork = (this.calculatData.dayWork * 24 * 60)
            const date = new Date();
            date.setMinutes(date.getMinutes() + minWork);
            this.calculatData.EndDateTemp = date
        },

        /// התחלת פילטור ימי חג
        tzom() {
            if (this.saveData[0].info.workInTzom == false) {
                this.calculatData.tzom = "mf=on&"
            }
        },
        dayCalc() {
            const today = new Date();
            const dateUser = new Date(this.calculatData.EndDateTemp);
            //הכנסת טווח התאריכים למערך
            let ustart = today.getTime();
            let uend = dateUser.getTime();
            while (ustart <= uend) {
                let thisDay = new Date(ustart);
                ustart += 86400000
                let DataStr = this.fixFormat(thisDay)
                this.calculatData.RangeOfDates[DataStr] = { workDay: false, holiday: false, holidayName: "" }
            }
        },

        async habcal() {
            let newDate = new Date();
            let newDataStr = this.fixFormat(newDate)
            let userDataStr = this.fixFormat(this.calculatData.EndDateTemp)
            let tzom = this.calculatData.tzom
            let response = await fetch(
                `https://www.hebcal.com/hebcal?cfg=json&v=1&${tzom}maj=on&start=${newDataStr}&end=${userDataStr}&lg=he`
            )
            let dayData = await response.json()
            this.calculatData.JewishCalData = dayData;
            return dayData;
        },

        holidayToList(JewishCalData) {
            let RangeOfDates = this.calculatData.RangeOfDates;
            let array = JewishCalData.items;
            for (let i = 0; i < array.length - 1; i++) {
                RangeOfDates[array[i].date].holiday = true;
                RangeOfDates[array[i].date].holidayName = array[i].hebrew;
            }
        },
        holidayList() {
            let array = this.calculatData.RangeOfDates
            for (let i = 0; i < array.length; i++) {
                if (array[i].holiday == true) {
                    this.calculatData.holidayListLi += (array[i].holidayName)
                }

            }
        },
        dayWork() {
            let today = new Date();
            let dateUser = new Date(this.calculatData.EndDateTemp);
            let array = this.calculatData.RangeOfDates;
            while (today <= dateUser) {
                let todayStr = this.fixFormat(today)

                //תנאי לבדיקה האם המשתמש בחר את היום כיום עבודה
                if (
                    this.userData.workDays.includes(today.toLocaleDateString("en-US", { weekday: "long" }).toLowerCase())
                ) {
                    array[todayStr].workDay = true;
                }
                today.setDate(today.getDate() + 1);
            }
        },

        findHoliday(IdArry = 0) {
            let RangeOfDates = this.calculatData.RangeOfDates
            let ChengeToArry = Object.keys(RangeOfDates)
            this.calculatData.holidayIn = 0 //איפוס מונה החגים
            for (let i = IdArry; i < ChengeToArry.length; i++) {
                if (RangeOfDates[ChengeToArry[i]].holiday == true && RangeOfDates[ChengeToArry[i]].workDay == true) {
                    this.calculatData.holidayIn++
                }

            }
        },

        async updateWorkDay() {
            if (this.calculatData.holidayIn > 0) {
                this.calculatData.dayWork = (this.calculatData.dayWork + this.calculatData.holidayIn)
                this.calEndDate() //קריאה חוזרת לחישוב תאריך הגשה
                this.dayCalc() // קריאה לעדכון מערך טווח הימים
                let JewishCalData = await this.habcal() //קריאה לקבלת נתוני חגים
                this.holidayToList(JewishCalData) //דחיפת נתוני החגים למערך
                this.dayWork() //קריאה חוזרת לחישוב ימי עבודה בשבוע
                let RangeOfDates = this.calculatData.RangeOfDates
                let ChengeToArry = Object.keys(RangeOfDates)
                let IdArry = (ChengeToArry.length) //עדכון מספר האינדקס במערך למניעת ספירה חוזרת של חגים
                this.findHoliday(IdArry) //קריאה חוזרת לבדיקה האם יש חגים
                let holidayIn = this.calculatData.holidayIn
                if (holidayIn > 0) {
                    this.updateWorkDay()
                }
            }
            this.filterWorkDay() //הפעלת פונקציה לחישוב סופי של ימי עבודה
            this.profitPerDay() //חישוב רווח משוער ליום עבודה
            await this.DeadLinStr() //המרת תאריך הגשה לפורמט מתאים להצגה

        },

        //פילטור ימי עבודה שנתרו
        filterWorkDay() {
            let RangeOfDates = this.calculatData.RangeOfDates
            let ChengeToArry = Object.keys(RangeOfDates)
            for (let i = 0; i < ChengeToArry.length; i++) {
                if (RangeOfDates[ChengeToArry[i]].workDay == true && RangeOfDates[ChengeToArry[i]].holiday == false) {
                    this.calculatData.totalWorkDay++
                }
                else if (RangeOfDates[ChengeToArry[i]].workDay == true && RangeOfDates[ChengeToArry[i]].holiday == true) {
                    this.calculatData.holidayList.push(RangeOfDates[ChengeToArry[i]].holidayName)
                }
            }

        },

        async DeadLinStr() {
            let DeadLinStr = this.fixFormat(this.calculatData.EndDateTemp)
            let dateStr = new Date(DeadLinStr)
            let response = await fetch(
                `https://www.hebcal.com/converter?cfg=json&date=${DeadLinStr}&g2h=1&strict=1`
            )
            let dayData = await response.json()
            this.calculatData.DeadLine = dateStr
            this.calculatData.DeadLinStr = `${dayData.hebrew}  ${dateStr.toLocaleDateString("en-GB")}`
        },

        //חישוב רווח משוער ליום עבודה
        profitPerDay() {
            let profit = (this.userData.info.profitSelct / this.calculatData.totalWorkDay)
            this.calculatData.profitPerDay = profit;
            this.loader = !this.loader;
            this.showScreen3 = !this.showScreen3;
        },
        //פונקצייה להמרת התאריך לפורמט מתאים לAPI
        fixFormat(date) {
            let dateStr = date.toLocaleDateString("en-GB");
            let DataStr = `${dateStr[6]}${dateStr[7]}${dateStr[8]}${dateStr[9]}-${dateStr[3]}${dateStr[4]}-${dateStr[0]}${dateStr[1]}`;
            return DataStr
        },

        //פונקציה להמרת התאריך לפורמט מתאים לשמירה במסד נתונים
        formatDate(inputDate) {
            let datePart = inputDate.match(/\d+/g),
                year = datePart[0].substring(2), // get only two digits
                month = datePart[1], day = datePart[2];

            return day + '-' + month + '-' + year;
        },
        async sendData() {
            if (localStorage.getItem('id') == null) {
                Alert.info('לא ניתן לשמור את הנתונים', 'אנא התחבר למערכת ונסה שוב')
                return
            }
            else {
                const credentials = {
                    userId: localStorage.getItem('id'),
                    bookType: this.userData.book,
                    booksAmount: this.userData.info.AmountSelct,
                    pagesPerBook: this.userData.info.pagesSelct,
                    profitPerPage: this.userData.info.profitSelct,
                    hoursPerDay: this.userData.info.workHoursSelct,
                    writingRate: this.userData.info.speedSelct,
                    // workInTzom: this.userData.info.workInTzom,
                    // workdaysPerWeek: this.userData.workDays, // ימי עבודה בשבוע לשנות לIN
                    workdaysPerWeek: this.userData.workDays.join(','), //ממיר את המערך למחרוזת
                    // estimatedTime: this.formatDate(this.calculatData.DeadLinStr), //תאריך הגשה אחרי המרה לפורמט מתאים 
                    estimatedTime: this.calculatData.DeadLine,
                    averageProfitPeHour: this.calculatData.profitPerDay,
                }

                try {
                    console.log(this.calculatData.DeadLine);
                    const response = await apiService.postData("calculations/", credentials)
                    const data = response.data
                    console.log(data)
                    Alert.success('הנתונים נשמרו בהצלחה', 'ניתן לראות את הנתונים בפרופיל שלך')

                } catch (error) {
                    console.error('Error:', error)
                    Alert.error('אירעה שגיאה בשמירת הנתונים', 'נסה שוב מאוחר יותר')
                }

            }
        }
    }
}
</script>
<style>
@media screen and (max-width: 1110px) {
    .list-days {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: center;
    }
}
</style>
