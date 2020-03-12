import {
  Component,
  ViewEncapsulation,
  Renderer2,
  ElementRef,
  ChangeDetectorRef,
  ChangeDetectionStrategy,
  OnInit
} from '@angular/core';
import { XMoveBoxAnimation } from '@ng-nest/ui/core';
import { XMessageBoxPrefix, XMessageBoxRef, XMessageBoxAction } from './message-box.type';
import { FormGroup, FormControl, Validators, ValidatorFn } from '@angular/forms';

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
  action: XMessageBoxAction = 'cancel';
  formGroup: FormGroup;
  constructor(public renderer: Renderer2, public elementRef: ElementRef, public cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.messageBox.input.showInput && this.createFormGroup();
  }

  onClose() {
    this.messageBox.input.hide = true;
    this.cdr.detectChanges();
    this.messageBox.ref.overlayRef.detach();
  }

  onCancel() {
    this.onClose();
  }

  onConfirm() {
    if (!this.messageBox.input.showInput || (this.messageBox.input.showInput && this.formGroup.valid)) {
      this.action = 'confirm';
      this.onClose();
    }
  }

  moveDone($event) {
    if ($event.toState === 'void') {
      this.messageBox.input.callback && this.messageBox.input.callback(this.action, this.getInputValue());
      this.messageBox.ref.overlayRef.dispose();
    }
  }

  getInputValue() {
    return this.formGroup && this.formGroup.controls.inputValue.value;
  }

  createFormGroup() {
    this.formGroup = new FormGroup({
      inputValue: new FormControl(this.messageBox.input.inputValue, [
        Validators.required,
        Validators.pattern(this.messageBox.input.inputPattern)
      ])
    });
  }
}
