<template>
  <nav class="navbar is-fixed-top is-dark" role="navigation" aria-label="main navigation">
    <div class="navbar-brand">
      <a class="navbar-item" href="https://bulma.io">
        <!-- <img src="https://bulma.io/images/bulma-logo.png" width="112" height="28"> -->
        <div class="icon has-text-warning dog-logo">
          <i class="fas fa-dog fa-2x"></i>
        </div>
        <h1 class="has-text-warning dog-logo-text">Dog Clicker</h1>
      </a>

      <a
        role="button"
        class="navbar-burger burger"
        aria-label="menu"
        aria-expanded="false"
        data-target="navbarBasicExample"
        :class="{'is-active': navbarActive}"
        @click="toggleNavbar"
      >
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </a>
    </div>

    <div id="navbarBasicExample" class="navbar-menu" :class="{'is-active': navbarActive}">
      <div class="navbar-start"></div>

      <div class="navbar-end">
        <a class="navbar-item">About</a>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: "DogNavbar",
  props: {
    msg: String
  },
  data() {
    return {
      navbarActive: false
    };
  },
  methods: {
    toggleNavbar() {
      return this.navbarActive
        ? (this.navbarActive = false)
        : (this.navbarActive = true);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.dog-logo {
  margin-right: 15px;
}
.dog-logo-text {
  font-family: "Baloo Chettan", cursive;
}
</style>
