import { Component, inject, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EmpleoService, WebEmpleo } from '../../services/empleo.service';

@Component({
  selector: 'app-admin-empleos',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-empleos.html',
  styleUrl: './admin-empleos.css'
})
export class AdminEmpleosComponent implements OnInit {
  private empleoService = inject(EmpleoService);
  private cdr = inject(ChangeDetectorRef);

  public adminSecret = '';
  public authenticated = false;
  
  public empleos: WebEmpleo[] = [];
  public cargando = false;
  public guardando = false;
  public errorCarga = '';
  
  // Formulario nuevo empleo
  public nuevoEmpleo: WebEmpleo = {
    titulo: '',
    empresa: 'Corporación Impactex',
    ubicacion: 'Ambato, Tungurahua',
    modalidad: 'Presencial',
    descripcion: ''
  };

  ngOnInit(): void {
    // Inicialmente no cargamos a menos que se autentique si quieramos, 
    // pero podemos cargar los públicos para gestionarlos.
  }

  // Simula un login
  entrar() {
    if (this.adminSecret) {
      this.authenticated = true;
      this.cargarEmpleos();
    }
  }

  testConexion() {
    this.errorCarga = '';
    console.log('🧪 Iniciando test de conexión...');
    this.empleoService.testConexion().subscribe({
      next: (res) => {
        console.log('✅ Conexión OK:', res);
        alert('✅ Conexión al backend: EXITOSA\n\n' + res);
      },
      error: (err) => {
        console.error('❌ Error en test:', err);
        alert('❌ No se puede conectar a:\n' + this.empleoService['apiBase'] + '\n\nError: ' + (err.message || err.statusText || 'Timeout o conexión rechazada'));
      }
    });
  }

  cargarEmpleos() {
    this.cargando = true;
    this.errorCarga = '';
    console.log('🔄 Cargando empleos desde:', this.empleoService['apiBase']);
    
    this.empleoService.obtenerEmpleos().subscribe({
      next: (data) => {
        console.log('✅ Empleos cargados:', data);
        this.empleos = data;
        this.cargando = false;
        
          // 🔴 IMPORTANTE: Fuerza que Angular actualice la vista
          this.cdr.markForCheck();
          this.cdr.detectChanges();
        
          console.log('✅ Vista actualizada. Empleos en pantalla:', this.empleos.length);
        this.errorCarga = '';
      },
      error: (err) => {
        console.error('❌ Error al cargar empleos:', err);
          this.cdr.markForCheck();
        this.cargando = false;
        
        if (err.status === 0) {
          this.errorCarga = '❌ Error de conexión. Verifica que el backend esté activo en http://impactex-web-api.runasp.net';
        } else if (err.status === 401) {
          this.errorCarga = '❌ No autorizado. Contraseña incorrecta.';
        } else if (err.status === 404) {
          this.errorCarga = '❌ Endpoint no encontrado. Verifica la URL del API.';
        } else {
          this.errorCarga = `❌ Error del servidor: ${err.status} - ${err.statusText || err.message}`;
        }
      }
    });
  }

  crearEmpleo() {
    if (!this.nuevoEmpleo.titulo || !this.nuevoEmpleo.descripcion) {
      alert("Por favor llena el título y la descripción.");
      return;
    }

    this.guardando = true;
    this.empleoService.crearEmpleo(this.nuevoEmpleo, this.adminSecret).subscribe({
      next: (res) => {
        alert("Empleo publicado exitosamente.");
        this.guardando = false;
        // Limpiamos form
        this.nuevoEmpleo = {
          titulo: '',
          empresa: 'Corporación Impactex',
          ubicacion: 'Ambato, Tungurahua',
          modalidad: 'Presencial',
          descripcion: ''
        };
        this.cargarEmpleos();
      },
      error: (err) => {
        console.error(err);
        alert("Error al publicar. Verifica que la contraseña sea correcta ('Impactex2024*').");
        this.guardando = false;
      }
    });
  }

  eliminarEmpleo(id: number | undefined) {
    if (!id) return;
    if (confirm("¿Estás seguro de que deseas eliminar (ocultar) este empleo?")) {
      this.empleoService.eliminarEmpleo(id, this.adminSecret).subscribe({
        next: () => {
          alert("Empleo eliminado.");
          this.cargarEmpleos();
        },
        error: (err) => {
          console.error(err);
          alert("Error al eliminar. Verifica la contraseña.");
        }
      });
    }
  }
}
