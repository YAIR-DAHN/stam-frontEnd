<template>
  <div class="login-form">
    <h2>כניסה לאתר</h2>
    <form @submit="submitForm">
      <div class="form-group">
        <label for="username">הזן מספר טלפון / כתובת מייל</label>
        <input type="text" id="username" v-model="username" required>
      </div>
      <div class="form-group">
        <label for="password">סיסמה</label>
        <input type="password" id="password" v-model="password" required>
      </div>
      <button type="submit">כניסה</button>

    </form>
    <router-link to="/register">הרשמה</router-link> |
    <router-link to="/recoveryPass">שחזור סיסמה</router-link>
  </div>
</template>

<script>
import apiService from '../services/api-service.js'; // ייבוא של שירות ה-API
import Alert from '../services/sweetAlert-service.js'; // ייבוא של שירות ה-Alert
export default {
  name: 'LoginForm',
  data() {
    return {
      username: '',
      password: '',
      phone: '',
    };
  },
  methods: {
    async submitForm() {
      const credentials = {
        userEmail: this.username,
        userPhone: this.username,
        userPassword: this.password,
      }

      try {
        const response = await apiService.postData("users/login/", credentials)
        const data = response.data
        console.log(data)
        if (data.userToken) {
          localStorage.setItem('token', data.userToken)
          localStorage.setItem('id', data.id)
          localStorage.setItem('first-name', data.userFirstName)
          localStorage.setItem('last-name', data.userLastName)
          localStorage.setItem('phone', data.userPhone)
          localStorage.setItem('email', data.userEmail)
          localStorage.setItem('role', data.userRole)
          Alert.success('התחברת בהצלחה', `${data.userFirstName} אנחנו שמחים לראות אותך שוב!`)
          setTimeout(() => {
            window.location.reload('/')
          }, 2000)
        }
      } catch (error) {
        console.error('Error:', error)

        if (error.response.status === 401) {
          Alert.error('שם משתמש או סיסמה שגויים')
        }
        else {
          Alert.error('שגיאה בהתחברות', 'נסה שוב מאוחר יותר')
        }
      }
    },
  }
}
</script>

<style scoped>
.login-form {
  max-width: 400px;
  margin: 0 auto;
  padding: 50px;
  /* border: 2px solid #ccc;
  border-radius: 4px; */
  /* background-color: rgba(142, 136, 136, 0.2); */

}

.form-group {
  margin-bottom: 20px;
}

label {
  display: block;
  font-weight: bold;
}

input[type="text"],
input[type="password"] {
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
