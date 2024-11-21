import { provideExperimentalZonelessChangeDetection, isDevMode, provideAppInitializer, inject } from '@angular/core';
import {
  provideRouter,
  withEnabledBlockingInitialNavigation,
  withInMemoryScrolling,
  withPreloading
} from '@angular/router';
import { MainRoutes, TestRoutes } from './app.routes';
import { provideServiceWorker } from '@angular/service-worker';
import { provideHttpClient, withFetch } from '@angular/common/http';
// import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideAnimations } from '@angular/platform-browser/animations';
import { XPreloadingStrategyService } from '@ng-nest/ui/core';
import type { ApplicationConfig } from '@angular/core';
import { of } from 'rxjs';
import { ConfigService } from '@services';

export const appConfig: ApplicationConfig = {
  providers: [
    provideExperimentalZonelessChangeDetection(),
    // provideAnimationsAsync(),
    provideAnimations(),
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
      config.init();
      return of(true);
    })
  ]
};
