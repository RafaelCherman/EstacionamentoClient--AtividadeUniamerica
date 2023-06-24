<template>
    <nav-component></nav-component>
    
    <div class="container">
        <div class="row">
            <div class="col-md-4 offset-md-4">
                <p class="titulo">Veiculo</p>
            </div>
        </div>

        <div class="row">
            <div class="col-md-6 offset-md-3 text-start">
                <label>Placa</label>
                <input :disabled="this.form === 'deletar' ? '' : disabled" type="text" class="form-control" v-model="veiculo.placa">             
            </div>
        </div>

        <div class="row">
            <div class="col-md-6 offset-md-3 text-start">
                <label>Ano</label>
                <input :disabled="this.form === 'deletar' ? '' : disabled" type="text" class="form-control" v-model="veiculo.ano">             
            </div>
        </div>


        <div class="row">
            <div class="col-md-6 offset-md-3 text-start">
                <label>Modelo</label>
                <select :disabled="this.form === 'deletar' ? '' : disabled" class="form-select" v-model="modelo.nome">
                    <option v-for="item in listModelo" :value="item.nome">{{ item.nome }}</option>
                </select>
            </div>
        </div>

        <div class="row">
            <div class="col-md-6 offset-md-3 text-start">
                <label>Cor</label>
                <select :disabled="this.form === 'deletar' ? '' : disabled" class="form-select" v-model="veiculo.cor">
                    <option v-for="item in cores" :value="item">{{ item }}</option>
                </select>
            </div>
        </div>

        <div class="row">
            <div class="col-md-6 offset-md-3 text-start">
                <label>Tipo</label>
                <select :disabled="this.form === 'deletar' ? '' : disabled" class="form-select" v-model="veiculo.tipo">
                    <option v-for="item in tipos" :value="item">{{ item }}</option>
                </select>
            </div>
        </div>

        <div class="row">
            <div class="col-md-3 offset-md-3">
                <router-link class="btn btn-info" type="button" to="/veiculo">Voltar</router-link>
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

    import { Modelo } from '@/model/modelo'
    import { Veiculo } from '@/model/veiculo'
    import { VeiculoClient } from '@/client/veiculoClient'
    import { ModeloClient } from '@/client/modeloClient'
    import { defineComponent } from 'vue'
    import NavComponent from '@/components/NavComponent.vue'

    import { Cor } from '@/model/enum/cor'
    import { Tipo } from '@/model/enum/tipo'

    export default defineComponent({
        name: 'VeiculoCadastra',
        components:{
            NavComponent
        },
        data(){
            return{
                modelo: new Modelo(),
                veiculo: new Veiculo(),
                veiculoClient: new VeiculoClient(),
                modeloClient: new ModeloClient(),
                listModelo: new Array<Modelo>(),
                cores: Cor,
                tipos: Tipo
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
            
            this.getListModelo();

            if(this.id !== undefined)
            {
                this.findById(Number(this.id));
            }
            
        },
        methods: {
            onClickCadastrar(){
                this.veiculoClient.findModeloByNome(this.modelo.nome)
                .then( success => { 
                    this.veiculo.modelo = success;

                    this.veiculoClient.cadastrar(this.veiculo)
                    .then(success => {
                        this.veiculo = new Veiculo();
                        this.modelo = new Modelo();
                    })
                    .catch(error => {
                        console.log(error);
                    })
                })
                .catch(error => {

                })
            },
            onClickEditar(){
                this.veiculoClient.findModeloByNome(this.modelo.nome)
                .then( success => { 
                    this.veiculo.modelo = success;

                    this.veiculoClient.editar(this.veiculo.id, this.veiculo)
                    .then(success => {
                        this.veiculo = new Veiculo();
                        this.modelo = new Modelo();
                    })
                    .catch(error => {
                        console.log(error);
                    })
                })
                .catch(error => {

                })

                
            },
            onClickExcluir(){
                console.log(this.veiculo);
                this.veiculoClient.deletar(this.veiculo.id)
                .then(success => {
                    this.veiculo = new Veiculo();
                    this.modelo = new Modelo();
                })
                .catch(error => {
                    console.log(error);
                })
            },
            findById(id: number){
                this.veiculoClient.findById(id)
                .then(success => {
                    this.veiculo = success
                    this.modelo = success.modelo
                })
                .catch(error => {
                    console.log(error);
                })
            },
            getListModelo()
            {
                this.modeloClient.findAtivo()
                .then(success => {
                    this.listModelo = success;
                })
                .catch(error =>{

                })
            }
            
        }
        
    })

</script>

<style scoped lang="scss">

    .container
    {
      margin: 50px;
    }
    
    form{
        display: flex;
        flex-direction: column;
        align-items: space-between;
    }
    form .btn{
        margin-top: 20px;
        width: 100px;
    }

    form .form-group
    {
        display: flex;
        flex-direction: column;
        align-items: start;
    }

    .titulo
    {
      font-weight: bold;
      font-size: 30px;
    }

    

</style>