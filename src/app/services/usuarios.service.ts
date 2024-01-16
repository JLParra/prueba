import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { enviroment } from 'src/enviroments/enviroments';
import { Usuario } from '../interfaces/Usuarios';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {
API = enviroment.API
  constructor(private http : HttpClient) { }

  cargarUsuarios(){
return this.http.get<Usuario[]>(`${this.API}Usuarios`)
  }
  crearUsuarios(usuario:Usuario){
    return this.http.post<Usuario>(`${this.API}Usuarios`,usuario)
  }
  actualizarUsuarios(idUsuario:number,usuario:Usuario){
    return this.http.put<Usuario>(`${this.API}Usuarios/${idUsuario}`,usuario)
  }
  eliminarUsuarios(idUsuarios:number){
    console.log(idUsuarios)
    return this.http.delete(`${this.API}Usuarios/${idUsuarios}`)
  }
}
