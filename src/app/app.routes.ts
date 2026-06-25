import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home';
import { NosotrosComponent } from './components/nosotros/nosotros'; 
import { AdminEmpleosComponent } from './components/admin-empleos/admin-empleos';
import { PostulacionComponent } from './components/postulacion/postulacion';
import { AtsDashboardComponent } from './components/ats-dashboard/ats-dashboard';
import { VisorCorporativoComponent } from './components/visor-corporativo/visor-corporativo';
import { DetalleSeccionComponent } from './components/detalle-seccion/detalle-seccion';
import { PoliticaPrivacidadComponent } from './components/politica-privacidad/politica-privacidad.component';

export const routes: Routes = [
  { 
    path: '', 
    component: HomeComponent, 
    title: 'Impactex | Corporación Textil Masculina' 
  },

  { 
    path: 'nosotros', 
    component: NosotrosComponent,
    title: 'Nuestra Empresa | Impactex' 
  },
  {
    path: 'admin-empleos',
    component: AdminEmpleosComponent,
    title: 'Admin Empleos | Impactex'
  },
  {
    path: 'postular/:id',
    component: PostulacionComponent,
    title: 'Postular al Cargo | Impactex'
  },
  {
    path: 'talento-humano',
    component: AtsDashboardComponent,
    title: 'ATS Recursos Humanos | Impactex'
  },
  {
    path: 'politica-de-privacidad',
    component: PoliticaPrivacidadComponent,
    title: 'Política de Privacidad | Impactex'
  },
  {
    path: ':categoria',
    component: VisorCorporativoComponent,
    title: 'Impactex Portal Corporativo'
  },
  {
    path: ':categoria/:subseccion',
    component: DetalleSeccionComponent,
    title: 'Detalle Corporativo | Impactex'
  },
  { path: '**', redirectTo: '', pathMatch: 'full' }

];