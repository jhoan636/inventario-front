import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { MercanciaComponent } from './mercancia.component';
import { MercanciaFormComponent } from './mercancia-form/mercancia-form.component';

const mercanciaRoutes: Routes = [
  { path: '', component: MercanciaComponent },
  { path: 'nuevo', component: MercanciaFormComponent },
 { path: ':id/editar', component: MercanciaFormComponent },
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule, 
    ReactiveFormsModule,
    RouterModule.forChild(mercanciaRoutes),
    MercanciaComponent,
  ],
})
export class MercanciaModule {}
