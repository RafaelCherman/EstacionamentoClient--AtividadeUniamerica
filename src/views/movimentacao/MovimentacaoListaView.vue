<template>
    <div class="home container">
  
      <div class="row">
        <div class="col-md-4">
          <p class="titulo">Veiculos</p>
        </div>
        <div class="col-md-4 offset-md-4">
          <button type="button" class="btn btn-success">
            <router-link class="nova" to="/movimentacaocadastra">Registrar Nova Movimentacao</router-link>
          </button>
        </div>
      </div>
  
      <table class="table table-hover table-bordered">
        <thead>
          <tr>
            <th>Veiculo</th>
            <th>Condutor</th>
            <th>Entrada</th>
            <th>Saida</th>
            <th>Opções</th>
          </tr>
        </thead>
        <tbody v-for="item in lista">
          <tr>
            <td>{{ item.veiculo.placa }}</td>
            <td>{{ item.condutor.nome }}</td>
            <td>{{ item.entrada }}</td>
            <td>{{ item.saida }}</td>
            <td class="opcs">
                <button type="button" class="btn btn-info">Detalhar</button>
                <button type="button" class="btn btn-warning">Editar</button>
                <button type="button" class="btn btn-danger">Desativar</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </template>
  
<script lang="ts">
    import { defineComponent } from 'vue';
    import { Movimentacao } from '@/model/movimentacao';
    import { MovimentacaoClient } from '@/client/movimentacaoClient';

    export default defineComponent({
        name: 'MovimentacaoListaView',
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
            this.movimentacaoClient.listAll()
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
  