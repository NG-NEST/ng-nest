import { provideZonelessChangeDetection, isDevMode, provideAppInitializer, inject } from '@angular/core';
import {
  provideRouter,
  withEnabledBlockingInitialNavigation,
  withInMemoryScrolling,
  withPreloading
} from '@angular/router';
import { MainRoutes, TestRoutes } from './app.routes';
import { provideServiceWorker } from '@angular/service-worker';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { XPreloadingStrategyService } from '@ng-nest/ui/core';
import type { ApplicationConfig } from '@angular/core';
import { of } from 'rxjs';
import { ConfigService, IconService } from '@services';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZonelessChangeDetection(),
    provideHttpClient(withFetch()),
    provideRouter(
      !isDevMode() ? MainRoutes : TestRoutes,
      // MainRoutes,
      withInMemoryScrolling({ anchorScrolling: 'enabled', scrollPositionRestoration: 'top' }),
      withEnabledBlockingInitialNavigation(),
      withPreloading(XPreloadingStrategyService)
    ),
    provideServiceWorker('ngsw-worker.js', {
      enabled: !isDevMode(),
      registrationStrategy: 'registerWhenStable:30000'
    }),
    provideAppInitializer(() => {
      const config = inject(ConfigService);
      const icon = inject(IconService);
      config.init();
      icon.init();
      return of(true);
    })
  ]
};
