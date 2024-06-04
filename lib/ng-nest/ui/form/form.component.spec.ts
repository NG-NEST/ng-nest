import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, DebugElement, Injectable, ChangeDetectorRef, viewChild } from '@angular/core';
import { By } from '@angular/platform-browser';
import { XFormComponent } from '@ng-nest/ui/form';
import { XFormPrefix, XControl, XFormRow } from './form.property';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  XData,
  XRepositoryAbstract,
  XQuery,
  XResultList,
  XGroupItem,
  XFilter,
  XChunk,
  XSort,
  XId,
  XOrderBy
} from '@ng-nest/ui/core';
import { XCalendarNode } from '@ng-nest/ui/calendar';
import { XCheckboxNode } from '@ng-nest/ui/checkbox';
import { XSelectNode } from '@ng-nest/ui/select';
import { Observable } from 'rxjs';
import { XButtonComponent } from '@ng-nest/ui/button';
import { XTreeNode } from '@ng-nest/ui/tree';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe(XFormPrefix, () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
    declarations: [TestXFormComponent, TestXFormRowComponent, TestXFormTitleComponent],
    imports: [BrowserAnimationsModule, XButtonComponent, XFormComponent],
    providers: [provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()]
}).compileComponents();
  });
  describe(`default.`, () => {
    let fixture: ComponentFixture<TestXFormComponent>;
    let debugElement: DebugElement;
    beforeEach(() => {
      fixture = TestBed.createComponent(TestXFormComponent);
      fixture.detectChanges();
      debugElement = fixture.debugElement.query(By.directive(XFormComponent));
    });
    it('should create.', () => {
      expect(debugElement).toBeDefined();
    });
  });
  describe(`row`, () => {
    let fixture: ComponentFixture<TestXFormRowComponent>;
    let debugElement: DebugElement;
    beforeEach(() => {
      fixture = TestBed.createComponent(TestXFormRowComponent);
      fixture.detectChanges();
      debugElement = fixture.debugElement.query(By.directive(XFormComponent));
    });
    it('should create.', () => {
      expect(debugElement).toBeDefined();
    });
  });
  describe(`title`, () => {
    let fixture: ComponentFixture<TestXFormTitleComponent>;
    let debugElement: DebugElement;
    beforeEach(() => {
      fixture = TestBed.createComponent(TestXFormTitleComponent);
      fixture.detectChanges();
      debugElement = fixture.debugElement.query(By.directive(XFormComponent));
    });
    it('should create.', () => {
      expect(debugElement).toBeDefined();
    });
  });
});

@Injectable()
class UsersServiceTest extends XRepositoryAbstract {
  organizations = [
    '雷浩集团',
    '企业发展事业群',
    '社交网络事业群',
    '互动娱乐事业群',
    '移动互联网事业群',
    '网络媒体事业群',
    '人事部',
    '行政部',
    '财务部'
  ];
  positions = ['技术员', '销售', '经理', '总监', '生产员'];
  users: User[] = Array.from({ length: 123456 }).map((_x, i) => {
    i++;
    let positionId = Math.floor(Math.random() * 5 + 1);
    let organizationId = Math.floor(Math.random() * 9 + 1);
    return {
      id: i,
      label: '姓名' + i,
      positionId: positionId,
      position: this.positions[positionId - 1],
      email: '邮箱' + i,
      phone: '手机' + i,
      organizationId: organizationId,
      organization: this.organizations[organizationId - 1]
    };
  });

  getList(index: number, size: number, query?: XQuery): Observable<XResultList<User | XGroupItem>> {
    return new Observable((x) => {
      let data: User[] | XGroupItem[] = [];
      data = this.setFilter(this.users, query?.filter as XFilter[]);
      if (query?.group) {
        console.log(data, index, size, query);
      }
      if (query?.sort) {
        data = this.setSort(data, query.sort);
      }
      let chunks = XChunk(data, size);
      let result = { total: 0, list: [] };
      if ((index as number) <= chunks.length) {
        result.total = data.length;
        result.list = chunks[index - 1] as [];
      } else {
        result.total = data.length;
      }
      setTimeout(() => {
        x.next(result);
        x.complete();
      }, 10);
    });
  }
  get(_id: number | string): Observable<User> {
    return new Observable();
  }
  post(_entity: User): Observable<User> {
    return new Observable();
  }
  put(_entity: User): Observable<User> {
    return new Observable();
  }
  delete(_id: number | string): Observable<boolean> {
    return new Observable();
  }

  private setFilter(data: User[], filters: XFilter[]): User[] {
    let result = data;
    if (filters && filters.length > 0) {
      filters.forEach((x) => {
        switch (x.operation) {
          case '=':
            result = result.filter((y) => y[x.field!] === x.value);
            break;
          case '>':
            result = result.filter((y) => y[x.field!] > x.value!);
            break;
          case '>=':
            result = result.filter((y) => y[x.field!] >= x.value!);
            break;
          case '<':
            result = result.filter((y) => y[x.field!] < x.value!);
            break;
          case '<=':
            result = result.filter((y) => y[x.field!] <= x.value!);
            break;
          default:
            // '%'
            result = result.filter((y) => y[x.field!].indexOf(x.value!) >= 0);
            break;
        }
      });
    }
    return result;
  }

  private setSort(data: User[] | XGroupItem[], sort: XSort[]): User[] | XGroupItem[] {
    return XOrderBy(
      data,
      sort.map((x) => x.field!),
      sort.map((x) => x.value) as ('desc' | 'asc')[]
    ) as User[] | XGroupItem[];
  }
}

@Injectable()
class TreeServiceTest {
  data: XTreeNode[] = [
    { id: 1, label: '雷浩集团' },
    { id: 2, label: '企业发展事业群', pid: 1 },
    { id: 3, label: '社交网络事业群', pid: 1 },
    { id: 4, label: '互动娱乐事业群', pid: 1 },
    { id: 5, label: '移动互联网事业群', pid: 1 },
    { id: 6, label: '网络媒体事业群', pid: 1 },
    { id: 7, label: '人事部', pid: 4 },
    { id: 8, label: '行政部', pid: 4 },
    { id: 9, label: '财务部', pid: 4 }
  ];

  getTreeList = (_pid = undefined): Observable<XTreeNode[]> => {
    return new Observable((x) => {
      setTimeout(() => {
        x.next(this.data);
        x.complete();
      }, 10);
    });
  };
}

interface User extends XId {
  name?: string;
  account?: string;
  password?: string;
  email?: string;
  phone?: string;
  position?: string;
  positionId?: number;
  organization?: string;
  organizationId?: number;
  [property: string]: any;
}

const DATA_CASCADE: XData<XCalendarNode> = [
  { id: 1, label: 'AAAA' },
  { id: 2, label: 'BBBB' },
  { id: 3, label: 'CCCC' },
  { id: 4, label: 'DDDD' },
  { id: 5, label: 'AAAA-1', pid: 1 },
  { id: 6, label: 'AAAA-2', pid: 1 },
  { id: 7, label: 'AAAA-3', pid: 1 },
  { id: 8, label: 'AAAA-4', pid: 1 },
  { id: 9, label: 'BBBB-1', pid: 2 },
  { id: 10, label: 'BBBB-2', pid: 2 },
  { id: 11, label: 'BBBB-3', pid: 2 },
  { id: 12, label: 'BBBB-4', pid: 2 },
  { id: 13, label: 'CCCC-1', pid: 3 },
  { id: 14, label: 'CCCC-2', pid: 3 },
  { id: 15, label: 'CCCC-3', pid: 3 },
  { id: 16, label: 'CCCC-4', pid: 3 },
  { id: 17, label: 'DDDD-1', pid: 4 },
  { id: 18, label: 'DDDD-2', pid: 4 },
  { id: 19, label: 'DDDD-3', pid: 4 },
  { id: 20, label: 'DDDD-4', pid: 4 },
  { id: 21, label: 'AAAA-1-1', pid: 5 },
  { id: 22, label: 'AAAA-1-2', pid: 5 },
  { id: 23, label: 'AAAA-1-3', pid: 5 },
  { id: 24, label: 'AAAA-1-4', pid: 5 },
  { id: 25, label: 'AAAA-2-1', pid: 6 },
  { id: 26, label: 'AAAA-2-2', pid: 6 },
  { id: 27, label: 'AAAA-2-3', pid: 6 },
  { id: 28, label: 'AAAA-2-4', pid: 6 },
  { id: 29, label: 'AAAA-3-1', pid: 7 },
  { id: 30, label: 'AAAA-3-2', pid: 7 },
  { id: 31, label: 'AAAA-3-3', pid: 7 },
  { id: 32, label: 'AAAA-3-4', pid: 7 },
  { id: 33, label: 'AAAA-4-1', pid: 8 },
  { id: 34, label: 'AAAA-4-2', pid: 8 },
  { id: 35, label: 'AAAA-4-3', pid: 8 },
  { id: 36, label: 'AAAA-4-4', pid: 8 }
];

const DATA_CHECKBOX: XData<XCheckboxNode> = ['QQ', '微信', '钉钉', '微博'];

const DATA_SELECT: XData<XSelectNode> = [
  'AAAA',
  'BBBB',
  'CCCC',
  'DDDD',
  'EEEE',
  'FFFF',
  'GGGG',
  'HHHH',
  'IIII',
  'JJJJ'
];

@Component({
  selector: 'test-x-form',
  template: `
    <!-- <x-button (click)="onDisabled()">禁用整个表单</x-button>
    <x-form [controls]="controls" [disabled]="disabled"></x-form> -->
  `,
  providers: [UsersServiceTest, TreeServiceTest]
})
class TestXFormComponent {
  disabled = false;
  constructor(
    public tableService: UsersServiceTest,
    public treeService: TreeServiceTest,
    public cdr: ChangeDetectorRef
  ) {}

  onDisabled() {
    this.disabled = !this.disabled;
    this.cdr.detectChanges();
  }

  controls: XFormRow[] = [
    {
      title: 'AutoComplete 自动完成',
      icon: 'fto-list',
      controls: [
        {
          control: 'auto-complete',
          id: 'auto-complete-human',
          label: '手动匹配',
          data: (str: string) =>
            new Observable<string[]>((x) => {
              x.next([`${str}`, `${str}${str}`, `${str}${str}${str}`]);
              x.complete();
            }),
          span: 8
        },
        {
          control: 'auto-complete',
          id: 'auto-complete-default',
          label: '默认值',
          data: (str: string) =>
            new Observable<string[]>((x) => {
              setTimeout(() => {
                x.next([`${str}`, `${str}${str}`, `${str}${str}${str}`]);
                x.complete();
              }, 500);
            }),
          span: 8,
          value: 'ngnest'
        },
        {
          control: 'auto-complete',
          id: 'auto-complete-fixed',
          label: '固定选项',
          placeholder: '请输入 aa',
          data: ['aaaa', 'bbbb', 'cccc', 'dddd', 'aaa', 'bbb', 'ccc', 'aaaaaa'],
          span: 8
        },
        {
          control: 'auto-complete',
          id: 'auto-complete-fixed-one',
          label: '固定选项，请求一次',
          placeholder: '请输入 aa',
          data: new Observable<string[]>((x) => {
            setTimeout(() => {
              x.next(['aaaa', 'bbbb', 'cccc', 'dddd', 'aaa', 'bbb', 'ccc', 'aaaaaa']);
              x.complete();
            }, 500);
          }),
          span: 8
        },
        {
          control: 'auto-complete',
          id: 'auto-complete-fixed',
          label: '禁用',
          disabled: true,
          value: 'aaaa',
          data: ['aaaa', 'bbbb', 'cccc', 'dddd', 'aaa', 'bbb', 'ccc', 'aaaaaa'],
          span: 8
        },
        {
          control: 'auto-complete',
          id: 'auto-complete-fixed',
          label: '必填',
          placeholder: '请输入 aa',
          required: true,
          data: ['aaaa', 'bbbb', 'cccc', 'dddd', 'aaa', 'bbb', 'ccc', 'aaaaaa'],
          span: 8
        }
      ]
    },
    {
      title: 'Find 查找带回',
      icon: 'fto-list',
      controls: [
        {
          control: 'find',
          id: 'find',
          tableColumns: [
            { id: 'index', label: '序号', type: 'index', width: 80 },
            { id: 'label', label: '用户', flex: 1, sort: true },
            { id: 'position', label: '职位', flex: 1, sort: true },
            { id: 'organization', label: '组织机构', flex: 1, sort: true }
          ],
          tableData: (index: number, size: number, query: XQuery) => this.tableService.getList(index, size, query),
          label: '表格单选',
          span: 8
        },
        {
          control: 'find',
          id: 'findMultiple',
          tableColumns: [
            { id: 'index', label: '序号', type: 'index', width: 80 },
            { id: 'label', label: '用户', flex: 1, sort: true },
            { id: 'position', label: '职位', flex: 1, sort: true },
            { id: 'organization', label: '组织机构', flex: 1, sort: true }
          ],
          tableData: (index: number, size: number, query: XQuery) => this.tableService.getList(index, size, query),
          multiple: true,
          label: '表格多选',
          span: 8
        },
        {
          control: 'find',
          id: 'findTree',
          treeData: this.treeService.getTreeList,
          label: '树单选',
          span: 8
        },
        {
          control: 'find',
          id: 'findTreeTable',
          tableColumns: [
            { id: 'index', label: '序号', type: 'index', width: 80 },
            { id: 'label', label: '用户', flex: 1, sort: true },
            { id: 'position', label: '职位', flex: 1, sort: true },
            { id: 'organization', label: '组织机构', flex: 1, sort: true }
          ],
          tableData: (index: number, size: number, query: XQuery) => this.tableService.getList(index, size, query),
          treeData: this.treeService.getTreeList,
          treeTableConnect: 'organizationId',
          label: '树+表格单选',
          span: 8
        },
        {
          control: 'find',
          id: 'findTreeTableMultiple',
          dialogWidth: '65rem',
          tableColumns: [
            { id: 'index', label: '序号', type: 'index', width: 80 },
            { id: 'label', label: '用户', flex: 1, sort: true },
            { id: 'position', label: '职位', flex: 1, sort: true },
            { id: 'organization', label: '组织机构', flex: 1, sort: true }
          ],
          tableData: (index: number, size: number, query: XQuery) => this.tableService.getList(index, size, query),
          treeData: this.treeService.getTreeList,
          treeTableConnect: 'organizationId',
          multiple: true,
          label: '树+表格多选',
          span: 8
        },
        {
          control: 'find',
          id: 'findDisabled',
          label: '禁用',
          span: 8,
          disabled: true
        },
        {
          control: 'find',
          id: 'findRequired',
          tableColumns: [
            { id: 'index', label: '序号', type: 'index', width: 80 },
            { id: 'label', label: '用户', flex: 1, sort: true },
            { id: 'position', label: '职位', flex: 1, sort: true },
            { id: 'organization', label: '组织机构', flex: 1, sort: true }
          ],
          tableData: (index: number, size: number, query: XQuery) => this.tableService.getList(index, size, query),
          label: '必填',
          span: 8,
          required: true
        }
      ]
    },
    {
      title: 'Cascade 级联选择器',
      icon: 'fto-list',
      controls: [
        { id: 'cascade', control: 'cascade', label: '默认', span: 8, data: DATA_CASCADE },
        {
          id: 'cascadeDisabled',
          control: 'cascade',
          label: '禁用',
          span: 8,
          data: DATA_CASCADE,
          value: 22,
          disabled: true
        },
        { id: 'cascadeRequired', control: 'cascade', label: '必填', span: 8, data: DATA_CASCADE, required: true },
        {
          id: 'cascadePlaceholder',
          control: 'cascade',
          label: '提示选择',
          span: 8,
          data: DATA_CASCADE,
          placeholder: '请选择城市'
        }
      ]
    },
    {
      controls: [
        { control: 'cascade', id: 'cascadeRow', label: '标签位置', direction: 'row', span: 8, data: DATA_CASCADE }
      ]
    },
    {
      title: 'Checkbox 多选框',
      icon: 'fto-list',
      controls: [
        {
          control: 'checkbox',
          id: 'checkbox',
          label: '默认',
          span: 8,
          data: DATA_CHECKBOX
        },
        {
          control: 'checkbox',
          id: 'checkboxDisabled',
          label: '禁用',
          span: 8,
          data: DATA_CHECKBOX,
          value: ['QQ', '钉钉'],
          disabled: true
        },
        {
          control: 'checkbox',
          id: 'checkboxRequired',
          label: '必选',
          span: 8,
          data: DATA_CHECKBOX,
          required: true
        },
        {
          control: 'checkbox',
          id: 'checkboxButton',
          label: '按钮样式',
          span: 8,
          data: DATA_CHECKBOX,
          button: true
        },
        {
          control: 'checkbox',
          id: 'checkboxButtonDisabled',
          label: '按钮禁用',
          span: 8,
          data: DATA_CHECKBOX,
          button: true,
          value: ['QQ', '钉钉'],
          disabled: true
        },
        {
          control: 'checkbox',
          id: 'checkboxButtonRequired',
          label: '按钮必选',
          span: 8,
          data: DATA_CHECKBOX,
          button: true,
          required: true
        }
      ]
    },
    {
      title: 'ColorPicker 颜色选择器',
      icon: 'fto-list',
      controls: [
        { control: 'color-picker', id: 'colorPicker', label: '默认', span: 8 },
        {
          control: 'color-picker',
          id: 'colorPickerDisabled',
          label: '禁用',
          span: 8,
          value: '#3B82F6',
          disabled: true
        },
        { control: 'color-picker', id: 'colorPickerRequired', label: '必填', span: 8, required: true },
        { control: 'color-picker', id: 'colorPickerPlaceholder', label: '提示选择', span: 8, placeholder: '请选择颜色' }
      ]
    },
    {
      title: 'DatePicker 日期选择器',
      icon: 'fto-list',
      controls: [
        { control: 'date-picker', id: 'datePicker', label: '默认', span: 8 },
        {
          control: 'date-picker',
          id: 'datePickerDisabled',
          label: '禁用',
          span: 8,
          value: '2020-05-19',
          disabled: true
        },
        { control: 'date-picker', id: 'datePickerRequired', label: '必填', span: 8, required: true },
        { control: 'date-picker', id: 'datePickerPlaceholder', label: '提示选择', span: 8, placeholder: '请选择日期' },
        { control: 'date-picker', id: 'datePickerYear', label: '选年', span: 8, type: 'year' },
        { control: 'date-picker', id: 'datePickerMonth', label: '选月', span: 8, type: 'month' }
      ]
    },
    {
      title: 'InputNumber 计数器',
      icon: 'fto-list',
      controls: [
        { control: 'input-number', id: 'inputNumber', label: '默认', span: 8 },
        { control: 'input-number', id: 'inputNumberDisabled', label: '禁用', span: 8, value: 20, disabled: true },
        { control: 'input-number', id: 'inputNumberRequired', label: '必填', span: 8, required: true },
        {
          control: 'input-number',
          id: 'inputNumberMinMax',
          label: '限制大小( -10 至 10 )',
          span: 8,
          min: -10,
          max: 10
        },
        { control: 'input-number', id: 'inputNumberPrecision', label: '精度', span: 8, precision: 2, step: 0.1 }
      ]
    },
    {
      title: 'Input 输入框',
      icon: 'fto-list',
      controls: [
        {
          control: 'input',
          id: 'input',
          label: '默认',
          span: 8
        },
        {
          control: 'input',
          id: 'inputDisabled',
          label: '禁用',
          span: 8,
          value: 'ngnest.com',
          disabled: true
        },
        {
          control: 'input',
          id: 'inputRequired',
          label: '必填',
          span: 8,
          required: true
        },
        {
          control: 'input',
          id: 'inputRequiredRegExp',
          label: '必填+正则验证',
          span: 8,
          value: 0.1,
          required: true,
          pattern: /^-?\d+$/,
          message: '整数'
        },
        {
          control: 'input',
          id: 'inputPlaceholder',
          label: '提示输入',
          span: 8,
          placeholder: '请输入用户名'
        },
        {
          control: 'input',
          id: 'inputClearable',
          label: '清除按钮',
          span: 8,
          value: '清除按钮',
          clearable: true
        },
        {
          control: 'input',
          id: 'inputIcon',
          label: '图标',
          span: 8,
          icon: 'fto-user'
        },
        {
          control: 'input',
          id: 'inputLength',
          label: '长度限制',
          span: 8,
          maxlength: 10
        }
      ]
    },
    {
      controls: [
        {
          control: 'input',
          id: 'inputRow',
          label: '标签位置',
          direction: 'row',
          span: 8
        }
      ]
    },
    {
      title: 'Radio 单选框',
      icon: 'fto-list',
      controls: [
        { control: 'radio', id: 'radio', label: '默认', span: 8, data: DATA_CHECKBOX },
        {
          control: 'radio',
          id: 'radioDisabled',
          label: '禁用',
          span: 8,
          data: DATA_CHECKBOX,
          value: 'QQ',
          disabled: true
        },
        { control: 'radio', id: 'radioRequired', label: '必选', span: 8, data: DATA_CHECKBOX, required: true },
        { control: 'radio', id: 'radioButton', label: '按钮样式', span: 8, data: DATA_CHECKBOX, button: true },
        {
          control: 'radio',
          id: 'radioButtonDisabled',
          label: '按钮禁用',
          span: 8,
          data: DATA_CHECKBOX,
          button: true,
          value: 'QQ',
          disabled: true
        },
        {
          control: 'radio',
          id: 'radioButtonRequired',
          label: '按钮必选',
          span: 8,
          data: DATA_CHECKBOX,
          button: true,
          required: true
        }
      ]
    },
    {
      title: 'Rate 评分',
      icon: 'fto-list',
      controls: [
        {
          control: 'rate',
          id: 'rate',
          label: '默认',
          span: 8
        },
        {
          control: 'rate',
          id: 'rateDisabled',
          label: '禁用',
          span: 8,
          value: 4,
          disabled: true
        },
        {
          control: 'rate',
          id: 'rateRequired',
          label: '必选',
          span: 8,
          required: true
        }
      ]
    },
    {
      title: 'Select 选择器',
      icon: 'fto-list',
      controls: [
        { control: 'select', id: 'select', label: '默认', span: 8, data: DATA_SELECT },
        {
          control: 'select',
          id: 'selectDisabled',
          label: '禁用',
          span: 8,
          data: DATA_SELECT,
          value: 'BBBB',
          disabled: true
        },
        { control: 'select', id: 'selectRequired', label: '必填', span: 8, data: DATA_SELECT, required: true },
        {
          control: 'select',
          id: 'selectPlaceholder',
          label: '提示选择',
          span: 8,
          data: DATA_SELECT,
          placeholder: '请选择城市'
        },
        {
          control: 'select',
          id: 'selectAsync',
          label: '异步获取数据',
          span: 8,
          data: new Observable<string[]>((x) => {
            setTimeout(() => {
              x.next(DATA_SELECT as string[]);
              x.complete();
            }, 2000);
          }),
          async: true
        }
      ]
    },
    {
      title: 'SliderSelect 滑动选择',
      icon: 'fto-list',
      controls: [
        {
          control: 'slider-select',
          id: 'sliderSelect',
          label: '默认',
          span: 8
        },
        {
          control: 'slider-select',
          id: 'sliderSelectDisabled',
          label: '禁用',
          span: 8,
          value: 50,
          disabled: true
        },
        {
          control: 'slider-select',
          id: 'sliderSelectRequired',
          label: '必选',
          span: 8,
          required: true
        },
        {
          control: 'slider-select',
          id: 'sliderSelectMinMax',
          label: '限制',
          span: 8,
          value: 0,
          min: -10,
          max: 10
        },
        {
          control: 'slider-select',
          id: 'sliderSelectStep',
          label: '精度',
          span: 8,
          value: 0,
          min: 0,
          max: 1,
          step: 0.01
        }
      ]
    },
    {
      title: 'Switch 开关',
      icon: 'fto-list',
      controls: [
        {
          control: 'switch',
          id: 'switch',
          label: '默认',
          span: 8
        },
        {
          control: 'switch',
          id: 'switchDisabled',
          label: '禁用',
          span: 8,
          value: true,
          disabled: true
        }
      ]
    },
    {
      title: 'TimePicker 时间选择器',
      icon: 'fto-list',
      controls: [
        {
          control: 'time-picker',
          id: 'timePicker',
          label: '默认',
          span: 8
        },
        {
          control: 'time-picker',
          id: 'timePickerDisabled',
          label: '禁用',
          span: 8,
          value: new Date(),
          disabled: true
        },
        {
          control: 'time-picker',
          id: 'timePickerRequired',
          label: '必填',
          span: 8,
          required: true
        }
      ]
    },
    {
      title: 'Textarea 多行输入框',
      icon: 'fto-list',
      controls: [
        {
          control: 'textarea',
          id: 'textarea',
          label: '默认',
          span: 8
        },
        {
          control: 'textarea',
          id: 'textareaDisabled',
          label: '禁用',
          span: 8,
          value: 'ngnest.com',
          disabled: true
        },
        {
          control: 'textarea',
          id: 'textareaRequired',
          label: '必填',
          span: 8,
          required: true
        },
        {
          control: 'textarea',
          id: 'textareaRequiredRegExp',
          label: '必填+正则验证',
          span: 8,
          value: 0.1,
          required: true,
          pattern: /^-?\d+$/,
          message: '整数'
        },
        {
          control: 'textarea',
          id: 'textareaPlaceholder',
          label: '提示输入',
          span: 8,
          placeholder: '请输入用户名'
        },
        {
          control: 'textarea',
          id: 'textareaClearable',
          label: '清除按钮',
          span: 8,
          value: '清除按钮',
          clearable: true
        },
        {
          control: 'textarea',
          id: 'textareaIcon',
          label: '图标',
          span: 8,
          icon: 'fto-user'
        },
        {
          control: 'textarea',
          id: 'textareaLength',
          label: '长度限制',
          span: 8,
          maxlength: 10
        }
      ]
    }
  ];
}

@Component({
  selector: 'test-x-form-row'
  // template: `<x-form
  //     #form
  //     [controls]="controls"
  //     direction="row"
  //     labelSuffix=":"
  //     width="28rem"
  //     labelWidth="8rem"
  //     labelAlign="end"
  //     span="20"
  //   ></x-form>
  //   <x-button (click)="submit()">提交</x-button><x-button (click)="getMessages()">获取验证信息</x-button>`
})
class TestXFormRowComponent {
  controls: XControl[] = [
    {
      control: 'input',
      id: 'id',
      label: '编码',
      maxlength: 10,
      required: true,
      value: 909090
    },
    {
      control: 'input',
      id: 'name',
      label: '姓名',
      disabled: true
    },
    {
      control: 'input',
      id: 'account',
      label: '账号',
      clearable: true,
      required: true,
      pattern: [/^-?\d+$/, /^[+]{0,1}(\d+)$/],
      message: ['整数', '正整数'],
      clearClick: (value: any) => {
        console.log(value);
      }
    },
    {
      control: 'input',
      id: 'password',
      label: '密码'
    },
    {
      control: 'input',
      id: 'file',
      label: '文件'
    },
    { control: 'select', id: 'type', label: '角色', data: ['普通用户', '管理员', '销售'], value: '管理员' },
    {
      control: 'cascade',
      id: 'city',
      label: '城市',
      data: [
        { id: 1, label: '湖北省' },
        { id: 2, label: '浙江省' },
        { id: 3, label: '河南省' },
        { id: 4, label: '河北省' },
        { id: 5, pid: 1, label: '武汉市' },
        { id: 6, pid: 1, label: '宜昌市' },
        { id: 7, pid: 1, label: '荆州市' }
      ]
    },
    { control: 'color-picker', id: 'color', label: '喜欢的颜色' },
    {
      control: 'color-picker',
      id: 'createDate',
      label: '创建日期'
    },
    { control: 'input-number', id: 'age', label: '年龄' },
    { control: 'radio', id: 'gender', label: '性别', data: ['男', '女'] },
    {
      control: 'rate',
      id: 'level',
      label: '级别',
      count: 6
    },
    {
      control: 'switch',
      id: 'disabled',
      label: '禁用'
    },
    {
      control: 'time-picker',
      id: 'time',
      label: '时间'
    },
    {
      control: 'slider-select',
      id: 'process',
      label: '进度'
    },
    {
      control: 'checkbox',
      id: 'active',
      label: '爱好',
      data: ['乒乓球', '篮球', '足球']
    }
  ];
  form = viewChild.required<XFormComponent>('form');

  submit() {
    console.log(this.form());
  }

  getMessages() {
    console.log(this.form().getValidatorMessages());
  }
}

@Component({
  selector: 'test-x-form-title'
  // template: `<x-form [controls]="controls" direction="row" span="8" space="1.5"></x-form>`
})
class TestXFormTitleComponent {
  controls: XControl[] = [
    { control: 'input', id: 'name', label: '姓名', required: true, maxlength: 10, hidden: true },
    { control: 'input', id: 'id', label: '编码', disabled: true, value: '001001001', required: true },
    {
      control: 'input',
      id: 'account',
      label: '账号',
      clearable: true,
      clearClick: (value: any) => {
        console.log(value);
      },
      required: true
    },
    { control: 'input', id: 'password', label: '密码', type: 'password', required: true },
    { control: 'input', id: 'file', label: '文件', required: true },
    {
      control: 'select',
      id: 'type',
      label: '角色',
      data: ['普通用户', '管理员', '销售'],
      value: '管理员',
      required: true
    },
    {
      control: 'cascade',
      id: 'city',
      label: '城市',
      data: [
        { id: 1, label: '湖北省' },
        { id: 2, label: '浙江省' },
        { id: 3, label: '河南省' },
        { id: 4, label: '河北省' },
        { id: 5, pid: 1, label: '武汉市' },
        { id: 6, pid: 1, label: '宜昌市' },
        { id: 7, pid: 1, label: '荆州市' }
      ],
      required: true
    },
    { control: 'color-picker', id: 'color', label: '喜欢颜色', required: true },
    { control: 'date-picker', id: 'createDate', label: '创建日期', required: true },
    { control: 'input-number', id: 'age', label: '年龄', required: true },
    { control: 'radio', id: 'gender', label: '性别', data: ['男', '女'], required: true },
    { control: 'rate', id: 'level', label: '级别', count: 6, required: true },
    { control: 'switch', id: 'disabled', label: '禁用' },
    { control: 'time-picker', id: 'time', label: '时间', required: true },
    { control: 'slider-select', id: 'process', label: '进度', required: true },
    { control: 'checkbox', id: 'active', label: '爱好', data: ['乒乓球', '篮球', '足球'], required: true }
  ];
}
