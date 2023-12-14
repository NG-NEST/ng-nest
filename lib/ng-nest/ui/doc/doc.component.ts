import {
  Component,
  ViewEncapsulation,
  ChangeDetectionStrategy,
  Renderer2,
  ElementRef,
  OnInit,
  inject
} from '@angular/core';
import { XDocPrefix } from './doc.property';

@Component({
  selector: 'x-doc',
  standalone: true,
  templateUrl: './doc.component.html',
  styleUrls: ['./style/index.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class XDocComponent implements OnInit {
  renderer = inject(Renderer2);
  elementRef = inject(ElementRef);

  ngOnInit(): void {
    this.renderer.addClass(this.elementRef.nativeElement, XDocPrefix);
  }
}
