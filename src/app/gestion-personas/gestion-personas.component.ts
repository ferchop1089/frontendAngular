import { Component, OnInit } from '@angular/core';
import { PersonaService } from '../services/persona.service';

@Component({
  selector: 'app-gestion-personas',
  templateUrl: './gestion-personas.component.html',
  styleUrls: ['./gestion-personas.component.css']
})
export class GestionPersonasComponent implements OnInit {

  constructor(private _service:PersonaService) { }

  ngOnInit() {
  }

}
