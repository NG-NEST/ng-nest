import { interval } from 'rxjs';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { XCascadeComponent } from './cascade.component';
import { Component, DebugElement, ChangeDetectorRef } from '@angular/core';
import { By } from '@angular/platform-browser';
import { XCascadeModule } from './cascade.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { XCascadePrefix, XCascadeNode } from './cascade.type';
import { XFenceModule } from '@ng-nest/ui/fence';

describe(XCascadePrefix, () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [XCascadeModule, FormsModule, ReactiveFormsModule, XFenceModule],
      declarations: [
        TestXCascadeComponent,
        TestXCascadeLabelComponent,
        TestXCascadeDisabledComponent,
        TestXCascadeRequiredComponent
      ]
    }).compileComponents();
  }));
  describe(`default.`, () => {
    let fixture: ComponentFixture<TestXCascadeComponent>;
    let debugElement: DebugElement;
    beforeEach(() => {
      fixture = TestBed.createComponent(TestXCascadeComponent);
      fixture.detectChanges();
      debugElement = fixture.debugElement.query(By.directive(XCascadeComponent));
    });
    it('should create.', () => {
      expect(debugElement).toBeDefined();
    });
  });
  describe(`label.`, () => {
    let fixture: ComponentFixture<TestXCascadeLabelComponent>;
    let debugElement: DebugElement;
    beforeEach(() => {
      fixture = TestBed.createComponent(TestXCascadeLabelComponent);
      fixture.detectChanges();
      debugElement = fixture.debugElement.query(By.directive(TestXCascadeLabelComponent));
    });
    it('should create.', () => {
      expect(debugElement).toBeDefined();
    });
  });
  describe(`disabled.`, () => {
    let fixture: ComponentFixture<TestXCascadeDisabledComponent>;
    let debugElement: DebugElement;
    beforeEach(() => {
      fixture = TestBed.createComponent(TestXCascadeDisabledComponent);
      fixture.detectChanges();
      debugElement = fixture.debugElement.query(By.directive(TestXCascadeDisabledComponent));
    });
    it('should create.', () => {
      expect(debugElement).toBeDefined();
    });
  });
  describe(`required.`, () => {
    let fixture: ComponentFixture<TestXCascadeRequiredComponent>;
    let debugElement: DebugElement;
    beforeEach(() => {
      fixture = TestBed.createComponent(TestXCascadeRequiredComponent);
      fixture.detectChanges();
      debugElement = fixture.debugElement.query(By.directive(TestXCascadeRequiredComponent));
    });
    it('should create.', () => {
      expect(debugElement).toBeDefined();
    });
  });
});

const data: XCascadeNode[] = [
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

@Component({
  template: `
    <x-row>
      <x-col span="12">
        <x-cascade [data]="data1" [(ngModel)]="model1"></x-cascade>
      </x-col>
    </x-row>
    <x-row>
      <x-col span="12">
        <x-cascade [data]="data2" [(ngModel)]="model2"></x-cascade>
      </x-col>
    </x-row>
    <x-row>
      <x-col span="12">
        <x-cascade [data]="data3" [(ngModel)]="model3"></x-cascade>
      </x-col>
    </x-row>
  `,
  styles: [
    `
      :host {
        height: 900px;
      }
      x-row:not(:first-child) {
        margin-top: 0.5rem;
      }
    `
  ]
})
class TestXCascadeComponent {
  data1 = JSON.parse(JSON.stringify(data));
  data2 = JSON.parse(JSON.stringify(data));
  data3 = JSON.parse(JSON.stringify(data));
  model1: any;
  model2 = 22;
  model3 = 10;
  constructor(private cdr: ChangeDetectorRef) {
    interval(1).subscribe(x => {
      this.cdr.detectChanges();
    });
  }
}

@Component({
  template: `
    <x-row>
      <x-col span="12">
        <x-cascade label="方式" [data]="data" [(ngModel)]="model"></x-cascade>
      </x-col>
    </x-row>
    <x-row>
      <x-col span="12">
        <x-cascade label="方式" [data]="data" [(ngModel)]="model" direction="column-reverse"></x-cascade>
      </x-col>
    </x-row>
    <x-row>
      <x-col span="12">
        <x-cascade label="方式" [data]="data" [(ngModel)]="model" direction="row"></x-cascade>
      </x-col>
    </x-row>
    <x-row>
      <x-col span="12">
        <x-cascade label="方式" [data]="data" [(ngModel)]="model" direction="row-reverse"></x-cascade>
      </x-col>
    </x-row>
  `,
  styles: [
    `
      x-row:not(:first-child) {
        margin-top: 0.5rem;
      }
    `
  ]
})
class TestXCascadeLabelComponent {
  data = data;
  model: any;
  constructor(private cdr: ChangeDetectorRef) {
    interval(50).subscribe(x => {
      this.cdr.detectChanges();
    });
  }
}

@Component({
  template: `
    <x-row>
      <x-col span="12">
        <x-cascade [data]="data" disabled></x-cascade>
      </x-col>
    </x-row>
    <x-row>
      <x-col span="12">
        <x-cascade [data]="data" [(ngModel)]="model" disabled></x-cascade>
      </x-col>
    </x-row>
  `,
  styles: [
    `
      x-row:not(:first-child) {
        margin-top: 0.5rem;
      }
    `
  ]
})
class TestXCascadeDisabledComponent {
  data = data;
  model = 22;
}

@Component({
  template: `
    <x-row>
      <x-col span="12">
        <x-cascade [data]="data" [(ngModel)]="model1" required></x-cascade>
      </x-col>
    </x-row>
    <x-row>
      <x-col span="12">
        <x-cascade [data]="data" [(ngModel)]="model2" label="选择" required></x-cascade>
      </x-col>
    </x-row>
  `,
  styles: [
    `
      x-row:not(:first-child) {
        margin-top: 0.5rem;
      }
    `
  ]
})
class TestXCascadeRequiredComponent {
  data = data;
  model1: any;
  model2: any;
  constructor(private cdr: ChangeDetectorRef) {
    interval(50).subscribe(x => {
      this.cdr.detectChanges();
    });
  }
}
