<template>
      <nav-component></nav-component>
    <div class="container">
    
        <div class="row">
            <div class="col-md-4">
                <p class="titulo">Configurações</p>
            </div>
            <div class="col-md-4 offset-md-4">
                <router-link v-if="config.ativo == undefined" type="button" class="btn btn-success" to="/configuracaocadastra">
                    Cadastrar Configuração
                </router-link>
                <router-link v-else type="button" class="btn btn-warning" :to="{name: `configuracao-cadastra-editar`, query: {id: config.id, form: `editar`}}">
                    Editar Configuração
                </router-link>
            </div>
        </div>

        <div class="row">
            <div class="col-md-12">
                <table class="table table-bordered">
                    <thead class="table-secondary">
                        <tr>
                            <th scope="col">Configuração</th>
                            <th scope="col">Valor</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td class="col-md-6">
                                <span> Inicio do Expediente </span>
                            </td>
                            <td class="col-md-6">
                                <span v-if="config.inicioExpediente != undefined">{{ inicio.horas+":"+inicio.minutos }}</span>
                                <span v-else>Sem cadastro</span>
                            </td>
                        </tr>
                        <tr>
                            <td class="col-md-6">
                                <span> Fim do Expediente </span>
                            </td>
                            <td class="col-md-6">
                                <span v-if="config.fimExpediente != undefined">{{ fim.horas+":"+fim.minutos  }}</span>
                                <span v-else>Sem cadastro</span>
                            </td>
                        </tr>
                        <tr>
                            <td class="col-md-6">
                                <span> Valor da Hora </span>
                            </td>
                            <td class="col-md-6">
                                <span v-if="config.valorHora != undefined">{{ "R$"+config.valorHora }}</span>
                                <span v-else>Sem cadastro</span>
                            </td>
                        </tr>
                        <tr>
                            <td class="col-md-6">
                                <span> Valor da Multa </span>
                            </td>
                            <td class="col-md-6">
                                <span v-if="config.valorMinutoMulta != undefined">{{ "R$"+config.valorMinutoMulta }}</span>
                                <span v-else>Sem cadastro</span>
                            </td>
                        </tr>
                        <tr>
                            <td class="col-md-6">
                                <span> Gerar Desconto </span>
                            </td>
                            <td class="col-md-6">
                                <span v-if="config.gerarDesconto">Ativo</span>
                                <span v-else>Inativo</span>
                            </td>
                        </tr>
                        <tr>
                            <td class="col-md-6">
                                <span> Tempo de Desconto </span>
                            </td>
                            <td class="col-md-6">
                                <span v-if="config.tempoDeDesconto != undefined">{{ config.tempoDeDesconto+" horas" }}</span>
                                <span v-else>Sem cadastro</span>
                            </td>
                        </tr>
                        <tr>
                            <td class="col-md-6">
                                <span> Tempo para Desconto </span>
                            </td>
                            <td class="col-md-6">
                                <span v-if="config.tempoParaDesconto != undefined">{{ config.tempoParaDesconto+" horas"  }}</span>
                                <span v-else>Sem cadastro</span>
                            </td>
                        </tr>
                        <tr>
                            <td class="col-md-6">
                                <span> Vagas de Carro </span>
                            </td>
                            <td class="col-md-6">
                                <span v-if="config.vagasCarro != undefined">{{ config.vagasCarro }}</span>
                                <span v-else>Sem cadastro</span>
                            </td>
                        </tr>
                        <tr>
                            <td class="col-md-6">
                                <span> Vagas de Moto </span>
                            </td>
                            <td class="col-md-6">
                                <span v-if="config.vagasMoto != undefined">{{ config.vagasMoto }}</span>
                                <span v-else>Sem cadastro</span>
                            </td>
                        </tr>
                        <tr>
                            <td class="col-md-6">
                                <span> Vagas de Van </span>
                            </td>
                            <td class="col-md-6">
                                <span v-if="config.vagasVan != undefined">{{ config.vagasVan }}</span>
                                <span v-else>Sem cadastro</span>
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
    import { Configuracao } from '@/model/configuracao';
    import { ConfiguracaoClient } from '@/client/confiugaracaoClient';
    import NavComponent from '@/components/NavComponent.vue';
    import OpcsComponent from '@/components/OpcsComponent.vue';
    
    export default defineComponent({
        name: 'MarcaLista',
        components: {
        NavComponent,
        OpcsComponent
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
            }
            
        }
        },
        methods: {
            encheLista()
            {
                this.configClient.getAll()
                .then(
                success => {
                    this.config = success;
                    this.getTimes();
                })
                .catch(error => {
                    console.log(error);
                })
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

                console.log(this.fim.horas)

            
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
  