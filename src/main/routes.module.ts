import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { mainRoutes, testRoutes } from '../environments/routes';
import { XPreloadingStrategyService } from '@ng-nest/ui/core';
import { environment } from 'src/environments/environment';

@NgModule({
  imports: [
    RouterModule.forRoot(environment.production ? mainRoutes : testRoutes, {
      enableTracing: false,
      anchorScrolling: 'enabled',
      scrollPositionRestoration: 'top',
      preloadingStrategy: XPreloadingStrategyService,
      initialNavigation: 'enabledBlocking'
    })
  ],
  exports: [RouterModule],
  providers: [
    XPreloadingStrategyService
    // { provide: RouteReuseStrategy, useClass: XReuseStrategyService }
  ]
})
export class MainRoutesModule {}
