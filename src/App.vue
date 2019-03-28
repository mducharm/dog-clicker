<template>
  <div id="app">
    <div class="container">
      <DogCard/>
      {{breedsData}}
    </div>
  </div>
</template>

<script>
import DogCard from "./components/DogCard.vue";
import axios from "axios";

export default {
  name: "app",
  components: {
    DogCard
  },
  data() {
    return {
      breedsData: null
    };
  },
  mounted() {
    axios
      .get("https://dog.ceo/api/breeds/list/all")
      .then(response => {
        this.breedsData = response.data.message;
        return response.data.message;
      })
      .then(response => {});
  }
};
</script>

<style>
/* #app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
} */
</style>
