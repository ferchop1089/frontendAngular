import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, Subject, Subscription } from 'rxjs';
import { PersonaId, Persona, PersonaImpl } from '../modelo/persona.model';

@Injectable({
  providedIn: 'root'
})
export class PersonaService {

  private personas: PersonaId[] = [
    { id: 1, pnombre: 'Eduard', snombre: null, papellido: 'Carvajal', sapellido: 'Cuéllar', edad: 29 },
    { id: 2, pnombre: 'Maria', snombre: 'Fernanda', papellido: 'Castro', sapellido: 'Cuarán', edad: 25 },
    { id: 3, pnombre: 'Mónica', snombre: '', papellido: 'Carvajal', sapellido: '', edad: 28 },
  ];

  private baseURL: string = "http://localhost:8080/springAngularTutorial/personaServicio";

  constructor(private _http: HttpClient) { }

  public cargarPersonas(): Observable<Array<PersonaId>> {
    return this._http.get<Array<PersonaId>>(this.baseURL + '/buscarTodos');
  }

  public crearPersona(persona: PersonaId): Observable<PersonaId> {
    return this._http.post<PersonaId>(this.baseURL + '/crear', persona);
  }

  public borrarPersona(persona: PersonaId) {
    return this._http.delete(`${this.baseURL + '/borrarPorId'}/${persona.id}`, { responseType: 'text' });
  }

  public reloadPersonas(): void {
    this.cargarPersonas();
  }

  public validarPersona(persona: Persona): boolean {
    let isValid: boolean = true;

    if (!persona.pnombre) {
      isValid = false;
    }
    if (!persona.papellido) {
      isValid = false;
    }

    return isValid;
  }

}
