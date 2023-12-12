import { Injectable } from '@angular/core';
import StackBlitzSDK from '@stackblitz/sdk';
import angularJSON from './files/angular.json';
import mainTs from './files/main';
import polyfillTS from './files/polyfills';
import appComponentTs from './files/app.component';
import appModuleTs from './files/app.module';
import environmentTS from './files/environment';
import tsconfigTS from './files/tsconfig.json';
import tsconfigAppTS from './files/tsconfig.app.json';

@Injectable({ providedIn: 'root' })
export class OnlineIdeService {
  dependencies = {
    '@angular/animations': '^17.0.0',
    '@angular/cdk': '^17.0.0',
    '@angular/common': '^17.0.0',
    '@angular/compiler': '^17.0.0',
    '@angular/core': '^17.0.0',
    '@angular/forms': '^17.0.0',
    '@angular/platform-browser': '^17.0.0',
    '@angular/platform-browser-dynamic': '^17.0.0',
    '@angular/router': '^17.0.0',
    rxjs: '~7.5.0',
    'core-js': '^3.26.1',
    tslib: '^2.3.0',
    'zone.js': '~0.13.0',
    '@ng-nest/ui': `^17.0.0`
  };
  openStackBlitz(
    selector: string,
    otherSelectors: string[],
    providers: string[],
    files: { [fileName: string]: string }
  ) {
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
        'src/app/app.module.ts': appModuleTs(selector, otherSelectors, providers),
        'src/app/app.component.ts': appComponentTs,
        'src/app/app.component.html': `<ex-${selector}></ex-${selector}>`,
        'src/styles.scss': '/* You can add global styles to this file, and also import other style files */',
        ...files
      }
    });
  }
}
