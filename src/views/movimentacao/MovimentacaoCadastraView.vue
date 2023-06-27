<template>
    <nav-component></nav-component>
    
    <div class="container">
        <div class="row">
            <div class="col-md-4 offset-md-4">
                <p class="titulo">Movimentação</p>
            </div>
        </div>

        <div class="row">
            <div class="col-md-12 text-start">
                <alert-component :ativo="mensagem.ativo" :mensagem="mensagem.conteudo" :titulo="mensagem.titulo" :estilo="mensagem.estilo"></alert-component>
            </div>
        </div>

        <div class="row">
            <div class="col-md-8 offset-md-2 text-start">
                <label for="inputNome">CPF do Condutor</label>
                <select :disabled="this.form === 'deletar' ? '' : disabled" class="form-select" v-model="condutor.cpf" @focusout="findCondutor(condutor.cpf)">
                    <option v-for="item in listCondutor" :value="item.cpf">{{ item.cpf }}</option>
                </select>
            </div>   
        </div>

        <div class="row">
            <div class="col-md-4 offset-md-2 text-start">
                <label>Nome</label>
                <input disabled type="text" class="form-control" v-model="condutor.nome">
            </div>
            <div class="col-md-4 text-start">
                <label>Telefone</label>
                <input disabled type="text" class="form-control" v-model="condutor.telefone">
            </div>
        </div>

        <div class="row">
            <div class="col-md-8 offset-md-2 text-start">
                <label for="inputNome">Placa do Veiculo</label>
                <select :disabled="this.form === 'deletar' ? '' : disabled" class="form-select" v-model="veiculo.placa" @focusout="findVeiculo(veiculo.placa)">
                    <option v-for="item in listVeiculo" :value="item.placa">{{ item.placa }}</option>
                </select>
            </div>
        </div>

        <div class="row">
            <div class="col-md-4 offset-md-2 text-start">
                <label>Modelo</label>
                <input disabled type="text" class="form-control" v-model="modelo.nome">
            </div>
            <div class="col-md-4 text-start">
                <label>Cor</label>
                <input disabled type="text" class="form-control" v-model="veiculo.cor">
            </div>
        </div>

        <div class="row">
            <div class="col-md-3 offset-md-3">
                <router-link class="btn btn-info" type="button" to="/movimentacao">Voltar</router-link>
            </div>
            <div class="col-md-3">
                
                <button v-if="this.form === undefined" class="btn btn-success" @click="onClickCadastrar">Cadastrar</button>
                <button v-if="this.form === 'deletar'" class="btn btn-danger" @click="onClickExcluir">Desativar</button>
                <button v-if="this.form === 'editar'" class="btn btn-warning" @click="onClickEditar">Editar</button>
            </div>
        </div>
    </div>
    
</template>

<script lang="ts">
    
    import { defineComponent } from 'vue'
    import { Movimentacao } from '@/model/movimentacao'
    import { MovimentacaoClient } from '@/client/movimentacaoClient'
    import { Condutor } from '@/model/condutor'
    import { CondutorClient } from '@/client/condutorClient'
    import { Veiculo } from '@/model/veiculo'
    import { VeiculoClient } from '@/client/veiculoClient'
    import { Modelo } from '@/model/modelo'
    import NavComponent from '@/components/NavComponent.vue'
    import AlertComponent from '@/components/AlertComponent.vue'

    export default defineComponent({
        name: 'MovimentacaoCadastra',
        components:{
            NavComponent,
            AlertComponent
        },
        data(){
            return{
                movimentacaoClient: new MovimentacaoClient(),
                movimentacao: new Movimentacao(),
                condutorClient: new CondutorClient(),
                condutor: new Condutor(),
                listCondutor: new Array<Condutor>(),
                veiculoClient: new VeiculoClient(),
                veiculo: new Veiculo(),
                listVeiculo: new Array<Veiculo>(),
                modelo: new Modelo(),
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

            this.getListCondutor();
            this.getListVeiculo();
        
            if(this.id !== undefined)
            {
                this.findById(Number(this.id));
            }
            
        },
        methods: {
            onClickCadastrar(){
                this.movimentacao.entrada = new Date();
                console.log(this.movimentacao.entrada)
                this.movimentacaoClient.cadastrar(this.movimentacao)
                .then(success => {
                    this.movimentacao = new Movimentacao();
                    this.condutor = new Condutor();
                    this.veiculo = new Veiculo();
                    this.modelo = new Modelo();
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
                console.log(this.movimentacao);
                this.movimentacaoClient.editar(this.movimentacao.id, this.movimentacao)
                .then(success => {
                    this.movimentacao = new Movimentacao();
                    this.condutor = new Condutor();
                    this.veiculo = new Veiculo();
                    this.modelo = new Modelo();
                    this.mensagem.ativo = true;
                    this.mensagem.conteudo = success;
                    this.mensagem.titulo = "Parabens "
                    this.mensagem.estilo = "alert alert-success alert-dismissible fade show";
                })
                .catch(error => {
                    this.mensagem.ativo = true;
                    this.mensagem.conteudo = error.data;
                    this.mensagem.titulo = "Erro "
                    this.mensagem.conteudo = error;
                    this.mensagem.estilo = "alert alert-danger alert-dismissible fade show";
                })
            },
            onClickExcluir(){
                console.log(this.movimentacao);
                this.movimentacaoClient.deletar(this.movimentacao.id)
                .then(success => {
                    this.movimentacao = new Movimentacao();
                    this.condutor = new Condutor();
                    this.veiculo = new Veiculo();
                    this.modelo = new Modelo();
                    this.$router.push({name: 'movimentacao-lista'})
                })
                .catch(error => {
                    this.mensagem.ativo = true;
                    this.mensagem.conteudo = error.data;
                    this.mensagem.titulo = "Erro "
                    this.mensagem.conteudo = error;
                    this.mensagem.estilo = "alert alert-danger alert-dismissible fade show";
                })
            },
            findById(id: number){
                this.movimentacaoClient.findById(id)
                .then(success => {
                    this.movimentacao = success
                    this.condutor = success.condutor
                    this.veiculo = success.veiculo
                    this.modelo = success.veiculo.modelo
                })
                .catch(error => {
                    console.log(error);
                })
            },
            findCondutor(cpf: string)
            {
                this.movimentacaoClient.findCondutorByCpf(cpf)
                .then(success => {
                    this.movimentacao.condutor = success;
                    this.condutor = success;
                    console.log(this.movimentacao.condutor.nome);
                    console.log(success.telefone);
                })
                .catch(error => {
                    console.log(error);
                })
            },
            findVeiculo(placa: string)
            {
                this.movimentacaoClient.findVeiculoByPlaca(placa)
                .then(success => {
                    this.movimentacao.veiculo = success;
                    this.veiculo = success;
                    this.modelo = success.modelo;
                })
                .catch(error => {
                    console.log(error);
                })
            },
            getListCondutor()
            {
                this.condutorClient.findAtivo()
                .then(success => {
                    this.listCondutor = success;
                })
                .catch(error => {
                    console.log(error);
                })
            },
            getListVeiculo()
            {
                this.veiculoClient.findAtivo()
                .then(success => {
                    this.listVeiculo = success;
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