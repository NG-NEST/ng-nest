import { Component } from '@angular/core';
import { XFormComponent, XFormRow } from '@ng-nest/ui/form';
import { XData, XQuery } from '@ng-nest/ui/core';
import { XCalendarNode } from '@ng-nest/ui/calendar';
import { XCheckboxNode } from '@ng-nest/ui/checkbox';
import { XSelectNode } from '@ng-nest/ui/select';
import { Observable } from 'rxjs';
import { DefaultService } from './default.service';
import { TreeService } from './tree.service';

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

const DATA_CHECKBOX: XData<XCheckboxNode> = ['QQ', 'WeChat', 'DingTalk', 'Weibo'];

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
  selector: 'ex-default',
  standalone: true,
  imports: [XFormComponent],
  templateUrl: './default.component.html',
  providers: [DefaultService, TreeService]
})
export class ExDefaultComponent {
  constructor(public defaultService: DefaultService, public treeService: TreeService) {}

  controls: XFormRow[] = [
    {
      title: 'Cascade',
      icon: 'fto-list',
      controls: [
        { id: 'cascade', control: 'cascade', label: 'defalut', span: 8, data: DATA_CASCADE },
        {
          id: 'cascadeDisabled',
          control: 'cascade',
          label: 'disabled',
          span: 8,
          data: DATA_CASCADE,
          value: 22,
          disabled: true
        },
        {
          id: 'cascadeRequired',
          control: 'cascade',
          label: 'required',
          span: 8,
          data: DATA_CASCADE,
          required: true
        },
        {
          id: 'cascadePlaceholder',
          control: 'cascade',
          label: 'prompt select',
          span: 8,
          data: DATA_CASCADE,
          placeholder: '请选择城市'
        }
      ]
    },
    {
      controls: [
        {
          control: 'cascade',
          id: 'cascadeRow',
          label: 'label position',
          direction: 'row',
          span: 8,
          data: DATA_CASCADE
        }
      ]
    },
    {
      title: 'Checkbox',
      icon: 'fto-list',
      controls: [
        {
          control: 'checkbox',
          id: 'checkbox',
          label: 'defalut',
          span: 8,
          data: DATA_CHECKBOX
        },
        {
          control: 'checkbox',
          id: 'checkboxDisabled',
          label: 'disabled',
          span: 8,
          data: DATA_CHECKBOX,
          value: ['QQ', 'DingTalk'],
          disabled: true
        },
        {
          control: 'checkbox',
          id: 'checkboxRequired',
          label: 'will choose',
          span: 8,
          data: DATA_CHECKBOX,
          required: true
        },
        {
          control: 'checkbox',
          id: 'checkboxButton',
          label: 'button style',
          span: 8,
          data: DATA_CHECKBOX,
          button: true
        },
        {
          control: 'checkbox',
          id: 'checkboxButtonDisabled',
          label: 'button disabled',
          span: 8,
          data: DATA_CHECKBOX,
          button: true,
          value: ['QQ', 'DingTalk'],
          disabled: true
        },
        {
          control: 'checkbox',
          id: 'checkboxButtonRequired',
          label: 'button will choose',
          span: 8,
          data: DATA_CHECKBOX,
          button: true,
          required: true
        }
      ]
    },
    {
      title: 'ColorPicker',
      icon: 'fto-list',
      controls: [
        { control: 'color-picker', id: 'colorPicker', label: 'defalut', span: 8 },
        {
          control: 'color-picker',
          id: 'colorPickerDisabled',
          label: 'disabled',
          span: 8,
          value: '#3B82F6',
          disabled: true
        },
        {
          control: 'color-picker',
          id: 'colorPickerRequired',
          label: 'required',
          span: 8,
          required: true
        },
        {
          control: 'color-picker',
          id: 'colorPickerPlaceholder',
          label: 'prompt select',
          span: 8,
          placeholder: '请选择颜色'
        }
      ]
    },
    {
      title: 'DatePicker',
      icon: 'fto-list',
      controls: [
        { control: 'date-picker', id: 'datePicker', label: 'defalut', span: 8 },
        {
          control: 'date-picker',
          id: 'datePickerDisabled',
          label: 'disabled',
          span: 8,
          value: '2020-05-19',
          disabled: true
        },
        {
          control: 'date-picker',
          id: 'datePickerRequired',
          label: 'required',
          span: 8,
          required: true
        },
        {
          control: 'date-picker',
          id: 'datePickerPlaceholder',
          label: 'prompt select',
          span: 8,
          placeholder: '请选择日期'
        },
        {
          control: 'date-picker',
          id: 'datePickerYear',
          label: 'select year',
          span: 8,
          type: 'year'
        },
        {
          control: 'date-picker',
          id: 'datePickerMonth',
          label: 'select month',
          span: 8,
          type: 'month'
        }
      ]
    },
    {
      title: 'InputNumber',
      icon: 'fto-list',
      controls: [
        { control: 'input-number', id: 'inputNumber', label: 'defalut', span: 8 },
        {
          control: 'input-number',
          id: 'inputNumberDisabled',
          label: 'disabled',
          span: 8,
          value: 20,
          disabled: true
        },
        {
          control: 'input-number',
          id: 'inputNumberRequired',
          label: 'required',
          span: 8,
          required: true
        },
        {
          control: 'input-number',
          id: 'inputNumberMinMax',
          label: 'restricted size (-10 to 10)',
          span: 8,
          min: -10,
          max: 10
        },
        {
          control: 'input-number',
          id: 'inputNumberPrecision',
          label: 'precision',
          span: 8,
          precision: 2,
          step: 0.1
        }
      ]
    },
    {
      title: 'Input',
      icon: 'fto-list',
      controls: [
        {
          control: 'input',
          id: 'input',
          label: 'defalut',
          span: 8
        },
        {
          control: 'input',
          id: 'inputDisabled',
          label: 'disabled',
          span: 8,
          value: 'ngnest.com',
          disabled: true
        },
        {
          control: 'input',
          id: 'inputRequired',
          label: 'required',
          span: 8,
          required: true
        },
        {
          control: 'input',
          id: 'inputRequiredPattern',
          label: 'required + regular validation',
          span: 8,
          value: 0.1,
          required: true,
          pattern: /^-?\d+$/,
          message: 'integer'
        },
        {
          control: 'input',
          id: 'inputPlaceholder',
          label: 'placeholder',
          span: 8,
          placeholder: 'please enter the user name'
        },
        {
          control: 'input',
          id: 'inputClearable',
          label: 'clear button',
          span: 8,
          value: 'clear button',
          clearable: true
        },
        {
          control: 'input',
          id: 'inputIcon',
          label: 'icon',
          span: 8,
          icon: 'fto-user'
        },
        {
          control: 'input',
          id: 'inputLength',
          label: 'lenght',
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
          label: 'label position',
          direction: 'row',
          span: 8
        }
      ]
    },
    {
      title: 'Radio',
      icon: 'fto-list',
      controls: [
        { control: 'radio', id: 'radio', label: 'defalut', span: 8, data: DATA_CHECKBOX },
        {
          control: 'radio',
          id: 'radioDisabled',
          label: 'disabled',
          span: 8,
          data: DATA_CHECKBOX,
          value: 'QQ',
          disabled: true
        },
        {
          control: 'radio',
          id: 'radioRequired',
          label: 'will choose',
          span: 8,
          data: DATA_CHECKBOX,
          required: true
        },
        {
          control: 'radio',
          id: 'radioButton',
          label: 'button style',
          span: 8,
          data: DATA_CHECKBOX,
          button: true
        },
        {
          control: 'radio',
          id: 'radioButtonDisabled',
          label: 'button disabled',
          span: 8,
          data: DATA_CHECKBOX,
          button: true,
          value: 'QQ',
          disabled: true
        },
        {
          control: 'radio',
          id: 'radioButtonRequired',
          label: 'button will choose',
          span: 8,
          data: DATA_CHECKBOX,
          button: true,
          required: true
        }
      ]
    },
    {
      title: 'Rate',
      icon: 'fto-list',
      controls: [
        {
          control: 'rate',
          id: 'rate',
          label: 'defalut',
          span: 8
        },
        {
          control: 'rate',
          id: 'rateDisabled',
          label: 'disabled',
          span: 8,
          value: 4,
          disabled: true
        },
        {
          control: 'rate',
          id: 'rateRequired',
          label: 'will choose',
          span: 8,
          required: true
        }
      ]
    },
    {
      title: 'Select',
      icon: 'fto-list',
      controls: [
        { control: 'select', id: 'select', label: 'defalut', span: 8, data: DATA_SELECT },
        {
          control: 'select',
          id: 'selectDisabled',
          label: 'disabled',
          span: 8,
          data: DATA_SELECT,
          value: 'BBBB',
          disabled: true
        },
        {
          control: 'select',
          id: 'selectRequired',
          label: 'required',
          span: 8,
          data: DATA_SELECT,
          required: true
        },
        {
          control: 'select',
          id: 'selectPlaceholder',
          label: 'prompt select',
          span: 8,
          data: DATA_SELECT,
          placeholder: 'select city'
        },
        {
          control: 'select',
          id: 'selectAsync',
          label: 'async data',
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
      title: 'SliderSelect',
      icon: 'fto-list',
      controls: [
        {
          control: 'slider-select',
          id: 'sliderSelect',
          label: 'defalut',
          span: 8
        },
        {
          control: 'slider-select',
          id: 'sliderSelectDisabled',
          label: 'disabled',
          span: 8,
          value: 50,
          disabled: true
        },
        {
          control: 'slider-select',
          id: 'sliderSelectRequired',
          label: 'will choose',
          span: 8,
          required: true
        },
        {
          control: 'slider-select',
          id: 'sliderSelectMinMax',
          label: 'limit',
          span: 8,
          value: 0,
          min: -10,
          max: 10
        },
        {
          control: 'slider-select',
          id: 'sliderSelectStep',
          label: 'precision',
          span: 8,
          value: 0,
          min: 0,
          max: 1,
          step: 0.01
        }
      ]
    },
    {
      title: 'Switch',
      icon: 'fto-list',
      controls: [
        {
          control: 'switch',
          id: 'switch',
          label: 'defalut',
          span: 8
        },
        {
          control: 'switch',
          id: 'switchDisabled',
          label: 'disabled',
          span: 8,
          value: true,
          disabled: true
        }
      ]
    },
    {
      title: 'TimePicker',
      icon: 'fto-list',
      controls: [
        {
          control: 'time-picker',
          id: 'timePicker',
          label: 'defalut',
          span: 8
        },
        {
          control: 'time-picker',
          id: 'timePickerDisabled',
          label: 'disabled',
          span: 8,
          value: new Date(),
          disabled: true
        },
        {
          control: 'time-picker',
          id: 'timePickerRequired',
          label: 'required',
          span: 8,
          required: true
        }
      ]
    },
    {
      title: 'Find',
      icon: 'fto-list',
      controls: [
        {
          control: 'find',
          id: 'find',
          tableColumns: [
            { id: 'index', label: 'serial no', type: 'index', width: 80 },
            { id: 'label', label: 'user', flex: 1, sort: true },
            { id: 'position', label: 'position', flex: 1, sort: true },
            { id: 'organization', label: 'organization', flex: 1, sort: true }
          ],
          tableData: (index: number, size: number, query: XQuery) =>
            this.defaultService.getList(index, size, query),
          label: 'table single select',
          span: 8
        },
        {
          control: 'find',
          id: 'findMultiple',
          tableColumns: [
            { id: 'index', label: 'serial no', type: 'index', width: 80 },
            { id: 'label', label: 'user', flex: 1, sort: true },
            { id: 'position', label: 'position', flex: 1, sort: true },
            { id: 'organization', label: 'organization', flex: 1, sort: true }
          ],
          tableData: (index: number, size: number, query: XQuery) =>
            this.defaultService.getList(index, size, query),
          multiple: true,
          label: 'table multiple select',
          span: 8
        },
        {
          control: 'find',
          id: 'findTree',
          treeData: this.treeService.getTreeList,
          label: 'tree single select',
          span: 8
        },
        {
          control: 'find',
          id: 'findTreeTable',
          tableColumns: [
            { id: 'index', label: 'serial no', type: 'index', width: 80 },
            { id: 'label', label: 'user', flex: 1, sort: true },
            { id: 'position', label: 'position', flex: 1, sort: true },
            { id: 'organization', label: 'organization', flex: 1, sort: true }
          ],
          tableData: (index: number, size: number, query: XQuery) =>
            this.defaultService.getList(index, size, query),
          treeData: this.treeService.getTreeList,
          treeTableConnect: 'organizationId',
          label: 'tree table single select',
          span: 8
        },
        {
          control: 'find',
          id: 'findTreeTableMultiple',
          dialogWidth: '65rem',
          tableColumns: [
            { id: 'index', label: 'serial no', type: 'index', width: 80 },
            { id: 'label', label: 'user', flex: 1, sort: true },
            { id: 'position', label: 'position', flex: 1, sort: true },
            { id: 'organization', label: 'organization', flex: 1, sort: true }
          ],
          tableData: (index: number, size: number, query: XQuery) =>
            this.defaultService.getList(index, size, query),
          treeData: this.treeService.getTreeList,
          treeTableConnect: 'organizationId',
          multiple: true,
          label: 'tree talbe multiple select',
          span: 8
        },
        {
          control: 'find',
          id: 'findDisabled',
          label: 'disabled',
          value: { id: 1, label: 'name1' },
          span: 8,
          disabled: true
        },
        {
          control: 'find',
          id: 'findRequired',
          tableColumns: [
            { id: 'index', label: 'serial no', type: 'index', width: 80 },
            { id: 'label', label: 'user', flex: 1, sort: true },
            { id: 'position', label: 'position', flex: 1, sort: true },
            { id: 'organization', label: 'organization', flex: 1, sort: true }
          ],
          tableData: (index: number, size: number, query: XQuery) =>
            this.defaultService.getList(index, size, query),
          label: 'required',
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
    },
    {
      title: 'AutoComplete',
      icon: 'fto-list',
      controls: [
        {
          control: 'auto-complete',
          id: 'auto-complete-human',
          label: 'manual match',
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
          label: 'defaults',
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
          label: 'fixed option',
          placeholder: 'input aa',
          data: ['aaaa', 'bbbb', 'cccc', 'dddd', 'aaa', 'bbb', 'ccc', 'aaaaaa'],
          span: 8
        },
        {
          control: 'auto-complete',
          id: 'auto-complete-fixed-one',
          label: 'fixed options, request once',
          placeholder: 'input aa',
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
          label: 'disabled',
          disabled: true,
          value: 'aaaa',
          data: ['aaaa', 'bbbb', 'cccc', 'dddd', 'aaa', 'bbb', 'ccc', 'aaaaaa'],
          span: 8
        },
        {
          control: 'auto-complete',
          id: 'auto-complete-fixed',
          label: 'required',
          placeholder: 'input aa',
          required: true,
          data: ['aaaa', 'bbbb', 'cccc', 'dddd', 'aaa', 'bbb', 'ccc', 'aaaaaa'],
          span: 8
        }
      ]
    }
  ];
}
