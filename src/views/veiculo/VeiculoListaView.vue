<template>
    <div class="home container">
  
      <div class="row">
        <div class="col-md-4">
          <p class="titulo">Veiculos</p>
        </div>
        <div class="col-md-4 offset-md-4">
          <button type="button" class="btn btn-success">
            <router-link class="nova" to="/veiculocadastra">Cadastrar Novo Veiculo</router-link>
          </button>
        </div>
      </div>
  
      <table class="table table-hover table-bordered">
        <thead>
          <tr>
            <th>Placa</th>
            <th>Opções</th>
          </tr>
        </thead>
        <tbody v-for="item in lista">
          <tr>
            <td>{{ item.placa }}</td>
            <td class="opcs">
                <button type="button" class="btn btn-info">Detalhar</button>
                <button type="button" class="btn btn-warning">Editar</button>
                <button type="button" class="btn btn-danger">Excluir</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </template>
  
<script lang="ts">
    import { defineComponent } from 'vue';
    import { Veiculo } from '@/model/veiculo';
    import { VeiculoClient } from '@/client/veiculoClient';

    export default defineComponent({
        name: 'VeiculoListaView',
        components: {
      
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
  
    .nova{
      color: white;
      text-decoration: none;
    }
  
    .titulo
    {
      font-weight: bold;
      font-size: 30px;
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
        width: 50%;
    }

    td .btn
    {
        margin-left: 20px;
    }
  
</style>
  