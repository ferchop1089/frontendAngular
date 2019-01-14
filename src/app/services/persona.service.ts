import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, Subject, Subscription } from 'rxjs';
import { PersonaId, Persona, PersonaImpl } from '../modelo/persona.model';

@Injectable({
  providedIn: 'root'
})
export class PersonaService {

  private listaSubject = new BehaviorSubject<Array<PersonaId>>([]);
  private crearSubject = new BehaviorSubject<PersonaId>(new PersonaImpl());
  private borrarSubject = new BehaviorSubject<PersonaId>(new PersonaImpl());
  //private peSubject = new Subject<Array<PersonaId>>();
  private personas: Array<PersonaId>;
  private listaPersonasSubscription: Subscription;
  private crearPersonasSubscription: Subscription;
  private borrarPersonasSubscription: Subscription;

  constructor(private _http: HttpClient) { }

  public cargarPersonasSubscription(): Observable<Array<PersonaId>> {
    return this.listaSubject.asObservable();
  }

  public cargarPersonas(): void {
    if (this.listaPersonasSubscription) {
      this.listaPersonasSubscription.unsubscribe();
    }
    this.listaPersonasSubscription = this._http.get<Array<PersonaId>>('http://localhost:8080/springAngularTutorial/personaServicio/buscarTodos')
      .subscribe(
        datos => {
          this.personas = datos;
          this.listaSubject.next(this.personas);
        },
        err => this.listaSubject.error(err),
        () => this.listaSubject.complete()
      );
  }

  public crearPersonaSubscription(): Observable<PersonaId> {
    return this.crearSubject.asObservable();
  }

  public crearPersona(persona: PersonaId): void {
    if (this.crearPersonasSubscription) {
      this.crearPersonasSubscription.unsubscribe();
    }
    this.crearPersonasSubscription = this._http.post<PersonaId>('http://localhost:8080/springAngularTutorial/personaServicio/crear', persona)
      .subscribe(
        dato => {
          this.personas.push(dato);
          //this.personas = [...this.personas, dato];
          this.listaSubject.next(this.personas);
          this.crearSubject.next(dato);
        },
        err => this.crearSubject.error(err),
        () => this.crearSubject.complete()
      );
  }

  public borrarPersonaSubscription(): Observable<PersonaId> {
    return this.borrarSubject.asObservable();
  }

  public borrarPersona(persona: PersonaId): void {
    if (this.borrarPersonasSubscription) {
      this.borrarPersonasSubscription.unsubscribe();
    }
    this.borrarPersonasSubscription = this._http.delete(`${'http://localhost:8080/springAngularTutorial/personaServicio/borrarPorId'}/${persona.id}`, { responseType: 'text' })
      .subscribe(
        dato => {
          this.personas = this.personas.filter(t => t.id != persona.id)
          this.borrarSubject.next(persona);
          this.listaSubject.next(this.personas);
        },
        err => this.borrarSubject.error(err),
        () => this.borrarSubject.complete()
      );
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
