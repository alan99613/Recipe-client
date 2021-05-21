<template>
  <div v-if="recipe">
    <h1>{{ recipe.recipeName }}</h1>
    <img v-if="recipe.image" :src="recipe.image">
    <p>{{ recipe.description }}</p>
    <p>
      Ingredients:
      <ul>
        <li v-for="ingredient in recipe.ingredients">{{ ingredient }}</li>
      </ul>
    </p>
    <p>
      Step:
      <ol>
        <li v-for="step in recipe.steps">{{ step }}</li>
      </ol>
    </p>
  </div>
  <hr />
  <div v-if="recipe">
    Comments:
    <form @submit.prevent="addComment" v-if="token">
      <textarea v-model="commentText" required></textarea>
      <br />
      <button>Submit</button>
    </form>
    <br />
    <table v-for="comment in comments" style="border: 1px solid black; width: 100%;margin-top: 10px;">
      <tr>
        <td>{{comment.user.name}}:<button style="margin-left: 5px;" @click="deleteComment(comment._id)" v-if="userID === comment.user._id">Delete</button></td>
      </tr>
      <tr><td>{{comment.text}}</td></tr>
    </table>
  </div>
</template>

<script>
  import axios from 'axios'
  export default {
    data() {
      return {
        recipe: '',
        comments: '',
        commentText: ''
      }
    }, methods: {
      addComment() { // Add comment to the database
        if (this.commentText != '') {
          let config = {
            headers: {
              Authorization: localStorage.token,
            }
          }
          axios.put('https://alan-recipe-api.herokuapp.com/api/v1/comment/'+this.$route.params.id, {
            comment: this.commentText
          }, config).then(response => {
            alert(response.data.message)
            this.$router.go(0)
          }).catch(function(error) {
            if (error.response.status === 422) {
            alert(error.response.data.message)
            }
          })
        }
      },
      deleteComment(commentID) { // Delete comment from the database
        axios.delete('https://alan-recipe-api.herokuapp.com/api/v1/comment/'+this.$route.params.id, {
          headers: {
            Authorization: localStorage.token,
          },
          data: {
            commentID: commentID
          }
        }).then(response => {
          alert(response.data.message)
          this.$router.go(0)
        }).catch(function(error) {
          if (error.response.status === 422) {
          alert(error.response.data.message)
          }
        })
      }
    }, created() {
      // Get recipe details
      axios.get('https://alan-recipe-api.herokuapp.com/api/v1/recipe/id/'+this.$route.params.id)
      .then(response => {
        this.recipe = response.data
      })
      .catch(function(error) {
        if (error.response.status === 400) {
          alert(error.response.data.message);
        }
      })

      //Get recipe comments
      axios.get('https://alan-recipe-api.herokuapp.com/api/v1/comment/'+this.$route.params.id)
      .then(response => {
        this.comments = response.data
      })
      .catch(function(error) {
        if (error.response.status === 400) {
          alert(error.response.data.message);
        }
      })
    }, computed: {
      token() {
        return localStorage.getItem('token');
      },
      userID() {
        return localStorage.getItem('userID');
      }
    }
  }
</script>