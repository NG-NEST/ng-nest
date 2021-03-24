import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { XAutoCompleteComponent } from './auto-complete.component';
import { Component, DebugElement, ChangeDetectorRef } from '@angular/core';
import { By } from '@angular/platform-browser';
import { XAutoCompleteModule } from '@ng-nest/ui/auto-complete';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { XAutoCompletePrefix, XAutoCompleteNode } from './auto-complete.property';
import { XLayoutModule } from '@ng-nest/ui/layout';
import { Observable, interval } from 'rxjs';
import { XData } from '@ng-nest/ui/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { XThemeModule } from '@ng-nest/ui/theme';

describe(XAutoCompletePrefix, () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [BrowserAnimationsModule, XThemeModule, XAutoCompleteModule, FormsModule, ReactiveFormsModule, XLayoutModule],
      declarations: [
        TestXAutoCompleteComponent,
        TestXAutoCompleteAsyncComponent,
        TestXAutoCompleteLabelComponent,
        TestXAutoCompleteDisabledComponent,
        TestXAutoCompleteRequiredComponent
      ]
    }).compileComponents();
  }));
  describe(`default.`, () => {
    let fixture: ComponentFixture<TestXAutoCompleteComponent>;
    let debugElement: DebugElement;
    beforeEach(() => {
      fixture = TestBed.createComponent(TestXAutoCompleteComponent);
      fixture.detectChanges();
      debugElement = fixture.debugElement.query(By.directive(XAutoCompleteComponent));
    });
    it('should create.', () => {
      expect(debugElement).toBeDefined();
    });
  });
  fdescribe(`async.`, () => {
    let fixture: ComponentFixture<TestXAutoCompleteAsyncComponent>;
    let debugElement: DebugElement;
    beforeEach(() => {
      fixture = TestBed.createComponent(TestXAutoCompleteAsyncComponent);
      fixture.detectChanges();
      debugElement = fixture.debugElement.query(By.directive(XAutoCompleteComponent));
    });
    it('should create.', () => {
      expect(debugElement).toBeDefined();
    });
  });
  describe(`label.`, () => {
    let fixture: ComponentFixture<TestXAutoCompleteLabelComponent>;
    let debugElement: DebugElement;
    beforeEach(() => {
      fixture = TestBed.createComponent(TestXAutoCompleteLabelComponent);
      fixture.detectChanges();
      debugElement = fixture.debugElement.query(By.directive(XAutoCompleteComponent));
    });
    it('should create.', () => {
      expect(debugElement).toBeDefined();
    });
  });
  describe(`disabled.`, () => {
    let fixture: ComponentFixture<TestXAutoCompleteDisabledComponent>;
    let debugElement: DebugElement;
    beforeEach(() => {
      fixture = TestBed.createComponent(TestXAutoCompleteDisabledComponent);
      fixture.detectChanges();
      debugElement = fixture.debugElement.query(By.directive(XAutoCompleteComponent));
    });
    it('should create.', () => {
      expect(debugElement).toBeDefined();
    });
  });
  describe(`required.`, () => {
    let fixture: ComponentFixture<TestXAutoCompleteRequiredComponent>;
    let debugElement: DebugElement;
    beforeEach(() => {
      fixture = TestBed.createComponent(TestXAutoCompleteRequiredComponent);
      fixture.detectChanges();
      debugElement = fixture.debugElement.query(By.directive(XAutoCompleteComponent));
    });
    it('should create.', () => {
      expect(debugElement).toBeDefined();
    });
  });
});

const data: XData<XAutoCompleteNode> = ['AAAA', 'AAA', 'BBBB', 'CCCC', 'DDDD', 'EEEE', 'FFFF', 'GGGG', 'HHHH', 'IIII', 'JJJJ'];

@Component({
  template: `
    <x-theme showDark></x-theme>
    <x-row>
      <x-col span="8">
        <x-auto-complete [data]="data1" [(ngModel)]="model1"></x-auto-complete>
      </x-col>
    </x-row>
    <x-row>
      <x-col span="8">
        <x-auto-complete [data]="data2" [(ngModel)]="model2"></x-auto-complete>
      </x-col>
    </x-row>
  `,
  styles: [
    `
      :host {
        padding: 1rem;
        border: 0.0625rem solid var(--x-border);
      }
      x-row:not(:first-child) {
        margin-top: 1rem;
      }
    `
  ]
})
class TestXAutoCompleteComponent {
  data1 = data;
  data2 = JSON.parse(JSON.stringify(data));
  model1: any;
  model2: any = 'BBBB';
  constructor(public cdr: ChangeDetectorRef) {
    interval(0).subscribe(() => this.cdr.detectChanges());
  }
}

@Component({
  template: `
    <x-theme showDark></x-theme>
    <x-row>
      <x-col>
        <x-auto-complete label="方式" [data]="data" [(ngModel)]="model"></x-auto-complete>
      </x-col>
    </x-row>
    <x-row>
      <x-col>
        <x-auto-complete label="方式" [data]="data" [(ngModel)]="model" direction="column-reverse"></x-auto-complete>
      </x-col>
    </x-row>
    <x-row>
      <x-col>
        <x-auto-complete label="方式" [data]="data" [(ngModel)]="model" direction="row"></x-auto-complete>
      </x-col>
    </x-row>
    <x-row>
      <x-col>
        <x-auto-complete label="方式" [data]="data" [(ngModel)]="model" direction="row-reverse"></x-auto-complete>
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
      x-row > x-col {
        width: 10rem;
      }
      x-row:not(:first-child) {
        margin-top: 1rem;
      }
    `
  ]
})
class TestXAutoCompleteLabelComponent {
  data = data;
  model: any;
  constructor(public cdr: ChangeDetectorRef) {}
}

@Component({
  template: `
    <x-theme showDark></x-theme>
    <x-row>
      <x-col>
        <x-auto-complete [data]="data" disabled></x-auto-complete>
      </x-col>
    </x-row>
    <x-row>
      <x-col>
        <x-auto-complete [data]="data" [(ngModel)]="model" disabled></x-auto-complete>
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
      x-row > x-col {
        width: 10rem;
      }
      x-row:not(:first-child) {
        margin-top: 1rem;
      }
    `
  ]
})
class TestXAutoCompleteDisabledComponent {
  data = data;
  model = 'DDDD';
  constructor(public cdr: ChangeDetectorRef) {}
}

@Component({
  template: `
    <x-theme showDark></x-theme>
    <x-row>
      <x-col>
        <x-auto-complete [data]="data" [(ngModel)]="model1" required></x-auto-complete>
      </x-col>
    </x-row>
    <x-row>
      <x-col>
        <x-auto-complete [data]="data" [(ngModel)]="model2" label="选择" required></x-auto-complete>
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
      x-row > x-col {
        width: 10rem;
      }
      x-row:not(:first-child) {
        margin-top: 1rem;
      }
    `
  ]
})
class TestXAutoCompleteRequiredComponent {
  data = data;
  model1: any;
  model2: any;
}

@Component({
  template: `
    <x-theme showDark></x-theme>
    <x-row>
      <x-col>
        <x-auto-complete [data]="data" [(ngModel)]="model" (ngModelChange)="change()" async></x-auto-complete>
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
      x-row > x-col {
        width: 10rem;
      }
      x-row:not(:first-child) {
        margin-top: 1rem;
      }
    `
  ]
})
class TestXAutoCompleteAsyncComponent {
  model = '';
  data = new Observable<string[]>((x) => {
    // 替换成http请求，或者data直接定义成 Observable 对象
    setTimeout(() => {
      this.model = '钉钉';
      x.next(['QQ', '微信', '钉钉', '微博']);
      x.complete();
    }, 2000);
  });
  constructor(private cdr: ChangeDetectorRef) {}
  change() {
    this.cdr.detectChanges();
  }
}
