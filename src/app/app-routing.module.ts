import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Pagina404Component } from './pagina404/pagina404.component';
import { InicioComponent } from './inicio/inicio.component';
import { GestionPersonasComponent } from './gestion-personas/gestion-personas.component';

const routes: Routes = [
  { path: 'inicio', component: InicioComponent },
  { path: '404', component: Pagina404Component },
  { path: 'gestionar', component: GestionPersonasComponent },
  { path: '', redirectTo: 'inicio', pathMatch: 'full' },
  { path: '**', redirectTo: '404', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
