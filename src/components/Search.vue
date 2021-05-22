<template>
  <div id="searchRecipe">
    <input type="text" v-model="searchName" placeholder="Search recipe" />
    <button @click="search">Search</button>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        searchName: ''
      }
    }, methods: {
      search() {
        if (!this.searchName == '')
          window.location.href = './search/'+this.searchName
      }
    }
  }
</script>