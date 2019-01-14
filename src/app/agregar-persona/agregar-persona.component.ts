import { Component, OnInit, OnDestroy } from '@angular/core';
import { PersonaService } from '../services/persona.service';
import { GestionPersonasComponent } from '../gestion-personas/gestion-personas.component';
import { PersonaImpl, PersonaId } from '../modelo/persona.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-agregar-persona',
  templateUrl: './agregar-persona.component.html',
  styleUrls: ['./agregar-persona.component.css']
})
export class AgregarPersonaComponent implements OnInit, OnDestroy {

  /*private persona: any = {
    pnombre: '', snombre: '', papellido: '', sapellido: '', edad: ''
  };*/
  private persona: PersonaId = new PersonaImpl;
  private crearSubscription: Subscription;
  private showAlert: boolean = false;
  private tipoAlerta: string = '';
  private tituloAlerta: string = '';
  private mensajeAlerta: string = '';

  constructor(private _service: PersonaService, private gestionPersonaComp: GestionPersonasComponent) { }

  public ngOnInit(): void {
    this.crearSubscription = this._service.crearPersonaSubscription().subscribe(
      pNueva => { },
      error => {
        this.tipoAlerta = 'alert-danger';
        this.tituloAlerta = 'Error!';
        this.mensajeAlerta = 'Ha ocurrido un error inesperado';
        this.showAlert = true;
        console.log('Ocurrió un error al crear la persona:');
        console.log(error);
      },
      () => {
        this.limpiarCampos();
        this.tipoAlerta = 'alert-success';
        this.tituloAlerta = '';
        this.mensajeAlerta = 'Persona creada';
        this.showAlert = true;

        this.gestionPersonaComp.reloadLista();
        console.log('Persona creada.');
      }
    );
  }

  public agregar() {
    let isValid = this._service.validarPersona(this.persona);

    if (!isValid) {
      this.tipoAlerta = 'alert-warning';
      this.tituloAlerta = 'Atención!';
      this.mensajeAlerta = 'Los campos con * son obligatorios';
      this.showAlert = true;
    } else {
      this._service.crearPersona(this.persona);
    }
  }

  public limpiar(): void {
    this.limpiarCampos();
    this.limpiarAlerta();
  }

  public limpiarCampos(): void {
    this.persona.pnombre = null;
    this.persona.snombre = null;
    this.persona.papellido = null;
    this.persona.sapellido = null;
    this.persona.edad = null;
  }

  public limpiarAlerta(): void {
    this.showAlert = false;
    this.tipoAlerta = 'alert-info';
    this.tituloAlerta = '';
    this.mensajeAlerta = '';
  }

  public ngOnDestroy(): void {
    this.crearSubscription.unsubscribe();
  }

}
