import axios, {AxiosInstance} from "axios";
import { Movimentacao} from "@/model/movimentacao";
import { Veiculo } from "@/model/veiculo";
import { Condutor } from "@/model/condutor";

export class MovimentacaoClient {

    private axiosClient: AxiosInstance;

    constructor(){
        this.axiosClient = axios.create(
            {
                baseURL: 'http://localhost:8080/api/movimentacao',
                headers: {'Content-Type' : 'application/json'}
            }
        )
    }

    public async findVeiculoByPlaca(placa: string) : Promise<Veiculo> {
        try {
            return (await this.axiosClient.get<Veiculo>(`/placa/${placa}`)).data;
        } 
        catch (error:any) {
            return Promise.reject(error.response);
        }
    }

    public async findCondutorByCpf(cpf: string) : Promise<Condutor> {
        try {
            return (await this.axiosClient.get<Condutor>(`/cpf/${cpf}`)).data;
        } 
        catch (error:any) {
            return Promise.reject(error.response);
        }
    }

    public async findById(id: number) : Promise<Movimentacao> {
        try {
            return (await this.axiosClient.get<Movimentacao>(`/${id}`)).data;
        } 
        catch (error:any) {
            return Promise.reject(error.response);
        }
    }

    public async listAll() : Promise<Movimentacao[]> {
        try {
            return (await this.axiosClient.get<Movimentacao[]>(`/lista`)).data;
        } 
        catch (error:any) {
            return Promise.reject(error.response);
        }
    }

    public async findAberto() : Promise<Movimentacao[]> {
        try {
            return (await this.axiosClient.get<Movimentacao[]>('/aberto')).data;
        } 
        catch (error:any) {
            return Promise.reject(error.response);
        }
    }

    public async cadastrar(movimentacao: Movimentacao) : Promise<string> {
        try {
            return (await this.axiosClient.post<string>(``, movimentacao)).data;
        } 
        catch (error:any) {
            return Promise.reject(error.response);
        }
    }

    public async editar(id: number, movimentacao: Movimentacao) : Promise<string> {
        try {
            return (await this.axiosClient.put<string>(`/${id}`, movimentacao)).data;
        } 
        catch (error:any) {
            return Promise.reject(error.response);
        }
    }

    public async fechar(id: number, movimentacao: Movimentacao) : Promise<string> {
        try {
            return (await this.axiosClient.put<string>(`/fecha/${id}`, movimentacao)).data;
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