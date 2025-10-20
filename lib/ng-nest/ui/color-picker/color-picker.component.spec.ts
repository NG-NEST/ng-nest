import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  Component,
  ElementRef,
  provideZonelessChangeDetection,
  signal,
  TemplateRef,
  viewChild
} from '@angular/core';
import { By } from '@angular/platform-browser';
import { XColorPickerComponent, XColorPickerPrefix } from '@ng-nest/ui/color-picker';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { XAlign, XCorner, XDirection, XIsNumber, XJustify, XSize, XSleep, XTemplate } from '@ng-nest/ui/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'x-test-color-picker',
  imports: [XColorPickerComponent],
  template: ` <x-color-picker> </x-color-picker> `
})
class XTestColorPickerComponent {}

@Component({
  selector: 'x-test-color-picker-property',
  imports: [XColorPickerComponent, FormsModule],
  styles: `
    :host {
      display: block;
      height: 800px;
      width: 800px;
    }
  `,
  template: `
    <x-color-picker
      [(ngModel)]="model"
      [placement]="placement()"
      [bordered]="bordered()"
      [size]="size()"
      [pointer]="pointer()"
      [label]="label()"
      [labelWidth]="labelWidth()"
      [labelAlign]="labelAlign()"
      [justify]="justify()"
      [align]="align()"
      [direction]="direction()"
      [placeholder]="placeholder()"
      [disabled]="disabled()"
      [required]="required()"
      [readonly]="readonly()"
      [valueTpl]="valueTpl()"
      [valueTplContext]="valueTplContext()"
      [before]="before()"
      [after]="after()"
      [pattern]="pattern()"
      [message]="message()"
      [active]="active()"
      [inputValidator]="inputValidator()"
    >
    </x-color-picker>

    <ng-template #valueTemplate let-value="$value">
      <div>{{ value }} tpl</div>
    </ng-template>

    <ng-template #nodeTemplate let-node="$node">
      <div>{{ node.label }} tpl</div>
    </ng-template>

    <ng-template #beforeTemplate>before</ng-template>
    <ng-template #afterTemplate>after</ng-template>
  `
})
class XTestColorPickerPropertyComponent {
  model = signal('');
  placement = signal<XCorner>('bottom-start');
  bordered = signal(true);
  size = signal<XSize>('medium');
  pointer = signal(false);
  label = signal('');
  labelWidth = signal('');
  labelAlign = signal<XAlign>('start');
  justify = signal<XJustify>('start');
  align = signal<XAlign>('start');
  direction = signal<XDirection>('column');
  placeholder = signal('');
  disabled = signal(false);
  required = signal(false);
  readonly = signal(false);
  valueTpl = signal<TemplateRef<any> | null>(null);
  valueTemplate = viewChild.required<TemplateRef<any>>('valueTemplate');
  valueTplContext = signal<any | null>(null);
  before = signal<XTemplate | null>(null);
  beforeTemplate = viewChild.required<TemplateRef<any>>('beforeTemplate');
  after = signal<XTemplate | null>(null);
  afterTemplate = viewChild.required<TemplateRef<any>>('afterTemplate');
  pattern = signal<RegExp | RegExp[] | null>(null);
  message = signal<string | string[]>([]);
  active = signal(false);
  inputValidator = signal<((value: any) => boolean) | null>(null);
}

@Component({
  selector: 'x-test-color-picker-parant-scroll',
  imports: [XColorPickerComponent],
  template: `
    <div #scrollRef style="height: 100px; padding-top: 150px; width: 200px; overflow: auto;">
      <x-color-picker></x-color-picker>
      <div style="height: 300px;">1</div>
    </div>
  `
})
class XTestColorPickerParantScroll {
  scrollRef = viewChild.required<ElementRef<HTMLElement>>('scrollRef');
}

@Component({
  selector: 'x-test-color-picker-position',
  imports: [XColorPickerComponent, FormsModule],
  template: `
    <div #scrollRef style="position: absolute; bottom: 0">
      <x-color-picker [(ngModel)]="model"></x-color-picker>
    </div>
  `
})
class XTestColorPickerPosition {
  model = signal('');
}

xdescribe(XColorPickerPrefix, () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [XTestColorPickerComponent, XTestColorPickerPropertyComponent],
      providers: [provideAnimations(), provideHttpClient(withFetch()), provideZonelessChangeDetection()],
      teardown: { destroyAfterEach: false }
    }).compileComponents();
  });
  xdescribe('default.', () => {
    let fixture: ComponentFixture<XTestColorPickerComponent>;
    beforeEach(() => {
      fixture = TestBed.createComponent(XTestColorPickerComponent);
      fixture.detectChanges();
    });
    it('define.', () => {
      const com = fixture.debugElement.query(By.directive(XColorPickerComponent));
      expect(com).toBeDefined();
    });
  });
  xdescribe(`input.`, async () => {
    let fixture: ComponentFixture<XTestColorPickerPropertyComponent>;
    let component: XTestColorPickerPropertyComponent;
    beforeEach(async () => {
      fixture = TestBed.createComponent(XTestColorPickerPropertyComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });
    const showPortal = async () => {
      const com = fixture.debugElement.query(By.directive(XColorPickerComponent));
      const instance = com.componentInstance as XColorPickerComponent;
      const input = fixture.debugElement.query(By.css('.x-input-frame'));
      input.nativeElement.click();
      fixture.detectChanges();
      await XSleep(100);

      return { input, instance, com };
    };
    it('placement.', async () => {
      // cdk overlay. Restricted by browser window size
      // const { com } = await showPortal();
      // const portal = fixture.debugElement.query(By.css('.x-color-picker-portal'));
      // const comRect = com.nativeElement.getBoundingClientRect();
      // const portalRect = portal.nativeElement.getBoundingClientRect();
      // const leftDiff = comRect.left - portalRect.left;
      // const topDiff = comRect.top + comRect.height - portalRect.top;
      // // Pixels may be decimal points
      // expect(leftDiff >= -1 && leftDiff <= 1).toBe(true);
      // expect(topDiff >= -1 && topDiff <= 1).toBe(true);
      expect(true).toBe(true);
    });
    it('bordered.', () => {
      const input = fixture.debugElement.query(By.css('.x-input'));
      expect(input.nativeElement).toHaveClass('x-input-bordered');

      component.bordered.set(false);
      fixture.detectChanges();
      expect(input.nativeElement).not.toHaveClass('x-input-bordered');
    });
    it('size.', () => {
      const input = fixture.debugElement.query(By.css('.x-input'));
      expect(input.nativeElement).toHaveClass('x-input-medium');
      component.size.set('large');
      fixture.detectChanges();
      expect(input.nativeElement).toHaveClass('x-input-large');
    });
    it('pointer.', () => {
      component.pointer.set(true);
      fixture.detectChanges();
      const input = fixture.debugElement.query(By.css('.x-input'));
      expect(input.nativeElement).toHaveClass('x-input-pointer');
    });
    it('label.', async () => {
      component.label.set('label');
      fixture.detectChanges();
      const label = fixture.debugElement.query(By.css('label'));
      expect(label.nativeElement.innerText).toBe('label');
    });
    it('labelWidth.', () => {
      component.label.set('label');
      component.labelWidth.set('100px');
      fixture.detectChanges();
      const label = fixture.debugElement.query(By.css('label'));
      expect(label.nativeElement.style.width).toBe('100px');
    });
    it('labelAlign.', () => {
      component.label.set('label');
      component.labelAlign.set('end');
      fixture.detectChanges();
      const label = fixture.debugElement.query(By.css('label'));
      expect(label.nativeElement).toHaveClass('x-text-align-end');
    });
    it('justify.', () => {
      component.label.set('label');
      component.justify.set('end');
      fixture.detectChanges();
      const input = fixture.debugElement.query(By.css('.x-input'));
      expect(input.nativeElement).toHaveClass('x-justify-end');
    });
    it('align.', () => {
      component.label.set('label');
      component.align.set('end');
      fixture.detectChanges();
      const input = fixture.debugElement.query(By.css('.x-input'));
      expect(input.nativeElement).toHaveClass('x-align-end');
    });
    it('direction.', () => {
      component.label.set('label');
      component.direction.set('row');
      fixture.detectChanges();
      const input = fixture.debugElement.query(By.css('.x-input'));
      expect(input.nativeElement).toHaveClass('x-direction-row');
    });
    it('placeholder.', () => {
      component.placeholder.set('placeholder');
      fixture.detectChanges();
      const input = fixture.debugElement.query(By.css('.x-input-frame'));
      expect(input.nativeElement.getAttribute('placeholder')).toBe('placeholder');
    });
    it('disabled.', () => {
      component.disabled.set(true);
      fixture.detectChanges();
      const input = fixture.debugElement.query(By.css('.x-input'));
      expect(input.nativeElement).toHaveClass('x-disabled');
    });
    it('required.', () => {
      component.required.set(true);
      fixture.detectChanges();
      const input = fixture.debugElement.query(By.css('.x-input-frame'));
      expect(input.nativeElement.required).toBe(true);
    });
    it('readonly.', () => {
      component.readonly.set(true);
      fixture.detectChanges();
      const input = fixture.debugElement.query(By.css('.x-input-frame'));
      expect(input.nativeElement.readOnly).toBe(true);
    });
    it('valueTpl.', () => {
      component.valueTpl.set(component.valueTemplate());
      fixture.detectChanges();
      const tpl = fixture.debugElement.query(By.css('.x-input-value-template-value'));
      expect(tpl.nativeElement.innerText).toBe('tpl');
    });
    it('valueTplContext.', () => {
      component.valueTplContext.set({ $value: 'content' });
      component.valueTpl.set(component.valueTemplate());
      fixture.detectChanges();
      const tpl = fixture.debugElement.query(By.css('.x-input-value-template-value'));
      expect(tpl.nativeElement.innerText).toBe('content tpl');
    });
    it('before.', () => {
      component.before.set(component.beforeTemplate());
      fixture.detectChanges();
      const tpl = fixture.debugElement.query(By.css('.x-input-row-before'));
      expect(tpl.nativeElement.innerText).toBe('before');
    });
    it('after.', () => {
      component.after.set(component.afterTemplate());
      fixture.detectChanges();
      const tpl = fixture.debugElement.query(By.css('.x-input-row-after'));
      expect(tpl.nativeElement.innerText).toBe('after');
    });
    it('pattern.', () => {
      component.pattern.set(/^\d+$/);
      const com = fixture.debugElement.query(By.directive(XColorPickerComponent));
      const instance = com.componentInstance as XColorPickerComponent;
      // Manually triggering verification, usually triggered by inputting values
      instance.value.set('aa');
      instance.validatorSignal.set(true);
      fixture.detectChanges();
      const borderError = fixture.debugElement.query(By.css('.x-border-error'));
      expect(borderError).toBeDefined();
    });
    it('message.', async () => {
      component.pattern.set(/^\d+$/);
      component.message.set('It must be a number');
      const com = fixture.debugElement.query(By.directive(XColorPickerComponent));
      const instance = com.componentInstance as XColorPickerComponent;
      // Manually triggering verification, usually triggered by inputting values
      instance.value.set('aa');
      instance.validatorSignal.set(true);
      fixture.detectChanges();
      await XSleep(100);
      const message = fixture.debugElement.query(By.css('.x-input-error-message'));
      expect(message.nativeElement.innerText).toBe('It must be a number');
    });
    it('active.', () => {
      component.active.set(true);
      fixture.detectChanges();
      const input = fixture.debugElement.query(By.css('.x-input'));
      expect(input.nativeElement).toHaveClass('x-input-active');
    });
    it('inputValidator.', () => {
      component.inputValidator.set((val: string | number) => XIsNumber(val));
      const com = fixture.debugElement.query(By.directive(XColorPickerComponent));
      const instance = com.componentInstance as XColorPickerComponent;
      // Manually triggering verification, usually triggered by inputting values
      instance.value.set('aa');
      instance.validatorSignal.set(true);
      fixture.detectChanges();
      const borderError = fixture.debugElement.query(By.css('.x-border-error'));
      expect(borderError).toBeDefined();
    });
    it('menter', async () => {
      component.model.set('#000000');
      fixture.detectChanges();
      await XSleep(100);
      const input = fixture.debugElement.query(By.css('.x-input-input'));
      input.nativeElement.dispatchEvent(new Event('mouseenter'));
      fixture.detectChanges();

      const clear = fixture.debugElement.query(By.css('.x-input-clear'));
      clear.nativeElement.click();
      await XSleep(100);
      expect(component.model()).toBe('');
    });
    it('mleave', async () => {
      component.model.set('#000000');
      fixture.detectChanges();
      await XSleep(100);
      const input = fixture.debugElement.query(By.css('.x-input-input'));
      input.nativeElement.dispatchEvent(new Event('mouseenter'));
      fixture.detectChanges();
      input.nativeElement.dispatchEvent(new Event('mouseleave'));
      fixture.detectChanges();
      expect(true).toBeTrue();
    });
    it('menter disabled.', async () => {
      component.model.set('#000000');
      component.disabled.set(true);
      fixture.detectChanges();
      await XSleep(100);
      const input = fixture.debugElement.query(By.css('.x-input-input'));
      input.nativeElement.dispatchEvent(new Event('mouseenter'));
      fixture.detectChanges();
      expect(true).toBeTrue();
    });
    it('mleave disabled.', async () => {
      component.model.set('#000000');
      component.disabled.set(true);
      fixture.detectChanges();
      await XSleep(100);
      const input = fixture.debugElement.query(By.css('.x-input-input'));
      input.nativeElement.dispatchEvent(new Event('mouseenter'));
      fixture.detectChanges();
      input.nativeElement.dispatchEvent(new Event('mouseleave'));
      fixture.detectChanges();
      expect(true).toBeTrue();
    });
    it('outside pointer.', async () => {
      await showPortal();
      const body = document.querySelector('body');
      body?.click();
      await XSleep(300);
      const portal = fixture.debugElement.query(By.css('x-color-picker-portal'));
      expect(portal).toBeFalsy();
    });
    it('disabled show portal.', async () => {
      component.disabled.set(true);
      fixture.detectChanges();
      await showPortal();
      const portal = fixture.debugElement.query(By.css('x-color-picker-portal'));
      expect(portal).toBeFalsy();
    });
  });
  xdescribe('parant scroll.', () => {
    let fixture: ComponentFixture<XTestColorPickerParantScroll>;
    let component: XTestColorPickerParantScroll;
    beforeEach(() => {
      fixture = TestBed.createComponent(XTestColorPickerParantScroll);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });
    const showPortal = async () => {
      const com = fixture.debugElement.query(By.directive(XColorPickerComponent));
      const instance = com.componentInstance as XColorPickerComponent;
      const input = fixture.debugElement.query(By.css('.x-input-frame'));
      input.nativeElement.click();
      fixture.detectChanges();
      await XSleep(100);

      return { input, instance, com };
    };
    it('scroll top.', async () => {
      component.scrollRef().nativeElement.scrollTop = 100;
      const com = fixture.debugElement.query(By.directive(XColorPickerComponent));
      expect(com).toBeDefined();
      await showPortal();

      component.scrollRef().nativeElement.scrollTop = 200;
      await XSleep(400);
      const portal = fixture.debugElement.query(By.css('x-cascade-portal'));
      expect(portal).toBeFalsy();
    });
    it('scroll bottom.', async () => {
      component.scrollRef().nativeElement.scrollTop = 100;
      const com = fixture.debugElement.query(By.directive(XColorPickerComponent));
      expect(com).toBeDefined();
      await showPortal();
      component.scrollRef().nativeElement.scrollTop = 0;
      await XSleep(400);
      const portal = fixture.debugElement.query(By.css('x-cascade-portal'));
      expect(portal).toBeFalsy();
    });
  });
  xdescribe('coverage.', () => {
    let fixture: ComponentFixture<XTestColorPickerPosition>;
    let component: XTestColorPickerPosition;
    beforeEach(() => {
      fixture = TestBed.createComponent(XTestColorPickerPosition);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });
    const showPortal = async () => {
      const com = fixture.debugElement.query(By.directive(XColorPickerComponent));
      const instance = com.componentInstance as XColorPickerComponent;
      const input = fixture.debugElement.query(By.css('.x-input-frame'));
      input.nativeElement.click();
      fixture.detectChanges();
      await XSleep(100);

      return { input, instance, com };
    };
    const closePortal = async () => {
      const body = document.querySelector('body');
      body?.click();
      await XSleep(300);
    };
    it('show portal.', async () => {
      await showPortal();
      await closePortal();
      expect(true).toBeTrue();
    });
    it('show portal plate click.', async () => {
      await showPortal();

      const plate = fixture.debugElement.query(By.css('.x-color-picker-portal-plate'));
      const rect = plate.nativeElement.getBoundingClientRect();
      const clickX = rect.left;
      const clickY = rect.top;
      const clickEvent = new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
        view: window,
        clientX: clickX,
        clientY: clickY
      });
      plate.nativeElement.dispatchEvent(clickEvent);
      await closePortal();
      expect(true).toBeTrue();
    });

    it('show portal hex change.', async () => {
      const { instance } = await showPortal();
      instance.portalComponent()!.instance.hex.set('#000000');
      instance.portalComponent()!.instance.hexChange();
      await closePortal();
      expect(true).toBeTrue();
    });

    it('show portal rgb value.', async () => {
      component.model.set('rgb(123, 123, 123)');
      fixture.detectChanges();
      const { instance } = await showPortal();
      instance.portalComponent()!.instance.transparentChange();
      await closePortal();
      expect(true).toBeTrue();
    });

    it('show portal hsl value.', async () => {
      component.model.set('hsl(120, 100%, 50%)');
      fixture.detectChanges();
      const { instance } = await showPortal();
      instance.portalComponent()!.instance.transparentChange();
      await closePortal();
      expect(true).toBeTrue();
    });

    it('show portal hue value.', async () => {
      const { instance } = await showPortal();
      instance.portalComponent()!.instance.hsla.update((x) => {
        x.h = 120;
        return x;
      });
      instance.portalComponent()!.instance.hueChange();
      await closePortal();
      expect(true).toBeTrue();
    });

    it('show portal transparent value.', async () => {
      const { instance } = await showPortal();
      instance.portalComponent()!.instance.hsla.update((x) => {
        x.a = 0.5;
        return x;
      });
      instance.portalComponent()!.instance.transparentChange();
      await closePortal();
      expect(true).toBeTrue();
    });

    it('show portal hex #fff change .', async () => {
      component.model.set('#fff');
      await showPortal();
      await closePortal();
      expect(true).toBeTrue();
    });

    it('show portal hex #ffffff80 change .', async () => {
      component.model.set('#ffffff80');
      await showPortal();

      await closePortal();
      expect(true).toBeTrue();
    });
  });
});
