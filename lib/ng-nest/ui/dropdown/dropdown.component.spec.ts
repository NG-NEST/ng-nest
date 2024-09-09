import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, provideExperimentalZonelessChangeDetection, signal } from '@angular/core';
import { By } from '@angular/platform-browser';
import { XDropdownComponent, XDropdownNode, XDropdownPrefix, XDropdownTrigger } from '@ng-nest/ui/dropdown';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { XDataArray, XPlacement, XSize } from '@ng-nest/ui/core';

@Component({
  standalone: true,
  imports: [XDropdownComponent],
  template: ` <x-dropdown></x-dropdown> `
})
class XTestDropdownComponent {}

@Component({
  standalone: true,
  imports: [XDropdownComponent],
  template: `
    <x-dropdown
      [data]="data()"
      [trigger]="trigger()"
      [placement]="placement()"
      [disabled]="disabled()"
      [children]="children()"
      [portalMinWidth]="portalMinWidth()"
      [portalMaxWidth]="portalMaxWidth()"
      [portalMinHeight]="portalMinHeight()"
      [portalMaxHeight]="portalMaxHeight()"
      [hoverDelay]="hoverDelay()"
      [(activatedId)]="activatedId"
      [size]="size()"
      (nodeClick)="nodeClick($event)"
    >
    </x-dropdown>
  `
})
class XTestDropdownPropertyComponent {
  data = signal<XDataArray<XDropdownNode>>([]);
  trigger = signal<XDropdownTrigger>('hover');
  placement = signal<XPlacement>('bottom-start');
  disabled = signal(false);
  children = signal(false);
  portalMinWidth = signal('');
  portalMaxWidth = signal('');
  portalMinHeight = signal('');
  portalMaxHeight = signal('');
  hoverDelay = signal(200);
  activatedId = signal<string | number>('');
  size = signal<XSize>('medium');

  nodeClickResult = signal<XDropdownNode | null>(null);
  nodeClick(node: XDropdownNode) {
    this.nodeClickResult.set(node);
  }
}

describe(XDropdownPrefix, () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [XTestDropdownComponent, XTestDropdownPropertyComponent],
      providers: [
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
        provideExperimentalZonelessChangeDetection()
      ]
    }).compileComponents();
  });
  describe('default.', () => {
    let fixture: ComponentFixture<XTestDropdownComponent>;
    beforeEach(() => {
      fixture = TestBed.createComponent(XTestDropdownComponent);
      fixture.detectChanges();
    });
    it('define.', () => {
      const com = fixture.debugElement.query(By.directive(XDropdownComponent));
      expect(com).toBeDefined();
    });
  });
  describe(`input.`, async () => {
    let fixture: ComponentFixture<XTestDropdownPropertyComponent>;
    // let component: XTestDropdownPropertyComponent;
    beforeEach(async () => {
      fixture = TestBed.createComponent(XTestDropdownPropertyComponent);
      // component = fixture.componentInstance;
      fixture.detectChanges();
    });
    it('data.', () => {
      expect(true).toBe(true);
    });
    it('trigger.', () => {
      expect(true).toBe(true);
    });
    it('placement.', () => {
      expect(true).toBe(true);
    });
    it('disabled.', () => {
      expect(true).toBe(true);
    });
    it('children.', () => {
      expect(true).toBe(true);
    });
    it('portalMinWidth.', () => {
      expect(true).toBe(true);
    });
    it('portalMaxWidth.', () => {
      expect(true).toBe(true);
    });
    it('portalMinHeight.', () => {
      expect(true).toBe(true);
    });
    it('portalMaxHeight.', () => {
      expect(true).toBe(true);
    });
    it('hoverDelay.', () => {
      expect(true).toBe(true);
    });
    it('activatedId.', () => {
      expect(true).toBe(true);
    });
    it('size.', () => {
      expect(true).toBe(true);
    });
    it('nodeClick.', () => {
      expect(true).toBe(true);
    });
  });
});
