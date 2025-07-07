import { Cargo } from "./cargo.model";

export interface Usuario {
  id?: number;
  nombre: string;
  edad: number;
  cargo: Cargo;
  fechaIngreso: Date;
}

export interface CrearUsuario {
    nombre: string;
    edad: number;
    cargoId: number;
    fechaIngreso: Date;
}