<template>
    <nav-component></nav-component>
    <div class="container">
        <div class="row">
            <div class="col-md-4 offset-md-4">
                <p class="titulo">Condutor</p>
            </div>
        </div>

        <div class="row">
            <div class="col-md-12 text-start">
                <alert-component :ativo="mensagem.ativo" :mensagem="mensagem.conteudo" :titulo="mensagem.titulo" :estilo="mensagem.estilo"></alert-component>
            </div>
        </div>
    
        <div class="row">
            <div class="col-md-6 offset-md-3 text-start">
                <label for="inputNome">Nome</label>
                <input :disabled="this.form === 'deletar' ? '' : disabled" type="text" placeholder="Pedro da Silva" class="form-control" id="inputNome" v-model="condutor.nome">   
            </div>
        </div>

        <div class="row">
            <div class="col-md-6 offset-md-3 text-start">
                <label for="inputCpf">CPF</label>
                <input :disabled="this.form === 'deletar' ? '' : disabled" type="text" placeholder="999.999.999-99" class="form-control" id="inputCpf" v-model="condutor.cpf">
                    
            </div>
        </div>

        <div class="row">
            <div class="col-md-6 offset-md-3 text-start">
                <label for="inputTelefone">Telefone</label>
                <input :disabled="this.form === 'deletar' ? '' : disabled" type="text" placeholder="99 99999-9999" class="form-control" id="inputTelefone" v-model="condutor.telefone">
                    
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
    import AlertComponent from '@/components/AlertComponent.vue';

    export default defineComponent({
        name: 'CondutorCadastra',
        components: {
            NavComponent,
            AlertComponent
        },
        data(){
            return{
                condutor: new Condutor(),
                condutorClient: new CondutorClient(),
                mensagem: {
                    titulo: '' as string,
                    conteudo: '' as string,
                    estilo: '' as string,
                    ativo: false as boolean
                }
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

                    this.mensagem.ativo = true;
                    this.mensagem.conteudo = success;
                    this.mensagem.titulo = "Parabens "
                    this.mensagem.estilo = "alert alert-success alert-dismissible fade show";
                })
                .catch(error => {
                    this.mensagem.ativo = true;
                    this.mensagem.conteudo = error.data;
                    this.mensagem.titulo = "Erro "
                    this.mensagem.estilo = "alert alert-danger alert-dismissible fade show";
                })
            },
            onClickEditar(){
                console.log(this.condutor);
                this.condutorClient.editar(this.condutor.id, this.condutor)
                .then(success => {
                    this.condutor = new Condutor();
                    
                    this.mensagem.ativo = true;
                    this.mensagem.conteudo = success;
                    this.mensagem.titulo = "Parabens "
                    this.mensagem.estilo = "alert alert-success alert-dismissible fade show";
                })
                .catch(error => {
                    this.mensagem.ativo = true;
                    this.mensagem.conteudo = error;
                    this.mensagem.titulo = "Erro "
                    this.mensagem.estilo = "alert alert-danger alert-dismissible fade show";
                })
            },
            onClickExcluir(){
                console.log(this.condutor);
                this.condutorClient.deletar(this.condutor.id)
                .then(success => {
                    this.condutor = new Condutor();

                    
                    this.$router.push({name: 'condutor-lista'})
                })
                .catch(error => {
                    this.mensagem.ativo = true;
                    this.mensagem.conteudo = error;
                    this.mensagem.titulo = "Erro "
                    this.mensagem.estilo = "alert alert-danger alert-dismissible fade show";
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