import { AbstractEntity } from "./abstractentity";
import { Condutor } from "./condutor";
import { Veiculo } from "./veiculo";

export class Movimentacao extends AbstractEntity{
    veiculo! : Veiculo
    condutor! : Condutor
    entrada! : Date
    saida! : Date
    tempoHora! : Number
    tempoMinuto! : Number
    tempoDesconto! : Number
    tempoMultaHora! : Number
    tempoMultaMinuto! : Number
    valorDesconto! : Number
    valorMulta! : Number
    valorTotal! : Number
    valorHora! : Number
    valorHoraMulta! : Number

    constructor(){
        super()
    }
}