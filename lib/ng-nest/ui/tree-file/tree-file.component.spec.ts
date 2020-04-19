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
import { Observable } from 'rxjs';

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
    { id: 2, label: 'MY-APP' },
    { id: 5, label: 'tsconfig.json', url: 'http://localhost:8081/docs/ui/getting-started/my-app/tsconfig.json', pid: 1 },
    { id: 6, label: 'package.json', url: 'http://localhost:8081/docs/ui/getting-started/my-app/package.json', pid: 1 },
    { id: 7, label: 'tsconfig.app.json', url: 'http://localhost:8081/docs/ui/getting-started/my-app/tsconfig.app.json', pid: 1 },
    { id: 8, label: 'angular.json', url: 'http://localhost:8081/docs/ui/getting-started/my-app/angular.json', pid: 1 },
    { id: 9, label: 'src', pid: 2 },
    { id: 10, label: 'app', pid: 9 },
    { id: 11, label: 'assets', pid: 9 },
    { id: 12, label: 'app-routing.module.ts', pid: 10 },
    { id: 13, label: 'app.component.html', pid: 10 },
    { id: 14, label: 'app.component.scss', pid: 10 },
    { id: 15, label: 'app.component.ts', pid: 10 }
  ];

  getTreeList = (pid = undefined): Observable<XTreeFileNode[]> => {
    return new Observable((x) => {
      let result = this.data
        .filter((y) => y.pid === pid)
        .map((x) => {
          x.leaf = this.data.find((y) => y.pid === x.id) ? true : false;
          return x;
        });
      setTimeout(() => {
        x.next(result);
        x.complete();
      }, 500);
    });
  };
}

@Component({
  template: `
    <div class="row">
      <x-tree-file [data]="service.data"> </x-tree-file>
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
  list = [1, 2, 3, 4, 5, 6];
}
