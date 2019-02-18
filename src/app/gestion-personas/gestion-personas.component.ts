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

  private listaPersonas: Array<PersonaId>;
  private personaDelete: PersonaId = new PersonaImpl;
  private listaSubscription: Subscription;
  private borrarSubscription: Subscription;

  constructor(private _service: PersonaService) { }

  ngOnInit() {
    this.listarPersonas();
  }

  private listarPersonas(): void {
    if (this.listaSubscription) {
      this.listaSubscription.unsubscribe();
    }
    this.listaSubscription = this._service.cargarPersonas().subscribe(
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
        console.log('recargando la lista, pues se eliminó una pesona.'); 
        this.reloadLista();
      },
      error => console.log('Se presentó un error al borrar la persona: ' + error),
      () => console.log('Proceso borrado de persona terminado.')
    );
  }

  public reloadLista(): void {
    this.listarPersonas();
  }

  public ngOnDestroy(): void {
    this.listaSubscription.unsubscribe();
    this.borrarSubscription.unsubscribe();
  }

}
