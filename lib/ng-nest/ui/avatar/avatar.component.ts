import { Component, OnInit, ViewEncapsulation, Renderer2, ElementRef, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { XAvatarPrefix, XAvatarProperty } from './avatar.property';
import { XIsEmpty } from '@ng-nest/ui/core';

@Component({
  selector: `${XAvatarPrefix}`,
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class XAvatarComponent extends XAvatarProperty implements OnInit {
  isImgError: boolean = false;

  constructor(public renderer: Renderer2, public elementRef: ElementRef, public cdr: ChangeDetectorRef) {
    super();
  }

  ngOnInit() {
    this.setClassMap();
  }

  setClassMap() {
    this.classMap[`${XAvatarPrefix}-${this.shape}`] = !XIsEmpty(this.shape);
    this.classMap[`${XAvatarPrefix}-${this.size}`] = !XIsEmpty(this.size);
  }

  imgError() {
    this.isImgError = true;
    this.cdr.detectChanges();
  }
}
