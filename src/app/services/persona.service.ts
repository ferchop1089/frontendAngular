import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, Subject, Subscription } from 'rxjs';
import { PersonaId, Persona, PersonaImpl } from '../modelo/persona.model';

@Injectable({
  providedIn: 'root'
})
export class PersonaService {

  private baseURL: string = "http://localhost:8080/servicios/v0/personas";

  constructor(private _http: HttpClient) { }

  public listarPersonas(): Observable<Array<PersonaId>> {
    return this._http.get<Array<PersonaId>>(this.baseURL);
  }

  public crearPersona(persona: PersonaId): Observable<PersonaId> {
    return this._http.post<PersonaId>(this.baseURL, persona);
  }

  public borrarPersona(persona: PersonaId) {
    return this._http.delete(`${this.baseURL}/${persona.id}`, { responseType: 'text' });
  }

  public reloadPersonas(): void {
    this.listarPersonas();
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
