import { Component, OnInit, inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-politica-privacidad',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './politica-privacidad.html',
  styleUrl: './politica-privacidad.css',
})
export class PoliticaPrivacidadComponent implements OnInit {
  private platformId = inject(PLATFORM_ID);

  /** Estado del consentimiento del usuario actual */
  public consentStatus: 'accepted' | 'rejected' | 'pending' = 'pending';

  /** Fecha en que se mostró el aviso (simulada desde localStorage) */
  public consentDate: string | null = null;

  ngOnInit(): void {
    if (!isPlatformBrowser(this.platformId)) return;

    const consent = localStorage.getItem('impactex_cookie_consent');
    if (consent === 'accepted') {
      this.consentStatus = 'accepted';
      // Intentar recuperar fecha guardada o usar fecha actual como fallback
      const savedDate = localStorage.getItem('impactex_cookie_date');
      this.consentDate = savedDate ?? new Date().toLocaleDateString('es-EC', {
        year: 'numeric', month: 'long', day: 'numeric'
      });
    } else if (consent === 'rejected') {
      this.consentStatus = 'rejected';
    }
  }

  /** Última actualización de la política */
  public readonly lastUpdate = 'Junio 2026';
}
