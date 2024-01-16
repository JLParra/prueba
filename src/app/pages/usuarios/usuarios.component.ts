import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { map } from 'rxjs';
import { Estado } from 'src/app/interfaces/Estado';
import { Usuario } from 'src/app/interfaces/Usuarios';
import { EstadoService } from 'src/app/services/estado.service';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent {

  public usuarioForm: FormGroup;
  usuarios: Usuario[] = [];
  estados: Estado[] = [];
  nombreBoton: string = "Agregar";

  constructor(private fb: FormBuilder, private _userService: UsuariosService,private _estadoService:EstadoService) {
    this.usuarioForm = this.fb.group({
      idUsuario: [''],
      nombreUsuario: ['', Validators.required],
      idEstado: ['', Validators.required],
    });
  }
  ngOnInit(): void {
    this.getInitialData();
  }

  getInitialData() {
    this._estadoService.cargarEstado().subscribe(a => {
      this.estados = a
    })

    // this._userService.cargarUsuarios().subscribe(a => {
    //   this.usuarios = a
    // })
    this._userService.cargarUsuarios().pipe(
      map((usuarios) => usuarios.map (usuario => ({
        ...usuario, nombreEstado:this.estados.find
        (est => est.idEstado === usuario.idEstado)?.nombreEstado 
      })))
    )
    .subscribe(u => this.usuarios = u)
   
    console.log(this.usuarios)
  }
  selectEstado(event:any){
    if(event.target.value !=null){
      this.usuarioForm.patchValue({ idEstado: event.target.value });

    }
  }
  crearUsuario() {
    if (this.usuarioForm.invalid) {
      return
    }
   

    if (this.nombreBoton == "Agregar") {
      const data: Usuario = {
        idUsuarios: 0,
        nombreUsuario: this.usuarioForm.value.nombreUsuario,
        idEstado: this.usuarioForm.value.idEstado,
      }
      this._userService.crearUsuarios(data).subscribe(d => {
        this.usuarioForm.patchValue({ nombreUsuario: "", idEstado: '' })
        this.getInitialData()
      })

      this._userService.crearUsuarios(data)
    } else {
      const data: Usuario = {
        idUsuarios: this.usuarioForm.value.idUsuario|| 0,
        nombreUsuario: this.usuarioForm.value.nombreUsuario,
        idEstado: this.usuarioForm.value.idEstado,
      }
      if(data.idUsuarios != undefined) {
        this._userService.actualizarUsuarios(data.idUsuarios,data).subscribe(d => {
          this.usuarioForm.patchValue({ nombreUsuario: "", idEstado: '' })
          this.getInitialData();
          this.nombreBoton = "Agregar"
        });
      }
      

    }
  }
  modificar(row:Usuario) {
    this.nombreBoton = "Modificar";
    this.usuarioForm.patchValue({idUsuario:row.idUsuarios, nombreUsuario: row.nombreUsuario, idEstado: row.idEstado })
  }
  eliminar(row: number){
    console.log(row)
    if(row > 0){
     this._userService.eliminarUsuarios(row);
     this.getInitialData();
    }

  }
}
