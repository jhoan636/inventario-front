import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { Cargo } from '../models/cargo.model';
import { ApiError } from '../models/apiError.model';

@Injectable({ providedIn: 'root' })
export class CargoService {
  private apiUrl = 'http://localhost:8080/api/cargos';

  constructor(private http: HttpClient) {}

  obtenerTodosLosCargos(): Observable<Cargo[]> {
    return this.http.get<Cargo[]>(`${this.apiUrl}`).pipe(
      catchError((err: HttpErrorResponse) => {
        const apiErr: ApiError = err.error;    
        return throwError(() => apiErr);
      })
    );
  }

  crearCargo(nombreCargo: string): Observable<Cargo> {
    const payload = { nombre: nombreCargo };
    return this.http.post<Cargo>(`${this.apiUrl}`, payload).pipe(
      catchError((err: HttpErrorResponse) => {
        const apiErr: ApiError = err.error;    
        return throwError(() => apiErr);
      })
    );
  }
}
