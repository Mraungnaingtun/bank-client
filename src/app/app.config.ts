import { ApplicationConfig, provideExperimentalZonelessChangeDetection, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, provideHttpClient, withFetch, withInterceptorsFromDi } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MyInterceptor } from './interceptors/MyInterceptor';

export const appConfig: ApplicationConfig = {
  providers:
    [
      // provideZoneChangeDetection({ eventCoalescing: true }),
      provideExperimentalZonelessChangeDetection(),
      provideRouter(routes),
      // provideHttpClient(withFetch()),
      provideHttpClient(withInterceptorsFromDi()),
      provideClientHydration(withEventReplay()), 
      provideAnimationsAsync(),
      {provide: HTTP_INTERCEPTORS, useClass: MyInterceptor, multi: true},
    ]
};
