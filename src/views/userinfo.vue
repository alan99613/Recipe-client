<template>
  <div>
    <form class="submitForm" @submit.prevent="changeName">
      <h2>Change name</h2>
      <input type="text" v-model="newName" placeholder="Name" required />
      <br />
      <input type="password" v-model="oldPasswordForName" placeholder="Password" required />
      <br />
      <button type="submit">Change</button>
    </form>
    <br />
    <form class="submitForm" @submit.prevent="changePassword">
      <h2>Change password</h2>
      <input type="password" v-model="oldPassword" placeholder="Old password" required />
      <br />
      <input type="password" v-model="newPassword" placeholder="New Password" required />
      <br />
      <input type="password" v-model="rPassword" placeholder="Repeat password" required />
      <br />
      <button type="submit">Change</button>
    </form>
  </div>
</template>

<script>
  import axios from 'axios'
  export default {
    data () {
      return {
        newName: '',
        oldPasswordForName: '',
        oldPassword: '',
        newPassword: '',
        rPassword: ''
      }
    }, methods: {
      changeName() {
        // User does not enter a new name
        if (this.newName == '') {
          alert('Please enter a new name')
        } else {
          let config = {
            headers: {
              Authorization: localStorage.token,
            }
          }
          // Change the user’s display name
          axios.put('https://alan-recipe-api.herokuapp.com/api/v1/user/name', {
            password: this.oldPasswordForName,
            newName: this.newName
          }, config).then(response => {
            alert(response.data.message)
            this.$router.push('/')
          }).catch(function(error) {
            if (error.response.status === 422) {
              alert(error.response.data.message)
            } else if (error.response.status === 401) {
              alert(error.response.data.message)
              this.$router.push('/logout')
            }
          })
        }
      }, changePassword() {
        if (this.newPassword != this.rPassword) {
          alert('The new password does not match the repeated password')
        } else {
          let config = {
            headers: {
              Authorization: localStorage.token,
            }
          }
          // Change the user's password
          axios.put('https://alan-recipe-api.herokuapp.com/api/v1/user/password', {
            password: this.oldPassword,
            newPassword: this.newPassword
          }, config).then(response => {
            alert(response.data.message)
            this.$router.push('/')
          }).catch(function(error) {
            if (error.response.status === 422) {
              alert(error.response.data.message)
            } else if (error.response.status === 401) {
              alert(error.response.data.message)
              this.$router.push('/logout')
            }
          })
        }
      }
    }, created() {
      // If the user is not logged in
      if (!localStorage.token) {
        this.$router.push('/login')
      }
    }
  }
</script>