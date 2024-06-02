<template>
   <div class="Title">
        <h1>הרשמה</h1>
        <hr>
  </div>
  <div class="register-form">
    <form @submit.prevent="submitForm">
      <div class="form-group">
        <label for="firstName">שם משתמש:</label>
        <input type="text" id="firstName" v-model="firstName" required>
      </div>
      <div class="form-group">
        <label for="phone">טלפון:</label>
        <input type="tel" id="phone" v-model="phone" pattern="[0-9]{9-10}" required>
        <!-- <small>פורמט: 050-1234567</small> -->
      </div>
      <div class="form-group">
        <label for="email">מייל:</label>
        <input type="email" id="email" v-model="email">
      </div>
      <div class="form-group">
        <label for="password">סיסמה:</label>
        <input type="password" id="password" v-model="password" required>
      </div>
      <div class="form-group">
        <label for="confirmPassword">אימות סיסמה:</label>
        <input type="password" id="confirmPassword" v-model="confirmPassword" @input="checkPasswordMatch()" required>
        <p v-if="passwordMismatch">הסיסמאות לא תואמות</p>
      </div>
      <button type="submit">הרשם</button>
    </form>

    <router-link to="/login">כניסה למשתמשים רשומים</router-link>

  </div>
</template>

<script scoped>
import { ref } from 'vue'
// import { useRouter } from 'vue-router'
import apiService from '../services/api-service.js'; // ייבוא של שירות ה-API
import Alert from '../services/sweetAlert-service.js'; // ייבוא של שירות ה-Alert
export default {
  name: 'RegisterForm',
  setup() {

    return {
      firstName,
      lastName,
      phone,
      email,
      password,
      confirmPassword,
      submitForm,
      confirmPasswordIn,
      passwordMismatch,
      checkPasswordMatch
    }
  }
}
const firstName = ref('')
const lastName = ref('')
const phone = ref('')
const email = ref('')
const password = ref('')
const confirmPassword = ref('')


let submitForm = async () => {
  const credentials = {
    userFirstName: firstName.value,
    userLastName: lastName.value,
    userPhone: phone.value,
    userEmail: email.value,
    userPassword: password.value,
    userConfirmPassword: confirmPassword.value,
    userRole: "user"
  }

  // נמחק לטובת שימוש בשירות ה-API
  // const response = await fetch(process.env.VUE_APP_URL_SERVER + "/users/", {
  //   method: 'POST',
  //   headers: {
  //     'Content-Type': 'application/json',
  //   },
  //   body: JSON.stringify(credentials)
  // })

  const response = await apiService.postData("users/", credentials)
  const data = response.data
  console.log(data)
  localStorage.setItem('token', data.token)
  localStorage.setItem('id', data.id)
  localStorage.setItem('first-name', data.userFirstName)
  localStorage.setItem('last-name', data.userLastName)
  localStorage.setItem('phone', data.userPhone)
  localStorage.setItem('email', data.userEmail)
  Alert.success('נרשמת בהצלחה!', `${data.userFirstName} ברוך הבא לאתר!`)
  // this.$router.push('/')
  // router.push('/')
}

//השוואת סיסמאות

let confirmPasswordIn = ''
let passwordMismatch = false
let checkPasswordMatch = () => {

  // במקור היה שורה ראשונה
  // passwordMismatch = password !== confirmPasswordIn;
  passwordMismatch = password.value !== confirmPasswordIn;
}

</script>

<style scoped>
.register-form {
  max-width: 400px;
  margin: 0 auto;
  padding: 50px;
  /* border: 2px solid #ccc;
  border-radius: 4px;
  background-color: rgba(142, 136, 136, 0.2); */
}

.form-group {
  margin-bottom: 20px;
}

label {
  display: block;
  font-weight: bold;
}

input,
select {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

button {
  padding: 10px 20px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3;
}
</style>
