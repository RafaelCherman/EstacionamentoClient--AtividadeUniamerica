import { AbstractEntity } from "./abstractentity";

export class Condutor extends AbstractEntity {
    nome! : string
    cpf! : string
    telefone! : string
    tempoPagoHora! : Number
    tempoPagoMinuto! : Number
    tempoDescontoHora! : Number
    tempoDescontoMinuto! : Number

    constructor(){
        super()
    }
    
}