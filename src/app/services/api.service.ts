import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private http = inject(HttpClient);
  private readonly apiBase = environment.apiUrl.replace(/\/+$/, '');

  getWebData(codigo: string): Observable<any> {
    return this.http.get(`${this.apiBase}/Web/${codigo}`);
  }

  enviarLead(data: any): Observable<any> {
    return this.http.post(`${this.apiBase}/Web/contacto`, data);
  }
}