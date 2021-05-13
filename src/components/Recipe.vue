<template>
  <table class="recipeItem">
    <tr>
      <td style="width:400px">
        <a :href="'/detail/'+recipe._id">
          <h1>{{ recipe.recipeName }}</h1>
          <img width="400" v-if="recipe.image" :src="recipe.image">
        </a>
      </td>
      <td>
        {{ recipe.description }}<br />
        <button v-if="login" @click="handleFavourite(recipe._id)">{{ favourite? 'Delete from favourites':'Add to favourites' }}</button>
      </td>
    </tr>
  </table>
</template>

<script setup>
  import { defineProps } from 'vue'

  defineProps({
    recipe: JSON,
    isFavourite: Boolean
  })
</script>

<script>
  import axios from 'axios'
  export default {
    data() {
      return {
        login: false,
        favourite: false
      }
    }, methods: {
      handleFavourite(recipeID) { // Check if the recipe is in the favourites
        if (this.favourite) {
          this.deleteFavourite(recipeID)
        } else {
          this.addFavourite(recipeID)
        }
      },
      addFavourite(recipeID) { // Add the recipe to favorites
        axios.put('https://alan-recipe-api.herokuapp.com/api/v1/favourite/'+recipeID, {}, {
          headers: {
            Authorization: localStorage.token,
          }
        }).then(response => {
          alert(response.data.message)
          this.favourite = true
        }).catch(function(error) {
          if (error.response.status === 400) {
            alert(error.response.data.message)
          }
        })
      },
      deleteFavourite(recipeID) { // Remove the recipe from favorites
        axios.delete('https://alan-recipe-api.herokuapp.com/api/v1/favourite/'+recipeID, {
          headers: {
            Authorization: localStorage.token,
          }
        }).then(response => {
          alert(response.data.message)
          this.favourite = false
        }).catch(function(error) {
          if (error.response.status === 400) {
            alert(error.response.data.message)
          }
        })
      }
    }, created() {
      // Check if the user is logged in
      if (localStorage.token) {
        this.login = true
      }

      // Check if the recipe is in the favourites
      if (this.isFavourite) {
        this.favourite = true
      } else {
        this.favourite = this.recipe.isFavourite
      }
    }
  }
</script>