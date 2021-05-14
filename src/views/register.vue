<template>
  <form class="submitForm" @submit.prevent="register">
    <h2>Register</h2>
    <input type="text" v-model="name" placeholder="Name" required />
    <br />
    <input type="text" v-model="username" placeholder="Username" required />
    <br />
    <input type="password" v-model="password" placeholder="Password" required />
    <br />
    <input type="password" v-model="rPassword" placeholder="Repeat password" required />
    <br />
    <button type="submit">Register</button>
  </form>
</template>

<script>
  import axios from 'axios'
  export default {
    data () {
      return {
        name: '',
        username: '',
        password: '',
        rPassword: ''
      }
    }, methods: {
      register() {
        if (this.password != this.rPassword) {
          alert('The password does not match the repeated password')
        } else {
          // Register account
          axios.post('https://alan-recipe-api.herokuapp.com/api/v1/register', {
            name: this.name,
            username: this.username,
            password: this.password
          }).then(response => {
            alert(response.data.message)
            // Redirect to login page
            this.$router.push('/login')
          }).catch(function(error) {
            if (error.response.status === 422) {
              alert(error.response.data.message)
            }
          })
        }
      }
    }
  }
</script>