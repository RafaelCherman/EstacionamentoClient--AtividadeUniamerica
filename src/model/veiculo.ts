import { AbstractEntity } from "./abstractentity";
import { Modelo} from "./modelo";
import { Cor } from "./enum/cor";
import { Tipo } from "./enum/tipo";

export class Veiculo extends AbstractEntity{
    placa! : string
    modelo! : Modelo
    cor! : Cor
    tipo! : Tipo
    ano! : Number

    constructor(){
        super()
    }
}