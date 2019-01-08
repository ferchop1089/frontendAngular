import { Component, OnInit } from '@angular/core';
import { PersonaService } from '../services/persona.service';
import { Router } from '@angular/router';

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
  private listaPersonas: Array<any>;

  constructor(private _service: PersonaService, private _router: Router) { }

  ngOnInit() {
    this._service.cargarPersonas().subscribe(
      lista => {
        this.listaPersonas = lista;
      },
      err => {
        console.log('Ocurrió un error al cargar la lista:');
        console.log(err);
      }
    );
  }

  public recargarComponente(): void {
    //this._router.navigateByUrl('/gestionar');
    this.ngOnInit();
    //this._router.navigateByUrl('/gestionar', { skipLocationChange: true });
    //this._router.navigate(["/gestionar"]);
  }

}
