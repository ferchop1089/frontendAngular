import { Component, OnInit } from '@angular/core';
import { PersonaService } from '../services/persona.service';

@Component({
  selector: 'app-agregar-persona',
  templateUrl: './agregar-persona.component.html',
  styleUrls: ['./agregar-persona.component.css']
})
export class AgregarPersonaComponent implements OnInit {

  private persona: any = {
    pnombre: '', snombre: '', papellido: '', sapellido: '', edad: ''
  };
  private showAlert: boolean = false;
  private tipoAlerta: string = '';
  private tituloAlerta: string = '';
  private mensajeAlerta: string = '';

  constructor(private _service: PersonaService) { }

  ngOnInit() {
  }

  public agregar() {
    let isValid = this._service.validarPersona(this.persona);

    if (!isValid) {
      this.tipoAlerta = 'alert-warning';
      this.tituloAlerta = 'Atención!';
      this.mensajeAlerta = 'Los campos con * son obligatorios';
      this.showAlert = true;
    } else {
      this._service.crearPersona(this.persona).subscribe(
        personaNueva => {
          this.limpiarCampos();
          this.tipoAlerta = 'alert-success';
          this.tituloAlerta = '';
          this.mensajeAlerta = 'Persona creada';
          this.showAlert = true;
        },
        err => {
          this.tipoAlerta = 'alert-danger';
          this.tituloAlerta = 'Error!';
          this.mensajeAlerta = 'Ha ocurrido un error inesperado';
          this.showAlert = true;
          console.log('Ocurrió un error al crear la persona:');
          console.log(err);
        }
      );
    }

    /*if (this.isValid) {
      this._service.crearPersona(this.persona);
    } else {
      this.mensaje = 'Los campos con * son obligatorios';
    }*/
  }

  public limpiar(): void {
    this.limpiarCampos();
    this.limpiarAlerta();
  }

  public limpiarCampos(): void {
    this.persona.pnombre = '';
    this.persona.snombre = '';
    this.persona.papellido = '';
    this.persona.sapellido = '';
    this.persona.edad = '';
  }

  public limpiarAlerta(): void {
    this.showAlert = false;
    this.tipoAlerta = 'alert-info';
    this.tituloAlerta = '';
    this.mensajeAlerta = '';
  }

}
