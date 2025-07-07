import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ActualizarMercancia, CrearMercancia, Mercancia } from '../models/mercancia.model';

@Injectable({ providedIn: 'root' })
export class UsuarioService {
  private apiUrl = 'http://localhost:8080/api/mercancias';

  constructor(private http: HttpClient) {}

  listarMercancias(): Observable<Mercancia[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  obtenerMercanciaPorId(id: number): Observable<Mercancia> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  crearMercancia(mercancia: CrearMercancia): Observable<Mercancia> {
    return this.http.post<Mercancia>(this.apiUrl, mercancia);
  }

  actualizarMercancia(id: number, mercancia: ActualizarMercancia): Observable<Mercancia> {
    return this.http.put<Mercancia>(`${this.apiUrl}/${id}`, mercancia);
  }

  eliminarMercancia(id: number, usuarioId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}?usuarioId=${usuarioId}`);
  }
}
