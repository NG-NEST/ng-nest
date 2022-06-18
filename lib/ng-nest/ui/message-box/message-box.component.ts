import { Component, ViewEncapsulation, Renderer2, ElementRef, ChangeDetectorRef, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { XMoveBoxAnimation } from '@ng-nest/ui/core';
import { XMessageBoxPrefix, XMessageBoxRef, XMessageBoxAction, XMessageBoxOption } from './message-box.property';
import { UntypedFormGroup, UntypedFormControl, Validators } from '@angular/forms';

@Component({
  selector: `${XMessageBoxPrefix}`,
  templateUrl: './message-box.component.html',
  styleUrls: ['./message-box.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [XMoveBoxAnimation]
})
export class XMessageBoxComponent implements OnInit {
  messageBox: XMessageBoxRef = {};
  action: XMessageBoxAction = 'close';
  formGroup: UntypedFormGroup = new UntypedFormGroup({});
  constructor(public renderer: Renderer2, public elementRef: ElementRef, public cdr: ChangeDetectorRef) {}

  get msgInput(): XMessageBoxOption {
    return this.messageBox.input as XMessageBoxOption;
  }

  get getLabel() {
    return this.msgInput.content as string;
  }

  get getPattern() {
    return this.msgInput.inputPattern as RegExp;
  }

  ngOnInit() {
    this.msgInput.showInput && this.createFormGroup();
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
    if (this.msgInput.hide && this.msgInput.hide !== true) {
      this.msgInput.hide = true;
    }
    this.messageBox.ref?.overlayRef?.detach();
    this.cdr.detectChanges();
  }

  onConfirm() {
    if (!this.msgInput.showInput || (this.msgInput.showInput && this.formGroup.valid)) {
      this.action = 'confirm';
      this.hideBox();
    }
  }

  moveDone($event: { toState: string }) {
    if ($event.toState === 'void') {
      this.msgInput.callback && this.msgInput.callback(this.action, this.getInputValue());

      this.messageBox.ref?.overlayRef?.dispose();
    }
  }

  getInputValue() {
    return this.formGroup.controls['inputValue']?.value;
  }

  createFormGroup() {
    this.formGroup.addControl(
      'inputValue',
      new UntypedFormControl(this.msgInput.inputValue, [Validators.required, Validators.pattern(this.msgInput.inputPattern as RegExp)])
    );
  }
}
