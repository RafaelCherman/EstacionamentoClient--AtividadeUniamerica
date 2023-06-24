import axios, {AxiosInstance} from "axios";
import { Veiculo } from "@/model/veiculo";
import { Modelo } from "@/model/modelo";

export class VeiculoClient {

    private axiosClient: AxiosInstance;

    constructor(){
        this.axiosClient = axios.create(
            {
                baseURL: 'http://localhost:8080/api/veiculo',
                headers: {'Content-Type' : 'application/json'}
            }
        )
    }

    public async findModeloByNome(nome: string) : Promise<Modelo> {
        try {
            return (await this.axiosClient.get<Modelo>(`/modelo/${nome}`)).data;
        } 
        catch (error:any) {
            return Promise.reject(error.response);
        }
    }

    public async findById(id: number) : Promise<Veiculo> {
        try {
            return (await this.axiosClient.get<Veiculo>(`/${id}`)).data;
        } 
        catch (error:any) {
            return Promise.reject(error.response);
        }
    }

    public async listAll() : Promise<Veiculo[]> {
        try {
            return (await this.axiosClient.get<Veiculo[]>(`/lista`)).data;
        } 
        catch (error:any) {
            return Promise.reject(error.response);
        }
    }

    public async findAtivo() : Promise<Veiculo[]> {
        try {
            return (await this.axiosClient.get<Veiculo[]>(`/ativo`)).data;
        } 
        catch (error:any) {
            return Promise.reject(error.response);
        }
    }

    public async cadastrar(veiculo: Veiculo) : Promise<string> {
        try {
            return (await this.axiosClient.post<string>(``, veiculo)).data;
        } 
        catch (error:any) {
            return Promise.reject(error.response);
        }
    }

    public async editar(id: number, veiculo: Veiculo) : Promise<string> {
        try {
            return (await this.axiosClient.put<string>(`/${id}`, veiculo)).data;
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