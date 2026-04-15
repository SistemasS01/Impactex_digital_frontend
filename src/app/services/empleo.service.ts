import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EMPTY } from 'rxjs';
import { environment } from '../../environments/environment';


export interface WebEmpleo {
// ... (rest of interface remains same)

  idEmpleo?: number;
  titulo: string;
  empresa: string;
  ubicacion: string;
  modalidad: string;
  descripcion: string;
  activo?: boolean;
  fechaPublicacion?: string;
}

@Injectable({
  providedIn: 'root'
})
export class EmpleoService {
  private http = inject(HttpClient);
  private apiUrl = environment.apiUrl;
  private hasApi = !!this.apiUrl;

  obtenerEmpleos() {
    if (!this.hasApi) {
      return EMPTY;
    }
    return this.http.get<WebEmpleo[]>(`${this.apiUrl}/api/Empleos`);
  }

  crearEmpleo(empleo: WebEmpleo, secret: string) {
    if (!this.hasApi) {
      return EMPTY;
    }
    const headers = new HttpHeaders().set('X-Admin-Secret', secret);
    return this.http.post<WebEmpleo>(`${this.apiUrl}/api/Empleos`, empleo, { headers });
  }

  eliminarEmpleo(id: number, secret: string) {
    if (!this.hasApi) {
      return EMPTY;
    }
    const headers = new HttpHeaders().set('X-Admin-Secret', secret);
    return this.http.delete(`${this.apiUrl}/api/Empleos/${id}`, { headers });
  }

  postular(postulacion: any, archivo: File) {
    if (!this.hasApi) {
      return EMPTY;
    }
    const formData = new FormData();
    formData.append('data', JSON.stringify(postulacion)); 
    if (archivo) {
      formData.append('archivo', archivo, archivo.name);
    }

    return this.http.post(`${this.apiUrl}/api/Postulaciones`, formData);
  }
}


