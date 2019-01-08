import { Component, OnInit } from '@angular/core';
import { PersonaService } from '../services/persona.service';

@Component({
  selector: 'app-gestion-personas',
  templateUrl: './gestion-personas.component.html',
  styleUrls: ['./gestion-personas.component.css']
})
export class GestionPersonasComponent implements OnInit {

  private listaPersonas:any[] = [
    { pnombre: 'Eduard', snombre: null, papellido: 'Carvajal', sapellido:'Cuéllar', edad: '29' },
    { pnombre: 'Maria', snombre: 'Fernanda', papellido: 'Castro', sapellido:'Cuarán', edad: '25' },
    { pnombre: 'Mónica', snombre: '', papellido: 'Carvajal', sapellido:'', edad: '28' },
  ];

  constructor(private _service:PersonaService) { }

  ngOnInit() {
  }

}
