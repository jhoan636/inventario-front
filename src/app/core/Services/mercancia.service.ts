import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { ActualizarMercancia, CrearMercancia, Mercancia } from '../models/mercancia.model';
import { ApiError } from '../models/apiError.model';

@Injectable({ providedIn: 'root' })
export class MercanciaService {
  private apiUrl = 'http://localhost:8080/api/mercancias';

  constructor(private http: HttpClient) {}

  listarMercancias(): Observable<Mercancia[]> {
    return this.http.get<any[]>(this.apiUrl).pipe(
      catchError((err: HttpErrorResponse) => {
        const apiErr: ApiError = err.error;    
        return throwError(() => apiErr);
      })
    );
  }

  obtenerMercanciaPorId(id: number): Observable<Mercancia> {
    return this.http.get<any>(`${this.apiUrl}/${id}`).pipe(
      catchError((err: HttpErrorResponse) => {
        const apiErr: ApiError = err.error;    
        return throwError(() => apiErr);
      })
    );
  }

  crearMercancia(mercancia: CrearMercancia): Observable<Mercancia> {
    return this.http.post<Mercancia>(this.apiUrl, mercancia).pipe(
      catchError((err: HttpErrorResponse) => {
        const apiErr: ApiError = err.error;    
        return throwError(() => apiErr);
      })
    );
  }

  actualizarMercancia(id: number, mercancia: ActualizarMercancia): Observable<Mercancia> {
    return this.http.put<Mercancia>(`${this.apiUrl}/${id}`, mercancia).pipe(
      catchError((err: HttpErrorResponse) => {
        const apiErr: ApiError = err.error;    
        return throwError(() => apiErr);
      })
    );
  }

  eliminarMercancia(id: number, usuarioId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}?usuarioId=${usuarioId}`).pipe(
      catchError((err: HttpErrorResponse) => {
        const apiErr: ApiError = err.error;    
        return throwError(() => apiErr);
      })
    );
  }
}
