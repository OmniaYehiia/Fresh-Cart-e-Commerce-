import {
  ApplicationConfig,
  importProvidersFrom,
  provideBrowserGlobalErrorListeners,
} from '@angular/core';
import { provideRouter, withHashLocation } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { NgxSpinnerModule } from 'ngx-spinner';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { loadingInterceptor } from './core/interceptors/loading/loading-interceptor';
import { headersInterceptor } from './core/interceptors/headers/headers-interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes, withHashLocation()),
    importProvidersFrom(NgxSpinnerModule),
    provideClientHydration(withEventReplay()),
    provideHttpClient(withFetch(), withInterceptors([loadingInterceptor, headersInterceptor])),
  ],
};
