import { Component, OnInit } from '@angular/core';
import { PersonaService } from '../services/persona.service';
import { PersonaId, PersonaImpl } from "../modelo/persona.model";
import { Observable } from 'rxjs';

@Component({
  selector: 'app-gestion-personas',
  templateUrl: './gestion-personas.component.html',
  styleUrls: ['./gestion-personas.component.css']
})
export class GestionPersonasComponent implements OnInit {

  /*private listaPersonas:any[] = [
    { pnombre: 'Eduard', snombre: null, papellido: 'Carvajal', sapellido:'Cuéllar', edad: '29' },
    { pnombre: 'Maria', snombre: 'Fernanda', papellido: 'Castro', sapellido:'Cuarán', edad: '25' },
    { pnombre: 'Mónica', snombre: '', papellido: 'Carvajal', sapellido:'', edad: '28' },
  ];*/
  private listaPersonas: Array<PersonaId>;
  private personaDelete: PersonaId = new PersonaImpl;

  constructor(private _service: PersonaService) { }

  ngOnInit() {
    this.reloadLista();
  }

  public preDelete(persona: PersonaId): void {
    this.personaDelete = persona;
    console.log(this.personaDelete);
  }

  public deletePersona(): void {
    this._service.borrarPersona(this.personaDelete).subscribe(
      str => { },
      error => {
        console.log('Se presentó un error al eliminar la persona:');
        console.log(error);
      },
      () => {
        this.reloadLista();
      }
    )
  }

  public reloadLista(): void {
    this._service.cargarPersonas().subscribe(
      lista => {
        this.listaPersonas = lista;
        console.log('Cargando lista...');
      },
      error => {
        console.log('Se presentó un error al cargar la lista:');
        console.log(error);
      },
      () => {
        console.log('Proceso carga de lista terminado');
      }
    );
  }

}
