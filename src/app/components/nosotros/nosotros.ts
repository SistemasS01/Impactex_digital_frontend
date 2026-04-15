import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-nosotros',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './nosotros.html',
  styleUrl: './nosotros.css'
})
export class NosotrosComponent implements OnInit {
  private apiService = inject(ApiService);
  public contenidos: { [key: string]: string } = {};

  ngOnInit(): void {
    this.apiService.getWebData('CORP').subscribe({
      next: (res: any) => {
        res.contenidos.forEach((c: any) => {
          this.contenidos[c.clave] = c.valorTextual;
        });
      }
    });
  }
}