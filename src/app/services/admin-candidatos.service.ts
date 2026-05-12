import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';

export interface UpdateAtsDto {
  estado: string;
  calificacionRRHH: number;
  observacionesRRHH: string;
}

@Injectable({
  providedIn: 'root'
})
export class AdminCandidatosService {
  private http = inject(HttpClient);
  private readonly apiBase = environment.apiUrl.replace(/\/+$/, '');

  obtenerCandidatosPorEmpleo(idEmpleo: number, secret: string) {
    const headers = new HttpHeaders().set('X-Admin-Secret', secret);
    return this.http.get<any[]>(`${this.apiBase}/AdminCandidatos/PorEmpleo/${idEmpleo}`, { headers });
  }

  actualizarEstadoCandidato(idPostulacion: number, data: UpdateAtsDto, secret: string) {
    const headers = new HttpHeaders().set('X-Admin-Secret', secret);
    return this.http.put(`${this.apiBase}/AdminCandidatos/Actualizar/${idPostulacion}`, data, { headers });
  }
}
