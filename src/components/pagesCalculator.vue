<template>
  <div id="Screen2" v-show="showScreen2">
    <form id="fromScreen2">
      <fieldset>
        <h2>מחשבון הספקי כתיבה</h2>
        <legend>בחר סוג פרויקט</legend>

        <!-- אזור בחירת סוג ספר -->
        <div id="selctBook">
          <input type="radio" id="SeferTorah" name="item1" value="ספר תורה" v-model="userData.book"
            @click="setAmunt($event.target.value)" />
          <label for="SeferTorah">ספר תורה</label>
          <input type="radio" id="Tfilin" name="item1" value="תפילין" v-model="userData.book"
            @click="setAmunt($event.target.value)" required />
          <label for="Tfilin">תפילין</label>
          <input type="radio" id="Mezuzot" name="item1" value="מזוזות" v-model="userData.book"
            @click="setAmunt($event.target.value)" required />
          <label for="Mezuzot">מזוזות</label>
          <input type="radio" id="MegilatEster" name="item1" value="מגילת אסתר" v-model="userData.book"
            @click="setAmunt($event.target.value)" required />
          <label for="MegilatEster">מגילת אסתר</label>
          <input type="radio" id="SeferHaftarot" name="item1" value="ספר הפטרות" v-model="userData.book"
            @click="setAmunt($event.target.value)" required />
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
            <input type="number" id="Amount" v-model="userData.info.AmountSelct" min="1" />
          </div>
          <div class="col">
            <label for="pages"> מספר עמודים (לספר 1) </label>
            <input type="number" id="pages" v-model="userData.info.pagesSelct" />
          </div>
        </div>
        <div class="row g-3">
          <div class="col">
            <label for="profit"> רווח משוער </label>
            <input type="number" id="profit" v-model="userData.info.profitSelct" />
          </div>
          <div class="col">
            <label for="workHours">שעות עבודה ליום </label>
            <input type="number" id="workHours" min="0" max="24" v-model="userData.info.workHoursSelct" />
          </div>
        </div>
        <div class="row justify-content-md-center align-items-center">
          <div class="col-md-3">
            <label for="date"> תאריך הגשה </label>
            <input type="date" id="date" required v-model="userData.info.dateSelct" />
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
                <input type="checkbox" id="workDay2" name="workDays" value="monday" v-model="userData.workDays" />
              </li>
              <li class="list-group-item">
                <label for="workDay3">יום שלישי</label>
                <input type="checkbox" id="workDay3" name="workDays" value="tuesday" v-model="userData.workDays" />
              </li>
              <li class="list-group-item">
                <label for="workDay4">יום רביעי</label>
                <input type="checkbox" id="workDay4" name="workDays" value="wednesday" v-model="userData.workDays" />
              </li>
              <li class="list-group-item">
                <label for="workDay5">יום חמישי</label>
                <input type="checkbox" id="workDay5" name="workDays" value="thursday" v-model="userData.workDays" />
              </li>
              <li class="list-group-item">
                <label for="workDay6">יום שישי</label>
                <input type="checkbox" id="workDay6" name="workDays" value="friday" v-model="userData.workDays" />
              </li>
              <li class="list-group-item">
                <label for="workDay7">מוצאי שבת</label>
                <input type="checkbox" id="workDay7" name="workDays" value="saturday" v-model="userData.workDays" />
              </li>
            </ul>
          </div>
        </div>
      </fieldset>
    </form>
    <button @click="$emit('clickBack')">חזור לשלב קודם</button>
    <button @click="submitScreen2">סיים וחשב</button>
  </div>

  <!--  דף מחשבון ראשי -->
  <div v-show="showStartCalaulator">
    <StartCalaulator />
  </div>

  <!-- תצוגת אייקון טעינה -->
  <div v-show="loader">
    <DotLoader />
  </div>

  <!-- מסך שלישי למחשבון -->
  <div v-show="showScreen3">
    <h1>פרויקט {{ userData.book }}</h1>
    <h3>נתרו לך <b>{{ calculatData.totalWorkDay }}</b> ימי עבודה</h3>
    <h3>אתה צריך לכתוב <b>{{ calculatData.pagePerDay.toFixed(1) }}</b> עמודים ליום</h3>
    <h3>הרווח המשוער הוא <b>{{ calculatData.profitPerDay.toFixed(1) }}</b> שקלים ליום</h3>
    <h3>אתה צריך לכתוב <b>{{ calculatData.writePagePerHour.toFixed(1) }}</b> עמודים לשעה</h3>
    <details>
      <ul class="list-group">
        <li class="list-group-item" v-for="(item, i) in calculatData.holidayList" :key="i">
          {{ item }}
        </li>
      </ul>
      <summary> <b> להצגת רשימת החגים שחלים בטווח התאריך </b> </summary>
    </details>

    <button @click="sendData">שמירה</button>
    <button @click="backToCalc">חזרה למחשבון</button>
    <button @click="startCalculator">חישוב חדש</button>
  </div>
</template>

<script>
import DotLoader from "./DotLoader.vue";
import StartCalaulator from "./startCalaulator.vue";
import Alert from "./services/sweetAlert-service.js";
import apiService from "./services/api-service.js";

export default {
  components: {
    DotLoader: DotLoader,
    StartCalaulator: StartCalaulator,
  },
  defineProps: {
    funcBack: Function
  },
  data() {
    return {
      //הגדרת תצוגת מסכים
      showScreen2: true,
      showScreen3: false,
      showStartCalaulator: false,
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
        newTimeMs: "", //תאריך נוכחי
        newDate: "",  //תאריך נוכחי
        userDate: "", //תאריך הגשה
        JewishCalData: [], //מכיל נתונים מלוח העברי
        totalWorkDay: 0,
        pagePerDay: 0,
        profitPerDay: 0,
        writePagePerHour: 0,
        holidayList: [],
        tzom: "",
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
    startCalculator() {
      location.reload()
    },
    //מעבר לביצוע פעולות החישוב
    submitScreen2() {
      this.showScreen2 = !this.showScreen2;
      this.loader = !this.loader;
      this.saveData.push({ ...this.userData });
      this.powerFunc()
    },
    //חזרה למחשבון
    backToCalc() {
      this.showScreen2 = !this.showScreen2;
      this.showScreen3 = !this.showScreen3;
    },
    //קריאה לפונקציות הנדרשות
    async powerFunc() {
      this.resetData() //אתחול נתוני החישוב
      this.tzom() //פונקציה לבדיקה עבודה בצומות
      this.dayCalc()
      let JewishCalData = await this.habcal()
      this.holidayToList(JewishCalData) //הפעלת פונקציה להכנסת נתוני החגים למערך
      this.dayWork(); //הפעלת פונקציה לחישוב ימי עבודה שנתרו
      this.filterWorkDay() //פילטור ימי עבודה שנתרו
      this.pagsPerDay(); // הפעלת פונקציית חישוב כמות העמודים ליום
      this.profitPerDay(); //הפעלת פונקציית חישוב רווח ליום
      this.writePage()  //הפעלת פונקציית חישוב קצב כתיבה נדרש
    },

    //איפוס נתוני החישוב
    resetData() {
      this.calculatData = {
        RangeOfDates: [], //מערך המחיל טווח ימי העבודה
        newTimeMs: "", //תאריך נוכחי
        newDate: "",  //תאריך נוכחי
        userDate: "", //תאריך הגשה
        JewishCalData: [], //מכיל נתונים מלוח העברי
        totalWorkDay: 0,
        pagePerDay: 0,
        profitPerDay: 0,
        writePagePerHour: 0,
        holidayList: [],
        tzom: "",
      }
    },
    //פונקציה ליצירת מערך שמכיל את כל ימי העבודה בין התאריכים שנבחרו
    dayCalc() {
      const today = new Date();
      const dateUser = new Date(this.saveData[0].info.dateSelct);
      //הכנסת הנתונים לדאטה
      this.calculatData.newDate = today;
      this.calculatData.userDate = dateUser;
      //הכנסת טווח התאריכים למערך
      let ustart = today.getTime();
      let uend = dateUser.getTime();
      // this.calculatData.RangeOfDates = []; //איפוס מערך
      while (ustart <= uend) {
        let thisDay = new Date(ustart);
        ustart += 86400000
        let DataStr = this.fixFormat(thisDay)
        this.calculatData.RangeOfDates[DataStr] = { workDay: false, holiday: false, holidayName: "" }
      }
    },

    //פונקציה לבדיקה זמינות עבודה בצומות
    tzom() {
      if (this.saveData[0].info.workInTzom == false) {
        this.calculatData.tzom = "mf=on&"
      }
    },

    //קריאה לAPI של לוח העברי
    async habcal() {
      let newDataStr = this.fixFormat(this.calculatData.newDate)
      let userDataStr = this.fixFormat(this.calculatData.userDate)
      let tzom = this.calculatData.tzom
      let response = await fetch(
        `https://www.hebcal.com/hebcal?cfg=json&v=1&${tzom}maj=on&start=${newDataStr}&end=${userDataStr}&lg=he`
      )
      let dayData = await response.json()
      this.calculatData.JewishCalData = dayData;
      return dayData;
    },

    //פונקציה להכנסת נתוני החגים למערך
    holidayToList(JewishCalData) {
      let RangeOfDates = this.calculatData.RangeOfDates;
      let array = JewishCalData.items;
      for (let i = 0; i < array.length; i++) {
        RangeOfDates[array[i].date].holiday = true;
        RangeOfDates[array[i].date].holidayName = array[i].hebrew;
      }
    },

    // פונקציה לחישוב ימי העבודה שנבחרו ע"י המשתמש
    dayWork() {
      let today = new Date();
      let dateUser = new Date(this.saveData[0].info.dateSelct);
      let array = this.calculatData.RangeOfDates;
      while (today <= dateUser) {
        let todayStr = this.fixFormat(today)

        //תנאי לבדיקה האם המשתמש בחר את היום כיום עבודה
        if (
          this.userData.workDays.includes(today.toLocaleDateString("en-US", { weekday: "long" }).toLowerCase())
          //  && dayRes.items.length == 0
        ) {
          array[todayStr].workDay = true;
        }
        today.setDate(today.getDate() + 1);
      }
    },

    //פילטור ימי עבודה שנתרו
    filterWorkDay() {
      let RangeOfDates = this.calculatData.RangeOfDates
      let ChengeToArry = Object.keys(RangeOfDates)
      // this.calculatData.totalWorkDay = 0; //איפוס כמות ימי העבודה
      for (let i = 0; i < ChengeToArry.length; i++) {
        if (RangeOfDates[ChengeToArry[i]].workDay == true && RangeOfDates[ChengeToArry[i]].holiday == false) {
          this.calculatData.totalWorkDay++
        }
        else if (RangeOfDates[ChengeToArry[i]].workDay == true && RangeOfDates[ChengeToArry[i]].holiday == true) {
          this.calculatData.holidayList.push(RangeOfDates[ChengeToArry[i]].holidayName)
        }
      }
    },

    //חישוב כמות העמודים ליום עבודה
    pagsPerDay() {
      let pegs =
        (this.userData.info.AmountSelct * this.userData.info.pagesSelct) /
        this.calculatData.totalWorkDay;
      this.calculatData.pagePerDay = pegs;
    },

    //חישוב רווח משוער ליום עבודה
    profitPerDay() {
      let profit = (this.userData.info.profitSelct / this.calculatData.totalWorkDay)
      this.calculatData.profitPerDay = profit;
    },

    //חישוב קצב כתיבה לדף
    writePage() {
      let writePage = (this.calculatData.pagePerDay / this.userData.info.workHoursSelct);
      this.calculatData.writePagePerHour = writePage;
      this.loader = !this.loader; //כיבוי מסך הטעינה
      this.showScreen3 = !this.showScreen3; //הפעלת מסך התוצאה
    },

    //פונקצייה להמרת התאריך לפורמט מתאים לAPI
    fixFormat(date) {
      let dateStr = date.toLocaleDateString("en-GB");
      let DataStr = `${dateStr[6]}${dateStr[7]}${dateStr[8]}${dateStr[9]}-${dateStr[3]}${dateStr[4]}-${dateStr[0]}${dateStr[1]}`;
      return DataStr
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
          workdaysPerWeek: this.userData.workDays.join(','), //ממיר את המערך למחרוזת
          estimatedTime: this.calculatData.userDate,
          averageProfitPeHour: this.calculatData.profitPerDay,
        }

        try {
          console.log(this.calculatData.userDate);
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
  },

};
</script>

<style>
body {
  font-family: Arial, sans-serif;
  background-color: #f5f5f5;
  color: #333;
}

/* עיצוב למסך הראשון */
#Screen1 {
  text-align: center;
  padding: 50px;
}

#Screen1 h3 {
  font-size: 24px;
  line-height: 1.5;
}

#Screen1 button {
  background-color: #007bff;
  color: #fff;
  border: none;
  padding: 10px 20px;
  font-size: 18px;
  cursor: pointer;
}

#Screen1 button:hover {
  background-color: #0056b3;
}

/* עיצוב למסך השני */
#Screen2 {
  margin-top: 50px;
}

#Screen2 form {
  background-color: #fff;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

#Screen2 fieldset {
  border: none;
  margin: 0;
  padding: 0;
}

#Screen2 legend {
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 10px;
}

#Screen2 label {
  margin-bottom: 10px;
}

#Screen2 input[type="radio"] {
  margin-right: 5px;
}

#Screen2 input[type="number"],
#Screen2 input[type="date"] {
  width: 100%;
  padding: 5px;
  border-radius: 3px;
  border: 1px solid #ccc;
}

button {
  background-color: #007bff;
  color: #fff;
  border: none;
  padding: 10px 20px;
  font-size: 18px;
  cursor: pointer;
  margin-top: 10px;
  margin: 10px;
}

button:first-child {
  margin-right: 10px;
}

button:hover {
  background-color: #0056b3;
}

/* עיצוב למסך השלישי */
#Screen3 {
  margin-top: 50px;
}
</style>