import axios, {AxiosInstance} from "axios";
import { Modelo } from "@/model/modelo";
import { Marca } from "@/model/marca";

export class ModeloClient {

    private axiosClient: AxiosInstance;

    constructor(){
        this.axiosClient = axios.create(
            {
                baseURL: 'http://localhost:8080/api/modelo',
                headers: {'Content-Type' : 'application/json'}
            }
        )
    }

    public async findMarcaByNome(nome: string) : Promise<Marca> {
        try {
            return (await this.axiosClient.get<Marca>(`/marca/${nome}`)).data;
        } 
        catch (error:any) {
            return Promise.reject(error.response);
        }
    }

    public async findById(id: number) : Promise<Modelo> {
        try {
            return (await this.axiosClient.get<Modelo>(`/${id}`)).data;
        } 
        catch (error:any) {
            return Promise.reject(error.response);
        }
    }

    public async listAll() : Promise<Modelo[]> {
        try {
            return (await this.axiosClient.get<Modelo[]>(`/lista`)).data;
        } 
        catch (error:any) {
            return Promise.reject(error.response);
        }
    }

    public async findAtivo() : Promise<Modelo[]> {
        try {
            return (await this.axiosClient.get<Modelo[]>(`/ativo`)).data;
        } 
        catch (error:any) {
            return Promise.reject(error.response);
        }
    }

    public async cadastrar(modelo: Modelo) : Promise<string> {
        try {
            return (await this.axiosClient.post<string>(``, modelo)).data;
        } 
        catch (error:any) {
            return Promise.reject(error.response);
        }
    }

    public async editar(id: number, modelo: Modelo) : Promise<string> {
        try {
            return (await this.axiosClient.put<string>(`/${id}`, modelo)).data;
        } 
        catch (error:any) {
            return Promise.reject(error.response);
        }
    }

    public async deletar(id:number) : Promise<string> {
        try {
            return (await this.axiosClient.delete<string>(`/${id}`)).data;
        } 
        catch (error:any) {
            return Promise.reject(error.response);
        }
    }


}