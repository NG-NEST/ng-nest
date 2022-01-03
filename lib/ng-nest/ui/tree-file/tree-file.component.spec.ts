import { XIconModule } from '@ng-nest/ui/icon';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { XTreeFileComponent } from './tree-file.component';
import { Component, DebugElement, Injectable } from '@angular/core';
import { By } from '@angular/platform-browser';
import { XLayoutModule } from '@ng-nest/ui/layout';
import { XTreeFileModule } from '@ng-nest/ui/tree-file';
import { FormsModule } from '@angular/forms';
import { XTreeFilePrefix, XTreeFileNode } from './tree-file.property';
import { XButtonModule } from '@ng-nest/ui/button';
import { XContainerModule } from '@ng-nest/ui/container';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { XThemeModule } from '@ng-nest/ui/theme';

describe(XTreeFilePrefix, () => {
  beforeEach((() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        XThemeModule,
        BrowserAnimationsModule,
        XTreeFileModule,
        XButtonModule,
        XContainerModule,
        XLayoutModule,
        XIconModule
      ],
      declarations: [TestXTreeFileComponent]
    }).compileComponents();
  }));
  describe(`default.`, () => {
    let fixture: ComponentFixture<TestXTreeFileComponent>;
    let treeFile: DebugElement;
    beforeEach(() => {
      fixture = TestBed.createComponent(TestXTreeFileComponent);
      fixture.detectChanges();
      treeFile = fixture.debugElement.query(By.directive(XTreeFileComponent));
    });
    it('should create.', () => {
      expect(treeFile).toBeDefined();
    });
  });
});

@Injectable()
class TreeFileServiceTest {
  data: XTreeFileNode[] = [
    { id: 1, label: '针对上一步改变的文件' },
    { id: 2, label: 'my-app' },
    {
      id: 5,
      label: 'app.component.html',
      type: 'html',
      url: 'ui/getting-started/demo/1__my-app/src/app/app.component.html',
      pid: 1
    },
    {
      id: 6,
      label: 'app.component.scss',
      type: 'css',
      url: 'ui/getting-started/demo/1__my-app/src/app/app.component.scss',
      pid: 1
    },
    {
      id: 7,
      label: 'app.component.ts',
      type: 'typescript',
      url: 'ui/getting-started/demo/1__my-app/src/app/app.component.ts',
      pid: 1
    },
    {
      id: 8,
      label: 'angular.json',
      type: 'json',
      url: 'ui/getting-started/demo/1__my-app/angular.json',
      pid: 1
    },
    { id: 9, label: 'src', pid: 2 },
    { id: 10, label: 'app', pid: 9 },
    { id: 11, label: 'assets', pid: 9 },
    {
      id: 13,
      label: 'app.component.html',
      pid: 10,
      type: 'html',
      url: 'ui/getting-started/demo/1__my-app/src/app/app.component.html',
      highlightLines: {
        primary: '1-3, 5',
        success: '7-10, 13',
        warning: '15-20, 23',
        danger: '30-32, 35',
        info: '40-44, 48'
      }
    },
    { id: 14, label: 'app.component.scss', pid: 10 },
    {
      id: 15,
      label: 'app.component.ts',
      pid: 10,
      type: 'typescript',
      url: 'ui/getting-started/demo/1__my-app/src/app/app.component.ts'
    },
    {
      id: 16,
      label: '1.png',
      pid: 10,
      type: 'png',
      url: 'ui/getting-started/demo/3__img/1.png'
    },
    { id: 17, label: 'assets', pid: 9 },
    { id: 18, label: 'assets', pid: 9 },
    { id: 19, label: 'assets', pid: 9 },
    { id: 20, label: 'assets', pid: 9 },
    { id: 21, label: 'assets', pid: 9 },
    { id: 22, label: 'assets', pid: 9 },
    { id: 23, label: 'assets', pid: 9 },
    { id: 24, label: 'assets', pid: 9 },
    { id: 25, label: 'assets', pid: 9 },
    { id: 26, label: 'assets', pid: 9 },
    { id: 27, label: 'assets', pid: 9 },
    { id: 28, label: 'assets', pid: 9 },
    { id: 29, label: 'assets', pid: 9 },
    { id: 30, label: 'assets', pid: 9 },
    { id: 31, label: 'assets', pid: 9 },
    { id: 32, label: 'assets', pid: 9 },
    { id: 33, label: 'assets', pid: 9 },
    { id: 34, label: 'assets', pid: 9 }
  ];
}

@Component({
  template: `
    <x-theme showDark></x-theme>
    <div class="row">
      <x-tree-file [data]="service.data" activatedId="13" domain="https://ngnest.com/static/docs"> </x-tree-file>
    </div>
  `,
  styles: [
    `
      :host {
        background-color: var(--x-background);
        padding: 1rem;
        border: 0.0625rem solid var(--x-border);
      }
      .row:not(:first-child) {
        margin-top: 1rem;
      }
      .row x-tree-file:not(:first-child) {
        margin-left: 2rem;
      }
    `
  ],
  providers: [TreeFileServiceTest]
})
class TestXTreeFileComponent {
  constructor(public service: TreeFileServiceTest) {}
}
