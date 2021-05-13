<template>
  <div class="navbar">
    <div class="barItem"><router-link to="/">Home</router-link></div>
    <div class="barItem barRightItem"><a href="" @click.prevent="loginout">{{ login? 'Logout':'Login' }}</a></div>
    <div class="barItem barRightItem"><router-link v-if="login" to="/userinfo">User Info</router-link></div>
    <div class="barItem barRightItem"><router-link v-if="login" to="/favourite">Favourite</router-link></div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        login: false
      }
    }, methods: {
      loginout() {
        if (this.login) {
          this.$router.push('/logout')
        } else {
          this.$router.push('/login')
        }
      }
    }, created() {
      //Check if the user is logged in
      if (localStorage.token) {
        this.login = true
      }
    }
  }
</script>