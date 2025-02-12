import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, TemplateRef, provideExperimentalZonelessChangeDetection, signal, viewChild } from '@angular/core';
import { By } from '@angular/platform-browser';
import {
  XCalendarComponent,
  XCalendarData,
  XCalendarModel,
  XCalendarPrefix,
  XCalendarType
} from '@ng-nest/ui/calendar';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { XRadioComponent } from '@ng-nest/ui/radio';
import { XDatePickerComponent, XPickerDateComponent, XPickerMonthComponent } from '@ng-nest/ui/date-picker';
import { DatePipe } from '@angular/common';
import { XButtonComponent, XButtonsComponent } from '@ng-nest/ui/button';
import { provideAnimations } from '@angular/platform-browser/animations';

@Component({
  selector: 'x-test-calendar',
  imports: [XCalendarComponent],
  template: `<x-calendar></x-calendar>`
})
class XTestCalendarComponent {}

@Component({
  selector: 'x-test-calendar-property',
  imports: [XCalendarComponent],
  template: `
    <x-calendar
      [data]="data()"
      [model]="model()"
      [displayType]="displayType()"
      [headerLeftTemp]="headerLeftTemp()"
      (dateChange)="dateChange($event)"
      (rangeChange)="rangeChange($event)"
    ></x-calendar>
    <ng-template #hlt> custom title </ng-template>
  `
})
class XTestCalendarPropertyComponent {
  hlt = viewChild.required<TemplateRef<any>>('hlt');
  data = signal<XCalendarData | null>({});
  model = signal<XCalendarModel>('month');
  displayType = signal<XCalendarType>('calendar');
  headerLeftTemp = signal<TemplateRef<any> | null>(null);

  activetedDate = signal<Date | null>(null);
  dateChange(date: Date) {
    this.activetedDate.set(date);
  }

  rangeDate = signal<Date[]>([]);
  rangeChange(dates: Date[]) {
    this.rangeDate.set(dates);
  }
}

xdescribe(XCalendarPrefix, () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [XTestCalendarComponent, XTestCalendarPropertyComponent],
      providers: [provideAnimations(), provideHttpClient(withFetch()), provideExperimentalZonelessChangeDetection()],
      teardown: { destroyAfterEach: false }
    }).compileComponents();
  });
  xdescribe('default.', () => {
    let fixture: ComponentFixture<XTestCalendarComponent>;
    beforeEach(() => {
      fixture = TestBed.createComponent(XTestCalendarComponent);
      fixture.detectChanges();
    });
    it('define.', () => {
      const com = fixture.debugElement.query(By.directive(XCalendarComponent));
      expect(com).toBeDefined();
    });
    it('property.', () => {
      const com = fixture.debugElement.query(By.directive(XCalendarComponent));
      const radio = com.query(By.directive(XRadioComponent));
      expect(radio).toBeDefined();
      const datePicker = fixture.debugElement.query(By.directive(XDatePickerComponent));
      expect(datePicker).toBeDefined();
      const pickerDate = fixture.debugElement.query(By.directive(XPickerDateComponent));
      expect(pickerDate).toBeDefined();
      const buttons = fixture.debugElement.query(By.directive(XButtonsComponent));
      expect(buttons).toBeDefined();
    });
  });
  xdescribe(`input.`, async () => {
    let fixture: ComponentFixture<XTestCalendarPropertyComponent>;
    let component: XTestCalendarPropertyComponent;
    let datePipe: DatePipe;
    beforeEach(async () => {
      fixture = TestBed.createComponent(XTestCalendarPropertyComponent);
      component = fixture.componentInstance;
      datePipe = new DatePipe('en-US');
      fixture.detectChanges();
    });
    it('data.', () => {
      component.data.set({
        [`${datePipe.transform(new Date(), 'yyyy-MM-dd')}`]: Array.from({ length: 10 }).map((_item, index) => ({
          id: `${index + 1}:`,
          label: index
        }))
      });
      fixture.detectChanges();

      const dateNow = fixture.debugElement.query(By.css('.x-date-now'));
      const list = dateNow.queryAll(By.css('li'));
      expect(list.length).toBe(10);
    });
    it('model.', () => {
      component.model.set('year');
      component.data.set({
        [`${datePipe.transform(new Date(), 'yyyy-MM')}`]: Array.from({ length: 10 }).map((_item, index) => ({
          id: `${index + 10}:`,
          label: index + 10
        })),
        [`${datePipe.transform(new Date(), 'yyyy-MM-dd')}`]: Array.from({ length: 10 }).map((_item, index) => ({
          id: `${index + 1}:`,
          label: index
        }))
      });
      fixture.detectChanges();

      const pickerMonth = fixture.debugElement.query(By.directive(XPickerMonthComponent));
      expect(pickerMonth).toBeDefined();
    });
    it('display type.', () => {
      component.displayType.set('card');
      fixture.detectChanges();

      const calendar = fixture.debugElement.query(By.css('.x-calendar'));
      expect(calendar.nativeElement).toHaveClass('x-calendar-card');
    });
    it('header left temp.', () => {
      component.headerLeftTemp.set(component.hlt());
      fixture.detectChanges();

      const hl = fixture.debugElement.query(By.css('.x-calendar-header-left'));
      expect(hl.nativeElement.textContent.trim()).toBe('custom title');
    });
  });
  xdescribe(`output`, () => {
    let fixture: ComponentFixture<XTestCalendarPropertyComponent>;
    let component: XTestCalendarPropertyComponent;
    let datePipe: DatePipe;
    beforeEach(async () => {
      fixture = TestBed.createComponent(XTestCalendarPropertyComponent);
      component = fixture.componentInstance;
      datePipe = new DatePipe('en-US');
      fixture.detectChanges();
    });
    it('date change.', () => {
      const item = fixture.debugElement.query(By.css('.x-date-last-or-next'));
      item.nativeElement.click();
      fixture.detectChanges();
      const dateItem = fixture.debugElement.query(By.css('.x-date-now'));
      dateItem.nativeElement.click();
      fixture.detectChanges();

      expect(datePipe.transform(component.activetedDate(), 'yyyy-MM-dd')).toBe(
        datePipe.transform(new Date(), 'yyyy-MM-dd')
      );
    });
    it('month range change.', () => {
      const buttons = fixture.debugElement.query(By.directive(XButtonsComponent));
      const button = buttons.query(By.directive(XButtonComponent));
      button.nativeElement.click();
      fixture.detectChanges();

      expect(component.rangeDate().length).toBe(2);
    });
    it('year range change.', () => {
      component.model.set('year');
      fixture.detectChanges();
      const buttons = fixture.debugElement.query(By.directive(XButtonsComponent));
      const button = buttons.query(By.directive(XButtonComponent));
      button.nativeElement.click();
      fixture.detectChanges();

      expect(component.rangeDate().length).toBe(2);
    });
  });
});
