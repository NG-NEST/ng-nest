import { interval } from 'rxjs';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { XCascadeComponent } from './cascade.component';
import { Component, DebugElement, ChangeDetectorRef } from '@angular/core';
import { By } from '@angular/platform-browser';
import { XCascadeModule } from '@ng-nest/ui/cascade';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { XCascadePrefix, XCascadeNode } from './cascade.property';
import { XLayoutModule } from '@ng-nest/ui/layout';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { XThemeModule } from '@ng-nest/ui/theme';
import { XRadioModule } from '@ng-nest/ui/radio';
import { XIconComponent } from '@ng-nest/ui/icon';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe(XCascadePrefix, () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        HttpClientTestingModule,
        XThemeModule,
        XCascadeModule,
        FormsModule,
        ReactiveFormsModule,
        XLayoutModule,
        XRadioModule,
        XIconComponent
      ],
      declarations: [
        TestXCascadeComponent,
        TestXCascadeLabelComponent,
        TestXCascadeDisabledComponent,
        TestXCascadeRequiredComponent,
        TestXCascadeSizeComponent,
        TestXCascadeBorderedComponent,
        TestXCascadeCustomComponent
      ]
    }).compileComponents();
  });
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
  describe(`size.`, () => {
    let fixture: ComponentFixture<TestXCascadeSizeComponent>;
    let debugElement: DebugElement;
    beforeEach(() => {
      fixture = TestBed.createComponent(TestXCascadeSizeComponent);
      fixture.detectChanges();
      debugElement = fixture.debugElement.query(By.directive(TestXCascadeComponent));
    });
    it('should create.', () => {
      expect(debugElement).toBeDefined();
    });
  });
  describe(`bordered.`, () => {
    let fixture: ComponentFixture<TestXCascadeBorderedComponent>;
    let debugElement: DebugElement;
    beforeEach(() => {
      fixture = TestBed.createComponent(TestXCascadeBorderedComponent);
      fixture.detectChanges();
      debugElement = fixture.debugElement.query(By.directive(TestXCascadeComponent));
    });
    it('should create.', () => {
      expect(debugElement).toBeDefined();
    });
  });
  describe(`custom.`, () => {
    let fixture: ComponentFixture<TestXCascadeCustomComponent>;
    let debugElement: DebugElement;
    beforeEach(() => {
      fixture = TestBed.createComponent(TestXCascadeCustomComponent);
      fixture.detectChanges();
      debugElement = fixture.debugElement.query(By.directive(TestXCascadeComponent));
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
    <x-theme showDark></x-theme>
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
        background-color: var(--x-background);
        padding: 1rem;
        border: 0.0625rem solid var(--x-border);
      }
      x-row:not(:first-child) {
        margin-top: 1rem;
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
    interval(1).subscribe(() => {
      this.cdr.detectChanges();
    });
  }
}

@Component({
  template: `
    <x-theme showDark></x-theme>
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
      :host {
        background-color: var(--x-background);
        padding: 1rem;
        border: 0.0625rem solid var(--x-border);
      }
      x-row:not(:first-child) {
        margin-top: 1rem;
      }
    `
  ]
})
class TestXCascadeLabelComponent {
  data = data;
  model: any;
  constructor(private cdr: ChangeDetectorRef) {
    interval(50).subscribe(() => {
      this.cdr.detectChanges();
    });
  }
}

@Component({
  template: `
    <x-theme showDark></x-theme>
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
      :host {
        background-color: var(--x-background);
        padding: 1rem;
        border: 0.0625rem solid var(--x-border);
      }
      x-row:not(:first-child) {
        margin-top: 1rem;
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
    <x-theme showDark></x-theme>
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
      :host {
        background-color: var(--x-background);
        padding: 1rem;
        border: 0.0625rem solid var(--x-border);
      }
      x-row:not(:first-child) {
        margin-top: 1rem;
      }
    `
  ]
})
class TestXCascadeRequiredComponent {
  data = data;
  model1: any;
  model2: any;
  constructor(private cdr: ChangeDetectorRef) {
    interval(50).subscribe(() => {
      this.cdr.detectChanges();
    });
  }
}

@Component({
  template: `
    <x-radio [data]="radioData" [(ngModel)]="size" (ngModelChange)="change($event)"></x-radio>
    <x-row>
      <x-col span="24">
        <x-cascade [data]="data" [size]="size"></x-cascade>
      </x-col>
      <x-col span="24">
        <x-cascade [data]="data" [size]="size" label="用户名" direction="row" maxlength="50"></x-cascade>
      </x-col>
      <x-col span="24">
        <x-cascade [data]="data" [size]="size" label="用户名" direction="column" maxlength="50"></x-cascade>
      </x-col>
      <x-col span="24">
        <x-cascade [data]="data" [size]="size" icon="ado-user" iconLayout="left" maxlength="50"></x-cascade>
      </x-col>
      <x-col span="24">
        <x-cascade [data]="data" required clearable [size]="size"></x-cascade>
      </x-col>
      <x-col span="24">
        <x-cascade [data]="data" disabled [size]="size"></x-cascade>
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
      x-row > x-col > x-cascade {
        width: 15rem;
        display: block;
      }
      x-row > x-col:not(:first-child) {
        margin-top: 1rem;
      }
    `
  ]
})
class TestXCascadeSizeComponent {
  radioData = ['big', 'large', 'medium', 'small', 'mini'];
  size = 'medium';
  data = data;
  constructor(private cdr: ChangeDetectorRef) {}
  change($event: string) {
    console.log($event);
    this.cdr.detectChanges();
  }
}

@Component({
  template: `
    <x-row>
      <x-col span="24">
        <x-cascade [data]="data" placeholder="请选择日期" bordered="false"></x-cascade>
      </x-col>
      <x-col span="24">
        <x-cascade [data]="data" placeholder="请选择日期" bordered="false" label="日生:" direction="row"></x-cascade>
      </x-col>
      <x-col span="24">
        <x-cascade [data]="data" placeholder="请选择日期" bordered="false"></x-cascade>
      </x-col>
      <x-col span="24">
        <x-cascade [data]="data" placeholder="请选择日期" bordered="false" required></x-cascade>
      </x-col>
      <x-col span="24">
        <x-cascade [data]="data" placeholder="没有边框" bordered="false" disabled></x-cascade>
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
      x-row > x-col > x-cascade {
        width: 15rem;
        display: block;
      }
      x-row > x-col:not(:first-child) {
        margin-top: 1rem;
      }
    `
  ]
})
class TestXCascadeBorderedComponent {
  data = data;
  constructor() {}
}

@Component({
  template: `
    <x-row>
      <x-col span="24">
        <x-cascade [data]="data" placeholder="请选择" [nodeTpl]="nodeTpl" [valueTpl]="valueTpl"></x-cascade>
      </x-col>
      <x-col span="24">
        <x-cascade [data]="data" [(ngModel)]="model" placeholder="请选择" [nodeTpl]="nodeTpl" [valueTpl]="valueTpl"></x-cascade>
      </x-col>
    </x-row>
    <ng-template #nodeTpl let-node="$node"> <x-icon type="fto-map-pin"></x-icon> {{ node.label }} </ng-template>
    <ng-template #valueTpl let-nodes="$nodes">
      <ng-container *ngFor="let node of nodes; index as i">
        <x-icon type="fto-chevron-right" *ngIf="i > 0"></x-icon> {{ node.label }}
      </ng-container>
    </ng-template>
  `,
  styles: [
    `
      :host {
        background-color: var(--x-background);
        padding: 1rem;
        border: 0.0625rem solid var(--x-border);
      }
      x-row > x-col > x-cascade {
        width: 15rem;
        display: block;
      }
      x-row > x-col:not(:first-child) {
        margin-top: 1rem;
      }
    `
  ]
})
class TestXCascadeCustomComponent {
  data = data;
  model = 20;
  constructor() {}
}
