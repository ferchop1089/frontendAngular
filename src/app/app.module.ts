import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from "@angular/forms";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GestionPersonasComponent } from './gestion-personas/gestion-personas.component';
import { CabeceraComponent } from './cabecera/cabecera.component';
import { Pagina404Component } from './pagina404/pagina404.component';
import { InicioComponent } from './inicio/inicio.component';
import { AgregarPersonaComponent } from './agregar-persona/agregar-persona.component';
import { EditarPersonaComponent } from './editar-persona/editar-persona.component';

@NgModule({
  declarations: [
    AppComponent,
    GestionPersonasComponent,
    CabeceraComponent,
    Pagina404Component,
    InicioComponent,
    AgregarPersonaComponent,
    EditarPersonaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
