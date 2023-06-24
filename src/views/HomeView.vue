<template>
  <nav-component></nav-component>
  
  <div class="container">
  
    <div class="row">
      <div class="col-md-4">
        <p class="titulo">Movimentações Abertas</p>
      </div>
      <div class="col-md-4 offset-md-4">
          <router-link type="button" class="btn btn-success" to="/movimentacaocadastra">
            Registrar Nova Entrada
          </router-link>
      </div>
    </div>

    <div class="row">
      <div class="col-md-12">
        <table class="table table-bordered">
          <thead class="table-secondary">
            <tr>
              <th scope="col">ID</th>
              <th scope="col">Status</th>
              <th scope="col">Condutor</th>
              <th scope="col">Veiculo</th>
              <th scope="col">Entrada</th>
              <th scope="col">Opções</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in lista" :key="item.id">
              <td class="col-md-1">
                <span> {{ item.id }} </span>
              </td>
              <td class="col-md-1">
                <span v-if="item.ativo" class="badge text-bg-success" >Ativo</span>
                <span v-if="!item.ativo" class="badge text-bg-warning">Inativo</span>
              </td>
              <td class="col-md-3">{{ item.condutor.cpf }}</td>
              <td class="col-md-2">{{ item.veiculo.placa }}</td>
              <td class="col-md-2">{{ item.entrada }}</td>
              <td class="col-md-2">
                <button class="btn-danger btn btn-sm">Sair</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
 
  
</template>

<script lang="ts">
import { defineComponent } from 'vue';
//import HelloWorld from '@/components/HelloWorld.vue'; // @ is an alias to /src
import { Movimentacao } from '@/model/movimentacao';

import { MovimentacaoClient } from '@/client/movimentacaoClient';
import NavComponent from '@/components/NavComponent.vue';

export default defineComponent({
  name: 'HomeView',
  components: {
    NavComponent
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

.titulo
    {
      font-weight: bold;
      font-size: 30px;
    }
  
    .container
    {
      margin: 50px;
    }

</style>
