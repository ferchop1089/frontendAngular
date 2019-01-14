import { Component, OnInit, OnDestroy } from '@angular/core';
import { PersonaService } from '../services/persona.service';
import { PersonaId, PersonaImpl } from "../modelo/persona.model";
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-gestion-personas',
  templateUrl: './gestion-personas.component.html',
  styleUrls: ['./gestion-personas.component.css']
})
export class GestionPersonasComponent implements OnInit, OnDestroy {

  /*private listaPersonas:any[] = [
    { pnombre: 'Eduard', snombre: null, papellido: 'Carvajal', sapellido:'Cuéllar', edad: '29' },
    { pnombre: 'Maria', snombre: 'Fernanda', papellido: 'Castro', sapellido:'Cuarán', edad: '25' },
    { pnombre: 'Mónica', snombre: '', papellido: 'Carvajal', sapellido:'', edad: '28' },
  ];*/
  private listaPersonas: Array<PersonaId>;
  private personaDelete: PersonaId = new PersonaImpl;
  private listaSubscription: Subscription;
  private borrarSubscription: Subscription;

  constructor(private _service: PersonaService) { }

  ngOnInit() {
    this.listaSubscription = this._service.cargarPersonasSubscription().subscribe(
      lista => this.listaPersonas = lista,
      error => console.log('Se presentó un error al cargar la lista: ' + error),
      () => console.log('Proceso carga de lista terminado')
    );
    this.borrarSubscription = this._service.borrarPersonaSubscription().subscribe(
      dato => { },
      error => console.log('Se presentó un error al borrar la persona: ' + error),
      () => console.log('Proceso borrado de persona terminado')
    );
    this._service.cargarPersonas();
  }

  public preDelete(persona: PersonaId): void {
    this.personaDelete = persona;
    console.log(this.personaDelete);
  }

  public deletePersona(): void {
    this._service.borrarPersona(this.personaDelete);
  }

  public reloadLista(): void {
    this._service.reloadPersonas();
  }


  public ngOnDestroy(): void {
    this.listaSubscription.unsubscribe();
    this.borrarSubscription.unsubscribe();
  }

}
