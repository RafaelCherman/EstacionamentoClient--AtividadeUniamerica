<template>
    <nav-component></nav-component>

    <div class="container">
        <div class="row">
            <div class="col-md-4 offset-md-4">
                <p class="titulo">Configuração</p>
            </div>
        </div>

        <div class="row">
            <div class="col-md-12 text-start">
                <alert-component :ativo="mensagem.ativo" :mensagem="mensagem.conteudo" :titulo="mensagem.titulo" :estilo="mensagem.estilo"></alert-component>
            </div>
        </div>
    

        <div class="row">
            <div class="col-md-3 offset-md-3 text-start">
                <label>Inicio de Expediente</label>
                <input type="time" min="00:00" max="23:59" class="form-control" v-model="inicioS">                    
            </div>
            <div class="col-md-3 text-start">
                <label>Fim de Expediente</label>
                <input type="time" min="00:00" max="23:59" class="form-control" v-model="fimS">                    
            </div>
        </div>

        <div class="row">
            <div class="col-md-3 offset-md-3 text-start">
                <label>Valor da Hora</label>
                <input type="number" min="0" step=".01" class="form-control" v-model="config.valorHora">                    
            </div>
            <div class="col-md-3 text-start">
                <label>Valor da Multa</label>
                <input type="number" min="0" step=".01" class="form-control" v-model="config.valorMinutoMulta">                    
            </div>
        </div>

        <div class="row">

            <div class="col-md-6 offset-md-3 d-flex flex-column ">
                <label>Gerar Desconto</label>
                <input type="checkbox" v-model="config.gerarDesconto">
                <label v-if="config.gerarDesconto">Ativo</label>
                <label v-if="!config.gerarDesconto">Inativo</label>                    
            </div>

        </div>

        <div class="row">
            
            <div class="col-md-3 offset-md-3 text-start">
                <label>Tempo de Desconto</label>
                <input type="number" min="0" class="form-control" v-model="config.tempoDeDesconto">                    
            </div>
            <div class="col-md-3 text-start">
                <label>Tempo para Desconto</label>
                <input type="number" min="0" class="form-control" v-model="config.tempoParaDesconto">                    
            </div>

        </div>

        <div class="row">
            
            <div class="col-md-2 offset-md-3 text-start">
                <label>Vagas de Carro</label>
                <input type="number" min="0" class="form-control" v-model="config.vagasCarro">                    
            </div>
            <div class="col-md-2 text-start">
                <label>Vagas de Moto</label>
                <input type="number" min="0" class="form-control" v-model="config.vagasMoto">                    
            </div>
            <div class="col-md-2 text-start">
                <label>Vagas de Van</label>
                <input type="number" min="0" class="form-control" v-model="config.vagasVan">                    
            </div>
            
        </div>


        <div class="row">
            <div class="col-md-3 offset-md-3">
                <router-link class="btn btn-info" type="button" to="/configuracao">Voltar</router-link>
            </div>
            <div class="col-md-3">
                <button v-if="this.form === undefined" class="btn btn-success" @click="onClickCadastrar">Cadastrar</button>
                <button v-if="this.form === 'editar'" class="btn btn-warning" @click="onClickEditar">Editar</button>
            </div>
        </div>
        
        
    </div>


    





    
</template>

<script lang="ts">

    import { defineComponent } from 'vue';
    import { Configuracao } from '@/model/configuracao';
    import { ConfiguracaoClient } from '@/client/confiugaracaoClient';
    import NavComponent from '@/components/NavComponent.vue';
    import AlertComponent from '@/components/AlertComponent.vue';

    export default defineComponent({
        name: 'MarcaCadastra',
        components:{
            NavComponent,
            AlertComponent
        },
        data(){
            return{
                config: new Configuracao(),
                configClient: new ConfiguracaoClient(),
                inicio: {
                    horas: '' as string,
                    minutos: '' as string
                },
                fim: {
                    horas: '' as string,
                    minutos: '' as string
                },
                inicioS: '' as string,
                fimS: '' as string,
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
            }
            
            
        },
        methods: {
            onClickCadastrar(){
                this.convertDate();



                this.configClient.cadastrar(this.config)
                .then(success => {

                    this.fimS = '';
                    this.inicioS = '';
                    this.config = new Configuracao();

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
                this.convertDate();
                
                this.configClient.editar(this.config.id, this.config)
                .then(success => {
                    
                    this.fimS = '';
                    this.inicioS = '';
                    this.config = new Configuracao();

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
            findById(id: number){
                this.configClient.findById(id)
                .then(success => {
                    this.config = success;
                    this.getTimes();
                    console.log("mounted");
                    console.log(this.config);

                    
                })
                .catch(error => {
                    console.log(error);
                })
            },
            convertDate()
            {
            

                this.config.inicioExpediente = new Date("2023-01-01T"+this.inicioS+":00");
                this.config.fimExpediente = new Date("2023-01-01T"+this.fimS+":00");
            
                
            },
            getTimes()
            {
                let ai = new Array(this.config.inicioExpediente);
                let j = Object.values (ai[0]);
                
                let i = new Date(Number (j[0]), Number (j[1])-1, Number (j[2]), Number (j[3])-3, Number (j[4]));
                this.inicio.horas = String (i.getHours());
                this.inicio.minutos = String (i.getMinutes());

                if(Number (this.inicio.horas) < 10)
                {
                    this.inicio.horas = "0"+this.inicio.horas;
                }
                if(Number (this.inicio.minutos) < 10)
                {
                    this.inicio.minutos = "0"+this.inicio.minutos;
                }
                console.log(i)
                
                ai = new Array(this.config.fimExpediente);
                j = Object.values (ai[0])
                
                i = new Date(Number (j[0]), Number (j[1])-1, Number (j[2]), Number (j[3])-3, Number (j[4]));
                this.fim.horas = String (i.getHours());
                this.fim.minutos = String (i.getMinutes());

                if(Number (this.fim.horas) < 10)
                {
                    this.fim.horas = "0"+this.fim.horas;
                }
                if(Number (this.fim.minutos) < 10)
                {
                    this.fim.minutos = "0"+this.fim.minutos;
                }
                

                
                this.inicioS = this.inicio.horas +":"+ this.inicio.minutos;
                this.fimS = this.fim.horas +":"+ this.fim.minutos;
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