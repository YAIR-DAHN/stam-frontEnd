<template>
    <div class="recovery-pass">
        <h1 class="recovery-pass__title">שחזור סיסמה</h1>
        <div v-if="!verificationCodeSent" class="recovery-pass__form-group">
            <label for="identifier" class="recovery-pass__label">כתובת דואר אלקטרוני או מספר טלפון:</label>
            <input type="text" id="identifier" v-model="identifier" class="recovery-pass__input" />
        </div>
        <div v-if="!verificationCodeSent" class="recovery-pass__form-group">
            <label for="verificationMethod" class="recovery-pass__label">איך לשלוח לך את הקוד?</label>
            <select id="verificationMethod" v-model="verificationMethod" class="recovery-pass__select">
                <option value="sms">הודעת SMS</option>
                <option value="whatsapp">הודעת WhatsApp</option>
                <option value="email">דואר אלקטרוני</option>
                <option value="voice">שיחה קולית</option>
            </select>
        </div>
        <button v-if="!verificationCodeSent" @click="sendVerificationCode" class="recovery-pass__button">שלח קוד אימות</button>
        <div v-if="verificationCodeSent" class="recovery-pass__form-group">
            <label for="verificationCode" class="recovery-pass__label">קוד אימות:</label>
            <input type="text" id="verificationCode" v-model="verificationCode" class="recovery-pass__input" />
            <button @click="verifyCode" class="recovery-pass__button">אמת</button>
        </div>
    </div>
</template>

<script>
import apiService from '../services/api-service.js'; // ייבוא של שירות ה-API
import Alert from '../services/sweetAlert-service.js'; // ייבוא של שירות ה-Alert
export default {
    data() {
        return {
            identifier: '',
            verificationMethod: '',
            verificationCodeSent: false,
            verificationCode: '',
            sender: ''
        };
    },
    methods: {
        async sendVerificationCode() {
            let credentials = {
                userEmail: this.identifier,
                userPhone: this.identifier,
                sender: this.verificationMethod
            }
            try {
                await apiService.postData("users/recoveryPass/", credentials)
                Alert.success('במידה והמשתמש קיים נשלח קוד אימות', 'בדוק את ההודעות שלך')
            } catch (error) {
                console.error('Error:', error)
                Alert.error('שגיאה בהתחברות', 'נסה שוב מאוחר יותר')
            }
            this.verificationCodeSent = true;
        },
        verifyCode() {
            // קוד לאימות הקוד שהוזן על ידי המשתמש
        }
    }
};
</script>

<style scoped>
.recovery-pass {
    max-width: 400px;
    margin: 0 auto;
    padding: 20px;
    border-radius: 5px;
}

.recovery-pass__title {
    text-align: center;
    margin-bottom: 20px;
}

.recovery-pass__form-group {
    margin-bottom: 20px;
}

.recovery-pass__label {
    display: block;
    font-weight: bold;
    margin-bottom: 5px;
}

.recovery-pass__input {
    width: 100%;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
}

.recovery-pass__select {
    width: 100%;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
}

.recovery-pass__button {
    display: block;
    width: 100%;
    padding: 10px;
    background-color: #007bff;
    color: #fff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
}

.recovery-pass__button:hover {
    background-color: #0056b3;
}
</style>
