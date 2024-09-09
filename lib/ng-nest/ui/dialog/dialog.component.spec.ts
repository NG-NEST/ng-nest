import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, provideExperimentalZonelessChangeDetection, signal } from '@angular/core';
import { By } from '@angular/platform-browser';
import { XDialogAction, XDialogComponent, XDialogPrefix, XDialogType } from '@ng-nest/ui/dialog';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { XEffect, XPlace, XTemplate } from '@ng-nest/ui/core';

@Component({
  standalone: true,
  imports: [XDialogComponent],
  template: ` <x-dialog></x-dialog> `
})
class XTestDialogComponent {}

@Component({
  standalone: true,
  imports: [XDialogComponent],
  template: `
    <x-dialog
      [title]="title()"
      [visible]="visible()"
      [placement]="placement()"
      [offset]="offset()"
      [type]="type()"
      [hideClose]="hideClose()"
      [closeText]="closeText()"
      [resizable]="resizable()"
      [offsetLeft]="offsetLeft()"
      [offsetTop]="offsetTop()"
      [width]="width()"
      [height]="height()"
      [minWidth]="minWidth()"
      [minHeight]="minHeight()"
      [effect]="effect()"
      [footer]="footer()"
      [showCancel]="showCancel()"
      [cancelText]="cancelText()"
      [showConfirm]="showConfirm()"
      [confirmText]="confirmText()"
      [backdropClose]="backdropClose()"
      [hasBackdrop]="hasBackdrop()"
      [className]="className()"
      [buttonsCenter]="buttonsCenter()"
      [draggable]="draggable()"
      [maximize]="maximize()"
      [beforeClose]="beforeClose()"
      (cancel)="cancel()"
      (confirm)="confirm()"
      (close)="close()"
      (showDone)="showDone()"
    ></x-dialog>
  `
})
class XTestDialogPropertyComponent {
  title = signal<XTemplate>('');
  visible = signal(false);
  placement = signal<XPlace>('center');
  offset = signal('1rem');
  type = signal<XDialogType>('info');
  hideClose = signal(false);
  closeText = signal('');
  resizable = signal(false);
  offsetLeft = signal(0);
  offsetTop = signal(0);
  width = signal('32rem');
  height = signal('');
  minWidth = signal('18rem');
  minHeight = signal('8rem');
  effect = signal<XEffect>('white');
  footer = signal<XTemplate>('');
  showCancel = signal(true);
  cancelText = signal('');
  showConfirm = signal(true);
  confirmText = signal('');
  backdropClose = signal(true);
  hasBackdrop = signal(true);
  className = signal('');
  buttonsCenter = signal(false);
  draggable = signal(false);
  maximize = signal(false);
  beforeClose = signal<((action: XDialogAction) => void) | null>(null);
  cancel() {}

  confirm() {}

  close() {}

  showDone() {}

  closeDone() {}
}

describe(XDialogPrefix, () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [XTestDialogComponent, XTestDialogPropertyComponent],
      providers: [
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
        provideExperimentalZonelessChangeDetection()
      ]
    }).compileComponents();
  });
  describe('default.', () => {
    let fixture: ComponentFixture<XTestDialogComponent>;
    beforeEach(() => {
      fixture = TestBed.createComponent(XTestDialogComponent);
      fixture.detectChanges();
    });
    it('define.', () => {
      const com = fixture.debugElement.query(By.directive(XDialogComponent));
      expect(com).toBeDefined();
    });
  });
  describe(`input.`, async () => {
    let fixture: ComponentFixture<XTestDialogPropertyComponent>;
    // let component: XTestDialogPropertyComponent;
    beforeEach(async () => {
      fixture = TestBed.createComponent(XTestDialogPropertyComponent);
      // component = fixture.componentInstance;
      fixture.detectChanges();
    });
    it('title.', () => {
      expect(true).toBe(true);
    });
    it('visible.', () => {
      expect(true).toBe(true);
    });
    it('placement.', () => {
      expect(true).toBe(true);
    });
    it('offset.', () => {
      expect(true).toBe(true);
    });
    it('type.', () => {
      expect(true).toBe(true);
    });
    it('hideClose.', () => {
      expect(true).toBe(true);
    });
    it('closeText.', () => {
      expect(true).toBe(true);
    });
    it('resizable.', () => {
      expect(true).toBe(true);
    });
    it('offsetLeft.', () => {
      expect(true).toBe(true);
    });
    it('offsetTop.', () => {
      expect(true).toBe(true);
    });
    it('width.', () => {
      expect(true).toBe(true);
    });
    it('height.', () => {
      expect(true).toBe(true);
    });
    it('minWidth.', () => {
      expect(true).toBe(true);
    });
    it('minHeight.', () => {
      expect(true).toBe(true);
    });
    it('effect.', () => {
      expect(true).toBe(true);
    });
    it('footer.', () => {
      expect(true).toBe(true);
    });
    it('showCancel.', () => {
      expect(true).toBe(true);
    });
    it('cancelText.', () => {
      expect(true).toBe(true);
    });
    it('showConfirm.', () => {
      expect(true).toBe(true);
    });
    it('confirmText.', () => {
      expect(true).toBe(true);
    });
    it('backdropClose.', () => {
      expect(true).toBe(true);
    });
    it('hasBackdrop.', () => {
      expect(true).toBe(true);
    });
    it('className.', () => {
      expect(true).toBe(true);
    });
    it('buttonsCenter.', () => {
      expect(true).toBe(true);
    });
    it('draggable.', () => {
      expect(true).toBe(true);
    });
    it('maximize.', () => {
      expect(true).toBe(true);
    });
    it('beforeClose.', () => {
      expect(true).toBe(true);
    });
    it('cancel.', () => {
      expect(true).toBe(true);
    });
    it('confirm.', () => {
      expect(true).toBe(true);
    });
    it('close.', () => {
      expect(true).toBe(true);
    });
    it('showDone.', () => {
      expect(true).toBe(true);
    });
    it('closeDone.', () => {
      expect(true).toBe(true);
    });
  });
});
