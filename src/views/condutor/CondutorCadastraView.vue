<template>
    <nav-component></nav-component>
    <div class="container">
        <div class="row">
            <div class="col-md-4 offset-md-4">
                <p class="titulo">Condutor</p>
            </div>
        </div>

        <div class="row">
            <div class="col-md-6 offset-md-3 text-start">
                <label for="inputNome">Nome</label>
                <input :disabled="this.form === 'deletar' ? '' : disabled" type="text" class="form-control" id="inputNome" v-model="condutor.nome">
                    
            </div>
        </div>

        <div class="row">
            <div class="col-md-6 offset-md-3 text-start">
                <label for="inputCpf">CPF</label>
                <input :disabled="this.form === 'deletar' ? '' : disabled" type="text" class="form-control" id="inputCpf" v-model="condutor.cpf">
                    
            </div>
        </div>

        <div class="row">
            <div class="col-md-6 offset-md-3 text-start">
                <label for="inputTelefone">Telefone</label>
                <input :disabled="this.form === 'deletar' ? '' : disabled" type="text" class="form-control" id="inputTelefone" v-model="condutor.telefone">
                    
            </div>
        </div>

        <div class="row">
            <div class="col-md-3 offset-md-3">
                <router-link class="btn btn-info" type="button" to="/condutor">Voltar</router-link>
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
    import { Condutor } from '@/model/condutor';
    import { CondutorClient } from '@/client/condutorClient';
    import { defineComponent } from 'vue';
    import NavComponent from '@/components/NavComponent.vue';

    export default defineComponent({
        name: 'CondutorCadastra',
        components: {
            NavComponent
        },
        data(){
            return{
                condutor: new Condutor(),
                condutorClient: new CondutorClient()
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
                console.log(this.condutor);
            }
            
        },
        methods: {
            onClickCadastrar(){
                this.condutorClient.cadastrar(this.condutor)
                .then(success => {
                    this.condutor = new Condutor();
                })
                .catch(error => {
                    console.log(error);
                })
            },
            onClickEditar(){
                console.log(this.condutor);
                this.condutorClient.editar(this.condutor.id, this.condutor)
                .then(success => {
                    this.condutor = new Condutor();
                })
                .catch(error => {
                    console.log(error);
                })
            },
            onClickExcluir(){
                console.log(this.condutor);
                this.condutorClient.deletar(this.condutor.id)
                .then(success => {
                    this.condutor = new Condutor();
                })
                .catch(error => {
                    console.log(error);
                })
            },
            findById(id: number){
                this.condutorClient.findById(id)
                .then(success => {
                    this.condutor = success
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