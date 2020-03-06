import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { XTreeComponent } from './tree.component';
import { Component, DebugElement, Injectable, ChangeDetectorRef, ViewChild } from '@angular/core';
import { By } from '@angular/platform-browser';
import { XTreeModule } from './tree.module';
import { XTreePrefix, XTreeNode } from './tree.type';
import { XFenceModule } from '@ng-nest/ui/fence';
import { Observable } from 'rxjs';
import { XButtonModule } from '@ng-nest/ui/button';
import { XLinkModule } from '@ng-nest/ui/link';
import * as _ from 'lodash';

describe(XTreePrefix, () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [XTreeModule, XFenceModule, XButtonModule, XLinkModule],
      declarations: [
        TestXTreeComponent,
        TestXTreeLazyComponent,
        TestXTreeCheckedComponent,
        TestXTreeDiabledComponent,
        TestXTreeCustomComponent,
        TestXTreeEventComponent
      ]
    }).compileComponents();
  }));
  describe(`default.`, () => {
    let fixture: ComponentFixture<TestXTreeComponent>;
    let tree: DebugElement;
    beforeEach(() => {
      fixture = TestBed.createComponent(TestXTreeComponent);
      fixture.detectChanges();
      tree = fixture.debugElement.query(By.directive(XTreeComponent));
    });
    it('should create.', () => {
      expect(tree).toBeDefined();
    });
  });
  describe(`lazy.`, () => {
    let fixture: ComponentFixture<TestXTreeLazyComponent>;
    let tree: DebugElement;
    beforeEach(() => {
      fixture = TestBed.createComponent(TestXTreeLazyComponent);
      fixture.detectChanges();
      tree = fixture.debugElement.query(By.directive(XTreeComponent));
    });
    it('should create.', () => {
      expect(tree).toBeDefined();
    });
  });
  describe(`checked.`, () => {
    let fixture: ComponentFixture<TestXTreeCheckedComponent>;
    let tree: DebugElement;
    beforeEach(() => {
      fixture = TestBed.createComponent(TestXTreeCheckedComponent);
      fixture.detectChanges();
      tree = fixture.debugElement.query(By.directive(XTreeComponent));
    });
    it('should create.', () => {
      expect(tree).toBeDefined();
    });
  });
  describe(`disabled.`, () => {
    let fixture: ComponentFixture<TestXTreeDiabledComponent>;
    let tree: DebugElement;
    beforeEach(() => {
      fixture = TestBed.createComponent(TestXTreeDiabledComponent);
      fixture.detectChanges();
      tree = fixture.debugElement.query(By.directive(XTreeComponent));
    });
    it('should create.', () => {
      expect(tree).toBeDefined();
    });
  });
  describe(`custom.`, () => {
    let fixture: ComponentFixture<TestXTreeCustomComponent>;
    let tree: DebugElement;
    beforeEach(() => {
      fixture = TestBed.createComponent(TestXTreeCustomComponent);
      fixture.detectChanges();
      tree = fixture.debugElement.query(By.directive(XTreeComponent));
    });
    it('should create.', () => {
      expect(tree).toBeDefined();
    });
  });
  describe(`event.`, () => {
    let fixture: ComponentFixture<TestXTreeEventComponent>;
    let tree: DebugElement;
    beforeEach(() => {
      fixture = TestBed.createComponent(TestXTreeEventComponent);
      fixture.detectChanges();
      tree = fixture.debugElement.query(By.directive(XTreeComponent));
    });
    it('should create.', () => {
      expect(tree).toBeDefined();
    });
  });
});

@Injectable()
class TreeServiceTest {
  data: XTreeNode[] = [
    { id: 1, label: '一级 1' },
    { id: 2, label: '一级 2' },
    { id: 3, label: '一级 3' },
    { id: 5, label: '二级 1-1', pid: 1 },
    { id: 6, label: '二级 1-2', pid: 1 },
    { id: 7, label: '二级 1-3', pid: 1 },
    { id: 8, label: '二级 1-4', pid: 1, disabled: true },
    { id: 9, label: '二级 2-1', pid: 2 },
    { id: 10, label: '二级 2-2', pid: 2 },
    { id: 11, label: '二级 2-3', pid: 2 },
    { id: 12, label: '二级 2-4', pid: 2 },
    { id: 13, label: '二级 3-1', pid: 3 },
    { id: 14, label: '二级 3-2', pid: 3 },
    { id: 15, label: '二级 3-3', pid: 3, disabled: true },
    { id: 16, label: '二级 3-4', pid: 3 },
    { id: 21, label: '三级 1-1-1', pid: 5 },
    { id: 22, label: '三级 1-1-2', pid: 5 },
    { id: 23, label: '三级 1-1-3', pid: 5 },
    { id: 24, label: '三级 1-1-4', pid: 5 }
  ];

  getTreeList = (pid = undefined): Observable<XTreeNode[]> => {
    return Observable.create(x => {
      let result = this.data
        .filter(y => y.pid === pid)
        .map(x => {
          x.leaf = this.data.find(y => y.pid === x.id) ? true : false;
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
    <x-row space="1">
      <x-col span="8">
        <x-tree [data]="service.data"> </x-tree>
      </x-col>
      <x-col span="8">
        <x-tree [data]="service.data" checkbox> </x-tree>
      </x-col>
    </x-row>
  `,
  styles: [
    `
      .row:not(:first-child) {
        margin-top: 1rem;
      }
    `
  ],
  providers: [TreeServiceTest]
})
class TestXTreeComponent {
  constructor(private service: TreeServiceTest) {}
}

@Component({
  template: `
    <x-row space="1">
      <x-col span="8">
        <x-tree [data]="service.getTreeList"> </x-tree>
      </x-col>
      <x-col span="8">
        <x-tree [data]="service.getTreeList" checkbox> </x-tree>
      </x-col>
    </x-row>
  `,
  styles: [
    `
      .row:not(:first-child) {
        margin-top: 1rem;
      }
    `
  ],
  providers: [TreeServiceTest]
})
class TestXTreeLazyComponent {
  constructor(private service: TreeServiceTest) {}
}

@Component({
  template: `
    <x-row space="1">
      <x-col span="8">
        <x-tree [data]="service.data" [expanded]="[1, 3]" [checked]="[8, 15, 18]" checkbox> </x-tree>
      </x-col>
    </x-row>
  `,
  styles: [
    `
      .row:not(:first-child) {
        margin-top: 1rem;
      }
    `
  ],
  providers: [TreeServiceTest]
})
class TestXTreeCheckedComponent {
  constructor(private service: TreeServiceTest) {}
}

@Component({
  template: `
    <x-row space="1">
      <x-col span="8">
        <x-tree [data]="service.data" [expanded]="[1, 3]" [checked]="[8, 15, 18]" checkbox> </x-tree>
      </x-col>
    </x-row>
  `,
  styles: [
    `
      .row:not(:first-child) {
        margin-top: 1rem;
      }
    `
  ],
  providers: [TreeServiceTest]
})
class TestXTreeDiabledComponent {
  constructor(private service: TreeServiceTest) {}
}

@Component({
  template: `
    <x-row space="1">
      <x-col span="12">
        <x-tree [data]="service.data" checkbox [labelTemp]="labelTpl"> </x-tree>
        <ng-template #labelTpl let-node="$node">
          <div class="custom-label">
            <span>{{ node.label }}</span>
            <span class="custom-links">
              <x-link type="primary">新增</x-link>
              <x-link type="primary">修改</x-link>
              <x-link type="primary">删除</x-link>
            </span>
          </div>
        </ng-template>
      </x-col>
    </x-row>
  `,
  styles: [
    `
      .row:not(:first-child) {
        margin-top: 1rem;
      }
      .custom-label {
        display: flex;
        align-items: center;
      }
      .custom-links {
        margin-left: 1rem;
      }
      .custom-links x-link:not(:first-child) {
        margin-left: 0.25rem;
      }
    `
  ],
  providers: [TreeServiceTest]
})
class TestXTreeCustomComponent {
  constructor(private service: TreeServiceTest) {}
}

@Component({
  template: `
    <x-row space="1">
      <x-col span="8">
        <ul class="operations">
          <li>当前激活的节点：{{ activatedNode?.label }}</li>
          <li><x-button (click)="setCheckedKeys([9, 11, 21, 23])">通过 Key 值设置选中的节点</x-button></li>
          <li><x-button (click)="getCheckedKeys()">获取选中的节点的 Key 值</x-button></li>
          <li>
            <x-button (click)="setExpandedAll()">{{ expandedAll ? '全部收起' : '全部展开' }}</x-button>
          </li>
          <li>{{ content | json }}</li>
        </ul>
      </x-col>
      <x-col span="8">
        <x-tree
          #treeCom
          checkbox
          [data]="service.data"
          (activatedChange)="activatedChange($event)"
          [expandedAll]="expandedAll"
        >
        </x-tree>
      </x-col>
    </x-row>
  `,
  styles: [
    `
      .row:not(:first-child) {
        margin-top: 1rem;
      }
      .operations > li:not(:first-child) {
        margin-top: 0.5rem;
      }
    `
  ],
  providers: [TreeServiceTest]
})
class TestXTreeEventComponent {
  @ViewChild('treeCom', { static: true }) treeCom: XTreeComponent;
  activatedNode: XTreeNode;
  selectedNodes: XTreeNode[] = [];
  expandedAll: boolean = true;
  content: any;
  constructor(private service: TreeServiceTest, private cdr: ChangeDetectorRef) {}

  activatedChange(node: XTreeNode) {
    this.activatedNode = node;
    this.cdr.detectChanges();
  }

  getCheckedKeys() {
    this.content = this.treeCom.getCheckedKeys();
    this.cdr.detectChanges();
  }

  setCheckedKeys(keys = []) {
    this.treeCom.setCheckedKeys(keys);
  }

  setExpandedAll() {
    this.expandedAll = !this.expandedAll;
    this.cdr.detectChanges();
  }
}
