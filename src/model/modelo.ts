import { AbstractEntity } from "./abstractentity";
import { Marca } from "./marca";

export class Modelo extends AbstractEntity{
    marca! : Marca
    nome! : string

    constructor(){
        super()
    }
}