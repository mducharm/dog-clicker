<template>
  <div id="app">
    <div class="container flex-container">
      <div v-for="(breedObject, index) in breedsData" :key="index" class="card">
        <div class="card-image">
          <figure class="image is-4by3">
            <img v-bind:src="breedObject.imgSrc">
          </figure>
        </div>

        <header class="card-header">
          <h1
            v-if="'subBreed' in breedObject"
            class="card-header-text"
          >{{breedObject.subBreed + " " + breedObject.breed}}</h1>
          <h1 v-else class="card-header-text">{{breedObject.breed}}</h1>
        </header>
      </div>
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
      breedsData: []
    };
  },
  mounted() {
    axios
      .get("https://dog.ceo/api/breeds/list/all")
      .then(response => {
        let breeds = response.data.message;
        let breedArray = [];
        Object.keys(breeds).forEach(breed => {
          if (breeds[breed].length > 0) {
            breeds[breed].forEach(subBreed =>
              breedArray.push([subBreed, breed])
            );
          } else {
            breedArray.push([breed]);
          }
        });
        // this.breedsData = breedArray;
        return breedArray;
      })
      .then(breedsArray => {
        breedsArray.forEach(breed => {
          if (breed.length > 1) {
            axios
              .get(
                `https://dog.ceo/api/breed/${breed[1]}/${
                  breed[0]
                }/images/random`
              )
              .then(response => {
                this.breedsData.push({
                  breed: breed[1],
                  subBreed: breed[0],
                  imgSrc: response.data.message
                });
                return response.data.message;
              });
          } else {
            axios
              .get(`https://dog.ceo/api/breed/${breed[0]}/images/random`)
              .then(response => {
                this.breedsData.push({
                  breed: breed[0],
                  imgSrc: response.data.message
                });
                return response.data.message;
              });
          }
        });
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

.flex-container {
  display: flex;
  flex-wrap: wrap;
}
</style>
