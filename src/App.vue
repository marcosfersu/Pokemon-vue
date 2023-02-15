<template>
  <div class="app-container">
    <nav>
      <router-link to="/">Home</router-link> |
      <router-link to="/types">Types</router-link> |
      <router-link to="/pokemon/1">Pokemon details</router-link>
    </nav>
    <section class="main-container">
      <router-view />
    </section>
  </div>
</template>

<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Raleway:wght@200;400;700&display=swap");
#app {
  font-family: "Raleway", sans-serif;
  background: linear-gradient(247.45deg, #f4f6f8 0.76%, #f3f5f7 99.5%);
}

.app-container {
  display: grid;
  grid-template-columns: 10em 1fr;
  grid-template-rows: 100vh;
}

.main-container {
  overflow: auto;
}

nav {
  display: flex;
  flex-flow: column;
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
