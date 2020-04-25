import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { mainRoutes } from '../environments/routes';
import { XPreloadingStrategyService } from '@ng-nest/ui/core';

@NgModule({
  imports: [
    RouterModule.forRoot(mainRoutes, {
      enableTracing: false,
      anchorScrolling: 'enabled',
      scrollPositionRestoration: 'top',
      preloadingStrategy: XPreloadingStrategyService
    })
  ],
  exports: [RouterModule],
  providers: [
    XPreloadingStrategyService
    // { provide: RouteReuseStrategy, useClass: SimpleReuseStrategy }
  ]
})
export class MainRoutesModule {}
