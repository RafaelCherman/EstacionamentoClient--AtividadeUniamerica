<template>
  <nav-component></nav-component>
  
    <div class="container">
  
    <div class="row">
      <div class="col-md-4">
        <p class="titulo">Modelos</p>
      </div>
      <div class="col-md-4 offset-md-4">
          <router-link type="button" class="btn btn-success" to="/modelocadastra">
            Cadastrar Novo Modelo
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
              <th scope="col">Marca</th>
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
              <td class="col-md-4">{{ item.nome }}</td>
              <td class="col-md-4">{{ item.marca.nome }}</td>
              <td class="col-md-2">
                <opcs-component class="btn-warning" :botao="'Editar'" :modo="'editar'" :url="'modelo'" :id="item.id"></opcs-component>
                <opcs-component class="btn-danger" :botao="'Deletar'" :modo="'deletar'" :url="'modelo'" :id="item.id"></opcs-component>
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
    import { Modelo } from '@/model/modelo';
    import { ModeloClient } from '@/client/modeloClient';
    import NavComponent from '@/components/NavComponent.vue';
    import OpcsComponent from '@/components/OpcsComponent.vue'; 
    
        
  export default defineComponent({
    name: 'ModeloListaView',
    components: {
      NavComponent,
      OpcsComponent
    },
    data(){
      return{
        lista: new Array<Modelo>(),
        modeloClient: new ModeloClient()
      }
    },
    methods: {
      encheLista()
      {
        this.modeloClient.listAll()
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


    td .btn
    {
        margin-left: 5px;
    }
  
</style>
  