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

    /*public constructor(id: string, pnombre: string, snombre: string, papellido: string, sapellido: string, edad: number) {
        this.id = id;
        this.pnombre = pnombre;
        this.snombre = snombre;
        this.papellido = papellido;
        this.sapellido = sapellido;
        this.edad = edad;
    }*/
    id = null;
    pnombre = null;
    snombre = null;
    papellido = null;
    sapellido = null;
    edad = null;
}