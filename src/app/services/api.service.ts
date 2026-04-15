import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/api/Web`; 

  getWebData(codigo: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${codigo}`);
  }

  enviarLead(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/contacto`, data);
  }
}