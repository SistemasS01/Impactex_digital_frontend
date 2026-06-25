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
