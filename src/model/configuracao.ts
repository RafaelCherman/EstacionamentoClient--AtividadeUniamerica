import { AbstractEntity } from "./abstractentity";

export class Configuracao extends AbstractEntity{
    valorHora! : Number
    valorMinutoMulta! : Number
    inicioExpediente! : Date
    fimExpediente! : Date
    tempoParaDesconto! : Number
    tempoDeDesconto! : Number
    gerarDesconto! : boolean
    vagasMoto! : Number
    vagasCarro! : Number
    vagasVan! : Number

    constructor(){
        super()
    }
    
}