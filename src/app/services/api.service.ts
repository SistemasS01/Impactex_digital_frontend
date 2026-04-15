import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EMPTY, Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private http = inject(HttpClient);
  private apiUrl = environment.apiUrl ? `${environment.apiUrl}/api/Web` : '';
  private hasApi = !!this.apiUrl;

  getWebData(codigo: string): Observable<any> {
    if (!this.hasApi) {
      return EMPTY;
    }
    return this.http.get(`${this.apiUrl}/${codigo}`);
  }

  enviarLead(data: any): Observable<any> {
    if (!this.hasApi) {
      return EMPTY;
    }
    return this.http.post(`${this.apiUrl}/contacto`, data);
  }
}