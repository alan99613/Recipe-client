<template>
  <h2 style="text-align: center;">Favourites</h2>
  <div v-for="recipe in recipes">
    <Recipe :recipe="recipe" :isFavourite="true" />
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
      let config = {
        headers: {
          Authorization: localStorage.token,
        }
      }
      // Get user's favorite
      axios.get('https://alan-recipe-api.herokuapp.com/api/v1/favourite/', config)
      .then(response => {
        this.recipes = response.data
      })
      .catch(function(error) {
        console.log(error)
      })
    }
  }
</script>