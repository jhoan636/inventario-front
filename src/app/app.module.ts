// src/app/app.module.ts
import { NgModule }         from '@angular/core';
import { BrowserModule }    from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule }     from '@angular/router';
import { routes }           from './app.routes';

@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,           
    RouterModule.forRoot(routes)
  ],
})
export class AppModule {}
