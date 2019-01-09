export interface Persona {
    pnombre: string;
    snombre: string;
    papellido: string;
    sapellido: string;
    edad: number;
}

export interface PersonaId extends Persona {
    id: number;
}

export class PersonaImpl implements PersonaId {
    id = null;
    pnombre: null;
    snombre: null;
    papellido: null;
    sapellido: null;
    edad = null;
}