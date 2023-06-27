<template>
  <nav-component></nav-component>
  <div class="container">
  
    <div class="row">
      <div class="col-md-4">
        <p class="titulo">Marcas</p>
      </div>
      <div class="col-md-4 offset-md-4">
          <router-link type="button" class="btn btn-success" to="/marcacadastra">
            Cadastrar Nova Marca
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
              <th scope="col">Nome</th>
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
              <td class="col-md-8">{{ item.nome }}</td>
              <td class="col-md-2">
                <opcs-component class="btn-warning" :botao="'Editar'" :modo="'editar'" :url="'marca'" :id="item.id"></opcs-component>
                <opcs-component v-if="item.ativo" class="btn-danger" :botao="'Deletar'" :modo="'deletar'" :url="'marca'" :id="item.id"></opcs-component>
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
    import { Marca } from '@/model/marca';  
    import { MarcaClient } from '@/client/marcaClient';
    import NavComponent from '@/components/NavComponent.vue';
    import OpcsComponent from '@/components/OpcsComponent.vue';
    
  export default defineComponent({
    name: 'MarcaLista',
    components: {
      NavComponent,
      OpcsComponent
    },
    data(){
      return{
        lista: new Array<Marca>(),
        marcaClient: new MarcaClient()
      }
    },
    methods: {
      encheLista()
      {
        this.marcaClient.listAll()
        .then(
          success => {
            this.lista = success;
        })
        .catch(error => {
          console.log(error);
        })
      },
      
    },
    mounted: function(){
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
  
    .container
    {
      margin: 50px;
    }


    td .btn
    {
        margin-left: 5px;
    }
  
</style>
  