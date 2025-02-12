import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, DebugElement, signal, provideExperimentalZonelessChangeDetection } from '@angular/core';
import { XButtonComponent, XButtonsComponent } from '@ng-nest/ui/button';
import { XButtonPrefix, XButtonType } from './button.property';
import { By } from '@angular/platform-browser';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { XComputedStyle, XDirection, XSize, XSleep } from '@ng-nest/ui/core';
import { provideAnimations } from '@angular/platform-browser/animations';

@Component({
  selector: 'x-test-button',
  imports: [XButtonComponent],
  template: ` <x-button>Button</x-button>`
})
class XTestButtonComponent {}

@Component({
  selector: 'x-test-button-property',
  imports: [XButtonComponent],
  template: `
    <x-button
      [type]="type()"
      [icon]="icon()"
      [title]="title()"
      [direction]="direction()"
      [tabindex]="tabindex()"
      [size]="size()"
      [onlyIcon]="onlyIcon()"
      [activated]="activated()"
      [disabled]="disabled()"
    >
      {{ content() }}
    </x-button>
  `
})
class XTestButtonPropertyComponent {
  content = signal('Button');
  type = signal<XButtonType>('primary');
  icon = signal('fto-x');
  title = signal('title');
  direction = signal<XDirection>('row-reverse');
  tabindex = signal(1);
  size = signal<XSize>('small');
  onlyIcon = signal(false);
  activated = signal(false);
  disabled = signal(false);
}

@Component({
  selector: 'x-test-buttons-property',
  imports: [XButtonComponent, XButtonsComponent],
  template: `
    <x-buttons [space]="space()" [hiddenBorder]="hiddenBorder()" [boxShadow]="boxShadow()" [round]="round()">
      <x-button> 1 </x-button>
      <x-button> 2 </x-button>
      <x-button> 3 </x-button>
      <x-button> 4 </x-button>
    </x-buttons>
  `
})
class XTestButtonsPropertyComponent {
  space = signal('');
  hiddenBorder = signal(false);
  boxShadow = signal(true);
  round = signal(false);
}

xdescribe(XButtonPrefix, () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [XTestButtonComponent, XTestButtonPropertyComponent, XTestButtonsPropertyComponent],
      providers: [provideAnimations(), provideHttpClient(withFetch()), provideExperimentalZonelessChangeDetection()],
      teardown: { destroyAfterEach: false }
    }).compileComponents();
  });
  xdescribe('default.', () => {
    let fixture: ComponentFixture<XTestButtonComponent>;
    let button: DebugElement;
    let debugButton: HTMLButtonElement;
    beforeEach(() => {
      fixture = TestBed.createComponent(XTestButtonComponent);
      button = fixture.debugElement.query(By.directive(XButtonComponent));
      debugButton = button.nativeElement.firstChild;
      fixture.detectChanges();
    });
    it('define.', () => {
      expect(button).toBeDefined();
    });
    it('property.', () => {
      expect(debugButton).toHaveClass(`${XButtonPrefix}`);
      expect(debugButton).toHaveClass(`${XButtonPrefix}-initial`);
      expect(debugButton).not.toHaveClass(`${XButtonPrefix}-icon`);
      expect(debugButton.getAttribute('title')).toBe('');
      expect(debugButton).toHaveClass(`x-direction-row`);
      expect(debugButton.getAttribute('tabindex')).toBe('0');
      expect(debugButton).toHaveClass(`x-size-medium`);
      expect(debugButton).not.toHaveClass(`${XButtonPrefix}-only-icon`);
      expect(debugButton).not.toHaveClass(`${XButtonPrefix}-activated`);
      expect(debugButton).not.toHaveClass(`${XButtonPrefix}-disabled`);
      expect(debugButton.hasAttribute('disabled')).toBe(false);
      expect(debugButton).not.toHaveClass(`${XButtonPrefix}-initial-plain`);
      expect(debugButton).not.toHaveClass(`${XButtonPrefix}-initial-text`);
      expect(debugButton).not.toHaveClass(`${XButtonPrefix}-initial-flat`);
      expect(debugButton).not.toHaveClass(`${XButtonPrefix}-round`);
      expect(debugButton).not.toHaveClass(`${XButtonPrefix}-circle`);
      expect(debugButton).not.toHaveClass(`${XButtonPrefix}-closable`);
      expect(debugButton.getAttribute('type')).toBe('button');
    });
  });
  xdescribe(`input button.`, async () => {
    let fixture: ComponentFixture<XTestButtonPropertyComponent>;
    let component: XTestButtonPropertyComponent;
    let debugButton: HTMLButtonElement;
    beforeEach(async () => {
      fixture = TestBed.createComponent(XTestButtonPropertyComponent);
      component = fixture.componentInstance;
      debugButton = fixture.debugElement.query(By.css('button')).nativeElement;
      fixture.detectChanges();
    });
    it('type.', () => {
      expect(debugButton).toHaveClass(`${XButtonPrefix}-primary`);

      component.type.set('danger');
      fixture.detectChanges();
      expect(debugButton).toHaveClass(`${XButtonPrefix}-danger`);
    });
    it('icon.', () => {
      expect(debugButton).toHaveClass(`${XButtonPrefix}-icon`);

      component.content.set('');
      fixture.detectChanges();
      expect(debugButton).toHaveClass(`${XButtonPrefix}-icon-not-content`);

      const icon = fixture.debugElement.query(By.css('.x-icon'));
      expect(icon).toBeDefined();
      expect(icon.nativeElement).toHaveClass('fto-x');

      component.icon.set('fto-user');
      fixture.detectChanges();
      expect(icon.nativeElement).toHaveClass('fto-user');
    });
    it('title.', () => {
      expect(debugButton.getAttribute('title')).toBe('title');

      component.title.set('change title');
      fixture.detectChanges();
      expect(debugButton.getAttribute('title')).toBe('change title');
    });
    it('direction.', () => {
      expect(debugButton).toHaveClass(`x-direction-row-reverse`);

      component.direction.set('row');
      fixture.detectChanges();
      expect(debugButton).toHaveClass(`x-direction-row`);
    });
    it('tabindex.', () => {
      expect(debugButton.getAttribute('tabindex')).toBe('1');

      component.tabindex.set(10);
      fixture.detectChanges();
      expect(debugButton.getAttribute('tabindex')).toBe('10');
    });
    it('size.', () => {
      expect(debugButton).toHaveClass(`x-size-small`);

      component.size.set('big');
      fixture.detectChanges();
      expect(debugButton).toHaveClass(`x-size-big`);
    });
    it('onlyIcon.', () => {
      expect(debugButton).not.toHaveClass(`${XButtonPrefix}-only-icon`);

      component.onlyIcon.set(true);
      fixture.detectChanges();
      expect(debugButton).toHaveClass(`${XButtonPrefix}-only-icon`);
    });
    it('activated.', () => {
      expect(debugButton).not.toHaveClass(`${XButtonPrefix}-activated`);

      component.activated.set(true);
      fixture.detectChanges();
      expect(debugButton).toHaveClass(`${XButtonPrefix}-activated`);
    });
    it('disabled.', () => {
      expect(debugButton).not.toHaveClass(`${XButtonPrefix}-disabled`);

      component.disabled.set(true);
      fixture.detectChanges();
      expect(debugButton).toHaveClass(`${XButtonPrefix}-disabled`);
      expect(debugButton.hasAttribute('disabled')).toBe(true);
    });
  });
  xdescribe(`input buttons`, async () => {
    let fixture: ComponentFixture<XTestButtonsPropertyComponent>;
    let component: XTestButtonsPropertyComponent;
    beforeEach(async () => {
      fixture = TestBed.createComponent(XTestButtonsPropertyComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });
    it('space.', async () => {
      component.space.set('10px');
      fixture.detectChanges();
      await XSleep(200);
      const buttons = fixture.debugElement.queryAll(By.css('x-button'));
      for (let button of buttons) {
        const marginLeft = XComputedStyle(button.nativeElement, 'margin-left');
        const marginRight = XComputedStyle(button.nativeElement, 'margin-right');
        expect(marginLeft).toBe('10');
        expect(marginRight).toBe('10');
      }
    });
    it('hiddenBorder.', () => {
      component.hiddenBorder.set(true);
      fixture.detectChanges();
      const buttons = fixture.debugElement.query(By.css('x-buttons'));
      expect(buttons.nativeElement).toHaveClass('x-buttons-hiddenBorder');
    });
    it('boxShadow.', () => {
      component.boxShadow.set(false);
      fixture.detectChanges();
      const buttons = fixture.debugElement.query(By.css('x-buttons'));
      expect(buttons.nativeElement).not.toHaveClass('x-buttons-box-shadow');
    });
    it('round.', () => {
      component.boxShadow.set(true);
      fixture.detectChanges();
      const buttons = fixture.debugElement.query(By.css('x-buttons'));
      expect(buttons.nativeElement).toHaveClass('x-buttons-round');
    });
  });
});
