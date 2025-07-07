import { Usuario } from './usuario.model';

export interface Mercancia {
    id?: number;
    nombre: string;
    cantidad: number;
    fechaIngreso: Date;
    fechaModificacion?: Date;
    usuarioRegistro: Usuario;
    usuarioModificacion?: Usuario;
}

export interface FiltrarMercancia {
  nombreProducto?: string;
  usuarioNombre?: string;
  fecha?: Date;
}

export interface CrearMercancia {
    nombre: string;
    cantidad: number;
    fechaIngreso: Date;
    usuarioRegistroId: number;
}
export interface ActualizarMercancia {
    id: number;
    nombre?: string;
    cantidad?: number;
    usuarioModificacionId?: number;
}
