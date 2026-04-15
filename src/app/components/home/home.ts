import { Component, OnInit, AfterViewInit, ElementRef, inject, PLATFORM_ID, ViewChild } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { EmpleoService, WebEmpleo } from '../../services/empleo.service';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-home',
  standalone: true,
  // Añadimos FormsModule para poder usar ngModel y ngForm en la plantilla
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './home.html',

  styleUrl: './home.css' // Asegúrate de que este archivo exista o bórralo
})
export class HomeComponent implements OnInit, AfterViewInit {
  private apiService = inject(ApiService);
  private el = inject(ElementRef);
  private router = inject(Router);
  private empleoService = inject(EmpleoService);
  private platformId = inject(PLATFORM_ID);
 
  @ViewChild('heroVideo') heroVideo!: ElementRef<HTMLVideoElement>;

  
  // Usamos 'any' para evitar que TypeScript se queje por ahora
  public webData: any = null;

  // Empleos cargados desde la DB
  public empleos: WebEmpleo[] = [];
  public searchTerm = '';
  public empleoActivo: WebEmpleo | null = null;

  // Eliminada la lógica de Pestañas. Ahora todo es scroll continuo.

  // Base de datos de Personas que Inspiran (Neutral)
  public fundadores = [
    { nombre: 'Dr. Milton Altamirano mg', foto: '/jefes_area/PRECIDENCIA.jpg', area: 'Presidencia' },
    { nombre: 'Lic. Martha Segura', foto: '/jefes_area/JEFEFINANCIERO.jpg', area: 'Gestión Financiera' },
    { nombre: 'Ing. Veronica Altamirano', foto: '/jefes_area/JEFECOMERCIAL.jpg', area: 'Gestión Comercial' },
    { nombre: 'Ing. Kleber Betancourt', foto: '/jefes_area/ADMINISTRATIVO.jpg', area: 'Administración' },
    { nombre: 'Ing. Rony Altamirano', foto: '/jefes_area/MARKETING.jpg', area: 'Marketing & Digital' }
  ];

  // Galería de Equipo: El Talento Humano (Segregado de Liderazgo y departamentos)
  public galeriaEquipo = [
    { src: '/jefes_area/JEFEPRODUCCION.jpg', label: 'Línea de Producción' },
    { src: '/jefes_area/JEFECALIDAD.jpg', label: 'Control de Calidad Textil' },
    { src: '/jefes_area/JEFECORTE.jpg', label: 'Precisión de Corte' },
    { src: '/jefes_area/JEFEDISEÑO.jpg', label: 'Innovación y Diseño' },
    { src: '/jefes_area/JEFEBODEGAINSUMOS.jpg', label: 'Gestión de Suministros' },
    { src: '/jefes_area/PASANTES.jpg', label: 'Futuro y Talento' },
    { src: '/jefes_area/ADMINISTRATIVO.jpg', label: 'Gestión Administrativa' },
    { src: '/jefes_area/JEFECOMERCIAL.jpg', label: 'Área Comercial' },
    { src: '/jefes_area/JEFEFINANCIERO.jpg', label: 'Planificación Financiera' },
    { src: '/jefes_area/MARKETING.jpg', label: 'Estrategia de Marca' },
    { src: '/jefes_area/JEFECALIDAD1.jpg', label: 'Supervisión de Procesos' },
    { src: '/jefes_area/PASANTES1.jpg', label: 'Desarrollo de Carrera' }
  ];

  // Galería de Procesos: Poder Industrial (Planta y Departamentos)
  public galeriaProcesos = [
    { src: '/departamentos/BODEGAINSUMOS_18.jpg', label: 'Recepción de Materia Prima' },
    { src: '/departamentos/BODEGAPT.jpg', label: 'Producto Terminado' },
    { src: '/departamentos/CALIDAD_10.jpg', label: 'Inspección de Tejidos' },
    { src: '/departamentos/CORTE_23.jpg', label: 'Corte Automatizado' },
    { src: '/departamentos/DISEÑO_22.jpg', label: 'Departamento Creativo' },
    { src: '/departamentos/PRODUCCION_3.jpg', label: 'Ensamblaje de Moda' },
    { src: '/departamentos/SHOWROOM_1.jpg', label: 'Exhibición de Colecciones' },
    { src: '/departamentos/PRODUCCION_8.jpg', label: 'Tecnología Textil' }
  ];

  // Base de datos local para los departamentos
  public deptoActivo: any = null;
  public listaDepartamentos = [
    { 
      id: 'tthh', 
      nombre: 'Talento Humano', 
      icon: 'fa-users', 
      img: '/departamentos/BODEGAPT.jpg', 
      desc: 'Gestión integral del capital humano y desarrollo organizacional.',
      galeria: ['BODEGAPT', 'BODEGAPT_2']
    },
    { 
      id: 'sistemas', 
      nombre: 'Sistemas IT', 
      icon: 'fa-laptop-code', 
      img: '/departamentos/CALIDAD_10.jpg', 
      desc: 'Infraestructura tecnológica y soporte digital de vanguardia.',
      galeria: ['CALIDAD_10', 'CALIDAD_11']
    },
    { 
      id: 'confeccion', 
      nombre: 'Producción', 
      icon: 'fa-tshirt', 
      img: '/departamentos/PRODUCCION_3.jpg', 
      desc: 'Procesos de confección de alta calidad con maquinaria de punta.',
      galeria: ['PRODUCCION_3', 'PRODUCCION_4', 'PRODUCCION_5', 'PRODUCCION_6', 'PRODUCCION_7']
    },
    { 
      id: 'calidad', 
      nombre: 'Control de Calidad', 
      icon: 'fa-clipboard-check', 
      img: '/departamentos/CALIDAD_12.jpg', 
      desc: 'Supervisión rigurosa de cada prenda asegurando estándares internacionales.',
      galeria: ['CALIDAD_12', 'CALIDAD_13', 'CALIDAD_14', 'CALIDAD_15', 'CALIDAD_16', 'CALIDAD_17']
    },
    { 
      id: 'bodega_insumos', 
      nombre: 'Logística e Insumos', 
      icon: 'fa-boxes', 
      img: '/departamentos/BODEGAINSUMOS_18.jpg', 
      desc: 'Administración estratégica de materia prima e insumos textiles.',
      galeria: ['BODEGAINSUMOS_18', 'BODEGAINSUMOS19', 'BODEGAINSUMOS20', 'BODEGAINSUMOS21']
    },
    { 
      id: 'corte', 
      nombre: 'Corte Industrial', 
      icon: 'fa-cut', 
      img: '/departamentos/CORTE_23.jpg', 
      desc: 'Corte computarizado de alta precisión para cada línea de producto.',
      galeria: ['CORTE_23', 'CORTE_24', 'CORTE_25', 'CORTE_26']
    },
    { 
      id: 'diseno', 
      nombre: 'Diseño Gráfico', 
      icon: 'fa-pencil-ruler', 
      img: '/departamentos/DISEÑO_22.jpg', 
      desc: 'Conceptualización visual y diseño de moda para nuestras marcas.',
      galeria: ['DISEÑO_22']
    }
  ];

  // Fotos corporativas reales
  public fotosCorporativas = ['/corporativas/CORPORATIVA_1.jpg', '/corporativas/CORPORATIIVA_2.jpg'];

  // Fotos de pasantes
  public fotosPasantes = ['/jefes_area/PASANTES.jpg', '/jefes_area/PASANTES1.jpg'];

  public hacerScrollAPestana(id: string): void {
    this.deptoActivo = null;
    this.irASeccion(id);
  }

  public irASeccion(id: string): void {
    if (isPlatformBrowser(this.platformId)) {
      const el = document.getElementById(id);
      if (el) {
        const offset = 100; // Ajuste para el header fijo
        const bodyRect = document.body.getBoundingClientRect().top;
        const elementRect = el.getBoundingClientRect().top;
        const elementPosition = elementRect - bodyRect;
        const offsetPosition = elementPosition - offset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    }
  }

  public irANosotros(): void {
    this.irASeccion('historia');
  }

  public cerrarContenido(): void {
    this.deptoActivo = null;
  }

  public abrirDepartamento(depto: any): void {
    this.deptoActivo = depto;
  }

  public cerrarDepartamento(event?: Event): void {
    if(event) event.stopPropagation();
    this.deptoActivo = null;
  }

  // --- Lógica para Empleos (Trabaja con Nosotros) ---
  public get filteredJobs(): WebEmpleo[] {
    if (!this.searchTerm) return this.empleos;
    const term = this.searchTerm.toLowerCase();
    return this.empleos.filter(j => 
      j.titulo.toLowerCase().includes(term) ||
      j.empresa.toLowerCase().includes(term) ||
      j.ubicacion.toLowerCase().includes(term)
    );
  }

  public abrirEmpleo(job: WebEmpleo): void {
    this.empleoActivo = job;
  }

  public cerrarEmpleo(event?: Event): void {
    if(event) event.stopPropagation();
    this.empleoActivo = null;
  }

  public irAPostular(id?: number, event?: Event): void {
    if(event) event.stopPropagation();
    if (id) {
       this.router.navigate(['/postular', id]);
    }
  }

  // --- Lógica para el formulario de contacto ---
  public leadData = {
    nombre: '',
    email: '',
    telefono: '',
    asunto: '',
    mensaje: ''
  };
  public enviando = false;
  public mensajeExito: string | null = null;
  public mensajeError: string | null = null;

  // --- Lógica para Tiendas/Ubicaciones ---
  public tiendaActiva: string | null = null;

  public toggleTienda(tienda: string): void {
    this.tiendaActiva = this.tiendaActiva === tienda ? null : tienda;
  }
  // --------------------------------------------

  public contenidos: { [key: string]: string } = {
    // Valores por defecto para evitar errores visuales mientras carga la data
    'HERO_TITULO_1': 'Corporación Impactex',
    'HERO_TITULO_2': 'Orgullosamente Ecuatoriana',
    'HERO_DESCRIPCION': 'Desde 1999, fabricamos ropa interior, ropa deportiva y textiles de alta calidad desde Tungurahua para Ecuador y el mundo. Presentes en México, Estados Unidos y Canadá.',
    'NOSOTROS_TITULO': 'Nuestra Historia',
    'NOSOTROS_DESCRIPCION': 'Corporación Impactex nació en 1999 en la provincia de Tungurahua como Impacto Textil, dedicándose a la producción de ropa interior. Tres años después nació la marca MAO, que revolucionó el mercado con una propuesta innovadora: ropa interior deportiva elaborada con microfibras y elásticos de alta durabilidad, diseñada para acompañar cada actividad. Hoy exportamos a México, Estados Unidos y Canadá, y llevamos con orgullo La Huella de Mucho Mejor Ecuador.',
    'UNIDADES_TITULO': 'Lo Que Hacemos',
    'UNIDADES_DESCRIPCION': 'Más de 25 años de experiencia nos respaldan en cada prenda que fabricamos.',
    'PUNTOS_VENTA_TITULO': 'Nuestros Puntos de Venta',
    'PUNTOS_VENTA_DESCRIPCION': 'Visítanos en nuestras tiendas físicas. Queremos que la gente conozca y se sienta orgullosa del producto ecuatoriano.',
    'CONTACTO_TITULO': 'Contáctanos',
    'CONTACTO_DESCRIPCION': '¿Interesado en nuestros productos o en ser distribuidor? Completa el formulario y nuestro equipo se pondrá en contacto contigo.',
    'FOOTER_DERECHOS': '© 2026 Corporación Impactex. Todos los derechos reservados. Orgullosamente ecuatorianos desde 1999.',
    'FOOTER_DIRECCION': 'Provincia de Tungurahua, Ambato, Ecuador',
    'FOOTER_TELEFONO': '+593 3-299-9999'
  };

  ngOnInit(): void {
    this.cargarDatos();
    this.cargarEmpleos();
  }

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      // Forzar reproducción del video si existe
      if (this.heroVideo) {
         const video = this.heroVideo.nativeElement;
         video.muted = true;
         video.play().catch(e => console.log('Error intentando reproducir el video:', e));
      }

      // Retrasar levemente para asegurar que los elementos del DOM están renderizados
      setTimeout(() => {
        this.initImpactexObserver();
      }, 100);
    }
  }

  private initImpactexObserver(): void {
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: [0, 0.1, 0.3, 0.5, 0.8, 1] 
    };

    const callback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach(entry => {
        const el = entry.target as HTMLElement;
        const rect = el.getBoundingClientRect();
        
        // Elemento entra al viewport
        if (entry.isIntersecting && entry.intersectionRatio > 0.05) {
          el.classList.add('is-visible');
          el.classList.remove('is-hidden-top');
        } 
        else if (!entry.isIntersecting) {
          // Si el elemento quedó por encima de la pantalla (el usuario bajo mucho su scroll) -> Fade Out Hacia Arriba
          if (rect.bottom < 0) {
            el.classList.add('is-hidden-top');
          } else {
            // El elemento bajó, por lo que le quitamos is-visible para que vuelva a hacer el efecto de subida si volvemos a bajar.
            el.classList.remove('is-visible');
            el.classList.remove('is-hidden-top');
          }
        }
      });
    };

    const observer = new IntersectionObserver(callback, options);
    // Agarrar todos los elementos que tienen las clases base
    const elements = document.querySelectorAll('.itx-fade-up, .itx-fade-down');
    elements.forEach(el => observer.observe(el));
  }

  cargarDatos(): void {
    this.apiService.getWebData('CORP').subscribe({
      next: (res: any) => {
        this.webData = res;
        if (res.contenidos && Array.isArray(res.contenidos)) {
          res.contenidos.forEach((c: any) => {
            if (c.clave && c.valorTextual) {
              this.contenidos[c.clave] = c.valorTextual;
            }
          });
        }
      },
      error: (err: any) => {
        console.error('Error al conectar con el Backend:', err);
      }
    });
  }

  cargarEmpleos(): void {
    this.empleoService.obtenerEmpleos().subscribe({
      next: (data) => {
        this.empleos = data;
      },
      error: (err) => {
        console.error('Error cargando empleos', err);
      }
    });
  }

  enviarFormulario(form: NgForm): void {
    if (form.invalid) {
      this.mensajeError = 'Por favor, completa todos los campos requeridos.';
      return;
    }

    this.enviando = true;
    this.mensajeExito = null;
    this.mensajeError = null;

    this.apiService.enviarLead(this.leadData).subscribe({
      next: (res: any) => {
        this.enviando = false;
        this.mensajeExito = '¡Gracias por contactarnos! Tu mensaje ha sido enviado.';
        form.resetForm();
      },
      error: (err: any) => {
        this.enviando = false;
        this.mensajeError = 'Hubo un error al enviar el mensaje. Por favor, inténtalo de nuevo más tarde.';
      }
    });
  }
}