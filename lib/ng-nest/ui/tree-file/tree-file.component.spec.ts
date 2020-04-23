import { XIconModule } from '@ng-nest/ui/icon';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { XTreeFileComponent } from './tree-file.component';
import { Component, DebugElement, Injectable } from '@angular/core';
import { By } from '@angular/platform-browser';
import { XLayoutModule } from '@ng-nest/ui/layout';
import { XTreeFileModule } from '@ng-nest/ui/tree-file';
import { FormsModule } from '@angular/forms';
import { XTreeFilePrefix, XTreeFileNode } from './tree-file.property';
import { XButtonModule } from '@ng-nest/ui/button';
import { XContainerModule } from '@ng-nest/ui/container';

describe(XTreeFilePrefix, () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, XTreeFileModule, XButtonModule, XContainerModule, XLayoutModule, XIconModule],
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
      url: 'https://ngnest.com/static/docs/ui/getting-started/demo/my-app__1/src/app/app.component.html',
      pid: 1
    },
    {
      id: 6,
      label: 'app.component.scss',
      type: 'css',
      url: 'http://localhost:8081/docs/ui/getting-started/my-app/src/app/app.component.scss',
      pid: 1
    },
    {
      id: 7,
      label: 'app.component.ts',
      type: 'typescript',
      url: 'http://localhost:8081/docs/ui/getting-started/my-app/src/app/app.component.ts',
      pid: 1
    },
    { id: 8, label: 'angular.json', type: 'json', url: 'http://localhost:8081/docs/ui/getting-started/my-app/angular.json', pid: 1 },
    { id: 9, label: 'src', pid: 2 },
    { id: 10, label: 'app', pid: 9 },
    { id: 11, label: 'assets', pid: 9 },
    { id: 12, label: 'app-routing.module.ts', pid: 10 },
    { id: 12, label: 'app-routing.module.ts', pid: 10 },
    { id: 12, label: 'app-routing.module.ts', pid: 10 },
    { id: 12, label: 'app-routing.module.ts', pid: 10 },
    { id: 12, label: 'app-routing.module.ts', pid: 10 },
    { id: 12, label: 'app-routing.module.ts', pid: 10 },
    { id: 12, label: 'app-routing.module.ts', pid: 10 },
    { id: 12, label: 'app-routing.module.ts', pid: 10 },
    { id: 12, label: 'app-routing.module.ts', pid: 10 },
    { id: 12, label: 'app-routing.module.ts', pid: 10 },
    { id: 12, label: 'app-routing.module.ts', pid: 10 },
    { id: 12, label: 'app-routing.module.ts', pid: 10 },
    { id: 12, label: 'app-routing.module.ts', pid: 10 },
    { id: 12, label: 'app-routing.module.ts', pid: 10 },
    { id: 12, label: 'app-routing.module.ts', pid: 10 },
    { id: 12, label: 'app-routing.module.ts', pid: 10 },
    { id: 12, label: 'app-routing.module.ts', pid: 10 },
    { id: 12, label: 'app-routing.module.ts', pid: 10 },
    { id: 12, label: 'app-routing.module.ts', pid: 10 },
    { id: 12, label: 'app-routing.module.ts', pid: 10 },
    { id: 12, label: 'app-routing.module.ts', pid: 10 },
    { id: 12, label: 'app-routing.module.ts', pid: 10 },
    {
      id: 13,
      label: 'app.component.html',
      pid: 10,
      type: 'html',
      url: 'http://localhost:8081/docs/ui/getting-started/my-app/src/app/app.component.html'
    },
    { id: 14, label: 'app.component.scss', pid: 10 },
    {
      id: 15,
      label: 'app.component.ts',
      pid: 10,
      type: 'typescript',
      url: 'http://localhost:8081/docs/ui/getting-started/my-app/src/app/app.component.ts'
    }
  ];
}

@Component({
  template: `
    <div class="row">
      <x-tree-file [data]="service.data" activated-id="15"> </x-tree-file>
    </div>
  `,
  styles: [
    `
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
