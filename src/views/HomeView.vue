<template>
  <div class="home container">

    <div class="row">
      <div class="col-md-4">
        <p class="titulo">Movimentações Abertas</p>
      </div>
      <div class="col-md-4 offset-md-4">
        <button type="button" class="btn btn-success">
          <router-link class="nova" to="/">Registrar Nova Entrada</router-link>
        </button>
      </div>
    </div>

    <table class="table table-hover table-bordered">
      <thead>
        <tr>
          <th>Condutor</th>
          <th>Placa</th>
          <th>Entrada</th>
          <th>Registrar Saida</th>
        </tr>
      </thead>
      <tbody v-for="item in lista">
        <tr>
          <td>{{ item.condutor.nome }}</td>
          <td>{{ item.veiculo.placa }}</td>
          <td>{{ item.entrada }}</td>
          <td class="opcs"><button type="button" class="btn btn-success">Sair</button></td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
//import HelloWorld from '@/components/HelloWorld.vue'; // @ is an alias to /src
import { Movimentacao } from '@/model/movimentacao';

import { MovimentacaoClient } from '@/client/movimentacaoClient';

export default defineComponent({
  name: 'HomeView',
  components: {
    
  },
  data(){
    return{
      lista: new Array<Movimentacao>(),
      movimentacaoClient: new MovimentacaoClient()
    }
  },
  methods: {
    encheLista()
    {
      this.movimentacaoClient.findAberto()
      .then(
        success => {
          this.lista = Object.assign([], success);
        },
        error => console.log(error)
      )
    },
    papel()
    {
      console.log(this.lista);
    }
  },
  mounted: function(){
    this.encheLista();
    this.papel();
  }
})
</script>

<style scoped lang="scss">

  .nova{
    color: white;
    text-decoration: none;
  }

  .titulo
  {
    font-weight: bold;
    font-size: 30px;
    text-decoration: none;
  }

  .container
  {
    margin: 50px;
  }

  .row
  {
    display: flex;
    align-items: center;
  }

  .opcs
    {
        width: 20%;
    }

</style>
