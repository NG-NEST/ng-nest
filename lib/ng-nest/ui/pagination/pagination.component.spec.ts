import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, provideExperimentalZonelessChangeDetection, signal, TemplateRef, viewChild } from '@angular/core';
import { By } from '@angular/platform-browser';
import {
  XPaginationComponent,
  XPaginationInputIndexSizeSureType,
  XPaginationPrefix,
  XPaginationSizeData
} from '@ng-nest/ui/pagination';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { XDataArray, XQuery, XTemplate } from '@ng-nest/ui/core';
import { XSelectNode } from '@ng-nest/ui/select';

@Component({
  standalone: true,
  imports: [XPaginationComponent],
  template: ` <x-pagination> </x-pagination> `
})
class XTestPaginationComponent {}

@Component({
  standalone: true,
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
  totalTemplate = viewChild<TemplateRef<any>>('totalTemplate');
  simple = signal(false);
  simpleIndexWidth = signal('8.125rem');
  inputIndexSizeSureType = signal<XPaginationInputIndexSizeSureType>('enter');
}

describe(XPaginationPrefix, () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [XTestPaginationComponent, XTestPaginationPropertyComponent],
      providers: [
        provideAnimations(),
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
        provideExperimentalZonelessChangeDetection()
      ]
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
    // let component: XTestPaginationPropertyComponent;
    beforeEach(async () => {
      fixture = TestBed.createComponent(XTestPaginationPropertyComponent);
      // component = fixture.componentInstance;
      fixture.detectChanges();
    });
    it('index.', () => {
      expect(true).toBe(true);
    });
    it('size.', () => {
      expect(true).toBe(true);
    });
    it('total.', () => {
      expect(true).toBe(true);
    });
    it('query.', () => {
      expect(true).toBe(true);
    });
    it('pageLinkSize.', () => {
      expect(true).toBe(true);
    });
    it('showEllipsis.', () => {
      expect(true).toBe(true);
    });
    it('showTotal.', () => {
      expect(true).toBe(true);
    });
    it('space.', () => {
      expect(true).toBe(true);
    });
    it('showBackground.', () => {
      expect(true).toBe(true);
    });
    it('showSize.', () => {
      expect(true).toBe(true);
    });
    it('sizeWidth.', () => {
      expect(true).toBe(true);
    });
    it('showInputSize.', () => {
      expect(true).toBe(true);
    });
    it('inputSizeTooltipText.', () => {
      expect(true).toBe(true);
    });
    it('inputSizeWidth.', () => {
      expect(true).toBe(true);
    });
    it('sizeData.', () => {
      expect(true).toBe(true);
    });
    it('disabled.', () => {
      expect(true).toBe(true);
    });
    it('showJump.', () => {
      expect(true).toBe(true);
    });
    it('jumpTooltipText.', () => {
      expect(true).toBe(true);
    });
    it('jumpWidth.', () => {
      expect(true).toBe(true);
    });
    it('totalTpl.', () => {
      expect(true).toBe(true);
    });
    it('simple.', () => {
      expect(true).toBe(true);
    });
    it('simpleIndexWidth.', () => {
      expect(true).toBe(true);
    });
    it('inputIndexSizeSureType.', () => {
      expect(true).toBe(true);
    });
  });
});
