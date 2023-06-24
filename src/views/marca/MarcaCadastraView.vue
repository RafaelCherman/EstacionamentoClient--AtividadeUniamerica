<template>
    <nav-component></nav-component>

    <div class="container">
        <div class="row">
            <div class="col-md-4 offset-md-4">
                <p class="titulo">Marca</p>
            </div>
        </div>

        <div class="row">
            <div class="col-md-6 offset-md-3 text-start">
                <label>Nome</label>
                <input :disabled="this.form === 'deletar' ? '' : disabled" type="text" class="form-control" v-model="marca.nome">                    
            </div>
        </div>

        <div class="row">
            <div class="col-md-3 offset-md-3">
                <router-link class="btn btn-info" type="button" to="/marca">Voltar</router-link>
            </div>
            <div class="col-md-3">
                
                <button v-if="this.form === undefined" class="btn btn-success" @click="onClickCadastrar">Cadastrar</button>
                <button v-if="this.form === 'deletar'" class="btn btn-danger" @click="onClickExcluir">Excluir</button>
                <button v-if="this.form === 'editar'" class="btn btn-warning" @click="onClickEditar">Editar</button>

            </div>
        </div>
        
        
    </div>


    





    
</template>

<script lang="ts">

    import { defineComponent } from 'vue';
    import { Marca } from '@/model/marca';
    import { MarcaClient } from '@/client/marcaClient';
    import NavComponent from '@/components/NavComponent.vue';

    export default defineComponent({
        name: 'MarcaCadastra',
        components:{
            NavComponent
        },
        data(){
            return{
                marca: new Marca(),
                marcaClient: new MarcaClient()
            }
        },
        computed: {
            id() {
                return this.$route.query.id
            },
            form() {
                return this.$route.query.form
            }
        },
        mounted: function(){
        
            if(this.id !== undefined)
            {
                this.findById(Number(this.id));
            }
            
        },
        methods: {
            onClickCadastrar(){
                this.marcaClient.cadastrar(this.marca)
                .then(success => {
                    this.marca = new Marca();
                })
                .catch(error => {
                    console.log(error);
                })
            },
            onClickEditar(){
                console.log(this.marca);
                this.marcaClient.editar(this.marca.id, this.marca)
                .then(success => {
                    this.marca = new Marca();
                })
                .catch(error => {
                    console.log(error);
                })
            },
            onClickExcluir(){
                console.log(this.marca);
                this.marcaClient.deletar(this.marca.id)
                .then(success => {
                    this.marca = new Marca();
                })
                .catch(error => {
                    console.log(error);
                })
            },
            findById(id: number){
                this.marcaClient.findById(id)
                .then(success => {
                    this.marca = success
                })
                .catch(error => {
                    console.log(error);
                })
            }
            
        }
        
    })

</script>

<style scoped lang="scss">

    .container
    {
      margin: 50px;
      background: lightgray;
      border-radius: 20px;
    }

    form .btn{
        margin-top: 20px;
        width: 100px;
    }


    .titulo
    {
      font-weight: bold;
      font-size: 30px;
    }
    

</style>