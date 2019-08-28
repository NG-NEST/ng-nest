import { NgModule } from '@angular/core';
import { RouterModule, RouteReuseStrategy } from '@angular/router';
import { SelectivePreloadingStrategy } from './selective-preloading-strategy';
import { mainRoutes } from '../environments/routes';
import { SimpleReuseStrategy } from './simple-reuse-srategy';

@NgModule({
  imports: [
    RouterModule.forRoot(
      mainRoutes,
      {
        enableTracing: false,
        anchorScrolling: 'enabled',
        preloadingStrategy: SelectivePreloadingStrategy
      }
    )
  ],
  exports: [
    RouterModule
  ],
  providers: [
    SelectivePreloadingStrategy,
    // { provide: RouteReuseStrategy, useClass: SimpleReuseStrategy }
  ]
})
export class MainRoutesModule { }