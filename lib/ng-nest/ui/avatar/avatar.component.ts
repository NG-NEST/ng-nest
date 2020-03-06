import {
  Component,
  OnInit,
  ViewEncapsulation,
  Renderer2,
  ElementRef,
  ChangeDetectorRef,
  ChangeDetectionStrategy,
  Input,
  ViewChild
} from '@angular/core';
import { XAvatarPrefix, XAvatarShape, XAvatarFit } from './avatar.type';
import { XSize, XTemplate, XClassMap } from '@ng-nest/ui/core';

@Component({
  selector: `${XAvatarPrefix}`,
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class XAvatarComponent implements OnInit {
  @Input() label?: XTemplate;
  @Input() size?: XSize;
  @Input() icon?: string;
  @Input() shape?: XAvatarShape = 'circle';
  @Input() src?: string;
  @Input() fit?: XAvatarFit = 'cover';
  @ViewChild('avatar', { static: true }) avatar: ElementRef;
  isImgError: boolean = false;
  classMap: XClassMap = {};

  constructor(public renderer: Renderer2, public elementRef: ElementRef, public cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.setClassMap();
  }

  setClassMap() {
    this.classMap[`${XAvatarPrefix}-${this.shape}`] = this.shape ? true : false;
    this.classMap[`${XAvatarPrefix}-${this.size}`] = this.size ? true : false;
  }

  imgError(event: Event) {
    this.isImgError = true;
    this.cdr.detectChanges();
  }
}
