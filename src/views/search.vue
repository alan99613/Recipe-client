<template>
  <h2 style="text-align: center;">Search: {{this.$route.params.name}}</h2>
  <div v-for="recipe in recipes">
    <Recipe :recipe="recipe" :isFavourite="false" />
  </div>
</template>

<script setup>
  import Recipe from '../components/Recipe.vue'
</script>

<script>
  import axios from 'axios'
  export default {
    data() {
      return {
        recipes: ''
      }
    }, created() {
      let config;
      // Add header if user is logged in
      if (localStorage.token) {
        config = {
          headers: {
            Authorization: localStorage.token,
          }
        }
      }

      // Search recipes from API
      axios.get('https://alan-recipe-api.herokuapp.com/api/v1/recipe/name/'+this.$route.params.name, config)
      .then(response => {
        this.recipes = response.data
      })
      .catch(function(error) {
        if (error.response.status === 401) {
          alert(error.response.data.message)
          this.$router.push('/logout')
        }
      })
    }
  }
</script>