import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EmpleoService } from '../../services/empleo.service';

@Component({
  selector: 'app-postulacion',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './postulacion.html',
  styleUrl: './postulacion.css'
})
export class PostulacionComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private empleoService = inject(EmpleoService);

  public step: number = 1;
  public idEmpleo: number = 0;
  
  public enviando = false;
  public exito = false;

  // Datos del Formulario
    public datos = {
      nombreCandidato: '',
      cedula: '',
      correo: '',
      telefono: '',
      ciudad: '',
      experiencias: [] as any[],
      educaciones: [] as any[],
      referencias: [] as any[]
    };

  public tempExp = { empresa: '', cargo: '', fechaInicio: '', fechaFin: '', descripcion: '' };
  public tempEdu = { institucion: '', titulo: '', nivelEstudio: '', fechaGraduacion: '' };
  public tempRef = { nombre: '', cargo: '', celular: '', correo: '' };

  public archivoCV: File | null = null;
  public nombreArchivo: string = '';

  ngOnInit(): void {
    this.idEmpleo = Number(this.route.snapshot.paramMap.get('id'));
    if (!this.idEmpleo) {
      this.router.navigate(['/']);
    }
  }

  // Gestión de Experiencia
  addExperiencia() {
    if (!this.tempExp.empresa || !this.tempExp.cargo || !this.tempExp.fechaInicio) {
      alert("Por favor completa los campos principales de la experiencia.");
      return;
    }
    this.datos.experiencias.push({ ...this.tempExp });
    this.tempExp = { empresa: '', cargo: '', fechaInicio: '', fechaFin: '', descripcion: '' };
  }

  removeExperiencia(index: number) {
    this.datos.experiencias.splice(index, 1);
  }

  // Gestión de Educación
  addEducacion() {
    if (!this.tempEdu.institucion || !this.tempEdu.titulo || !this.tempEdu.nivelEstudio) {
      alert("Por favor completa los campos principales de la educación.");
      return;
    }
    this.datos.educaciones.push({ ...this.tempEdu });
    this.tempEdu = { institucion: '', titulo: '', nivelEstudio: '', fechaGraduacion: '' };
  }

  removeEducacion(index: number) {
    this.datos.educaciones.splice(index, 1);
  }

  // Gestión de Referencias
  addReferencia() {
    if (!this.tempRef.nombre || !this.tempRef.cargo || !this.tempRef.celular) {
      alert("Por favor completa los campos obligatorios de la referencia.");
      return;
    }
    this.datos.referencias.push({ ...this.tempRef });
    this.tempRef = { nombre: '', cargo: '', celular: '', correo: '' };
  }

  removeReferencia(index: number) {
    this.datos.referencias.splice(index, 1);
  }

  nextStep() {
    if (this.validarPaso()) {
      this.step++;
      window.scrollTo(0, 0);
    }
  }

  prevStep() {
    this.step--;
    window.scrollTo(0, 0);
  }

  validarCédulaEcuatoriana(cedula: string): boolean {
    if (cedula.length !== 10) return false;
    const digito_region = parseInt(cedula.substring(0,2), 10);
    if (digito_region < 1 || digito_region > 24) return false;
    const ultimo_digito: number = parseInt(cedula.substring(9,10), 10);
    let pares: number = parseInt(cedula.substring(1,2),10) + parseInt(cedula.substring(3,4),10) + parseInt(cedula.substring(5,6),10) + parseInt(cedula.substring(7,8),10);
    let numero1: number = parseInt(cedula.substring(0,1),10) * 2; if (numero1 > 9) numero1 -= 9;
    let numero3: number = parseInt(cedula.substring(2,3),10) * 2; if (numero3 > 9) numero3 -= 9;
    let numero5: number = parseInt(cedula.substring(4,5),10) * 2; if (numero5 > 9) numero5 -= 9;
    let numero7: number = parseInt(cedula.substring(6,7),10) * 2; if (numero7 > 9) numero7 -= 9;
    let numero9: number = parseInt(cedula.substring(8,9),10) * 2; if (numero9 > 9) numero9 -= 9;
    let impares: number = numero1 + numero3 + numero5 + numero7 + numero9;
    let suma_total: number = (pares + impares);
    let primer_digito_suma: number = parseInt(String(suma_total).substring(0,1),10);
    let decena: number = (primer_digito_suma + 1) * 10;
    let digito_validador: number = decena - suma_total;
    if(digito_validador === 10) digito_validador = 0;
    return digito_validador === ultimo_digito;
  }

  validarPaso(): boolean {
    if (this.step === 1) {
      if (!this.datos.nombreCandidato || !this.datos.cedula || !this.datos.correo || !this.datos.telefono || !this.datos.ciudad) {
        alert("Por favor completa todos los datos personales.");
        return false;
      }
      if (this.datos.cedula.length !== 10 || isNaN(Number(this.datos.cedula))) {
        alert("La cédula de identidad debe tener 10 dígitos numéricos.");
        return false;
      }
    }
    if (this.step === 2) {
      if (this.datos.educaciones.length === 0) {
          alert("Debes añadir al menos una Formación Académica.");
          return false;
      }
      if (this.datos.experiencias.length === 0) {
          alert("Debes añadir al menos una Experiencia Laboral.");
          return false;
      }
      if (this.datos.referencias.length === 0) {
          alert("Debes añadir al menos una Referencia Personal o Laboral.");
          return false;
      }
      // Validación lógica de Fechas (Si ingresaron algo en Año de Graduación)
      for (let edu of this.datos.educaciones) {
        if (edu.fechaGraduacion && parseInt(edu.fechaGraduacion) > new Date().getFullYear() + 5) {
          alert(`El año de graduación ${edu.fechaGraduacion} en ${edu.institucion} es inválido.`);
          return false;
        }
      }
    }
    return true;
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      if (file.type !== 'application/pdf') {
        alert("Por favor sube un archivo en formato PDF.");
        return;
      }
      this.archivoCV = file;
      this.nombreArchivo = file.name;
    }
  }

  enviarPostulacion() {
    if (!this.archivoCV) {
      alert("Es obligatorio subir tu CV en PDF para postularte.");
      return;
    }

    this.enviando = true;
    
    const payload = {
      idEmpleo: this.idEmpleo,
      ...this.datos
    };

    this.empleoService.postular(payload, this.archivoCV).subscribe({
      next: (res) => {
        this.enviando = false;
        this.exito = true;
        window.scrollTo(0, 0);
      },
      error: (err) => {
        this.enviando = false;
        console.error("Error detallado:", err);
        
        let mensajeFinal = "Hubo un error al enviar tu postulación.";
        if (err.error && typeof err.error === 'string') {
          mensajeFinal += "\n\nDetalle: " + err.error;
        } else if (err.message) {
          mensajeFinal += "\n\nServidor: " + err.message;
        }

        alert(mensajeFinal);
      }
    });
  }

  volverInicio() {
    this.router.navigate(['/']);
  }
}
