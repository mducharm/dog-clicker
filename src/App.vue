<template>
  <div id="app">
    <DogNavbar/>
    <div class="container" id="dog-container">
      <div class="flex-container">
        <div v-for="(breed, index) in loadedBreeds" :key="index">
          <DogCard
            :dogID="breed"
            :imgSRC="breedsData[breed].img"
            :dogCount="breedsData[breed].count"
            @clicked="dogClicked($event)"
          />
        </div>
      </div>
      <div class="level">
        <button
          type="button"
          @click="add5Breeds()"
          class="button is-white is-medium load-dogs is-rounded is-fullwidth"
          :class="{'is-loading': isLoading}"
        >Load More Dogs...</button>
      </div>
    </div>
  </div>
</template>

<script>
import DogCard from "./components/DogCard.vue";
import DogNavbar from "./components/DogNavbar.vue";
import axios from "axios";
import { constants } from "fs";
import { setTimeout } from "timers";

export default {
  name: "app",
  components: {
    DogCard,
    DogNavbar
  },
  data() {
    return {
      bottom: false,
      isLoading: false,
      breedsData: {},
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
  // watch: {
  //   bottom(bottom) {
  //     if (bottom) {
  //       // this.shiftBreeds();
  //       this.addBreed();
  //     }
  //   }
  // },
  computed: {},
  methods: {
    splitBreedName(id) {
      if (id.includes("-")) {
        return id.split("-");
      } else {
        return [id];
      }
    },
    // bottomVisible() {
    //   const scrollY = window.scrollY;
    //   const visible = document.documentElement.clientHeight;
    //   const pageHeight = document.documentElement.scrollHeight;
    //   const bottomOfPage = visible + scrollY >= pageHeight;
    //   return bottomOfPage || pageHeight < visible;
    // },
    // shiftBreeds() {
    //   if (this.bottomVisible()) {
    //     if (this.remainingBreedsToLoad.length >= 5) {
    //       for (let i = 0; i < 5; i++) {
    //         let breed = this.remainingBreedsToLoad.shift();
    //         // this.getRandomImage(breed);
    //         this.loadedBreeds.push(breed);
    //       }
    //     } else {
    //       for (let i = 0; i < this.remainingBreedsToLoad.length; i++) {
    //         let breed = this.remainingBreedsToLoad.shift();
    //         // this.getRandomImage(breed);
    //         this.loadedBreeds.push(breed);
    //       }
    //     }
    //   }
    // },
    addBreed() {
      if (this.remainingBreedsToLoad.length > 0) {
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
              let breedCountAndImage = this.breedsData[breedToLoad];
              breedCountAndImage.img = response.data.message;
              this.$set(this.breedsData, breedToLoad, breedCountAndImage);

              // let breedCountAndImage = this.breedsData.get(breedToLoad);
              // breedCountAndImage.img = response.data.message;
              // this.breedsData.set(breedToLoad, breedCountAndImage);
              this.loadedBreeds.push(breedToLoad);
              return response.data.message;
            });
        } else {
          axios
            .get(`https://dog.ceo/api/breed/${breedArray[0]}/images/random`)
            .then(response => {
              let breedCountAndImage = this.breedsData[breedToLoad];
              // let breedCountAndImage = this.breedsData.get(breedToLoad);
              breedCountAndImage.img = response.data.message;
              // this.breedsData.set(breedToLoad, breedCountAndImage);
              this.$set(this.breedsData, breedToLoad, breedCountAndImage);
              this.loadedBreeds.push(breedToLoad);
              return response.data.message;
            });
        }
      }
    },
    add5Breeds() {
      this.isLoading = true;
      setTimeout(() => {
        this.isLoading = false;
      }, 1500);
      this.addBreed();
      this.addBreed();
      this.addBreed();
      this.addBreed();
      this.addBreed();
    },
    incrementDogClicks(id) {
      let breedCountAndImage = this.breedsData[id];
      breedCountAndImage.count = breedCountAndImage.count + 1;
      // this.breedsData.set(id, breedCountAndImage);
      this.$set(this.breedsData, id, breedCountAndImage);
      this.loadedBreeds.sort((a, b) => {
        this.breedsData[a].count < this.breedsData[b].count ? 1 : -1;
      });
    },
    dogClicked(id) {
      axios.post(`http://localhost:3000/api/click/${id}`).then(clicked => {
        this.incrementDogClicks(id);
      });
    }
  },
  // created() {
  //   window.addEventListener("scroll", () => {
  //     this.bottom = this.bottomVisible();
  //     this.addBreed();
  //   });
  // },
  mounted() {
    axios
      .get("http://localhost:3000/api/dogcounts")
      .then(counts => {
        let sortedCounts = counts.data.sort((a, b) =>
          a.count < b.count ? 1 : -1
        );
        let breedObject = {};
        sortedCounts.forEach(breed => {
          this.remainingBreedsToLoad.push(breed.id);

          this.$set(this.breedsData, breed.id, {
            count: breed.count,
            img: null
          });

          // breedObject[breed.id] =

          // breedObject.set(breed.id, { count: breed.count, img: null });
        });
        return breedObject;
      })
      .then(breedObject => {
        // this.breedsData = breedObject;
        for (let i = 0; i < 15; i++) {
          this.addBreed();
        }
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
#app {
  background-image: url("./assets/wood.jpg");
  background-repeat: no-repeat;
  background-attachment: fixed;
}

.flex-container {
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
  padding-top: 40px;
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

.load-dogs {
  margin: 20px;
}
</style>
