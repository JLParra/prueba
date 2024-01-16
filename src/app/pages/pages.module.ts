import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagesComponent } from './pages.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { DepartamentosComponent } from './departamentos/departamentos.component';
import { EstadosComponent } from './estados/estados.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    PagesComponent,
    UsuariosComponent,
    DepartamentosComponent,
    EstadosComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class PagesModule { }
