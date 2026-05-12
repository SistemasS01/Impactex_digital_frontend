import { Component, OnInit, inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { ApiService } from '../../services/api.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-nosotros',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './nosotros.html',
  styleUrl: './nosotros.css'
})
export class NosotrosComponent implements OnInit {
  private apiService = inject(ApiService);
  private platformId = inject(PLATFORM_ID);
  public contenidos: { [key: string]: string } = {};

  ngOnInit(): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    if (!environment.apiUrl) {
      return;
    }

    this.apiService.getWebData('CORP').subscribe({
      next: (res: any) => {
        res.contenidos.forEach((c: any) => {
          this.contenidos[c.clave] = c.valorTextual;
        });
      }
    });
  }
}