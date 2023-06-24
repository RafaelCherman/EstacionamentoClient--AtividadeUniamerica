<template>
    <nav-component></nav-component>
    
    <div class="container">
        <div class="row">
            <div class="col-md-4 offset-md-4">
                <p class="titulo">Modelo</p>
            </div>
        </div>

        <div class="row">
            <div class="col-md-6 offset-md-3 text-start">
                <label>Nome</label>
                <input :disabled="this.form === 'deletar' ? '' : disabled" type="text" class="form-control" v-model="modelo.nome">
                    
            </div>
        </div>

        <div class="row">
            <div class="col-md-6 offset-md-3 text-start">
                <label>Marca</label>
                <select :disabled="this.form === 'deletar' ? '' : disabled" class="form-select" v-model="marca.nome">
                    <option v-for="item in listMarca" :value="item.nome">{{ item.nome }}</option>
                </select>
            </div>
        </div>

        <div class="row">
            <div class="col-md-3 offset-md-3">
                <router-link class="btn btn-info" type="button" to="/modelo">Voltar</router-link>
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

    import { Marca } from '@/model/marca'
    import { Modelo } from '@/model/modelo'
    import { ModeloClient } from '@/client/modeloClient'
    import { MarcaClient } from '@/client/marcaClient'
    import { defineComponent } from 'vue'
    import NavComponent from '@/components/NavComponent.vue'

    export default defineComponent({
        name: 'MarcaCadastra',
        components:{
            NavComponent
        },
        data(){
            return{
                marca: new Marca(),
                modelo: new Modelo(),
                modeloClient: new ModeloClient(),
                marcaClient: new MarcaClient(),
                listMarca: new Array<Marca>()
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
            
            this.getListMarca();

            if(this.id !== undefined)
            {
                this.findById(Number(this.id));
            }
            
        },
        methods: {
            onClickCadastrar(){
                this.modeloClient.findMarcaByNome(this.marca.nome)
                .then(success => {
                    this.modelo.marca = success;
                    this.modeloClient.cadastrar(this.modelo)
                    .then(success => {
                        this.modelo = new Modelo();
                        this.marca = new Marca();
                    })
                    .catch(error => {
                        console.log(error);
                    })
                })
                .catch(error => {
                    console.log(error);
                })

                
            },
            onClickEditar(){
                console.log(this.marca);
                this.modeloClient.findMarcaByNome(this.marca.nome)
                .then(success => {
                    this.modelo.marca = success;
                    this.modeloClient.editar(this.modelo.id, this.modelo)
                    .then(success => {
                        this.modelo = new Modelo();
                        this.marca = new Marca();
                    })
                    .catch(error => {
                        console.log(error);
                    })
                })
                .catch(error => {
                    console.log(error);
                })
            },
            onClickExcluir(){
                console.log(this.marca);
                this.modeloClient.deletar(this.modelo.id)
                .then(success => {
                    this.modelo = new Modelo();
                    this.marca = new Marca();
                })
                .catch(error => {
                    console.log(error);
                })
            },
            findById(id: number){
                this.modeloClient.findById(id)
                .then(success => {
                    this.modelo = success
                    this.marca = success.marca
                })
                .catch(error => {
                    console.log(error);
                })
            },
            getListMarca()
            {
                this.marcaClient.findAtivo()
                .then(success => {
                    this.listMarca = success
                })
                .catch(error => {

                });
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