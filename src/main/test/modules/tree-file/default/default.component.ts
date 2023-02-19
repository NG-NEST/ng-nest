import { Component } from '@angular/core';
import { XTreeFileNode } from '@ng-nest/ui/tree-file';

@Component({
  selector: 'ex-default',
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.scss']
})
export class ExDefaultComponent {
  data: XTreeFileNode[] = [
    { id: '1__my-app', label: 'my-app' },
    {
      id: '1__my-app/e2e/src/app.e2e-spec.ts',
      pid: '1__my-app/e2e/src',
      label: 'app.e2e-spec.ts',
      url: 'docs/ui/getting-started/demo/1__my-app/e2e/src/app.e2e-spec.ts',
      type: 'ts',
      highlightLines: {}
    },
    {
      id: '1__my-app/e2e/src/app.po.ts',
      pid: '1__my-app/e2e/src',
      label: 'app.po.ts',
      url: 'docs/ui/getting-started/demo/1__my-app/e2e/src/app.po.ts',
      type: 'ts',
      highlightLines: {}
    },
    { id: '1__my-app/e2e/src', pid: '1__my-app/e2e', label: 'src' },
    {
      id: '1__my-app/e2e/protractor.conf.js',
      pid: '1__my-app/e2e',
      label: 'protractor.conf.js',
      url: 'docs/ui/getting-started/demo/1__my-app/e2e/protractor.conf.js',
      type: 'js',
      highlightLines: {}
    },
    {
      id: '1__my-app/e2e/tsconfig.json',
      pid: '1__my-app/e2e',
      label: 'tsconfig.json',
      url: 'docs/ui/getting-started/demo/1__my-app/e2e/tsconfig.json',
      type: 'json',
      highlightLines: {}
    },
    {
      id: '1__my-app/src/app/app-routing.module.ts',
      pid: '1__my-app/src/app',
      label: 'app-routing.module.ts',
      url: 'docs/ui/getting-started/demo/1__my-app/src/app/app-routing.module.ts',
      type: 'ts',
      highlightLines: {}
    },
    {
      id: '1__my-app/src/app/app.component.html',
      pid: '1__my-app/src/app',
      label: 'app.component.html',
      url: 'docs/ui/getting-started/demo/3.2__my-app/src/app/app.component.html',
      type: 'html',
      highlightLines: { primary: '5,13,21', success: '6,14,22', warning: '7,15,23', danger: '8,16,24', info: '9,17,25,28-33' }
    },
    {
      id: '1__my-app/src/app/app.component.scss',
      pid: '1__my-app/src/app',
      label: 'app.component.scss',
      url: 'docs/ui/getting-started/demo/3.2__my-app/src/app/app.component.scss',
      type: 'scss',
      highlightLines: {}
    },
    {
      id: '1__my-app/src/app/app.component.spec.ts',
      pid: '1__my-app/src/app',
      label: 'app.component.spec.ts',
      url: 'docs/ui/getting-started/demo/1__my-app/src/app/app.component.spec.ts',
      type: 'ts',
      highlightLines: {}
    },
    {
      id: '1__my-app/src/app/app.component.ts',
      pid: '1__my-app/src/app',
      label: 'app.component.ts',
      url: 'docs/ui/getting-started/demo/1__my-app/src/app/app.component.ts',
      type: 'ts',
      highlightLines: {}
    },
    {
      id: '1__my-app/src/app/app.module.ts',
      pid: '1__my-app/src/app',
      label: 'app.module.ts',
      url: 'docs/ui/getting-started/demo/3.1__my-app/src/app/app.module.ts',
      type: 'ts',
      highlightLines: { primary: '6, 15' }
    },
    {
      id: '1__my-app/src/assets/.gitkeep',
      pid: '1__my-app/src/assets',
      label: '.gitkeep',
      url: 'docs/ui/getting-started/demo/1__my-app/src/assets/.gitkeep',
      type: 'gitkeep',
      highlightLines: {}
    },
    {
      id: '1__my-app/src/assets/x-button.png',
      pid: '1__my-app/src/assets',
      label: 'x-button.png',
      url: 'docs/ui/getting-started/demo/3__img/1.png',
      type: 'png',
      highlightLines: {}
    },
    {
      id: '1__my-app/src/environments/environment.prod.ts',
      pid: '1__my-app/src/environments',
      label: 'environment.prod.ts',
      url: 'docs/ui/getting-started/demo/1__my-app/src/environments/environment.prod.ts',
      type: 'ts',
      highlightLines: {}
    },
    {
      id: '1__my-app/src/environments/environment.ts',
      pid: '1__my-app/src/environments',
      label: 'environment.ts',
      url: 'docs/ui/getting-started/demo/1__my-app/src/environments/environment.ts',
      type: 'ts',
      highlightLines: {}
    },
    { id: '1__my-app/src/app', pid: '1__my-app/src', label: 'app' },
    { id: '1__my-app/src/assets', pid: '1__my-app/src', label: 'assets' },
    { id: '1__my-app/src/environments', pid: '1__my-app/src', label: 'environments' },
    {
      id: '1__my-app/src/favicon.ico',
      pid: '1__my-app/src',
      label: 'favicon.ico',
      url: 'docs/ui/getting-started/demo/1__my-app/src/favicon.ico',
      type: 'ico',
      highlightLines: {}
    },
    {
      id: '1__my-app/src/index.html',
      pid: '1__my-app/src',
      label: 'index.html',
      url: 'docs/ui/getting-started/demo/1__my-app/src/index.html',
      type: 'html',
      highlightLines: {}
    },
    {
      id: '1__my-app/src/main.ts',
      pid: '1__my-app/src',
      label: 'main.ts',
      url: 'docs/ui/getting-started/demo/1__my-app/src/main.ts',
      type: 'ts',
      highlightLines: {}
    },
    {
      id: '1__my-app/src/polyfills.ts',
      pid: '1__my-app/src',
      label: 'polyfills.ts',
      url: 'docs/ui/getting-started/demo/1__my-app/src/polyfills.ts',
      type: 'ts',
      highlightLines: {}
    },
    {
      id: '1__my-app/src/styles.scss',
      pid: '1__my-app/src',
      label: 'styles.scss',
      url: 'docs/ui/getting-started/demo/2.1__my-app/src/styles.scss',
      type: 'scss',
      highlightLines: { primary: '2,4-6' }
    },
    {
      id: '1__my-app/src/test.ts',
      pid: '1__my-app/src',
      label: 'test.ts',
      url: 'docs/ui/getting-started/demo/1__my-app/src/test.ts',
      type: 'ts',
      highlightLines: {}
    },
    { id: '1__my-app/e2e', pid: '1__my-app', label: 'e2e' },
    { id: '1__my-app/src', pid: '1__my-app', label: 'src' },
    {
      id: '1__my-app/.editorconfig',
      pid: '1__my-app',
      label: '.editorconfig',
      url: 'docs/ui/getting-started/demo/1__my-app/.editorconfig',
      type: 'editorconfig',
      highlightLines: {}
    },
    {
      id: '1__my-app/.gitignore',
      pid: '1__my-app',
      label: '.gitignore',
      url: 'docs/ui/getting-started/demo/1__my-app/.gitignore',
      type: 'gitignore',
      highlightLines: {}
    },
    {
      id: '1__my-app/angular.json',
      pid: '1__my-app',
      label: 'angular.json',
      url: 'docs/ui/getting-started/demo/2.2__my-app/angular.json',
      type: 'json',
      highlightLines: { primary: '28' }
    },
    {
      id: '1__my-app/browserslist',
      pid: '1__my-app',
      label: 'browserslist',
      url: 'docs/ui/getting-started/demo/1__my-app/browserslist',
      type: '',
      highlightLines: {}
    },
    {
      id: '1__my-app/karma.conf.js',
      pid: '1__my-app',
      label: 'karma.conf.js',
      url: 'docs/ui/getting-started/demo/1__my-app/karma.conf.js',
      type: 'js',
      highlightLines: {}
    },
    {
      id: '1__my-app/package.json',
      pid: '1__my-app',
      label: 'package.json',
      url: 'docs/ui/getting-started/demo/1__my-app/package.json',
      type: 'json',
      highlightLines: {}
    },
    {
      id: '1__my-app/README.md',
      pid: '1__my-app',
      label: 'README.md',
      url: 'docs/ui/getting-started/demo/1__my-app/README.md',
      type: 'md',
      highlightLines: {}
    },
    {
      id: '1__my-app/tsconfig.app.json',
      pid: '1__my-app',
      label: 'tsconfig.app.json',
      url: 'docs/ui/getting-started/demo/1__my-app/tsconfig.app.json',
      type: 'json',
      highlightLines: {}
    },
    {
      id: '1__my-app/tsconfig.json',
      pid: '1__my-app',
      label: 'tsconfig.json',
      url: 'docs/ui/getting-started/demo/1__my-app/tsconfig.json',
      type: 'json',
      highlightLines: {}
    },
    {
      id: '1__my-app/tsconfig.spec.json',
      pid: '1__my-app',
      label: 'tsconfig.spec.json',
      url: 'docs/ui/getting-started/demo/1__my-app/tsconfig.spec.json',
      type: 'json',
      highlightLines: {}
    },
    {
      id: '1__my-app/tslint.json',
      pid: '1__my-app',
      label: 'tslint.json',
      url: 'docs/ui/getting-started/demo/1__my-app/tslint.json',
      type: 'json',
      highlightLines: {}
    }
  ];

  uevfyzhj = [
    { id: '__bash', label: 'bash' },
    {
      id: '__bash/1.bash',
      pid: '__bash',
      label: '1.bash',
      url: 'docs/ui/getting-started/demo/__bash/1.bash',
      type: 'bash',
      highlightLines: { info: '11-12' }
    }
  ]
}
