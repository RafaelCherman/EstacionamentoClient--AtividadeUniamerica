<template>
  <nav-component></nav-component>
  
  <div class="container">
  
    <div class="row">
      <div class="col-md-4">
        <p class="titulo">Veiculos</p>
      </div>
      <div class="col-md-4 offset-md-4">
          <router-link type="button" class="btn btn-success" to="/veiculoscadastra">
            Cadastrar Novo Veiculo
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
              <th scope="col">Placa</th>
              <th scope="col">Modelo</th>
              <th scope="col">Cor</th>
              <th scope="col">Tipo</th>
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
              <td class="col-md-2">{{ item.placa }}</td>
              <td class="col-md-2">{{ item.modelo.nome }}</td>
              <td class="col-md-2">{{ item.cor }}</td>
              <td class="col-md-2">{{ item.tipo }}</td>
              <td class="col-md-2">
                <opcs-component class="btn-warning" :botao="'Editar'" :modo="'editar'" :url="'veiculo'" :id="item.id"></opcs-component>
                <opcs-component class="btn-danger" :botao="'Deletar'" :modo="'deletar'" :url="'veiculo'" :id="item.id"></opcs-component>
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
    import { Veiculo } from '@/model/veiculo';
    import { VeiculoClient } from '@/client/veiculoClient';
    import NavComponent from '@/components/NavComponent.vue';
    import OpcsComponent from '@/components/OpcsComponent.vue';

    export default defineComponent({
        name: 'VeiculoListaView',
        components: {
          NavComponent,
          OpcsComponent
        },
        data(){
            return{
                lista: new Array<Veiculo>(),
                veiculoClient: new VeiculoClient()
            }
        },
        methods: {
        encheLista()
        {
            this.veiculoClient.listAll()
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
  