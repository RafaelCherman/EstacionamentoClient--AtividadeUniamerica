<template>
  <nav-component></nav-component>
  <div class="container">
  
    <div class="row">
      <div class="col-md-4">
        <p class="titulo">Movimentações Abertas</p>
      </div>
      <div v-if="config.inicioExpediente != undefined && config.fimExpediente != undefined && config.valorHora != undefined && config.valorMinutoMulta != undefined" class="col-md-4 offset-md-4">
          <router-link type="button" class="btn btn-success" to="/movimentacaocadastra">
            Registrar Nova Entrada
          </router-link>
      </div>
      <div v-else class="col-md-4 offset-md-4 d-flex flex-column">
          <span class="aviso">Registre configurações para realizar uma entrada</span>
          <router-link type="button" class="btn btn-success" to="/configuracao">
            Registrar Configurações
          </router-link>
      </div>
    </div>

    <div class="row" v-if="ativo">
      <div class="col-md-12 text-start">
        <div class="alert alert-success alert-dismissible fade show" role="alert" >
            <article v-html="nota"></article>
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
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
              <td class="col-md-2">{{ printDate(item.entrada) }}</td>
              <td class="col-md-2">
                <button type="button" class="btn-danger btn btn-sm" @click="onClickFechar(item.id, item)">Sair</button>
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
import AlertComponent from '@/components/AlertComponent.vue';
import { ConfiguracaoClient } from '@/client/confiugaracaoClient';
import { Configuracao } from '@/model/configuracao';

export default defineComponent({
  name: 'HomeView',
  components: {
    NavComponent,
    AlertComponent
  },
  data(){
    return{
      lista: new Array<Movimentacao>(),
      movimentacaoClient: new MovimentacaoClient(),
      config: new Configuracao(),
      configClient: new ConfiguracaoClient(),
      ativo: false as boolean,
      nota: '' as string
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
    onClickFechar(id: number, movimentacao: Movimentacao)
    {
      movimentacao.saida = new Date();
      this.movimentacaoClient.fechar(id, movimentacao)
      .then(success =>{
        
        
        this.nota = success;
        this.ativo = true;
      })
      .catch(error => {

      })
    },
    printDate(data: any): String
    {
      let ai = new Array(data);
      let j = Object.values (ai[0]);
                      
      let i = new Date(Number (j[0]), Number (j[1])-1, Number (j[2]), Number (j[3])-3, Number (j[4]));
      let horas = String (i.getHours());
      let minutos = String (i.getMinutes());

      if(Number (horas) < 10)
      {
        horas = "0"+horas;
      }
        if(Number (minutos) < 10)
      {
        minutos = "0"+minutos;
      }
        return horas+":"+minutos ;
    },
    pegaConfig()
    {
      this.configClient.getAll()
      .then(success => {
        this.config = success;
      })
      .catch(error => {
        console.log(error);
      })
    }
  },
  mounted: function(){
    this.pegaConfig();
    this.encheLista();
  }
})
</script>

<style scoped lang="scss">

.titulo
    {
      font-weight: bold;
      font-size: 30px;
    }

    .aviso
    {
      font-weight: bold;
      font-size: 15px;
    }
  
    .container
    {
      margin: 50px;
    }

</style>
