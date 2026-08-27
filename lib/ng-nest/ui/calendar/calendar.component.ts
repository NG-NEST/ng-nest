import { Component, ViewEncapsulation, ChangeDetectionStrategy, inject, computed, signal, effect, linkedSignal } from '@angular/core';
import { XCalendarPrefix, XCalendarProperty } from './calendar.property';
import { XIsEmpty } from '@ng-nest/ui/core';
import { DatePipe, LowerCasePipe, NgClass, NgTemplateOutlet } from '@angular/common';
import { XI18nService, zh_CN } from '@ng-nest/ui/i18n';
import { XLinkComponent } from '@ng-nest/ui/link';
import { XDatePickerComponent, XPickerDateComponent, XPickerMonthComponent } from '@ng-nest/ui/date-picker';
import { XButtonComponent, XButtonsComponent } from '@ng-nest/ui/button';
import { XRadioComponent } from '@ng-nest/ui/radio';
import { XTooltipDirective } from '@ng-nest/ui/tooltip';
import { map } from 'rxjs/operators';
import { FormsModule } from '@angular/forms';
import { toSignal } from '@angular/core/rxjs-interop';
import type { XCalendarNode, XCalendarNodeItem } from './calendar.property';
import type { XI18nCalendar } from '@ng-nest/ui/i18n';

@Component({
  selector: `${XCalendarPrefix}`,
  imports: [
    NgClass,
    NgTemplateOutlet,
    DatePipe,
    FormsModule,
    XLinkComponent,
    XTooltipDirective,
    XRadioComponent,
    XDatePickerComponent,
    XPickerDateComponent,
    XPickerMonthComponent,
    XButtonComponent,
    XButtonsComponent
  ],
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [DatePipe, LowerCasePipe]
})
export class XCalendarComponent extends XCalendarProperty {
  private datePipe = inject(DatePipe);
  private lowerCasePipe = inject(LowerCasePipe);
  private i18n = inject(XI18nService);
  datetime = linkedSignal<Date>(() => this.value() ?? new Date());
  activatedDate = linkedSignal<Date>(() => this.value() ?? new Date());
  radioDataBase = [
    { label: '', id: 'month' },
    { label: '', id: 'year' }
  ];
  modelSignal = signal(this.model());

  locale = toSignal(this.i18n.localeChange.pipe(map((x) => x.calendar as XI18nCalendar)), {
    initialValue: zh_CN.calendar
  });
  radioData = computed(() => {
    return this.radioDataBase.map((x) => {
      x.label = (this.locale() as any)[x.id];
      return x;
    });
  });
  classMap = computed(() => ({
    [`${XCalendarPrefix}-${this.displayType()}`]: !XIsEmpty(this.displayType())
  }));
  monthData = computed(() => {
    let dt: { [property: string]: XCalendarNodeItem[] } = {};
    for (let key in this.data()) {
      let month = this.datePipe.transform(key, 'yyyy-MM') as string;
      let items = this.toItems(this.data()[key]);
      let value = '';
      items.forEach((x) => {
        value += `${x.id}${x.label} <br/>`;
      });
      let item = { id: key, label: value } as XCalendarNodeItem;
      if (dt[month]) {
        dt[month] = [...dt[month], item];
      } else {
        dt[month] = [item];
      }
    }

    return dt;
  });

  constructor() {
    super();
    effect(() => {
      this.modelSignal.set(this.model());
    });
  }

  action(next: number) {
    let datetime = new Date(this.datetime().getTime());
    if (this.modelSignal() === 'month') {
      datetime.setMonth(datetime.getMonth() + next);
    } else if (this.modelSignal() === 'year') {
      datetime.setFullYear(datetime.getFullYear() + next);
    }
    this.datetime.set(datetime);
  }

  getLocaleMonth(date: Date) {
    return (this.locale() as any)[this.lowerCasePipe.transform(this.datePipe.transform(date, 'LLLL') as string)];
  }

  dateOnChange(date: Date) {
    if (this.datePipe.transform(date, 'yyyy-MM-dd') !== this.datePipe.transform(this.activatedDate(), 'yyyy-MM-dd')) {
      this.activatedDate.set(date);
      this.dateChange.emit(this.activatedDate());
    }
  }

  rangeOnChange(range: Date[]) {
    this.rangeChange.emit(range);
  }

  getDate(date: Date): XCalendarNodeItem[] {
    return this.toItems(this.data()?.[this.datePipe.transform(date, 'yyyy-MM-dd') as string]);
  }

  getMonth(date: Date): XCalendarNodeItem[] {
    return this.monthData()?.[this.datePipe.transform(date, 'yyyy-MM') as string] ?? [];
  }

  getCellClass(date: Date): string {
    const value = this.data()?.[this.datePipe.transform(date, 'yyyy-MM-dd') as string];
    const node = !Array.isArray(value) ? value : undefined;
    const items = this.toItems(value);
    const classes = [...(node?.class ? [node.class] : []), ...items.map((x) => x.class).filter((x) => !!x)];
    return classes.join(' ');
  }

  getCellStyle(date: Date): { [klass: string]: any } {
    const value = this.data()?.[this.datePipe.transform(date, 'yyyy-MM-dd') as string];
    const node = !Array.isArray(value) ? value : undefined;
    const style: { [klass: string]: any } = { ...(node?.style || {}) };
    this.toItems(value).forEach((x) => {
      if (x.style) Object.assign(style, x.style);
    });
    return style;
  }

  getMonthClass(date: Date): string {
    return this.getNodesClass(this.getMonth(date));
  }

  getMonthStyle(date: Date): { [klass: string]: any } {
    return this.getNodesStyle(this.getMonth(date));
  }

  private toItems(value?: XCalendarNodeItem[] | XCalendarNode): XCalendarNodeItem[] {
    if (!value) return [];
    if (Array.isArray(value)) return value;
    return value.list ?? [];
  }

  private getNodesClass(nodes?: XCalendarNodeItem[]): string {
    if (!nodes || nodes.length === 0) return '';
    return nodes
      .map((x) => x.class)
      .filter((x) => !!x)
      .join(' ');
  }

  private getNodesStyle(nodes?: XCalendarNodeItem[]): { [klass: string]: any } {
    const style: { [klass: string]: any } = {};
    nodes?.forEach((x) => {
      if (x.style) Object.assign(style, x.style);
    });
    return style;
  }
}
