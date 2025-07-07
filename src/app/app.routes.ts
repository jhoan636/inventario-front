// src/app/app.routes.ts
import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: '/mercancias', pathMatch: 'full' },

  {
    path: 'cargos',
    loadChildren: () =>
      import('./features/cargo/cargo.module').then((m) => m.CargoModule),
  },
  {
    path: 'mercancias',
    loadChildren: () =>
      import('./features/mercancia/mercancia.module').then((m) => m.MercanciaModule),
  },

  // si cae en cualquier otra ruta
  { path: '**', redirectTo: '' },
];
