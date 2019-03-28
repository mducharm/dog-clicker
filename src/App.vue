<template>
  <div id="app">
    <div class="container">
      <DogCard v-for="breedArray in breedsData" :key="breedArray">
        <h1 v-if="breedArray.length > 1">{{breedArray[0] + ' ' + breedArray[1]}}</h1>
        <h1 v-else>{{breedArray[0]}}</h1>
      </DogCard>
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
    axios.get("https://dog.ceo/api/breeds/list/all").then(response => {
      let breeds = response.data.message;
      let breedArray = [];
      Object.keys(breeds).forEach(breed => {
        if (breeds[breed].length > 0) {
          breeds[breed].forEach(subBreed => breedArray.push([subBreed, breed]));
        } else {
          breedArray.push([breed]);
        }
      });
      this.breedsData = breedArray;
      return breedArray;
    });
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
