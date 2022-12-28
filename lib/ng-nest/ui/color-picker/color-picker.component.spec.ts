import { interval } from 'rxjs';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { XColorPickerComponent } from './color-picker.component';
import { Component, DebugElement, ChangeDetectorRef } from '@angular/core';
import { By } from '@angular/platform-browser';
import { XColorPickerModule } from '@ng-nest/ui/color-picker';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { XColorPickerPrefix } from './color-picker.property';
import { XLayoutModule } from '@ng-nest/ui/layout';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { XThemeModule } from '@ng-nest/ui/theme';
import { XRadioModule } from '@ng-nest/ui/radio';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe(XColorPickerPrefix, () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        HttpClientTestingModule,
        XThemeModule,
        XColorPickerModule,
        FormsModule,
        ReactiveFormsModule,
        XLayoutModule,
        XRadioModule
      ],
      declarations: [
        TestXColorPickerComponent,
        TestXColorPickerLabelComponent,
        TestXColorPickerDisabledComponent,
        TestXColorPickerRequiredComponent,
        TestXColorPickerSizeComponent,
        TestXColorPickerBorderedComponent
      ]
    }).compileComponents();
  });
  describe(`default.`, () => {
    let fixture: ComponentFixture<TestXColorPickerComponent>;
    let debugElement: DebugElement;
    beforeEach(() => {
      fixture = TestBed.createComponent(TestXColorPickerComponent);
      fixture.detectChanges();
      debugElement = fixture.debugElement.query(By.directive(XColorPickerComponent));
    });
    it('should create.', () => {
      expect(debugElement).toBeDefined();
    });
  });
  describe(`label.`, () => {
    let fixture: ComponentFixture<TestXColorPickerLabelComponent>;
    let debugElement: DebugElement;
    beforeEach(() => {
      fixture = TestBed.createComponent(TestXColorPickerLabelComponent);
      fixture.detectChanges();
      debugElement = fixture.debugElement.query(By.directive(TestXColorPickerLabelComponent));
    });
    it('should create.', () => {
      expect(debugElement).toBeDefined();
    });
  });
  describe(`disabled.`, () => {
    let fixture: ComponentFixture<TestXColorPickerDisabledComponent>;
    let debugElement: DebugElement;
    beforeEach(() => {
      fixture = TestBed.createComponent(TestXColorPickerDisabledComponent);
      fixture.detectChanges();
      debugElement = fixture.debugElement.query(By.directive(TestXColorPickerDisabledComponent));
    });
    it('should create.', () => {
      expect(debugElement).toBeDefined();
    });
  });
  describe(`required.`, () => {
    let fixture: ComponentFixture<TestXColorPickerRequiredComponent>;
    let debugElement: DebugElement;
    beforeEach(() => {
      fixture = TestBed.createComponent(TestXColorPickerRequiredComponent);
      fixture.detectChanges();
      debugElement = fixture.debugElement.query(By.directive(TestXColorPickerRequiredComponent));
    });
    it('should create.', () => {
      expect(debugElement).toBeDefined();
    });
  });
  describe(`size.`, () => {
    let fixture: ComponentFixture<TestXColorPickerSizeComponent>;
    let debugElement: DebugElement;
    beforeEach(() => {
      fixture = TestBed.createComponent(TestXColorPickerSizeComponent);
      fixture.detectChanges();
      debugElement = fixture.debugElement.query(By.directive(TestXColorPickerComponent));
    });
    it('should create.', () => {
      expect(debugElement).toBeDefined();
    });
  });
  describe(`bordered.`, () => {
    let fixture: ComponentFixture<TestXColorPickerBorderedComponent>;
    let debugElement: DebugElement;
    beforeEach(() => {
      fixture = TestBed.createComponent(TestXColorPickerBorderedComponent);
      fixture.detectChanges();
      debugElement = fixture.debugElement.query(By.directive(TestXColorPickerComponent));
    });
    it('should create.', () => {
      expect(debugElement).toBeDefined();
    });
  });
});

@Component({
  template: `
    <x-theme showDark></x-theme>
    <x-row>
      <x-col span="12">
        <x-color-picker [(ngModel)]="model1"></x-color-picker>
      </x-col>
    </x-row>
    <x-row>
      <x-col span="12">
        <x-color-picker [label]="'HEX:' + model2" [(ngModel)]="model2"></x-color-picker>
      </x-col>
    </x-row>
    <x-row>
      <x-col span="12">
        <x-color-picker [label]="'RGBA:' + model3" [(ngModel)]="model3"></x-color-picker>
      </x-col>
    </x-row>
    <x-row>
      <x-col span="12">
        <x-color-picker [label]="'HSLA:' + model4" [(ngModel)]="model4"></x-color-picker>
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
      x-row x-col {
        width: 15rem;
      }
    `
  ]
})
class TestXColorPickerComponent {
  model1: any;
  model2 = '#409eff';
  model3 = 'rgb(64, 158, 255)';
  model4 = 'hsl(210, 100%, 63%)';
  constructor() {}
}

@Component({
  template: `
    <x-theme showDark></x-theme>
    <x-row>
      <x-col span="12">
        <x-color-picker label="颜色" [(ngModel)]="model"></x-color-picker>
      </x-col>
    </x-row>
    <x-row>
      <x-col span="12">
        <x-color-picker label="颜色" [(ngModel)]="model" direction="column-reverse"></x-color-picker>
      </x-col>
    </x-row>
    <x-row>
      <x-col span="12">
        <x-color-picker label="颜色" [(ngModel)]="model" direction="row"></x-color-picker>
      </x-col>
    </x-row>
    <x-row>
      <x-col span="12">
        <x-color-picker label="颜色" [(ngModel)]="model" direction="row-reverse"></x-color-picker>
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
      x-row x-col {
        width: 15rem;
      }
    `
  ]
})
class TestXColorPickerLabelComponent {
  model: any;
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
        <x-color-picker disabled></x-color-picker>
      </x-col>
    </x-row>
    <x-row>
      <x-col span="12">
        <x-color-picker [(ngModel)]="model" disabled></x-color-picker>
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
      x-row x-col {
        width: 15rem;
      }
    `
  ]
})
class TestXColorPickerDisabledComponent {
  model = '#409eff';
}

@Component({
  template: `
    <x-theme showDark></x-theme>
    <x-row>
      <x-col span="12">
        <x-color-picker [(ngModel)]="model" required></x-color-picker>
      </x-col>
    </x-row>
    <x-row>
      <x-col span="12">
        <x-color-picker [(ngModel)]="model" label="选择" required></x-color-picker>
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
      x-row x-col {
        width: 15rem;
      }
    `
  ]
})
class TestXColorPickerRequiredComponent {
  model: any;
  constructor(private cdr: ChangeDetectorRef) {
    interval(1).subscribe(() => {
      this.cdr.detectChanges();
    });
  }
}

@Component({
  template: `
    <x-radio [data]="radioData" [(ngModel)]="size" (ngModelChange)="change($event)"></x-radio>
    <x-row>
      <x-col span="24">
        <x-color-picker [size]="size"></x-color-picker>
      </x-col>
      <x-col span="24">
        <x-color-picker [size]="size" label="用户名" direction="row" maxlength="50"></x-color-picker>
      </x-col>
      <x-col span="24">
        <x-color-picker [size]="size" label="用户名" direction="column" maxlength="50"></x-color-picker>
      </x-col>
      <x-col span="24">
        <x-color-picker [size]="size" icon="ado-user" iconLayout="left" maxlength="50"></x-color-picker>
      </x-col>
      <x-col span="24">
        <x-color-picker required clearable [size]="size"></x-color-picker>
      </x-col>
      <x-col span="24">
        <x-color-picker disabled [size]="size"></x-color-picker>
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
      x-row > x-col > x-color-picker {
        width: 15rem;
        display: block;
      }
      x-row > x-col:not(:first-child) {
        margin-top: 1rem;
      }
    `
  ]
})
class TestXColorPickerSizeComponent {
  radioData = ['big', 'large', 'medium', 'small', 'mini'];
  size = 'medium';
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
        <x-color-picker placeholder="请选择日期" bordered="false"></x-color-picker>
      </x-col>
      <x-col span="24">
        <x-color-picker placeholder="请选择日期" bordered="false" label="日生:" direction="row"></x-color-picker>
      </x-col>
      <x-col span="24">
        <x-color-picker placeholder="请选择日期" bordered="false"></x-color-picker>
      </x-col>
      <x-col span="24">
        <x-color-picker placeholder="请选择日期" bordered="false" required></x-color-picker>
      </x-col>
      <x-col span="24">
        <x-color-picker placeholder="没有边框" bordered="false" disabled></x-color-picker>
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
      x-row > x-col > x-color-picker {
        width: 15rem;
        display: block;
      }
      x-row > x-col:not(:first-child) {
        margin-top: 1rem;
      }
    `
  ]
})
class TestXColorPickerBorderedComponent {
  constructor() {}
}
