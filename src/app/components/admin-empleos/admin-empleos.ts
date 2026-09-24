import { Component, inject, OnInit } from '@angular/core';
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

  public adminSecret = '';
  public authenticated = false;
  
  public empleos: WebEmpleo[] = [];
  public cargando = false;
  public guardando = false;
  
  // Formulario nuevo empleo
  public nuevoEmpleo: WebEmpleo = {
    titulo: '',
    empresa: 'Corporación Impactex',
    ubicacion: 'Ambato, Tungurahua',
    modalidad: 'Presencial',
    descripcion: ''
  };

  ngOnInit(): void {
    if (typeof window !== 'undefined' && window.localStorage) {
      const savedKey = localStorage.getItem('adminSecret');
      if (savedKey) {
        this.adminSecret = savedKey;
        this.entrar();
      }
    }
  }

  entrar() {
    const secret = (this.adminSecret || '').trim();
    if (!secret) {
      alert('Ingresa la contraseña de administrador.');
      return;
    }

    this.cargando = true;
    this.empleoService.validarAdminSecret(secret).subscribe({
      next: () => {
        this.adminSecret = secret;
        this.authenticated = true;
        if (typeof window !== 'undefined' && window.localStorage) {
          localStorage.setItem('adminSecret', secret);
        }
        this.cargarEmpleos();
      },
      error: (err) => {
        this.cargando = false;
        console.error('Error en autenticación:', err);
        if (typeof window !== 'undefined' && window.localStorage) {
          localStorage.removeItem('adminSecret');
        }
        alert('Contraseña inválida. Verifica que sea correcta (Impactex2025*).');
      }
    });
  }

  cerrarSesion() {
    this.authenticated = false;
    this.adminSecret = '';
    this.empleos = [];
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.removeItem('adminSecret');
    }
  }

  cargarEmpleos() {
    this.cargando = true;
    this.empleoService.obtenerEmpleos().subscribe({
      next: (data) => {
        this.empleos = data;
        this.cargando = false;
      },
      error: (err) => {
        console.error(err);
        this.cargando = false;
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
        this.guardando = false;
        if (err?.status === 401) {
          alert("Contraseña inválida o sesión expirada.");
          this.cerrarSesion();
          return;
        }
        alert("Error al publicar. Verifica que la contraseña sea correcta ('Impactex2025*').");
      }
    });
  }

  eliminarEmpleo(id: number | undefined) {
    if (!id) return;
    if (confirm("¿Estás seguro de que deseas eliminar (ocultar) este empleo?")) {
      this.cargando = true;
      this.empleoService.eliminarEmpleo(id, this.adminSecret).subscribe({
        next: () => {
          alert("Empleo eliminado exitosamente.");
          this.cargarEmpleos();
        },
        error: (err) => {
          this.cargando = false;
          console.error(err);
          if (err?.status === 401) {
            alert("Contraseña inválida o sesión expirada.");
            this.cerrarSesion();
            return;
          }
          alert("Error al eliminar el empleo. Verifica la contraseña.");
        }
      });
    }
  }
}
