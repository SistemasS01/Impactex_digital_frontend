import { Component, OnInit, inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CorporateDataService } from '../../services/corporate-data.service';

@Component({
  selector: 'app-visor-corporativo',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './visor-corporativo.html'
})
export class VisorCorporativoComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private platformId = inject(PLATFORM_ID);
  private dataService = inject(CorporateDataService);

  public categoryId: string = '';
  public activeId: string = '';
  public pageData: { title: string, subtitle: string, sections: any[] } = {
    title: '', subtitle: '', sections: []
  };

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.categoryId = params.get('categoria') || 'grupo';
      this.loadData();
      if (isPlatformBrowser(this.platformId)) {
        setTimeout(() => this.initScrollObserver(), 500);
      }
    });

    // Escuchar cambios de fragmentos HTML (Ej: /grupo#nuestro-modelo)
    this.route.fragment.subscribe(fragment => {
      if (fragment && isPlatformBrowser(this.platformId)) {
        setTimeout(() => {
          const element = document.getElementById(fragment);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }, 100);
      } else if (isPlatformBrowser(this.platformId)) {
        window.scrollTo(0,0);
      }
    });
  }

  private initScrollObserver() {
    const options = {
      root: null,
      rootMargin: '-20% 0px -70% 0px',
      threshold: 0
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.activeId = entry.target.id;
        }
      });
    }, options);

    this.pageData.sections.forEach(section => {
      const el = document.getElementById(section.id);
      if (el) observer.observe(el);
    });
  }

  public scrollToSection(id: string) {
    const el = document.getElementById(id);
    if (el) {
      const navOffset = 180; // Compensar header + subnav
      const position = el.getBoundingClientRect().top + window.scrollY - navOffset;
      window.scrollTo({ top: position, behavior: 'smooth' });
    }
  }

  loadData() {
    const database = this.dataService.getDatabase();
    this.pageData = database[this.categoryId.toLowerCase()] || {
      title: this.formatTitle(this.categoryId),
      subtitle: 'Categoría Corporativa en Actualización.',
      sections: [
        {
          id: 'not-found',
          title: 'Sin información',
          content: 'Esta división corporativa se encuentra temporalmente en revisión o auditoría.',
          image: '/corporativas/CORPORATIVA_1.jpg'
        }
      ]
    };
  }

  formatTitle(str: string): string {
    return str.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
  }
}
