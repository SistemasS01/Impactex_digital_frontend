import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home';
import { NosotrosComponent } from './components/nosotros/nosotros'; 
import { AdminEmpleosComponent } from './components/admin-empleos/admin-empleos';
import { PostulacionComponent } from './components/postulacion/postulacion';
import { AtsDashboardComponent } from './components/ats-dashboard/ats-dashboard';
import { VisorCorporativoComponent } from './components/visor-corporativo/visor-corporativo';
import { DetalleSeccionComponent } from './components/detalle-seccion/detalle-seccion';

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
    path: ':categoria/:subseccion',
    component: DetalleSeccionComponent,
    title: 'Detalle Corporativo | Impactex'
  },
  {
    path: ':categoria',
    component: VisorCorporativoComponent,
    title: 'Impactex Portal Corporativo'
  },
  { path: '**', redirectTo: '', pathMatch: 'full' }

];