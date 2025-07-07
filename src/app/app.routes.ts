// src/app/app.routes.ts
import { Routes } from '@angular/router';

export const routes: Routes = [
  // redirige root a cargos
  { path: '',        redirectTo: 'cargos', pathMatch: 'full' },

  { path: 'cargos',
    loadChildren: () =>
      import('./features/cargo/cargo.module').then(m => m.CargoModule)
  },

  // si cae en cualquier otra ruta
  { path: '**',      redirectTo: '' }
];
