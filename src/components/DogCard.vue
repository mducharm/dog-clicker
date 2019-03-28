<template>
  <div class="card">
    <div class="card-header">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "DogCard",
  props: {
    msg: String
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
