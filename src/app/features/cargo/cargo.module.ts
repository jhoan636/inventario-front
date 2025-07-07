// src/app/features/cargo/cargo.module.ts
import { NgModule }            from '@angular/core';
import { CommonModule }        from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule }        from '@angular/router';

import { CargoListComponent }  from './cargo-list/cargo-list.component';
import { CargoFormComponent }  from './cargo-form/cargo-form.component';

@NgModule({
  imports: [
    // Módulos necesitados
    CommonModule,
    ReactiveFormsModule,

    // Rutas hijas
    RouterModule.forChild([
      { path: '',      component: CargoListComponent },
      { path: 'nuevo', component: CargoFormComponent }
    ]),

    // Componentes standalone
    CargoListComponent,
    CargoFormComponent
  ]
  // NO declarations, NO providers (service ya es providedIn: 'root')
})
export class CargoModule {}
