<template>
    <div class="container">
        <div class="row">
            <div class="col-md-4 offset-md-4">
                <p class="titulo">Nova Movimentacão</p>
            </div>
        </div>
        
        <div class="row">
            <div class="col-md-6 offset-md-3">
                
                    <div class="form-group">
                        <label for="inputVeiculo">Veiculo</label>
                        <input type="text" class="form-control" id="inputVeiculo" >
                    </div>
                    <div class="form-group">
                        <label for="inputCondutor">Condutor</label>
                        <input type="text" class="form-control" id="inputCondutor" v-model="condutor.cpf" @focusout="findCondutor(condutor.cpf)">
                    </div>
                    <button type="submit" class="btn btn-success">Cadastrar</button>
                
            </div>
        </div>
    </div>
</template>

<script lang="ts">
    
    import { defineComponent } from 'vue'
    import { Movimentacao } from '@/model/movimentacao'
    import { MovimentacaoClient } from '@/client/movimentacaoClient'
    import { Condutor } from '@/model/condutor'
    import { Veiculo } from '@/model/veiculo'

    export default defineComponent({
        name: 'MovimentacaoCadastra',
        data(){
            return{
                movimentacaoClient: new MovimentacaoClient(),
                movimentacao: new Movimentacao(),
                condutor: new Condutor(),
                veiculo: new Veiculo()
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
                this.movimentacaoClient.cadastrar(this.movimentacao)
                .then(success => {
                    this.movimentacao = new Movimentacao();
                })
                .catch(error => {
                    console.log(error);
                })
            },
            onClickEditar(){
                console.log(this.movimentacao);
                this.movimentacaoClient.editar(this.movimentacao.id, this.movimentacao)
                .then(success => {
                    this.movimentacao = new Movimentacao();
                })
                .catch(error => {
                    console.log(error);
                })
            },
            onClickExcluir(){
                console.log(this.movimentacao);
                this.movimentacaoClient.deletar(this.movimentacao.id)
                .then(success => {
                    this.movimentacao = new Movimentacao();
                })
                .catch(error => {
                    console.log(error);
                })
            },
            findById(id: number){
                this.movimentacaoClient.findById(id)
                .then(success => {
                    this.movimentacao = success
                })
                .catch(error => {
                    console.log(error);
                })
            },
            findCondutor(cpf: string)
            {
                this.movimentacaoClient.findCondutorByCpf(cpf)
                .then(success => {
                    console.log(success.nome);
                    console.log(success.telefone);
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