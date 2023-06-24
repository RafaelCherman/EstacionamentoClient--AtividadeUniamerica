<template>
  <router-view/>
</template>

<style lang="scss">

// Variable overrides first
$primary: #900;
$enable-shadows: true;
$prefix: "mo-";

// Then import Bootstrap
@import "../node_modules/bootstrap/scss/bootstrap";

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 15px;
  display: flex;
  justify-content: space-between;


  a {
    margin: 15px;
    font-weight: bold;
    color: white;
    font-size: 20px;
    text-decoration: none;

    &.router-link-exact-active {
      color: #42b983;
    }

  }
  
}

.header
{
  background-color: grey;
  width: 100%;
  margin: 0px;
  
  display: flex;
  justify-content: start;
  align-items: center;
}
</style>

