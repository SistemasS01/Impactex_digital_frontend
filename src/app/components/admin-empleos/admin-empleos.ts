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
  public mostrarModal = false;
  public empleoEdit: WebEmpleo | null = null;
  public guardandoEdicion = false;
  
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
    if (typeof window !== 'undefined' && window.localStorage) {
      const savedKey = localStorage.getItem('adminSecret');
      if (savedKey) {
        this.adminSecret = savedKey;
        this.authenticated = true;
        this.cargarEmpleos();
      }
    }
  }

  guardarSecret(value: string) {
    this.adminSecret = value;
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.setItem('adminSecret', value);
    }
  }

  // Simula un login
  entrar() {
    const secret = this.getAdminSecret();
    if (!secret) return;

    this.adminSecret = secret;
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.setItem('adminSecret', secret);
    }

    this.authenticated = true;
    this.cargarEmpleos();
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
    const secret = this.getAdminSecret();
    if (!secret) {
      alert('Ingresa la contraseña de administrador.');
      return;
    }

    if (!this.nuevoEmpleo.titulo || !this.nuevoEmpleo.descripcion) {
      alert("Por favor llena el título y la descripción.");
      return;
    }

    this.guardando = true;
    this.empleoService.crearEmpleo(this.nuevoEmpleo, secret).subscribe({
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
        if (err?.status === 401) {
          this.handleUnauthorized();
          alert('Contraseña inválida. Vuelve a ingresar.');
          return;
        }
        alert("Error al publicar. Verifica que la contraseña sea correcta ('Impactex2024*').");
        this.guardando = false;
      }
    });
  }

  abrirEdicion(job: WebEmpleo) {
    this.empleoEdit = { ...job };
    this.mostrarModal = true;
  }

  cerrarEdicion() {
    this.mostrarModal = false;
    this.empleoEdit = null;
  }

  guardarEdicion() {
    const secret = this.getAdminSecret();
    if (!secret) {
      alert('Ingresa la contraseña de administrador.');
      return;
    }

    if (!this.empleoEdit || !this.empleoEdit.idEmpleo) {
      return;
    }

    if (!this.empleoEdit.titulo || !this.empleoEdit.descripcion) {
      alert('Por favor llena el titulo y la descripcion.');
      return;
    }

    this.guardandoEdicion = true;
    const id = this.empleoEdit.idEmpleo;
    const payload: Partial<WebEmpleo> = {
      titulo: this.empleoEdit.titulo,
      empresa: this.empleoEdit.empresa,
      ubicacion: this.empleoEdit.ubicacion,
      modalidad: this.empleoEdit.modalidad,
      descripcion: this.empleoEdit.descripcion,
      activo: this.empleoEdit.activo
    };

    this.empleoService.actualizarEmpleo(id, payload, secret).subscribe({
      next: () => {
        this.guardandoEdicion = false;
        this.cerrarEdicion();
        this.cargarEmpleos();
        alert('Empleo actualizado correctamente.');
      },
      error: (err) => {
        console.error(err);
        this.guardandoEdicion = false;
        if (err?.status === 401) {
          this.handleUnauthorized();
          alert('Contraseña inválida. Vuelve a ingresar.');
          return;
        }
        alert('Error al actualizar. Verifica la contraseña.');
      }
    });
  }

  eliminarEmpleo(id: number | undefined) {
    if (!id) return;
    const secret = this.getAdminSecret();
    if (!secret) {
      alert('Ingresa la contraseña de administrador.');
      return;
    }
    if (confirm("¿Estás seguro de que deseas eliminar (ocultar) este empleo?")) {
      this.empleoService.eliminarEmpleo(id, secret).subscribe({
        next: () => {
          alert("Empleo eliminado.");
          this.cargarEmpleos();
        },
        error: (err) => {
          console.error(err);
          if (err?.status === 401) {
            this.handleUnauthorized();
            alert('Contraseña inválida. Vuelve a ingresar.');
            return;
          }
          alert("Error al eliminar. Verifica la contraseña.");
        }
      });
    }
  }

  private getAdminSecret(): string {
    let localSecret = '';
    if (typeof window !== 'undefined' && window.localStorage) {
      localSecret = localStorage.getItem('adminSecret') || '';
    }

    const secret = (this.adminSecret || localSecret).trim();
    if (!this.adminSecret && secret) {
      this.adminSecret = secret;
    }

    return secret;
  }

  private handleUnauthorized() {
    this.adminSecret = '';
    this.authenticated = false;
    this.mostrarModal = false;
    this.empleoEdit = null;
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.removeItem('adminSecret');
    }
  }
}
