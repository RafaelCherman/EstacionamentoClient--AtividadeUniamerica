<template>
    <div class="header">
        <nav>
            <router-link class="active" to="/">Home</router-link>
            <router-link class="active" to="/marca">Marcas</router-link>
            <router-link class="active" to="/modelo">Modelos</router-link>
            <router-link class="active" to="/condutor">Condutores</router-link>
            <router-link class="active" to="/veiculo">Veiculos</router-link>
            <router-link class="active" to="/movimentacao">Movimentações</router-link>
        </nav>
    </div>
</template>

<style lang="scss" scoped>

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



