import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PersonaService {

  constructor(private _http: HttpClient) {

  }

  public cargarPersonas(): Observable<any> {
    return this._http.get('http://localhost:8080/springAngularTutorial/personaServicio/buscarTodos');
  }

  public validarPersona(persona: any): boolean {
    let isValid: boolean = true;

    if (!persona.pnombre) {
      isValid = false;
    }
    if (!persona.papellido) {
      isValid = false;
    }

    return isValid;

  }

  public crearPersona(persona: any): Observable<any> {
    return this._http.post('http://localhost:8080/springAngularTutorial/personaServicio/crear', persona);
  }


}
