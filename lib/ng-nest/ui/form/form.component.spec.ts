import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, provideExperimentalZonelessChangeDetection, signal, TemplateRef, viewChild } from '@angular/core';
import { By } from '@angular/platform-browser';
import { XFormComponent, XFormControlOption, XFormPrefix, XFormRow, XFormTemplate } from '@ng-nest/ui/form';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { FormBuilder, FormsModule, UntypedFormGroup } from '@angular/forms';
import { provideAnimations } from '@angular/platform-browser/animations';
import { XComputedStyle } from '@ng-nest/ui/core';

@Component({
  imports: [XFormComponent],
  template: ` <x-form></x-form> `
})
class XTestFormComponent {}

@Component({
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
      <button class="submit-button" type="submit">submit</button>
    </x-form>

    <ng-template #nameTpl let-option="$option">{{ option.label }} tpl</ng-template>
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
  nameTpl = viewChild.required<TemplateRef<void>>('nameTpl');
  disabled = signal(false);

  xSubmitResult = signal<SubmitEvent | null>(null);
  xSubmit(event: SubmitEvent) {
    this.xSubmitResult.set(event);
  }

  constructor(public fb: FormBuilder) {}
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
    let component: XTestFormPropertyComponent;
    beforeEach(async () => {
      fixture = TestBed.createComponent(XTestFormPropertyComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });
    it('formGroup.', () => {
      component.formGroup.set(component.fb.group({ id: [] }));
      component.controls.set([{ control: 'input', id: 'name', label: 'name' }]);
      fixture.detectChanges();
      const controls = fixture.debugElement.queryAll(By.css('x-control'));
      expect(controls.length).toBe(1);
      const formControls = Object.values(component.formGroup().controls);
      expect(formControls.length).toBe(2);
    });
    it('title.', () => {
      component.title.set('title');
      fixture.detectChanges();
      const title = fixture.debugElement.query(By.css('.x-form-title'));
      expect(title.nativeElement.innerText).toBe('title');
    });
    it('space.', () => {
      component.space.set('30px');
      component.controls.set([
        { control: 'input', id: 'name1', label: 'name1', span: 12 },
        { control: 'input', id: 'name2', label: 'name2', span: 12 }
      ]);
      fixture.detectChanges();
      const cols = fixture.debugElement.queryAll(By.css('x-col'));
      expect(cols.length).toBe(2);

      const widthRight = Number(XComputedStyle(cols[0].nativeElement, 'padding-right'));
      const widthLeft = Number(XComputedStyle(cols[1].nativeElement, 'padding-left'));
      expect(widthRight + widthLeft).toBe(30);
    });
    it('span.', () => {
      component.controls.set([
        { control: 'input', id: 'name1', label: 'name1', span: 12 },
        { control: 'input', id: 'name2', label: 'name2', span: 12 }
      ]);
      fixture.detectChanges();
      const cols = fixture.debugElement.queryAll(By.css('x-col'));
      expect(cols.length).toBe(2);
      const diff = cols[0].nativeElement.clientWidth - cols[1].nativeElement.clientWidth;
      expect(diff >= -1 && diff <= 1).toBe(true);
    });
    it('labelSuffix.', () => {
      component.labelSuffix.set(':');
      component.controls.set([{ control: 'input', id: 'name', label: 'name' }]);
      fixture.detectChanges();
      const labelText = fixture.debugElement.query(By.css('.x-text-align-start'));
      expect(labelText.nativeElement.innerText).toBe('name:');
    });
    it('controls.', () => {
      component.controls.set([
        { control: 'input', id: 'name1', label: 'name1', span: 12 },
        { control: 'input', id: 'name2', label: 'name2', span: 12 }
      ]);
      fixture.detectChanges();
      const controls = fixture.debugElement.queryAll(By.css('x-control'));
      expect(controls.length).toBe(2);
    });
    it('width.', () => {
      component.width.set('300px');
      component.controls.set([{ control: 'input', id: 'name', label: 'name' }]);
      fixture.detectChanges();
      const form = fixture.debugElement.query(By.css('form'));
      expect(form.nativeElement.clientWidth).toBe(300);
    });
    it('controlTpl.', () => {
      component.controls.set([{ control: 'input', id: 'name', label: 'name' }]);
      component.controlTpl.set({ name: component.nameTpl() });
      fixture.detectChanges();
      const col = fixture.debugElement.query(By.css('x-col'));
      expect(col.nativeElement.innerText).toBe('name tpl');
    });
    it('disabled.', () => {
      component.controls.set([{ control: 'input', id: 'name', label: 'name' }]);
      fixture.detectChanges();
      component.disabled.set(true);
      fixture.detectChanges();
      const input = fixture.debugElement.query(By.css('.x-input'));
      expect(input.nativeElement).toHaveClass('x-disabled');
    });
    it('xSubmit.', () => {
      component.controls.set([{ control: 'input', id: 'name', label: 'name', value: 'ng-nest' }]);
      fixture.detectChanges();
      const btn = fixture.debugElement.query(By.css('.submit-button'));
      btn.nativeElement.click();
      fixture.detectChanges();
      expect(component.xSubmitResult()).not.toBeNull();
    });
  });
});
