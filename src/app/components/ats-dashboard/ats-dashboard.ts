import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { finalize } from 'rxjs/operators';
import { AdminCandidatosService, UpdateAtsDto } from '../../services/admin-candidatos.service';
import { EmpleoService, WebEmpleo } from '../../services/empleo.service';

@Component({
  selector: 'app-ats-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './ats-dashboard.html',
  styleUrl: './ats-dashboard.css'
})
export class AtsDashboardComponent implements OnInit {
  private atsService = inject(AdminCandidatosService);
  private empleoService = inject(EmpleoService);
  private cdr = inject(ChangeDetectorRef);

  public secretKey: string = '';
  public authenticated: boolean = false;
  public loading: boolean = false;

  public empleos: WebEmpleo[] = [];
  public selectedEmpleoId: number | null = null;
  public candidatos: any[] = [];
  public searchTerm: string = '';

  get candidatosFiltrados() {
    if (!this.searchTerm) return this.candidatos;
    const term = this.searchTerm.toLowerCase();
    return this.candidatos.filter(c => 
      c.nombreCandidato.toLowerCase().includes(term) || 
      c.cedula.includes(term) ||
      (c.correo && c.correo.toLowerCase().includes(term))
    );
  }

  // Modal Detail
  public showModal: boolean = false;
  public candidatoActivo: any = null;

  ngOnInit() {
    if (typeof window !== 'undefined' && window.localStorage) {
      const savedKey = localStorage.getItem('adminSecret');
      if (savedKey) {
        this.secretKey = savedKey;
        this.login();
      }
    }
  }

  login() {
    this.loading = true;
    this.cdr.detectChanges(); // Forzar actualización visual del spinner

    this.empleoService.obtenerEmpleos()
      .pipe(
        finalize(() => {
          this.loading = false;
          this.cdr.detectChanges(); // Forzar ocultar spinner pase lo que pase
        })
      )
      .subscribe({
        next: (res) => {
          this.empleos = res;
          this.authenticated = true;
          if (typeof window !== 'undefined' && window.localStorage) {
            localStorage.setItem('adminSecret', this.secretKey);
          }
        },
        error: (err) => {
          console.error("Error en login:", err);
          alert('Credencial incorrecta o error de red (revisa la consola).');
        }
      });
  }

  logout() {
    this.authenticated = false;
    this.secretKey = '';
    this.candidatos = [];
    this.selectedEmpleoId = null;
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.removeItem('adminSecret');
    }
  }

  onEmpleoChange() {
    if (!this.selectedEmpleoId) return;
    this.cargarCandidatos(this.selectedEmpleoId);
  }

  cargarCandidatos(idEmpleo: number) {
    this.loading = true;
    this.cdr.detectChanges();

    this.atsService.obtenerCandidatosPorEmpleo(idEmpleo, this.secretKey)
      .pipe(
        finalize(() => {
          this.loading = false;
          this.cdr.detectChanges();
        })
      )
      .subscribe({
        next: (data) => {
          this.candidatos = data;
        },
        error: (err) => {
          alert('Error al cargar candidatos');
        }
      });
  }

  abrirDetalle(candidato: any) {
    this.candidatoActivo = JSON.parse(JSON.stringify(candidato)); // Deep copy para evitar edición accidental
    this.showModal = true;
  }

  cerrarDetalle() {
    this.showModal = false;
    this.candidatoActivo = null;
  }

  setStar(star: number) {
    if(this.candidatoActivo) {
      this.candidatoActivo.calificacionRRHH = star;
    }
  }

  guardarEvaluacion() {
    if (!this.candidatoActivo) return;

    this.loading = true;
    const dto: UpdateAtsDto = {
      estado: this.candidatoActivo.estado,
      calificacionRRHH: this.candidatoActivo.calificacionRRHH,
      observacionesRRHH: this.candidatoActivo.observacionesRRHH || ''
    };

    this.atsService.actualizarEstadoCandidato(this.candidatoActivo.idPostulacion, dto, this.secretKey)
      .pipe(
        finalize(() => {
          this.loading = false;
          this.cdr.detectChanges();
        })
      )
      .subscribe({
        next: () => {
          alert('Candidato actualizado y notificado con éxito.');
          this.cerrarDetalle();
          if(this.selectedEmpleoId) this.cargarCandidatos(this.selectedEmpleoId);
        },
        error: (err) => {
          alert('Error al actualizar el estado: ' + err.message);
        }
      });
  }

  getStarsArray(rating: number): number[] {
    return Array(rating).fill(0);
  }
}
