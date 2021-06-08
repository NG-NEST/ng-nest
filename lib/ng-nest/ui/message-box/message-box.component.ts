import { Component, ViewEncapsulation, Renderer2, ElementRef, ChangeDetectorRef, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { XMoveBoxAnimation } from '@ng-nest/ui/core';
import { XMessageBoxPrefix, XMessageBoxRef, XMessageBoxAction } from './message-box.property';
import { FormGroup, FormControl, Validators } from '@angular/forms';

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
  formGroup: FormGroup = new FormGroup({});
  constructor(public renderer: Renderer2, public elementRef: ElementRef, public cdr: ChangeDetectorRef) {}

  get getLabel() {
    return this.messageBox.input?.content as string;
  }

  get getPattern() {
    return this.messageBox.input?.inputPattern as RegExp;
  }

  ngOnInit() {
    this.messageBox.input?.showInput && this.createFormGroup();
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
    if (this.messageBox.input?.hide && this.messageBox.input?.hide !== true) this.messageBox.input.hide = true;
    this.messageBox.ref?.overlayRef?.detach();
    this.cdr.detectChanges();
  }

  onConfirm() {
    if (!this.messageBox.input?.showInput || (this.messageBox.input.showInput && this.formGroup.valid)) {
      this.action = 'confirm';
      this.hideBox();
    }
  }

  moveDone($event: { toState: string }) {
    if ($event.toState === 'void') {
      this.messageBox.input?.callback && this.messageBox.input.callback(this.action, this.getInputValue());
      this.messageBox.ref?.overlayRef?.dispose();
    }
  }

  getInputValue() {
    return this.formGroup.controls['inputValue']?.value;
  }

  createFormGroup() {
    this.formGroup.addControl(
      'inputValue',
      new FormControl(this.messageBox.input?.inputValue, [
        Validators.required,
        Validators.pattern(this.messageBox.input?.inputPattern as RegExp)
      ])
    );
  }
}
