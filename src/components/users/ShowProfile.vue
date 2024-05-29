<template>
    <div class="showProfileTitle">
        <h1>הפרופיל שלי</h1>
        <!-- <progressBar></progressBar> -->
        <hr>
        <div>
            <div v-if="!editOn"> שם משתמש: {{ firstName }} {{ lastName }}
                <!-- <img src="../../assets/icons/edit_icon.svg" alt="edit" width="30" height="30" @click="editInfo"> -->
            </div>
            <div v-if="editOn" class="editInput">
                שם :
                <input type="text" v-model="firstName" placeholder="הכנס שם משתמש" />
            </div>
        <div>
            <div v-if="!editOn"> מספר טלפון: {{ phoneNumber }}
            </div>
            <div v-if="editOn" class="editInput">
                טלפון:
                <input type="tel" v-model="phoneNumber" placeholder="הכנס מספר טלפון" />
            </div>
            <div v-if="!editOn"> אמייל: {{ email }}
            </div>
            <div v-if="editOn" class="editInput">
                אמייל:
                <input type="mail" v-model="email" placeholder="הכנס כתובת מייל" />
            </div>
            <div>
                תאריך הרשמה: {{ createdAt }}
            </div>
            <hr>

            <button v-if="!changePassword && !editOn" @click="editInfo">עריכת פרטים </button>
            <button v-if="editOn" @click="editInfo">ביטול עריכה</button>
            <button v-if="editOn" @click="saveChanges">שמור שינויים</button>
            <button v-if="!changePassword && !editOn" @click="changePassword = !changePassword">שינוי סיסמה</button>
            <button v-if="!changePassword && !editOn" @click="logOut"> התנתקות</button>

            <div v-if="changePassword">
                <div>
                    <input type="password" v-model="newPassword" placeholder="סיסמה חדשה" />

                    <br>
                    <br>
                    <input type="password" v-model="confirmPassword" placeholder="אימות סיסמה" />
                    <br>
                    <button @click="changePassword = !changePassword">ביטול</button>
                    <button @click="changePasswordFunc">שנה סיסמה</button>
                    <br>
                </div>
            </div>

            </div>

        </div>
    </div>
</template>

<script>

import apiService from '../services/api-service.js'; // ייבוא של שירות ה-API
import Alert from '../services/sweetAlert-service.js'; // ייבוא של שירות ה-Alert
// import Vue from 'vue'
// import progressBar from '../ui/progressBar.vue';
export default {
//        components: {
//             progressBar: progressBar,
//   },
    data() {
  
        return {
          
            firstName: '',
            lastName: '',
            phoneNumber: '',
            email: '',
            createdAt: '',
            changePassword: false,
            newPassword: '',
            confirmPassword: '',
            editOn: false,
        };
    },
    mounted() {
        const userId = localStorage.getItem('id');
        apiService.getData('users/', userId)
            .then(response => {
                this.firstName = response.data.userFirstName;
                this.lastName = response.data.userLastName;
                this.phoneNumber = response.data.userPhone;
                this.email = response.data.userEmail;
                this.createdAt = response.data.createdAt;
            })
            .catch(error => {
                console.error('Error:', error);
                Alert.info('שגיאה בטעינת הפרטים האישיים שלך', 'אם הבעיה נמשכת נסה להיכנס מחדש לחשבון שלך');
            });
    },
    methods: {
        // עריכת פרטים
        editInfo() {
            this.editOn = !this.editOn;
        },
        async saveChanges() {
            const credentials = {
                userFirstName: this.firstName,
                userPhone: this.phoneNumber,
                userEmail: this.email,
            };
            try {
                const response = await apiService.putData('users/', credentials);
                if (response.status !== 200) {
                    Alert.error('שגיאה בשמירת השינויים', 'נסה שוב מאוחר יותר');
                    return;
                }
                Alert.success('השינויים נשמרו בהצלחה');
                this.editOn = false;
            } catch (error) {
                console.error('Error:', error);
                Alert.error('שגיאה בשמירת השינויים', 'נסה שוב מאוחר יותר');
            }
        },



        // שינוי סיסמה
        async changePasswordFunc() {
            if (this.newPassword !== this.confirmPassword) {
                Alert.info('הסיסמאות לא תואמות');
                return;
            }
            if (this.newPassword.length < 6) {
                Alert.info('הסיסמה חייבת להיות באורך של 6 תווים לפחות');
                return;
            }
            const credentials = {
                userPassword: this.newPassword,
            };
            try {
                const response = await apiService.putData('users/', credentials);
                if (response.status !== 200) {
                    Alert.error('שגיאה בשינוי הסיסמה', 'נסה שוב מאוחר יותר');
                    return;
                }
                Alert.success('הסיסמה שונתה בהצלחה');
                this.changePassword = false;
            } catch (error) {
                console.error('Error:', error);
                Alert.error('שגיאה בשינוי הסיסמה', 'נסה שוב מאוחר יותר');
            }
        },
        

        // יציאה
        logOut() {
            localStorage.clear();
            Alert.info('התנתקת מהמערכת', 'הינך מועבר לדף התחברות');
            setTimeout(() => {
                window.location.href = '/login';
            }, 2000);
        },
    },
};
</script>

<style scoped>
.showProfileTitle {
    position: relative;
    text-align: center;
    margin-bottom: 20px;
    margin-top: 20px;
}

.profile {
    text-align: center;
    margin: 0 auto;
    padding: 50px;
}

.personal-details {
    margin-bottom: 20px;
}

.user-stats {
    margin-top: 20px;
}

.editInput{
    margin-top: 10px;

}
</style>
