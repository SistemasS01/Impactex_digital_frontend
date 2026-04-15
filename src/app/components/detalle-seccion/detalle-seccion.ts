import { Component, OnInit, inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CorporateDataService } from '../../services/corporate-data.service';

@Component({
  selector: 'app-detalle-seccion',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './detalle-seccion.html',
  styleUrl: './detalle-seccion.css'
})
export class DetalleSeccionComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private platformId = inject(PLATFORM_ID);
  private dataService = inject(CorporateDataService);
  
  public categoryId: string = '';
  public subseccionId: string = '';
  public data: any = null;

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.categoryId = params.get('categoria') || '';
      this.subseccionId = params.get('subseccion') || '';
      this.loadData();
      if (isPlatformBrowser(this.platformId)) {
        window.scrollTo(0, 0);
      }
    });
  }

  loadData() {
    const database = this.dataService.getDatabase();
    const category = database[this.categoryId.toLowerCase()];
    if (category) {
      this.data = category.sections.find((s: any) => s.id === this.subseccionId);
    }
  }
}
