import { Component, OnInit, OnDestroy, inject, PLATFORM_ID, ChangeDetectorRef } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-cookie-banner',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './cookie-banner.html',
  styleUrl: './cookie-banner.css',
})
export class CookieBannerComponent implements OnInit, OnDestroy {
  private platformId = inject(PLATFORM_ID);
  private cdr = inject(ChangeDetectorRef);

  /** Estado del banner: 'visible' | 'hidden' | 'blocked' */
  public bannerState: 'visible' | 'hidden' | 'blocked' = 'hidden';

  /** Controla la animación de salida */
  public isLeaving = false;

  ngOnInit(): void {
    if (!isPlatformBrowser(this.platformId)) return;

    const consent = localStorage.getItem('impactex_cookie_consent');

    if (!consent) {
      // Sin decisión previa → mostrar modal (Bottom Center)
      this.bannerState = 'visible';
      this.bloquearScroll();
      this.cdr.detectChanges();
    } else {
      // Si ya está aceptado, asegurarse de que la navegación esté libre
      this.bannerState = 'hidden';
      this.desbloquearScroll();
      this.cdr.detectChanges();
    }
  }

  ngOnDestroy(): void {
    // Limpieza por seguridad si se destruye el componente
    this.desbloquearScroll();
  }

  /** El usuario acepta las cookies */
  aceptarCookies(): void {
    if (!isPlatformBrowser(this.platformId)) return;
    this.isLeaving = true;
    this.cdr.detectChanges();
    setTimeout(() => {
      localStorage.setItem('impactex_cookie_consent', 'accepted');
      localStorage.setItem('impactex_cookie_date', new Date().toLocaleDateString('es-EC', {
        year: 'numeric', month: 'long', day: 'numeric'
      }));
      this.bannerState = 'hidden';
      this.isLeaving = false;
      this.desbloquearScroll();
      this.cdr.detectChanges();
    }, 500);
  }

  /** El usuario rechaza → modal de bloqueo (NO guarda en localStorage) */
  rechazarCookies(): void {
    if (!isPlatformBrowser(this.platformId)) return;
    this.bannerState = 'blocked';
    this.bloquearScroll();
    this.cdr.detectChanges();
  }

  /** Recargar la página → el banner vuelve a aparecer */
  recargarPagina(): void {
    if (!isPlatformBrowser(this.platformId)) return;
    window.location.reload();
  }

  /** Bloquea el scroll de la página para evitar que naveguen sin aceptar */
  private bloquearScroll(): void {
    if (isPlatformBrowser(this.platformId)) {
      document.body.style.setProperty('overflow', 'hidden', 'important');
      document.documentElement.style.setProperty('overflow', 'hidden', 'important');
    }
  }

  /** Restaura el scroll de la página y limpia cualquier bloqueo */
  private desbloquearScroll(): void {
    if (isPlatformBrowser(this.platformId)) {
      document.body.style.removeProperty('overflow');
      document.documentElement.style.removeProperty('overflow');
    }
  }
}
