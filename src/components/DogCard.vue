<template>
  <div class="card">
    <div class="card-image">
      <figure class="image is-128x128">
        <!-- <figure class="image is-128x128" v-lazy-container="{ selector: 'img' }"> -->
        <!-- <img data-src="getRandomImage(breed)" style="clear: both;"> -->
        <img v-bind:src="imgSRC" style="clear: both;">
      </figure>
    </div>
    <header class="card-header">{{ capitalizedBreedName(dogID) }}</header>
    <div class="level card-bar">
      <span class="tag is-dark count">{{ dogCount }}</span>
      <i class="material-icons" @click="$emit('clicked', dogID)">thumb_up</i>
    </div>
  </div>
</template>

<script>
export default {
  name: "DogCard",
  props: ["dogID", "imgSRC", "dogCount"],
  data() {
    return {};
  },
  methods: {
    splitBreedName(id) {
      if (id.includes("-")) {
        return id.split("-");
      } else {
        return [id];
      }
    },
    capitalize(word) {
      return word.charAt(0).toUpperCase() + word.slice(1);
    },
    capitalizedBreedName(id) {
      if (id.includes("-")) {
        let splitID = id.split("-");
        return `${this.capitalize(splitID[0])} ${this.capitalize(splitID[1])}`;
      } else {
        return this.capitalize(id);
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
