import { Component, OnInit } from '@angular/core';
import { Departamento } from './interfaces/Departamento';
import { DepartamentosService } from './services/departamentos.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  public departamentos: Departamento[] = []
  public departamentoForm: FormGroup;
  nombreBoton: string = "Agregar";
  constructor(private fb: FormBuilder, private _sd: DepartamentosService) {
    this.departamentoForm = this.fb.group({
      idDepartamento: ['',],
      Nombre: ['', Validators.required]

    })
  }
  ngOnInit(): void {
    this.getInitialData()
  }
  getInitialData() {
    this._sd.cargarDepartamentos().subscribe(data => {
      this.departamentos = data;
      console.log(this.departamentos)
    })
  }

  agregar() {
    if (this.departamentoForm.invalid) {
      return
    }

    if (this.nombreBoton == "Agregar") {
      const data: any = {
        idDepartamento: 0,
        Nombre: this.departamentoForm.value.Nombre,
      }
      console.log(data)
      this._sd.crearDepartamentos(data).subscribe(data => {
        this.departamentos = data;
        this.getInitialData()
      });

    } else {
      const data: Departamento = {
        idDepartamento: this.departamentoForm.value.idDepartamento,
        nombre: this.departamentoForm.value.Nombre,
      }
      console.log(data)
      this._sd.actualizarDepartamentos(data.idDepartamento, data).subscribe(data => {
        this.getInitialData()
      });
    }

  }
  modificar(data: Departamento) {
    this.nombreBoton = "Modificar"
    this.departamentoForm.patchValue({
      idDepartamento: data.idDepartamento,
      Nombre: data.nombre
    })
  }
  eliminar(data:any) {
    console.log(data)
    this._sd.eliminarDepartamentos(data.idDepartamento)
  }

}
