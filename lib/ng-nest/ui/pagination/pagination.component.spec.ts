import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, provideExperimentalZonelessChangeDetection, signal, TemplateRef, viewChild } from '@angular/core';
import { By } from '@angular/platform-browser';
import {
  XPaginationComponent,
  XPaginationInputIndexSizeSureType,
  XPaginationPrefix,
  XPaginationSizeData
} from '@ng-nest/ui/pagination';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { XComputedStyle, XDataArray, XQuery, XSleep, XTemplate } from '@ng-nest/ui/core';
import { XSelectNode } from '@ng-nest/ui/select';

@Component({
  imports: [XPaginationComponent],
  template: ` <x-pagination> </x-pagination> `
})
class XTestPaginationComponent {}

@Component({
  imports: [XPaginationComponent],
  template: `
    <x-pagination
      [(index)]="index"
      [(size)]="size"
      [total]="total()"
      [(query)]="query"
      [pageLinkSize]="pageLinkSize()"
      [showEllipsis]="showEllipsis()"
      [showTotal]="showTotal()"
      [space]="space()"
      [showBackground]="showBackground()"
      [showSize]="showSize()"
      [sizeWidth]="sizeWidth()"
      [showInputSize]="showInputSize()"
      [inputSizeTooltipText]="inputSizeTooltipText()"
      [inputSizeWidth]="inputSizeWidth()"
      [sizeData]="sizeData()"
      [disabled]="disabled()"
      [showJump]="showJump()"
      [jumpTooltipText]="jumpTooltipText()"
      [jumpWidth]="jumpWidth()"
      [totalTpl]="totalTpl()"
      [simple]="simple()"
      [simpleIndexWidth]="simpleIndexWidth()"
      [inputIndexSizeSureType]="inputIndexSizeSureType()"
    >
    </x-pagination>

    <ng-template #totalTemplate let-total="$total">{{ total }}</ng-template>
  `
})
class XTestPaginationPropertyComponent {
  index = signal(1);
  size = signal(10);
  total = signal(0);
  query = signal<XQuery>({});
  pageLinkSize = signal(5);
  showEllipsis = signal(true);
  showTotal = signal(true);
  space = signal('0.25rem');
  showBackground = signal(false);
  showSize = signal(false);
  sizeWidth = signal('6.875rem');
  showInputSize = signal(false);
  inputSizeTooltipText = signal('');
  inputSizeWidth = signal('3.125rem');
  sizeData = signal<XDataArray<XSelectNode>>(XPaginationSizeData);
  disabled = signal(false);
  showJump = signal(false);
  jumpTooltipText = signal('');
  jumpWidth = signal('3.125rem');
  totalTpl = signal<XTemplate>('');
  totalTemplate = viewChild.required<TemplateRef<any>>('totalTemplate');
  simple = signal(false);
  simpleIndexWidth = signal('8.125rem');
  inputIndexSizeSureType = signal<XPaginationInputIndexSizeSureType>('enter');
}

describe(XPaginationPrefix, () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [XTestPaginationComponent, XTestPaginationPropertyComponent],
      providers: [provideAnimations(), provideHttpClient(withFetch()), provideExperimentalZonelessChangeDetection()],
      teardown: { destroyAfterEach: false }
    }).compileComponents();
  });
  describe('default.', () => {
    let fixture: ComponentFixture<XTestPaginationComponent>;
    beforeEach(() => {
      fixture = TestBed.createComponent(XTestPaginationComponent);
      fixture.detectChanges();
    });
    it('define.', () => {
      const com = fixture.debugElement.query(By.directive(XPaginationComponent));
      expect(com).toBeDefined();
    });
  });
  describe(`input.`, async () => {
    let fixture: ComponentFixture<XTestPaginationPropertyComponent>;
    let component: XTestPaginationPropertyComponent;
    beforeEach(async () => {
      fixture = TestBed.createComponent(XTestPaginationPropertyComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });
    it('index.', () => {
      component.index.set(2);
      component.total.set(100);
      fixture.detectChanges();
      const buttons = fixture.debugElement.queryAll(By.css('x-button.x-pagination-link button'));
      expect(buttons[1].nativeElement).toHaveClass('x-button-activated');
      expect(buttons[1].nativeElement.innerText).toBe('2');
    });
    it('size.', () => {
      component.size.set(5);
      component.total.set(20);
      fixture.detectChanges();
      const buttons = fixture.debugElement.queryAll(By.css('x-button.x-pagination-link'));
      expect(buttons.length).toBe(20 / 5);
    });
    it('total.', () => {
      component.total.set(100);
      fixture.detectChanges();
      const total = fixture.debugElement.query(By.css('.x-pagination-total'));
      expect(total.nativeElement.innerText.replace(/[^\d]/g, '')).toBe('100');
    });
    it('query.', () => {
      // This component does not generate any meaning and is used to add query conditions in conjunction with the table component
      component.query.set({ filter: [{ field: 'aa', value: 'bb' }] });
      expect(true).toBe(true);
    });
    it('pageLinkSize.', () => {
      component.pageLinkSize.set(10);
      component.total.set(1000);
      fixture.detectChanges();
      const buttons = fixture.debugElement.queryAll(By.css('x-button.x-pagination-link'));
      expect(buttons.length).toBe(10);
    });
    it('showEllipsis.', () => {
      component.total.set(100);
      component.showEllipsis.set(false);
      fixture.detectChanges();
      const first = fixture.debugElement.query(By.css('x-button.x-pagination-first'));
      const last = fixture.debugElement.query(By.css('x-button.x-pagination-last'));
      expect(first).toBeFalsy();
      expect(last).toBeFalsy();
    });
    it('showTotal.', () => {
      component.total.set(100);
      component.showTotal.set(false);
      fixture.detectChanges();
      const total = fixture.debugElement.query(By.css('.x-pagination-total'));
      expect(total).toBeFalsy();
    });
    it('space.', () => {
      component.total.set(100);
      component.space.set('10px');
      fixture.detectChanges();
      const buttons = fixture.debugElement.queryAll(By.css('x-button.x-pagination-link'));
      for (let button of buttons) {
        const marginLeft = Number(XComputedStyle(button.nativeElement, 'margin-left'));
        const marginRight = Number(XComputedStyle(button.nativeElement, 'margin-right'));
        expect(marginLeft).toBe(10);
        expect(marginRight).toBe(10);
      }
    });
    it('showBackground.', () => {
      component.total.set(100);
      component.showBackground.set(true);
      fixture.detectChanges();
      const group = fixture.debugElement.query(By.css('.x-pagination-group'));
      expect(group.nativeElement).not.toHaveClass('x-buttons-hiddenBorder');
    });
    it('showSize.', () => {
      component.total.set(100);
      component.showSize.set(true);
      fixture.detectChanges();
      const size = fixture.debugElement.query(By.css('.x-pagination-size'));
      expect(size).toBeTruthy();
    });
    it('sizeWidth.', () => {
      component.total.set(100);
      component.showSize.set(true);
      component.sizeWidth.set('100px');
      fixture.detectChanges();
      const size = fixture.debugElement.query(By.css('.x-pagination-size'));
      expect(size.nativeElement.clientWidth).toBe(100);
    });
    it('showInputSize.', () => {
      component.total.set(100);
      component.showInputSize.set(true);
      fixture.detectChanges();
      const size = fixture.debugElement.query(By.css('.x-pagination-input-size'));
      expect(size).toBeTruthy();
    });
    it('inputSizeTooltipText.', async () => {
      component.total.set(100);
      component.showInputSize.set(true);
      component.inputSizeTooltipText.set('Enter sure');
      fixture.detectChanges();
      const input = fixture.debugElement.query(By.css('.x-pagination-input-size x-input'));
      input.nativeElement.dispatchEvent(new Event('mouseenter'));
      fixture.detectChanges();
      await XSleep(500);
      const tooltip = document.querySelector('.x-tooltip-portal') as HTMLElement;
      expect(tooltip.innerText).toBe('Enter sure');
      input.nativeElement.dispatchEvent(new Event('mouseleave'));
      await XSleep(300);
    });
    it('inputSizeWidth.', () => {
      component.total.set(100);
      component.showInputSize.set(true);
      component.inputSizeWidth.set('100px');
      fixture.detectChanges();
      const size = fixture.debugElement.query(By.css('.x-pagination-input-size x-input'));
      expect(size.nativeElement.clientWidth).toBe(100);
    });
    it('sizeData.', async () => {
      component.total.set(100);
      component.showSize.set(true);
      component.sizeData.set([10, 50, 100]);
      fixture.detectChanges();
      const select = fixture.debugElement.query(By.css('.x-pagination-size .x-input-frame'));
      select.nativeElement.click();
      await XSleep(500);
      const selectPortal = document.querySelector('.x-select-portal') as HTMLElement;
      expect(selectPortal.innerText.replace(/[^\d]/g, '')).toBe('1050100');
      const option = document.querySelector('x-list-option:nth-child(2)') as HTMLElement;
      option.click();
      fixture.detectChanges();
      await XSleep(300);
    });
    it('disabled.', () => {
      component.total.set(100);
      component.disabled.set(true);
      fixture.detectChanges();
      const buttons = fixture.debugElement.queryAll(By.css('x-button button'));
      for (let button of buttons) {
        expect(button.nativeElement).toHaveClass('x-button-disabled');
      }
    });
    it('showJump.', () => {
      component.total.set(100);
      component.showJump.set(true);
      fixture.detectChanges();
      const jump = fixture.debugElement.query(By.css('.x-pagination-jump'));
      expect(jump).toBeTruthy();
    });
    it('jumpTooltipText.', async () => {
      component.total.set(100);
      component.showJump.set(true);
      component.jumpTooltipText.set('Enter sure');
      fixture.detectChanges();
      const input = fixture.debugElement.query(By.css('.x-pagination-jump x-input'));
      input.nativeElement.dispatchEvent(new Event('mouseenter'));
      fixture.detectChanges();
      await XSleep(500);
      const tooltip = document.querySelector('.x-tooltip-portal') as HTMLElement;
      expect(tooltip.innerText).toBe('Enter sure');
      input.nativeElement.dispatchEvent(new Event('mouseleave'));
      await XSleep(300);
    });
    it('jumpWidth.', () => {
      component.total.set(100);
      component.showJump.set(true);
      component.jumpWidth.set('100px');
      fixture.detectChanges();
      const jump = fixture.debugElement.query(By.css('.x-pagination-jump x-input'));
      expect(jump.nativeElement.clientWidth).toBe(100);
    });
    it('totalTpl.', () => {
      component.total.set(100);
      component.totalTpl.set(component.totalTemplate());
      fixture.detectChanges();
      const total = fixture.debugElement.query(By.css('.x-pagination-total'));
      expect(total.nativeElement.innerText).toBe('100');
    });
    it('simple.', () => {
      component.total.set(100);
      component.simple.set(true);
      fixture.detectChanges();
      const simple = fixture.debugElement.query(By.css('.x-pagination-simple'));
      expect(simple).toBeTruthy();
    });
    it('simpleIndexWidth.', () => {
      component.total.set(100);
      component.simple.set(true);
      component.simpleIndexWidth.set('200px');
      fixture.detectChanges();
      const simpleInput = fixture.debugElement.query(By.css('.x-pagination-simple x-input'));
      expect(simpleInput.nativeElement.clientWidth).toBe(200);
    });
    it('inputIndexSizeSureType.', async () => {
      component.total.set(100);
      component.showInputSize.set(true);
      fixture.detectChanges();
      const input = fixture.debugElement.query(By.css('.x-pagination-input-size x-input'));
      input.nativeElement.dispatchEvent(new Event('mouseenter'));
      fixture.detectChanges();
      await XSleep(300);
      let tooltip = document.querySelector('.x-tooltip-portal') as HTMLElement;
      expect(tooltip.innerText).toBe('ʹ�� Enter ��ȷ��');
      input.nativeElement.dispatchEvent(new Event('mouseleave'));
      await XSleep(300);

      component.inputIndexSizeSureType.set('blur');
      fixture.detectChanges();
      input.nativeElement.dispatchEvent(new Event('mouseenter'));
      fixture.detectChanges();
      await XSleep(300);
      tooltip = document.querySelector('.x-tooltip-portal') as HTMLElement;
      expect(tooltip.innerText).toBe('ʧȥ����ȷ��');
      input.nativeElement.dispatchEvent(new Event('mouseleave'));
      await XSleep(300);
    });
  });
});
