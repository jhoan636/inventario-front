import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cargo } from '../models/cargo.model';

@Injectable({ providedIn: 'root' })
export class CargoService {
  private apiUrl = 'http://localhost:8080/api/cargos';

  constructor(private http: HttpClient) {}

  obtenerTodosLosCargos(): Observable<Cargo[]> {
    return this.http.get<Cargo[]>(`${this.apiUrl}`);
  }

  crearCargo(nombreCargo: string): Observable<Cargo> {
    const payload = { nombre: nombreCargo };
    return this.http.post<Cargo>(`${this.apiUrl}`, payload);
  }
}
