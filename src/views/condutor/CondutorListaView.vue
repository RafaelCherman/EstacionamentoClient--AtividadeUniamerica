<template>
  <nav-component></nav-component>
    <div class="container">
  
      <div class="row">
        <div class="col-md-4">
          <p class="titulo">Condutores</p>
        </div>
        <div class="col-md-4 offset-md-4">
            <router-link type="button" class="btn btn-success" to="/condutorcadastra">
              Cadastrar Novo Condutor
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
                <th scope="col">CPF</th>
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
                <td class="col-md-4">{{ item.cpf }}</td>
                <td class="col-md-2">
                  <opcs-component class="btn-warning" :botao="'Editar'" :modo="'editar'" :url="'condutor'" :id="item.id"></opcs-component>
                  <opcs-component v-if="item.ativo" class="btn-danger" :botao="'Deletar'" :modo="'deletar'" :url="'condutor'" :id="item.id"></opcs-component>
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
    import { Condutor } from '@/model/condutor';
    import { CondutorClient } from '@/client/condutorClient';
    import NavComponent from '@/components/NavComponent.vue';
    import OpcsComponent from '@/components/OpcsComponent.vue';

    export default defineComponent({
        name: 'CondutorListaView',
        components: {
          NavComponent,
          OpcsComponent
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
                    this.lista = success;
                    console.log(this.lista);
                },
            error => console.log(error)
            )
        }
        
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
  