import { bootstrapApplication } from '@angular/platform-browser';
import { App }                from './app/app';
import { importProvidersFrom } from '@angular/core';
import { provideRouter, RouterModule }       from '@angular/router';
import { HttpClientModule }   from '@angular/common/http';
import { routes }             from './app/app.routes';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

bootstrapApplication(App, {
  providers: [
    provideRouter(routes),
    importProvidersFrom(
      BrowserAnimationsModule,        // ← animaciones
      ToastrModule.forRoot({          // ← configuración del toast
        timeOut: 3000,
        positionClass: 'toast-bottom-right',
        preventDuplicates: true,
      })
    ),
    importProvidersFrom(RouterModule.forRoot(routes)),
    importProvidersFrom(HttpClientModule)     // ← importa aquí también
  ]
});
