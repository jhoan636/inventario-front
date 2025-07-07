// src/main.ts
import { bootstrapApplication } from '@angular/platform-browser';
import { App }                from './app/app';
import { importProvidersFrom } from '@angular/core';
import { RouterModule }       from '@angular/router';
import { HttpClientModule }   from '@angular/common/http';
import { routes }             from './app/app.routes';

bootstrapApplication(App, {
  providers: [
    importProvidersFrom(RouterModule.forRoot(routes)),
    importProvidersFrom(HttpClientModule)     // ← importa aquí también
  ]
});
