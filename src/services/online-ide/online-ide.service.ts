import { Injectable } from '@angular/core';
import StackBlitzSDK from '@stackblitz/sdk';

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
  openStackBlitz() {
    StackBlitzSDK.openProject({
      title: 'NG-NEST',
      description: 'NG-NEST of Angular and Nestjs',
      template: 'angular-cli',
      dependencies: this.dependencies,
      files: {}
    });
  }
}
