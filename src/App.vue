<template>
  <div id="app">
    <DogNavbar/>
    <div class="container flex-container">
      <div v-for="(breedObject, index) in breedsData" :key="index" class="card">
        <div class="card-image">
          <figure class="image is-128x128">
            <img v-bind:src="breedObject.imgSrc" style="clear: both;">
          </figure>
        </div>

        <header class="card-header">
          <h1
            v-if="'subBreed' in breedObject"
            class="card-header-text"
          >{{breedObject.subBreed + " " + breedObject.breed}}</h1>
          <h1 v-else class="card-header-text">{{breedObject.breed}}</h1>
        </header>
        <div>
          <i class="material-icons">thumb_up</i>
          <span class="tag is-dark count">0</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import DogCard from "./components/DogCard.vue";
import DogNavbar from "./components/DogNavbar.vue";
import axios from "axios";

export default {
  name: "app",
  components: {
    DogCard,
    DogNavbar
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

#app {
  background-image: url("./assets/wood.jpg");
  background-repeat: no-repeat;
  background-attachment: fixed;
}

.flex-container {
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
  margin-top: 70px;
}

.card {
  margin: 20px;
  padding: 20px;
}

figure.image {
  overflow: hidden;
}

.count {
  font-family: "Baloo Chettan", cursive;
}
</style>
