// app.routes.server.ts
import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  {
    path: 'product/:id',
    renderMode: RenderMode.Server // This tells Angular to build it on the fly, not at build-time
  },
  {
    path: '**',
    renderMode: RenderMode.Prerender
  }
];