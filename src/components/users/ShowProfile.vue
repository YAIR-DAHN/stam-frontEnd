<template>
      <div class="showProfileTitle">
        <h1>הפרופיל שלי</h1>
        <hr>
    <div>
        <p>שם משתמש: {{ firstName }} {{ lastName }}</p>
        <p>מספר טלפון: {{ phoneNumber }}</p>
        <p>אימייל: {{ email }}</p>
        <button @click="changePassword = !changePassword">שינוי סיסמה</button>
        <button @click="logOut"> התנתקות</button>

        <div v-if="changePassword">
            <div >
                <input  type="password" v-model="newPassword" placeholder="סיסמה חדשה" />
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
  </template>

<script>

import apiService from '../services/api-service.js'; // ייבוא של שירות ה-API
import Alert from '../services/sweetAlert-service.js'; // ייבוא של שירות ה-Alert
export default {
    data() {
        return {
            firstName: '',
            lastName: '',
            phoneNumber: '',
            email: '',
            changePassword: false,
            newPassword: '',
            confirmPassword: '',
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
            })
            .catch(error => {
                console.error('Error:', error);
                Alert.info('שגיאה בטעינת הפרטים האישיים שלך', 'אם הבעיה נמשכת נסה להיכנס מחדש לחשבון שלך');
            });
    },
    methods: {
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
</style>
