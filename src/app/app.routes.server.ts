import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  {
    path: 'postular/:id',
    renderMode: RenderMode.Client
  },
  {
    path: ':categoria',
    renderMode: RenderMode.Prerender,
    getPrerenderParams: async () => {
      return [
        { categoria: 'grupo' },
        { categoria: 'sostenibilidad' },
        { categoria: 'talento' },
        { categoria: 'informacion' }
      ];
    }
  },
  {
    path: ':categoria/:subseccion',
    renderMode: RenderMode.Client
  },
  {
    path: '**',
    renderMode: RenderMode.Prerender
  }
];
