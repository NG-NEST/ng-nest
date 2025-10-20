import {
  Component,
  ViewEncapsulation,
  Renderer2,
  ElementRef,
  ChangeDetectorRef,
  ChangeDetectionStrategy,
  OnInit,
  HostListener,
  HostBinding
} from '@angular/core';
import { XIsFunction } from '@ng-nest/ui/core';
import { XMessageBoxPrefix, XMessageBoxRef, XMessageBoxAction } from './message-box.property';
import { UntypedFormGroup, UntypedFormControl, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { XFormInputValidator } from '@ng-nest/ui/base-form';
import { XAlertComponent } from '@ng-nest/ui/alert';
import { XButtonComponent, XButtonsComponent } from '@ng-nest/ui/button';
import { XInputComponent } from '@ng-nest/ui/input';
import { XOutletDirective } from '@ng-nest/ui/outlet';
import { NgTemplateOutlet } from '@angular/common';
import { XTextareaComponent } from '@ng-nest/ui/textarea';

@Component({
  selector: `${XMessageBoxPrefix}`,
  imports: [
    NgTemplateOutlet,
    FormsModule,
    ReactiveFormsModule,
    XInputComponent,
    XTextareaComponent,
    XButtonComponent,
    XButtonsComponent,
    XAlertComponent,
    XOutletDirective
  ],
  templateUrl: './message-box.component.html',
  styleUrls: ['./message-box.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class XMessageBoxComponent implements OnInit {
  messageBox!: XMessageBoxRef;
  action: XMessageBoxAction = 'close';
  formGroup: UntypedFormGroup = new UntypedFormGroup({});
  loading = false;

  @HostBinding('animate.enter') get animateEnter() {
    return `x-move-${this.msgInput.placement}-enter`;
  }
  @HostBinding('animate.leave') get animateLeave() {
    return `x-move-${this.msgInput.placement}-leave`;
  }

  @HostListener('animationend', ['$event']) animationend($event: AnimationEvent) {
    this.moveDone($event);
  }

  constructor(
    public renderer: Renderer2,
    public elementRef: ElementRef<HTMLElement>,
    public cdr: ChangeDetectorRef
  ) {}

  get msgInput() {
    return this.messageBox.input!;
  }

  get msgOverlayRef() {
    return this.messageBox.ref!;
  }

  get getLabel() {
    return this.msgInput.content as string;
  }

  get getPattern() {
    return this.msgInput.inputPattern as RegExp;
  }

  ngOnInit() {
    (this.msgInput.showInput || this.msgInput.showTextarea) && this.createFormGroup();
  }

  onClose() {
    this.action = 'close';
    this.hideBox();
  }

  onCancel() {
    this.action = 'cancel';
    this.hideBox();
  }

  hideBox() {
    if (XIsFunction(this.msgInput.beforeClose)) {
      this.msgInput.beforeClose!(this.action, this.getInputValue());
    } else {
      this.close();
    }
  }

  close() {
    this.msgOverlayRef?.overlayRef?.detach();
  }

  onConfirm() {
    const hide = () => {
      if (!this.msgInput.showInput || (this.msgInput.showInput && this.formGroup.valid)) {
        this.action = 'confirm';
        this.hideBox();
      } else if (!this.msgInput.showTextarea || (this.msgInput.showTextarea && this.formGroup.valid)) {
        this.action = 'confirm';
        this.hideBox();
      }
    };
    if (this.msgInput.confirmLoading && XIsFunction(this.msgInput.confirmLoading)) {
      this.loading = true;
      this.msgInput.confirmLoading().subscribe((x) => {
        this.loading = false;
        this.cdr.markForCheck();
        if (!x) return;
        this.action = 'confirm';
        hide();
      });
    } else {
      hide();
    }
  }

  moveDone($event: AnimationEvent) {
    if ($event.animationName.endsWith('-leave')) {
      XIsFunction(this.msgInput.callback) && this.msgInput.callback!(this.action, this.getInputValue());
      this.msgOverlayRef.overlayRef?.dispose();
    }
  }

  getInputValue() {
    return this.formGroup.controls['inputValue']?.value;
  }

  createFormGroup() {
    this.formGroup.addControl(
      'inputValue',
      new UntypedFormControl(this.msgInput.inputValue, [
        Validators.required,
        Validators.pattern(this.msgInput.inputPattern as RegExp),
        XFormInputValidator(this.msgInput.inputValidator!)
      ])
    );
  }
}
