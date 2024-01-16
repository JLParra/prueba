import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Estado } from 'src/app/interfaces/Estado';
import { EstadoService } from 'src/app/services/estado.service';

@Component({
  selector: 'app-estados',
  templateUrl: './estados.component.html',
  styleUrls: ['./estados.component.css']
})
export class EstadosComponent implements OnInit {
  public estadoForm:FormGroup;
  estados:Estado []= []
  nombreBoton:string = "Agregar";
  title = 'WebApplication2_front';

  constructor(private fb:FormBuilder, private _estadoService:EstadoService) {
    this.estadoForm = this.fb.group({
      id:[''],
      nombre:['', Validators.required],
    })
  }
  ngOnInit(): void {
    this.getInitialData();
   
  }
  getInitialData() {
    this._estadoService.cargarEstado().subscribe(r => {
      this.estados = r;
      console.log(this.estados)
    })
  }

  agregar(){
    if(this.estadoForm.invalid) {
      return
    }
    if(this.nombreBoton =='Agregar') {
      const data: Estado ={
        nombreEstado:this.estadoForm.value.nombre
      }
      this._estadoService.crearEstado(data).subscribe( a => {
        this.estadoForm.patchValue({nombre:""})
        this.getInitialData();
      })
    }else {
      const data: Estado ={
        idEstado:this.estadoForm.value.id,
        nombreEstado:this.estadoForm.value.nombre
      }
      this.modificar(data);

    }
    
  }
  eliminar(data: Estado){
    console.log(data)
    if(data.idEstado != undefined) {
      this._estadoService.eliminarEstado(data.idEstado).subscribe(data => {
        this.estadoForm.patchValue({nombre:""})
        this.getInitialData();
      })
    }
   
  }

  modificar(data:Estado){
    console.log(data)
    this._estadoService.actualizarEstado(data).subscribe(data => {
      this.estadoForm.patchValue({nombre:""})
      this.getInitialData();
      this.nombreBoton="Agregar";
    })
  }
  modificarRegistro(row:Estado) {
    this.nombreBoton="Modificar";
    this.estadoForm.patchValue({id:row.idEstado,nombre:row.nombreEstado})
  }
}
