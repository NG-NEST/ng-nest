import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, DebugElement, Injectable, ChangeDetectorRef, ViewChild } from '@angular/core';
import { By } from '@angular/platform-browser';
import { XTreeComponent } from '@ng-nest/ui/tree';
import { XTreePrefix, XTreeNode, XTreeAction } from './tree.property';
import { XRowComponent, XColComponent } from '@ng-nest/ui/layout';
import { Observable } from 'rxjs';
import { XButtonComponent } from '@ng-nest/ui/button';
import { XLinkComponent } from '@ng-nest/ui/link';
import { XFormComponent, XFormRow } from '@ng-nest/ui/form';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UntypedFormGroup } from '@angular/forms';
import { XRepositoryService, XHttpService, XGuid } from '@ng-nest/ui/core';
import { map } from 'rxjs/operators';
import { XMessageService } from '@ng-nest/ui/message';
import { XThemeComponent } from '@ng-nest/ui/theme';
import { XIconComponent } from '@ng-nest/ui/icon';
import { XInputNumberComponent } from '@ng-nest/ui/input-number';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe(XTreePrefix, () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        HttpClientTestingModule,
        XThemeComponent,
        XTreeComponent,
        XRowComponent,
        XColComponent,
        XButtonComponent,
        XLinkComponent,
        XFormComponent,
        XLinkComponent,
        XInputNumberComponent,
        XIconComponent
      ],
      declarations: [
        TestXTreeComponent,
        TestXTreeLazyComponent,
        TestXTreeCheckedComponent,
        TestXTreeDiabledComponent,
        TestXTreeCustomComponent,
        TestXTreeEventComponent,
        TestXTreeOperationComponent
      ]
    }).compileComponents();
  });
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
  // describe(`operation.`, () => {
  //   let fixture: ComponentFixture<TestXTreeOperationComponent>;
  //   let tree: DebugElement;
  //   beforeEach(() => {
  //     fixture = TestBed.createComponent(TestXTreeOperationComponent);
  //     fixture.detectChanges();
  //     tree = fixture.debugElement.query(By.directive(XTreeComponent));
  //   });
  //   it('should create.', () => {
  //     expect(tree).toBeDefined();
  //   });
  // });
});

@Injectable()
class TreeServiceTest {
  data: XTreeNode[] = [
    { id: 1, label: '一级 1', nowrap: false, alignItems: 'start' },
    { id: 2, label: '一级 2', height: 3 },
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
    <x-theme showDark></x-theme>
    <x-row space="1">
      <x-col span="8">
        <x-tree [data]="service.data"> </x-tree>
      </x-col>
      <x-col span="8">
        <x-tree [data]="service.data" nodeOpen> </x-tree>
      </x-col>
      <x-col span="8">
        <x-tree [data]="service.data" checkbox> </x-tree>
      </x-col>
    </x-row>
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
    `
  ],
  providers: [TreeServiceTest]
})
class TestXTreeComponent {
  constructor(public service: TreeServiceTest) {}
}

@Component({
  template: `
    <x-theme showDark></x-theme>
    <x-row space="1">
      <x-col span="8">
        <x-tree [data]="service.getTreeList" lazy> </x-tree>
      </x-col>
      <x-col span="8">
        <x-tree [data]="service.getTreeList" checkbox lazy> </x-tree>
      </x-col>
    </x-row>
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
    `
  ],
  providers: [TreeServiceTest]
})
class TestXTreeLazyComponent {
  constructor(public service: TreeServiceTest) {}
}

@Component({
  template: `
    <x-theme showDark></x-theme>
    <x-row space="1">
      <x-col span="8">
        <x-tree [data]="service.data" [expanded]="[1, 3]" [checked]="[8, 15, 18]" checkbox> </x-tree>
      </x-col>
    </x-row>
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
    `
  ],
  providers: [TreeServiceTest]
})
class TestXTreeCheckedComponent {
  constructor(public service: TreeServiceTest) {}
}

@Component({
  template: `
    <x-theme showDark></x-theme>
    <x-row space="1">
      <x-col span="8">
        <x-tree [data]="service.data" [expanded]="[1, 3]" [checked]="[8, 15, 18]" checkbox> </x-tree>
      </x-col>
    </x-row>
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
    `
  ],
  providers: [TreeServiceTest]
})
class TestXTreeDiabledComponent {
  constructor(public service: TreeServiceTest) {}
}

@Component({
  template: `
    <x-theme showDark></x-theme>
    <x-row space="1">
      <x-col span="12">
        <x-tree [data]="service.data" checkbox [labelTpl]="labelTpl"> </x-tree>
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
      :host {
        background-color: var(--x-background);
        padding: 1rem;
        border: 0.0625rem solid var(--x-border);
      }
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
        margin-left: 1rem;
      }
    `
  ],
  providers: [TreeServiceTest]
})
class TestXTreeCustomComponent {
  constructor(public service: TreeServiceTest) {}
}

@Component({
  template: `
    <x-theme showDark></x-theme>
    <x-row space="1">
      <x-col span="8">
        <ul class="operations">
          <li>当前激活的节点：{{ activatedNode?.label }}</li>
          <li>
            <x-button (click)="setCheckedKeys([9, 11, 21, 23])">通过 Key 值设置选中的节点</x-button>
          </li>
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
          [checked]="[15, 8]"
          (activatedChange)="activatedChange($event)"
          [expandedAll]="expandedAll"
        >
        </x-tree>
      </x-col>
    </x-row>
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
      .operations > li:not(:first-child) {
        margin-top: 1rem;
      }
    `
  ],
  providers: [TreeServiceTest]
})
class TestXTreeEventComponent {
  @ViewChild('treeCom', { static: true }) treeCom!: XTreeComponent;
  activatedNode!: XTreeNode;
  selectedNodes: XTreeNode[] = [];
  expandedAll: boolean = true;
  content: any;
  constructor(public service: TreeServiceTest, private cdr: ChangeDetectorRef) {}

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

@Injectable()
class OrganizationService extends XRepositoryService<Organization> {
  constructor(public override http: XHttpService) {
    super(http, { api: 'http://localhost:3000/', controller: { name: 'organization' } });
  }
}

interface Organization extends XTreeNode {
  label?: string;
  type?: string;
  icon?: string;
  pid?: string;
  path?: string;
}

@Component({
  template: `
    <x-theme showDark></x-theme>
    <x-row space="1">
      <x-col span="8">
        <x-button (click)="action('add-root', selected)">添加根节点</x-button>
        <x-tree
          #treeCom
          [data]="data"
          expandedLevel="0"
          [activatedId]="activatedId"
          [nodeHeight]="1.875"
          [actions]="actions"
          (activatedChange)="action('info', $event)"
        >
        </x-tree>
      </x-col>
      <x-col span="8">
        <x-form
          [formGroup]="formGroup"
          [controls]="controls"
          [disabled]="disabled"
          direction="row"
          labelSuffix=":"
          labelWidth="6rem"
          width="20rem"
          labelAlign="end"
          span="24"
          space="2"
        ></x-form>
        <div [style.margin-top.rem]="2" [style.padding-left]="'6rem'">
          <x-buttons [space]="1">
            <x-button
              type="primary"
              (click)="!formGroup.invalid && !disabled && action('save', selected)"
              [disabled]="formGroup.invalid || disabled"
            >
              确 认
            </x-button>
            <x-button (click)="action('cancel', selected)">取 消</x-button>
          </x-buttons>
        </div>
      </x-col>
    </x-row>
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
      .operations > li:not(:first-child) {
        margin-top: 1rem;
      }
    `
  ],
  providers: [OrganizationService]
})
class TestXTreeOperationComponent {
  @ViewChild('treeCom') treeCom!: XTreeComponent;
  formGroup = new UntypedFormGroup({});

  get disabled() {
    return !['edit', 'add', 'add-root'].includes(this.type);
  }

  type = 'info';

  selected!: Organization;

  activatedId!: string;

  data = () => this.service.getList(1, Number.MAX_SAFE_INTEGER).pipe(map((x) => x.list));

  actions: XTreeAction[] = [
    {
      id: 'add',
      label: '新增',
      icon: 'fto-plus-square',
      handler: (node: Organization) => {
        this.action('add', node);
      }
    },
    {
      id: 'edit',
      label: '修改',
      icon: 'fto-edit',
      handler: (node: Organization) => {
        this.action('edit', node);
      }
    },
    {
      id: 'delete',
      label: '删除',
      icon: 'fto-trash-2',
      handler: (node: Organization) => {
        this.action('delete', node);
      }
    }
  ];

  controls: XFormRow[] = [
    {
      controls: [
        {
          control: 'input',
          id: 'label',
          label: '名称',
          required: true
        },
        { control: 'input', id: 'icon', label: '图标' },
        {
          control: 'select',
          id: 'type',
          label: '类型',
          data: [
            { id: 'group', label: '事业部' },
            { id: 'subsidiary', label: '子公司' },
            { id: 'department', label: '部门' }
          ],
          value: 'department'
        }
      ]
    },
    {
      hidden: true,
      controls: [
        {
          control: 'input',
          id: 'id'
        },
        {
          control: 'input',
          id: 'pid'
        }
      ]
    }
  ];
  constructor(private service: OrganizationService, private message: XMessageService, private cdr: ChangeDetectorRef) {}

  action(type: string, node: Organization) {
    switch (type) {
      case 'info':
        this.type = type;
        this.selected = node;
        this.service.get(node?.id).subscribe((x) => {
          this.formGroup.patchValue(x);
          this.cdr.detectChanges();
        });
        break;
      case 'add':
        this.type = type;
        this.selected = node;
        this.formGroup.reset();
        this.formGroup.patchValue({
          id: XGuid(),
          pid: node.id,
          type: 'department'
        });
        this.cdr.detectChanges();
        break;
      case 'add-root':
        this.type = type;
        this.formGroup.reset();
        this.formGroup.patchValue({
          id: XGuid(),
          pid: null,
          type: ''
        });
        this.cdr.detectChanges();
        break;
      case 'edit':
        this.type = type;
        this.service.get(node?.id).subscribe((x) => {
          this.formGroup.patchValue(x);
          this.cdr.detectChanges();
        });
        break;
      case 'delete':
        this.service.delete(node.id).subscribe(() => {
          this.treeCom.removeNode(node);
          this.formGroup.reset();
          this.message.success('删除成功！');
        });
        break;
      case 'save':
        if (this.type === 'add' || this.type === 'add-root') {
          this.service.post(this.formGroup.value).subscribe((x) => {
            this.type = 'info';
            this.treeCom.addNode(x);
            this.cdr.detectChanges();
            this.message.success('新增成功！');
          });
        } else if (this.type === 'edit') {
          this.service.put(this.formGroup.value).subscribe(() => {
            this.type = 'info';
            this.treeCom.updateNode(node, this.formGroup.value);
            this.cdr.detectChanges();
            this.message.success('修改成功！');
          });
        }
        break;
      case 'cancel':
        break;
    }
  }
}
