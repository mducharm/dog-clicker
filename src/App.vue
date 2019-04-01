<template>
  <div id="app">
    <DogNavbar/>
    <div class="container flex-container" id="dog-container">
      <div v-for="(breed, index) in loadedBreeds" :key="index">
        <DogCard
          :dogID="breed"
          :imgSRC="breedsData.get(breed).img"
          :dogCount="breedsData.get(breed).count"
        />
        <!-- {{ key }}
        {{ value }}-->
      </div>
      <!-- {{ loadedBreeds }}
      {{ remainingBreedsToLoad }}-->
      <!-- <div v-for="(breed, index) in loadedBreeds" :key="index" class="card">
        <div class="card-image">
          <figure class="image is-128x128">
            <img v-bind:src="breedsData.get(breed).img" style="clear: both;">
          </figure>
        </div>
        <header class="card-header">
          <h1>{{ capitalizedBreedName(breed) }}</h1>
        </header>
        <div class="level card-bar">
          <span class="tag is-dark count">{{breedsData.get(breed).count}}</span>
          <i class="material-icons">thumb_up</i>
        </div>
      </div>-->
    </div>
  </div>
</template>

<script>
import DogCard from "./components/DogCard.vue";
import DogNavbar from "./components/DogNavbar.vue";
import axios from "axios";
import { constants } from "fs";

export default {
  name: "app",
  components: {
    DogCard,
    DogNavbar
  },
  data() {
    return {
      bottom: false,
      breedsData: null,
      remainingBreedsToLoad: [],
      loadedBreeds: [],
      breeds: {
        affenpinscher: [],
        african: [],
        airedale: [],
        akita: [],
        appenzeller: [],
        basenji: [],
        beagle: [],
        bluetick: [],
        borzoi: [],
        bouvier: [],
        boxer: [],
        brabancon: [],
        briard: [],
        bulldog: ["boston", "french"],
        bullterrier: ["staffordshire"],
        cairn: [],
        cattledog: ["australian"],
        chihuahua: [],
        chow: [],
        clumber: [],
        cockapoo: [],
        collie: ["border"],
        coonhound: [],
        corgi: ["cardigan"],
        cotondetulear: [],
        dachshund: [],
        dalmatian: [],
        dane: ["great"],
        deerhound: ["scottish"],
        dhole: [],
        dingo: [],
        doberman: [],
        elkhound: ["norwegian"],
        entlebucher: [],
        eskimo: [],
        frise: ["bichon"],
        germanshepherd: [],
        greyhound: ["italian"],
        groenendael: [],
        hound: ["afghan", "basset", "blood", "english", "ibizan", "walker"],
        husky: [],
        keeshond: [],
        kelpie: [],
        komondor: [],
        kuvasz: [],
        labrador: [],
        leonberg: [],
        lhasa: [],
        malamute: [],
        malinois: [],
        maltese: [],
        mastiff: ["bull", "english", "tibetan"],
        mexicanhairless: [],
        mix: [],
        mountain: ["bernese", "swiss"],
        newfoundland: [],
        otterhound: [],
        papillon: [],
        pekinese: [],
        pembroke: [],
        pinscher: ["miniature"],
        pointer: ["german", "germanlonghair"],
        pomeranian: [],
        poodle: ["miniature", "standard", "toy"],
        pug: [],
        puggle: [],
        pyrenees: [],
        redbone: [],
        retriever: ["chesapeake", "curly", "flatcoated", "golden"],
        ridgeback: ["rhodesian"],
        rottweiler: [],
        saluki: [],
        samoyed: [],
        schipperke: [],
        schnauzer: ["giant", "miniature"],
        setter: ["english", "gordon", "irish"],
        sheepdog: ["english", "shetland"],
        shiba: [],
        shihtzu: [],
        spaniel: [
          "blenheim",
          "brittany",
          "cocker",
          "irish",
          "japanese",
          "sussex",
          "welsh"
        ],
        springer: ["english"],
        stbernard: [],
        terrier: [
          "american",
          "australian",
          "bedlington",
          "border",
          "dandie",
          "fox",
          "irish",
          "kerryblue",
          "lakeland",
          "norfolk",
          "norwich",
          "patterdale",
          "russell",
          "scottish",
          "sealyham",
          "silky",
          "tibetan",
          "toy",
          "westhighland",
          "wheaten",
          "yorkshire"
        ],
        vizsla: [],
        weimaraner: [],
        whippet: [],
        wolfhound: ["irish"]
      }
    };
  },
  watch: {
    bottom(bottom) {
      if (bottom) {
        this.shiftBreeds();
      }
    }
  },
  computed: {},
  methods: {
    splitBreedName(id) {
      if (id.includes("-")) {
        return id.split("-");
      } else {
        return [id];
      }
    },
    // capitalize(word) {
    //   return word.charAt(0).toUpperCase() + word.slice(1);
    // },
    // capitalizedBreedName(id) {
    //   if (id.includes("-")) {
    //     let splitID = id.split("-");
    //     return `${this.capitalize(splitID[0])} ${this.capitalize(splitID[1])}`;
    //   } else {
    //     return this.capitalize(id);
    //   }
    // },
    // getRandomImage(id) {
    //   let breedArray = this.splitBreedName(id);
    //   if (breedArray.length > 1) {
    //     axios
    //       .get(
    //         `https://dog.ceo/api/breed/${breedArray[1]}/${
    //           breedArray[0]
    //         }/images/random`
    //       )
    //       .then(response => {
    //         let breedObject = this.breedsData.get(id);
    //         breedObject.img = response.data.message;
    //         this.breedsData.set(id, breedObject);
    //         return response.data.message;
    //       });
    //   } else {
    //     axios
    //       .get(`https://dog.ceo/api/breed/${breedArray[0]}/images/random`)
    //       .then(response => {
    //         let breedObject = this.breedsData.get(id);
    //         breedObject.img = response.data.message;
    //         this.breedsData.set(id, breedObject);
    //         return response.data.message;
    //       });
    //   }
    // },
    bottomVisible() {
      const scrollY = window.scrollY;
      const visible = document.documentElement.clientHeight;
      const pageHeight = document.documentElement.scrollHeight;
      const bottomOfPage = visible + scrollY >= pageHeight;
      return bottomOfPage || pageHeight < visible;
    },
    shiftBreeds() {
      if (this.bottomVisible()) {
        if (this.remainingBreedsToLoad.length >= 5) {
          for (let i = 0; i < 5; i++) {
            let breed = this.remainingBreedsToLoad.shift();
            // this.getRandomImage(breed);
            this.loadedBreeds.push(breed);
          }
        } else {
          for (let i = 0; i < this.remainingBreedsToLoad.length; i++) {
            let breed = this.remainingBreedsToLoad.shift();
            // this.getRandomImage(breed);
            this.loadedBreeds.push(breed);
          }
        }
      }
    },
    addBreed() {
      let breedToLoad = this.remainingBreedsToLoad.shift();
      let breedArray = this.splitBreedName(breedToLoad);

      if (breedArray.length > 1) {
        axios
          .get(
            `https://dog.ceo/api/breed/${breedArray[1]}/${
              breedArray[0]
            }/images/random`
          )
          .then(response => {
            let breedCountAndImage = this.breedsData.get(breedToLoad);
            breedCountAndImage.img = response.data.message;
            this.breedsData.set(breedToLoad, breedCountAndImage);
            this.loadedBreeds.push(breedToLoad);
            return response.data.message;
          });
      } else {
        axios
          .get(`https://dog.ceo/api/breed/${breedArray[0]}/images/random`)
          .then(response => {
            let breedCountAndImage = this.breedsData.get(breedToLoad);
            breedCountAndImage.img = response.data.message;
            this.breedsData.set(breedToLoad, breedCountAndImage);
            this.loadedBreeds.push(breedToLoad);
            return response.data.message;
          });
      }
    }
  },
  created() {
    window.addEventListener("scroll", () => {
      this.bottom = this.bottomVisible();
      this.addBreed();
    });
  },
  mounted() {
    axios
      .get("http://localhost:3000/api/dogcounts")
      .then(counts => {
        let sortedCounts = counts.data.sort((a, b) =>
          a.count < b.count ? 1 : -1
        );
        let breedMap = new Map();
        sortedCounts.forEach(breed => {
          this.remainingBreedsToLoad.push(breed.id);
          breedMap.set(breed.id, { count: breed.count, img: null });
        });
        return breedMap;
      })
      .then(breedMap => {
        this.breedsData = breedMap;
        this.addBreed();
        this.addBreed();
        this.addBreed();
        this.addBreed();

        // this.shiftBreeds();
        // this.shiftBreeds();
        // console.log(
        //   "offsetHeight " +
        //     document.getElementById("dog-container").offsetHeight
        // );
        // console.log("innerHeight " + window.innerHeight);
        // do {
        //   this.shiftBreeds();
        // } while (document.documentElement.clientHeight < window.innerHeight);
      });

    // axios
    //   .get("https://dog.ceo/api/breeds/list/all")
    //   .then(response => {
    //     let breeds = response.data.message;
    //     let breedArray = [];
    //     Object.keys(this.breeds).forEach(breed => {
    //       if (breeds[breed].length > 0) {
    //         breeds[breed].forEach(subBreed =>
    //           breedArray.push([subBreed, breed])
    //         );
    //       } else {
    //         breedArray.push([breed]);
    //       }
    //     });
    //     // this.breedsData = breedArray;
    //     return breedArray;
    //   })
    //   .then(breedsArray => {
    //     breedsArray.forEach(breed => {
    //       if (breed.length > 1) {
    //         axios
    //           .get(
    //             `https://dog.ceo/api/breed/${breed[1]}/${
    //               breed[0]
    //             }/images/random`
    //           )
    //           .then(response => {
    //             this.breedsData.push({
    //               breed: breed[1],
    //               subBreed: breed[0],
    //               imgSrc: response.data.message
    //             });
    //             return response.data.message;
    //           });
    //       } else {
    //         axios
    //           .get(`https://dog.ceo/api/breed/${breed[0]}/images/random`)
    //           .then(response => {
    //             this.breedsData.push({
    //               breed: breed[0],
    //               imgSrc: response.data.message
    //             });
    //             return response.data.message;
    //           });
    //       }
    //     });
    //   });
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
  /* min-height: 100vh; */
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

.card-bar {
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  align-items: center;
}

.count {
  font-family: "Baloo Chettan", cursive;
}
</style>
