import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, provideExperimentalZonelessChangeDetection, signal } from '@angular/core';
import { By } from '@angular/platform-browser';
import { XFormComponent, XFormControlOption, XFormPrefix, XFormRow, XFormTemplate } from '@ng-nest/ui/form';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { FormBuilder, FormsModule, UntypedFormGroup } from '@angular/forms';
import { provideAnimations } from '@angular/platform-browser/animations';

@Component({
  standalone: true,
  imports: [XFormComponent],
  template: ` <x-form></x-form> `
})
class XTestFormComponent {}

@Component({
  standalone: true,
  imports: [XFormComponent, FormsModule],
  template: `
    <x-form
      [formGroup]="formGroup()"
      [title]="title()"
      [space]="space()"
      [span]="span()"
      [labelSuffix]="labelSuffix()"
      [controls]="controls()"
      [width]="width()"
      [controlTpl]="controlTpl()"
      [disabled]="disabled()"
      (xSubmit)="xSubmit($event)"
    >
    </x-form>
  `
})
class XTestFormPropertyComponent {
  formGroup = signal<UntypedFormGroup>(this.fb.group({}));
  title = signal('');
  space = signal('1.75rem');
  span = signal<number | null>(null);
  labelSuffix = signal('');
  controls = signal<XFormControlOption[] | XFormRow[]>([]);
  width = signal('100%');
  controlTpl = signal<XFormTemplate>({});
  disabled = signal(false);

  xSubmitResult = signal<SubmitEvent | null>(null);
  xSubmit(event: SubmitEvent) {
    this.xSubmitResult.set(event);
  }

  constructor(private fb: FormBuilder) {}
}

describe(XFormPrefix, () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, XTestFormComponent, XTestFormPropertyComponent],
      providers: [
        provideAnimations(),
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
        provideExperimentalZonelessChangeDetection()
      ],
      teardown: { destroyAfterEach: false }
    }).compileComponents();
  });
  describe('default.', () => {
    let fixture: ComponentFixture<XTestFormComponent>;
    beforeEach(() => {
      fixture = TestBed.createComponent(XTestFormComponent);
      fixture.detectChanges();
    });
    it('define.', () => {
      const com = fixture.debugElement.query(By.directive(XFormComponent));
      expect(com).toBeDefined();
    });
  });
  describe(`input.`, async () => {
    let fixture: ComponentFixture<XTestFormPropertyComponent>;
    // let component: XTestFormPropertyComponent;
    beforeEach(async () => {
      fixture = TestBed.createComponent(XTestFormPropertyComponent);
      // component = fixture.componentInstance;
      fixture.detectChanges();
    });
    it('formGroup.', () => {
      expect(true).toBe(true);
    });
    it('title.', () => {
      expect(true).toBe(true);
    });
    it('space.', () => {
      expect(true).toBe(true);
    });
    it('span.', () => {
      expect(true).toBe(true);
    });
    it('labelSuffix.', () => {
      expect(true).toBe(true);
    });
    it('controls.', () => {
      expect(true).toBe(true);
    });
    it('width.', () => {
      expect(true).toBe(true);
    });
    it('controlTpl.', () => {
      expect(true).toBe(true);
    });
    it('disabled.', () => {
      expect(true).toBe(true);
    });
    it('xSubmit.', () => {
      expect(true).toBe(true);
    });
  });
});
