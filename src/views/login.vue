<template>
  <form class="submitForm" @submit.prevent="login">
    <h2>Login</h2>
    <input type="text" v-model="username" placeholder="Username" required>
    <br />
    <input type="password" v-model="password" placeholder="Password" required>
    <br>
    <button type="submit">Login</button>
  </form>
</template>

<script>
  import axios from 'axios'
  export default {
    data() {
      return {
        username: '',
        password: ''
      }
    }, methods: {
      login() {
        // login account
        axios.post('https://alan-recipe-api.herokuapp.com/api/v1/login', {
          username: this.username,
          password: this.password
        }).then(response => {
          // Save user ID and token to local storage
          localStorage.setItem('userID', response.data.id)
          localStorage.setItem('token', 'Bearer '+response.data.token)
          this.$router.go('/')
        }).catch(function(error) {
          if (error.response.status === 422) {
            alert(error.response.data.message)
          }
        })
      }
    }, created() {
      if (localStorage.token) {
        this.$router.push('/')
      }
    }
  }
</script>