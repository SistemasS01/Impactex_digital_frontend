import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
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
  private readonly apiBase = environment.apiUrl.replace(/\/+$/, '');

  // 🧪 Testear conexión con el backend
  testConexion() {
    console.log('🧪 Testeando conexión a:', this.apiBase);
    return this.http.get(`${this.apiBase}/Empleos/SetupTabla`, {
      responseType: 'text'
    });
  }

  obtenerEmpleos() {
    console.log('📡 GET:', `${this.apiBase}/Empleos`);
    return this.http.get<WebEmpleo[]>(`${this.apiBase}/Empleos`, {
      headers: new HttpHeaders({
        'Accept': 'application/json'
      })
    });
  }

  crearEmpleo(empleo: WebEmpleo, secret: string) {
    const headers = new HttpHeaders({
      'X-Admin-Secret': secret,
      'Content-Type': 'application/json'
    });
    console.log('📡 POST:', `${this.apiBase}/Empleos`);
    return this.http.post<WebEmpleo>(`${this.apiBase}/Empleos`, empleo, { headers });
  }

  actualizarEmpleo(id: number, empleo: Partial<WebEmpleo>, secret: string) {
    const headers = new HttpHeaders({
      'X-Admin-Secret': secret,
      'Content-Type': 'application/json'
    });
    console.log('PUT:', `${this.apiBase}/Empleos/${id}`);
    return this.http.put<WebEmpleo>(`${this.apiBase}/Empleos/${id}`, empleo, { headers });
  }

  eliminarEmpleo(id: number, secret: string) {
    const headers = new HttpHeaders({
      'X-Admin-Secret': secret
    });
    console.log('📡 DELETE:', `${this.apiBase}/Empleos/${id}`);
    return this.http.delete(`${this.apiBase}/Empleos/${id}`, { headers });
  }

  postular(postulacion: any, archivo: File) {
    const formData = new FormData();
    formData.append('data', JSON.stringify(postulacion)); 
    if (archivo) {
      formData.append('archivo', archivo, archivo.name);
    }
    console.log('📡 POST:', `${this.apiBase}/Postulaciones`);
    return this.http.post(`${this.apiBase}/Postulaciones`, formData);
  }
}


