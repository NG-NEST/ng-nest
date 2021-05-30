import { Injectable } from '@angular/core';
import StackBlitzSDK from '@stackblitz/sdk';
import angularJSON from './files/angular.json';
import mainTs from './files/main';
import polyfillTS from './files/polyfills';
import appComponentTs from './files/app.component';
import appModuleTs from './files/app.module';
import ngNestModuleTs from './files/ng-nest.module';
import environmentTS from './files/environment';
import tsconfigTS from './files/tsconfig.json';
import tsconfigAppTS from './files/tsconfig.app.json';

@Injectable({ providedIn: 'root' })
export class OnlineIdeService {
  dependencies = {
    '@angular/animations': '^12.0.0',
    '@angular/cdk': '^12.0.0',
    '@angular/common': '^12.0.0',
    '@angular/compiler': '^12.0.0',
    '@angular/core': '^12.0.0',
    '@angular/forms': '^12.0.0',
    '@angular/platform-browser': '^12.0.0',
    '@angular/platform-browser-dynamic': '^12.0.0',
    '@angular/router': '^12.0.0',
    rxjs: '~6.6.3',
    'core-js': '~3.6.5',
    lodash: '^4.17.21',
    tslib: '^2.0.0',
    'zone.js': '~0.11.1',
    '@ng-nest/ui': `^12.0.0`
  };
  openStackBlitz(selector: string, modules: string[], providers: string[], files: { [fileName: string]: string }) {
    StackBlitzSDK.openProject({
      title: 'NG-NEST',
      description: 'NG-NEST of Angular and Nestjs',
      template: 'angular-cli',
      dependencies: this.dependencies,
      files: {
        'angular.json': `${JSON.stringify(angularJSON, null, 2)}`,
        'environments/environment.ts': environmentTS,
        'tsconfig.json': `${JSON.stringify(tsconfigTS, null, 2)}`,
        'tsconfig.app.json': `${JSON.stringify(tsconfigAppTS, null, 2)}`,
        'src/index.html': `<app-root>加载中...</app-root>`,
        'src/main.ts': mainTs,
        'src/polyfills.ts': polyfillTS,
        'src/app/app.module.ts': appModuleTs(selector, providers),
        'src/app/ng-nest.module.ts': ngNestModuleTs(modules),
        'src/app/app.component.ts': appComponentTs,
        'src/app/app.component.html': `<ex-${selector}></ex-${selector}>`,
        'src/styles.scss': '/* You can add global styles to this file, and also import other style files */',
        ...files
      }
    });
  }
}
