import { Injectable } from '@angular/core';
import StackBlitzSDK from '@stackblitz/sdk';
import angularJSON from './files/angular.json';
import mainTs from './files/main';
import polyfillTS from './files/polyfills';
import appComponentTs from './files/app.component';
import appModuleTs from './files/app.module';
import environmentTS from './files/environment';

@Injectable({ providedIn: 'root' })
export class OnlineIdeService {
  dependencies = {
    '@angular/animations': '^11.0.0',
    '@angular/cdk': '^11.0.0',
    '@angular/common': '^11.0.0',
    '@angular/compiler': '^11.0.0',
    '@angular/core': '^11.0.0',
    '@angular/forms': '^11.0.0',
    '@angular/platform-browser': '^11.0.0',
    '@angular/platform-browser-dynamic': '^11.0.0',
    '@angular/router': '^11.0.0',
    rxjs: '~6.6.3',
    'core-js': '~3.6.5',
    tslib: '^2.0.0',
    'zone.js': '~0.11.1',
    '@ng-nest/ui': `^11.0.0`
  };
  openStackBlitz(selector: string, componentName: string) {
    StackBlitzSDK.openProject({
      title: 'NG-NEST',
      description: 'NG-NEST of Angular and Nestjs',
      template: 'angular-cli',
      dependencies: this.dependencies,
      files: {
        'angular.json': `${JSON.stringify(angularJSON, null, 2)}`,
        'environments/environment.ts': environmentTS,
        'src/index.html': `<app-root>加载中...</app-root>`,
        'src/main.ts': mainTs,
        'src/polyfills.ts': polyfillTS,
        'src/app/app.module.ts': appModuleTs(componentName),
        'src/app/app.component.ts': appComponentTs,
        'src/app/app.component.html': `<${selector}></${selector}>`,
        'src/styles.scss': '/* You can add global styles to this file, and also import other style files */'
      }
    });
  }
}
