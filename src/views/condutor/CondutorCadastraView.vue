<template>
    <div class="container">
        <div class="row">
            <div class="col-md-4 offset-md-4">
                <p class="titulo">Novo Condutor</p>
            </div>
        </div>
        
        <div class="row">
            <div class="col-md-6 offset-md-3">
                
                    <div class="form-group">
                        <label for="inputNome">Nome</label>
                        <input type="text" class="form-control" id="inputNome" v-model="condutor.nome">
                    </div>
                    <div class="form-group">
                        <label for="inputCpf">CPF</label>
                        <input type="text" class="form-control" id="inputCpf" v-model="condutor.cpf">
                    </div>
                    <div class="form-group">
                        <label for="inputTelefone">Telefone</label>
                        <input type="text" class="form-control" id="inputTelefone" v-model="condutor.telefone">
                    </div>
                    <button class="btn btn-success" @click="onClickCadastrar">Cadastrar</button>
                    <button class="btn btn-success" @click="onClickExcluir">Excluir</button>
                    <button class="btn btn-success" @click="onClickEditar">Editar</button>
                
            </div>
        </div>
    </div>
</template>

<script lang="ts">
    import { Condutor } from '@/model/condutor';
    import { CondutorClient } from '@/client/condutorClient';
    import { defineComponent } from 'vue';

    export default defineComponent({
        name: 'CondutorCadastra',
        data(){
            return{
                condutor: new Condutor(),
                condoturClient: new CondutorClient()
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
                this.condoturClient.cadastrar(this.condutor)
                .then(success => {
                    this.condutor = new Condutor();
                })
                .catch(error => {
                    console.log(error);
                })
            },
            onClickEditar(){
                console.log(this.condutor);
                this.condoturClient.editar(this.condutor.id, this.condutor)
                .then(success => {
                    this.condutor = new Condutor();
                })
                .catch(error => {
                    console.log(error);
                })
            },
            onClickExcluir(){
                console.log(this.condutor);
                this.condoturClient.deletar(this.condutor.id)
                .then(success => {
                    this.condutor = new Condutor();
                })
                .catch(error => {
                    console.log(error);
                })
            },
            findById(id: number){
                this.condoturClient.findById(id)
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