import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { enviroment } from 'src/enviroments/enviroments';
import { Estado } from '../interfaces/Estado';

@Injectable({
  providedIn: 'root'
})
export class EstadoService {

  api =enviroment.API
  constructor(private http: HttpClient) { }
  
  cargarEstado(){
    return this.http.get<Estado[]>(`${this.api}Estadoes`);
  }
  crearEstado(estado: Estado){
    return this.http.post<Estado[]>(`${this.api}Estadoes`,estado);
  }
  actualizarEstado(estado:Estado){
    return this.http.put(`${this.api}Estadoes`,estado)
  }
  eliminarEstado(idEstado:number){
    return this.http.delete(`${this.api}Estadoes/${idEstado}`)
  }

}
