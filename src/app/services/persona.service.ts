import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PersonaId, Persona } from '../modelo/persona.model';

@Injectable({
  providedIn: 'root'
})
export class PersonaService {

  constructor(private _http: HttpClient) {

  }

  public cargarPersonas(): Observable<Array<PersonaId>> {
    return this._http.get<Array<PersonaId>>('http://localhost:8080/springAngularTutorial/personaServicio/buscarTodos');
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

  public crearPersona(persona: PersonaId): Observable<PersonaId> {
    //let p:string = JSON.stringify(persona);
    //persona.pnombre = null;
    return this._http.post<PersonaId>('http://localhost:8080/springAngularTutorial/personaServicio/crear', persona);
  }

  public borrarPersona(persona: PersonaId): Observable<string> {
    //return this._http.delete<string>(`${'http://localhost:8080/springAngularTutorial/personaServicio/borrarPorId'}/${persona.id}`);
    return this._http.delete(`${'http://localhost:8080/springAngularTutorial/personaServicio/borrarPorId'}/${persona.id}`, { responseType: 'text' });
  }


}
