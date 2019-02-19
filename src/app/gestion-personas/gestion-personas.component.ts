import { Component, OnInit, OnDestroy } from '@angular/core';
import { PersonaService } from '../services/persona.service';
import { PersonaId, PersonaImpl } from "../modelo/persona.model";
import { Observable, Subscription } from 'rxjs';

declare var jquery: any;
declare var $: any;

@Component({
  selector: 'app-gestion-personas',
  templateUrl: './gestion-personas.component.html',
  styleUrls: ['./gestion-personas.component.css']
})
export class GestionPersonasComponent implements OnInit, OnDestroy {

  private listaPersonas: Array<PersonaId>;
  private personaDelete: PersonaId = new PersonaImpl;
  private listaSubscription: Subscription;
  private borrarSubscription: Subscription;

  private showAlertDelete: boolean = false;
  private tipoAlerta: string = '';
  private tituloAlerta: string = '';
  private mensajeAlerta: string = '';
  private textoBotonCancelarModelEliminar: string = 'Cancelar';

  constructor(private _service: PersonaService) { }

  ngOnInit() {
    $("#botonEliminar").change(function () {
      console.log('Paso');
    });
    this.listarPersonas();
  }

  private listarPersonas(): void {
    if (this.listaSubscription) {
      this.listaSubscription.unsubscribe();
    }
    this.listaSubscription = this._service.listarPersonas().subscribe(
      lista => {
        this.listaPersonas = lista;
        console.log('Datos pasados a listaPersonas:', this.listaPersonas);
      },
      error => console.log('Se presentó un error al cargar la lista:', error),
      () => console.log('Proceso lista personas terminado.')
    );
  }

  public preDelete(persona: PersonaId): void {
    this.personaDelete = persona;
    console.log(this.personaDelete);
  }

  public deletePersona(): void {
    if (this.borrarSubscription) {
      this.borrarSubscription.unsubscribe();
    }
    this.borrarSubscription = this._service.borrarPersona(this.personaDelete).subscribe(
      data => {
        this.mensajeEliminacionOK();
        this.reloadLista();
      },
      error => {
        console.log('Se presentó un error al borrar la persona: ', error);
        this.mensajeEliminacionFail();
      },
      () => console.log('Proceso borrado de persona terminado.')
    );
  }

  public cerrarBorrarPersonaModal(): void {
    this.desabilitarBoton(false);
    this.showAlertDelete = false;
    this.tipoAlerta = 'alert-success';
    this.tituloAlerta = '';
    this.mensajeAlerta = '';
    this.textoBotonCancelarModelEliminar = 'Cancelar';
  }

  private mensajeEliminacionOK(): void {
    this.desabilitarBoton(true);
    this.tipoAlerta = 'alert-success';
    this.tituloAlerta = '';
    this.mensajeAlerta = 'Persona eliminada';
    this.showAlertDelete = true;
    this.textoBotonCancelarModelEliminar = 'Cerrar';
  }

  private mensajeEliminacionFail(): void {
    this.desabilitarBoton(true);
    this.tipoAlerta = 'alert-danger';
    this.tituloAlerta = 'Error!';
    this.mensajeAlerta = 'Ha ocurrido un error inesperado';
    this.showAlertDelete = true;
    this.textoBotonCancelarModelEliminar = 'Cerrar';
  }

  private desabilitarBoton(disabled: boolean): void {
    $(document).ready(function () {
      $("#botonEliminar").prop('disabled', disabled);  // That's it... Model will close. 
    });
  }

  public reloadLista(): void {
    this.listarPersonas();
  }

  public ngOnDestroy(): void {
    this.listaSubscription.unsubscribe();
    this.borrarSubscription.unsubscribe();
  }

}
