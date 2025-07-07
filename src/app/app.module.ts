// src/app/app.module.ts
import { NgModule }         from '@angular/core';
import { BrowserModule }    from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule }     from '@angular/router';
import { routes }           from './app.routes';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,           
    RouterModule.forRoot(routes),
    BrowserAnimationsModule,       // necesario
    ToastrModule.forRoot({         // configuración global
      timeOut: 3000,
      positionClass: 'toast-botton-right',
      preventDuplicates: true,
    }),
  ],
})
export class AppModule {}
