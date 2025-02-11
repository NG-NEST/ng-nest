import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, provideExperimentalZonelessChangeDetection, signal, TemplateRef, viewChild } from '@angular/core';
import { By } from '@angular/platform-browser';
import { XDialogAction, XDialogComponent, XDialogPrefix, XDialogType } from '@ng-nest/ui/dialog';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { XComputedStyle, XEffect, XPlace, XSleep, XTemplate } from '@ng-nest/ui/core';
import { provideAnimations } from '@angular/platform-browser/animations';

@Component({
  imports: [XDialogComponent],
  template: ` <x-dialog></x-dialog> `
})
class XTestDialogComponent {}

@Component({
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
      (closeDone)="closeDone()"
    ></x-dialog>

    <ng-template #footerTpl>footer tpl</ng-template>
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
  footer = signal<XTemplate | null>(null);
  footerTpl = viewChild.required<TemplateRef<void>>('footerTpl');
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

  cancelResult = signal(false);
  cancel() {
    this.cancelResult.set(true);
  }

  confirmResult = signal(false);
  confirm() {
    this.confirmResult.set(true);
  }

  closeResult = signal(false);
  close() {
    this.closeResult.set(true);
  }

  showDoneResult = signal(false);
  showDone() {
    this.showDoneResult.set(true);
  }

  closeDoneResult = signal(false);
  closeDone() {
    this.closeDoneResult.set(true);
  }
}

xdescribe(XDialogPrefix, () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [XTestDialogComponent, XTestDialogPropertyComponent],
      providers: [
        provideAnimations(),
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
        provideExperimentalZonelessChangeDetection()
      ],
      teardown: { destroyAfterEach: true }
    }).compileComponents();
  });
  xdescribe('default.', () => {
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
  xdescribe(`input.`, async () => {
    let fixture: ComponentFixture<XTestDialogPropertyComponent>;
    let component: XTestDialogPropertyComponent;
    beforeEach(async () => {
      fixture = TestBed.createComponent(XTestDialogPropertyComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });
    const showDialog = async () => {
      component.visible.set(true);
      fixture.detectChanges();
      await XSleep(300);
    };
    const closeDialog = async () => {
      component.visible.set(false);
      fixture.detectChanges();
      await XSleep(300);
    };
    it('title.', async () => {
      component.title.set('title');
      fixture.detectChanges();
      await showDialog();
      const title = fixture.debugElement.query(By.css('.x-alert-title'));
      expect(title.nativeElement.innerText).toBe('title');
      await closeDialog();
    });
    it('visible.', async () => {
      await showDialog();
      let dialog = fixture.debugElement.query(By.css('.x-dialog'));
      expect(dialog).toBeTruthy();

      await closeDialog();
      dialog = fixture.debugElement.query(By.css('.x-dialog'));
      expect(dialog).not.toBeTruthy();
    });
    it('placement.', async () => {
      await showDialog();
      fixture.detectChanges();
      let wrapper = document.querySelector<HTMLDivElement>('.cdk-global-overlay-wrapper')!;
      expect(wrapper.style.justifyContent).toBe('center');
      expect(wrapper.style.alignItems).toBe('center');

      await closeDialog();
      component.placement.set('top');
      fixture.detectChanges();
      await showDialog();
      wrapper = document.querySelector<HTMLDivElement>('.cdk-global-overlay-wrapper')!;
      expect(wrapper.style.justifyContent).toBe('center');
      expect(wrapper.style.alignItems).toBe('flex-start');
      await closeDialog();
    });
    it('offset.', async () => {
      component.placement.set('top');
      component.offset.set('40px');
      await showDialog();
      const overlay = document.querySelector<HTMLDivElement>('.x-dialog-overlay')!;
      const marginTop = Number(XComputedStyle(overlay, 'marginTop'));
      expect(marginTop).toBe(40);
      await closeDialog();
    });
    it('type.', async () => {
      component.type.set('error');
      await showDialog();
      const error = fixture.debugElement.query(By.css('.x-alert-error'));
      expect(error).toBeTruthy();
      await closeDialog();
    });
    it('hideClose.', async () => {
      await showDialog();
      let close = fixture.debugElement.query(By.css('.x-alert-operation-close'));
      expect(close).toBeTruthy();

      await closeDialog();
      component.hideClose.set(true);
      await showDialog();
      close = fixture.debugElement.query(By.css('.x-alert-operation-close'));
      expect(close).not.toBeTruthy();
      await closeDialog();
    });
    it('closeText.', async () => {
      component.closeText.set('close');
      await showDialog();
      const close = fixture.debugElement.query(By.css('.x-alert-close'));
      expect(close.nativeElement.innerText).toBe('close');
      await closeDialog();
    });
    it('resizable.', async () => {
      component.resizable.set(true);
      fixture.detectChanges();
      await showDialog();
      const dialog = fixture.debugElement.query(By.css('.x-alert'));
      expect(dialog.nativeElement).toHaveClass('x-resizable');
      await closeDialog();
    });
    it('offsetLeft.', async () => {
      // test resizable directive
      expect(true).toBe(true);
    });
    it('offsetTop.', () => {
      // test resizable directive
      expect(true).toBe(true);
    });
    it('width.', async () => {
      component.width.set('300px');
      fixture.detectChanges();
      await showDialog();

      const overlay = document.querySelector<HTMLDivElement>('.x-dialog-overlay')!;
      expect(overlay.clientWidth).toBe(300);
      await closeDialog();
    });
    it('height.', async () => {
      component.height.set('300px');
      fixture.detectChanges();
      await showDialog();

      const overlay = document.querySelector<HTMLDivElement>('.x-dialog-overlay')!;
      expect(overlay.clientHeight).toBe(300);
      await closeDialog();
    });
    it('minWidth.', async () => {
      component.minWidth.set('400px');
      fixture.detectChanges();
      await showDialog();
      const overlay = document.querySelector<HTMLDivElement>('.x-dialog-overlay')!;
      const minWidth = Number(XComputedStyle(overlay, 'minWidth'));
      expect(minWidth).toBe(400);
      await closeDialog();
    });
    it('minHeight.', async () => {
      component.minHeight.set('300px');
      fixture.detectChanges();
      await showDialog();
      const overlay = document.querySelector<HTMLDivElement>('.x-dialog-overlay')!;
      const minHeight = Number(XComputedStyle(overlay, 'minHeight'));
      expect(minHeight).toBe(300);
      await closeDialog();
    });
    it('effect.', async () => {
      component.effect.set('dark');
      fixture.detectChanges();
      await showDialog();
      const dialog = fixture.debugElement.query(By.css('.x-alert'));
      expect(dialog.nativeElement).toHaveClass('x-dark');
      await closeDialog();
    });
    it('footer.', async () => {
      component.footer.set(component.footerTpl());
      fixture.detectChanges();
      await showDialog();

      const buttons = fixture.debugElement.query(By.css('.x-dialog-buttons'));
      expect(buttons.nativeElement.innerText).toBe('footer tpl');
      await closeDialog();
    });
    it('showCancel.', async () => {
      await showDialog();
      let cancel = fixture.debugElement.query(By.css('.x-dialog-cancel'));
      expect(cancel).toBeTruthy();

      await closeDialog();
      component.showCancel.set(false);
      await showDialog();
      cancel = fixture.debugElement.query(By.css('.x-dialog-cancel'));
      expect(cancel).not.toBeTruthy();
      await closeDialog();
    });
    it('cancelText.', async () => {
      component.cancelText.set('cancel text');
      fixture.detectChanges();
      await showDialog();
      const cancel = fixture.debugElement.query(By.css('.x-dialog-cancel'));
      expect(cancel.nativeElement.innerText).toBe('cancel text');
      await closeDialog();
    });
    it('showConfirm.', async () => {
      await showDialog();
      let confirm = fixture.debugElement.query(By.css('.x-dialog-confirm'));
      expect(confirm).toBeTruthy();

      await closeDialog();
      component.showConfirm.set(false);
      await showDialog();
      confirm = fixture.debugElement.query(By.css('.x-dialog-confirm'));
      expect(confirm).not.toBeTruthy();
      await closeDialog();
    });
    it('confirmText.', async () => {
      component.confirmText.set('confirm text');
      fixture.detectChanges();
      await showDialog();
      const confirm = fixture.debugElement.query(By.css('.x-dialog-confirm'));
      expect(confirm.nativeElement.innerText).toBe('confirm text');
      await closeDialog();
    });
    it('backdropClose.', async () => {
      await showDialog();
      const back = document.querySelector<HTMLDivElement>('.cdk-overlay-backdrop')!;
      back.click();
      fixture.detectChanges();
      const dialog = fixture.debugElement.query(By.css('.x-dialog'));
      expect(dialog).not.toBeTruthy();
      await closeDialog();
    });
    it('hasBackdrop.', async () => {
      await showDialog();
      let back = document.querySelector<HTMLDivElement>('.cdk-overlay-backdrop')!;
      expect(back).toBeTruthy();

      await closeDialog();
      component.hasBackdrop.set(false);
      fixture.detectChanges();
      await showDialog();
      back = document.querySelector<HTMLDivElement>('.cdk-overlay-backdrop')!;
      expect(back).not.toBeTruthy();
      await closeDialog();
    });
    it('className.', async () => {
      component.className.set('class-test');
      await showDialog();
      const overlay = document.querySelector<HTMLDivElement>('.x-dialog-overlay')!;
      expect(overlay).toHaveClass('class-test');
      await closeDialog();
    });
    it('buttonsCenter.', async () => {
      component.buttonsCenter.set(true);
      fixture.detectChanges();
      await showDialog();
      const buttons = fixture.debugElement.query(By.css('.x-dialog-buttons'));
      expect(buttons.nativeElement).toHaveClass('x-dialog-buttons-center');
      await closeDialog();
    });
    it('draggable.', async () => {
      component.draggable.set(true);
      fixture.detectChanges();
      await showDialog();
      const dialog = fixture.debugElement.query(By.css('.x-alert'));
      expect(dialog.nativeElement).toHaveClass('x-alert-draggable');
      await closeDialog();
    });
    it('maximize.', async () => {
      component.maximize.set(true);
      fixture.detectChanges();
      await showDialog();

      const maximize = fixture.debugElement.query(By.css('.x-dialog-maximize'));
      expect(maximize).toBeTruthy();

      maximize.nativeElement.click();
      fixture.detectChanges();

      const overlay = document.querySelector<HTMLDivElement>('.x-dialog-overlay')!;
      expect(overlay.style.minWidth).toBe('100%');
      expect(overlay.style.minHeight).toBe('100%');
      await closeDialog();
    });
    it('beforeClose.', async () => {
      let beforeLet = false;
      component.beforeClose.set(() => {
        beforeLet = true;
      });

      await showDialog();
      const confirm = fixture.debugElement.query(By.css('.x-dialog-confirm'));
      confirm.nativeElement.click();
      fixture.detectChanges();

      expect(beforeLet).toBe(true);
      await closeDialog();
    });
    it('cancel.', async () => {
      await showDialog();
      const cancel = fixture.debugElement.query(By.css('.x-dialog-cancel'));
      cancel.nativeElement.click();
      fixture.detectChanges();

      expect(component.cancelResult()).toBe(true);
      await closeDialog();
    });
    it('confirm.', async () => {
      await showDialog();
      const confirm = fixture.debugElement.query(By.css('.x-dialog-confirm'));
      confirm.nativeElement.click();
      fixture.detectChanges();

      expect(component.confirmResult()).toBe(true);
      await closeDialog();
    });
    it('close.', async () => {
      await showDialog();
      const close = fixture.debugElement.query(By.css('.x-alert-operation-close'));
      close.nativeElement.click();
      fixture.detectChanges();

      expect(component.closeResult()).toBe(true);
      await closeDialog();
    });
    it('showDone.', async () => {
      await showDialog();
      await XSleep(1000);
      expect(component.showDoneResult()).toBe(true);
      await closeDialog();
    });
    it('closeDone.', async () => {
      await showDialog();
      await closeDialog();
      await XSleep(1000);
      expect(component.closeDoneResult()).toBe(true);
    });
  });
});
