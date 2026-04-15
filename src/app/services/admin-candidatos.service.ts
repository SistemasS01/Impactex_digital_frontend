import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EMPTY } from 'rxjs';
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
  private apiUrl = environment.apiUrl;
  private hasApi = !!this.apiUrl;

  obtenerCandidatosPorEmpleo(idEmpleo: number, secret: string) {
    if (!this.hasApi) {
      return EMPTY;
    }
    const headers = new HttpHeaders().set('X-Admin-Secret', secret);
    return this.http.get<any[]>(`${this.apiUrl}/api/AdminCandidatos/PorEmpleo/${idEmpleo}`, { headers });
  }

  actualizarEstadoCandidato(idPostulacion: number, data: UpdateAtsDto, secret: string) {
    if (!this.hasApi) {
      return EMPTY;
    }
    const headers = new HttpHeaders().set('X-Admin-Secret', secret);
    return this.http.put(`${this.apiUrl}/api/AdminCandidatos/Actualizar/${idPostulacion}`, data, { headers });
  }
}
