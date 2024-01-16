import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { enviroment } from 'src/enviroments/enviroments';
import { Departamento } from '../interfaces/Departamento';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DepartamentosService {
API = enviroment.API;
  constructor(private http: HttpClient) { }
  cargarDepartamentos() { 
    return this.http.get<Departamento[]>(`${this.API}Departamentoes`);
  }

  crearDepartamentos(data:Departamento) {
    return this.http.post<Departamento[]>(`${this.API}Departamentoes`,data);
   }

  actualizarDepartamentos(idDepartamento:number,data:Departamento) { 
    return this.http.put<Departamento>(`${this.API}Departamentoes/${idDepartamento}`,data);
  }

  eliminarDepartamentos(idDepartamento:number) { 
    console.log(this.API + "Departamentoes/"+idDepartamento)
    return this.http.delete(`${this.API}Departamentoes/${idDepartamento}`);
  
  }

}
