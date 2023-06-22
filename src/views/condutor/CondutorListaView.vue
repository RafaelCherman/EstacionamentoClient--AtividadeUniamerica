<template>
    <div class="home container">
  
      <div class="row">
        <div class="col-md-4">
          <p class="titulo">Condutores</p>
        </div>
        <div class="col-md-4 offset-md-4">
          <button type="button" class="btn btn-success">
            <router-link class="nova" to="/condutorcadastra">Cadastrar Novo Condutor</router-link>
          </button>
        </div>
      </div>
  
      <table class="table table-hover table-bordered">
        <thead>
          <tr>
            <th>Nome</th>
            <th>CPF</th>
            <th>Opções</th>
          </tr>
        </thead>
        <tbody v-for="item in lista">
          <tr>
            <td>{{ item.nome }}</td>
            <td>{{ item.cpf }}</td>
            <td class="opcs">
                <router-link type="button" class="btn btn-warning"
                :to="{name: 'condutor-cadastra-editar', query: {id: item.id, form: 'editar'}}">
                  Editar
                </router-link>
                <router-link type="button" class="btn btn-danger"
                :to="{name: 'condutor-cadastra-deletar', query: {id: item.id, form: 'deletar'}}">
                  Excluir
                </router-link>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </template>
  
<script lang="ts">
    import { defineComponent } from 'vue';
    import { Condutor } from '@/model/condutor';
    import { CondutorClient } from '@/client/condutorClient';

    export default defineComponent({
        name: 'CondutorListaView',
        components: {
      
        },
        data(){
            return{
                lista: new Array<Condutor>(),
                condutorClient: new CondutorClient()
            }
        },
        methods: {
        encheLista()
        {
            this.condutorClient.listAll()
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
  