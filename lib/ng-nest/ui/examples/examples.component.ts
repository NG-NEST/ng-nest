import {
  Component,
  ViewEncapsulation,
  ChangeDetectionStrategy,
  Renderer2,
  ElementRef,
  inject,
  OnInit
} from '@angular/core';
import { XExamplesPrefix } from './examples.property';

@Component({
  selector: `${XExamplesPrefix}`,
  standalone: true,
  templateUrl: './examples.component.html',
  styleUrls: ['./style/index.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class XExamplesComponent implements OnInit {
  renderer = inject(Renderer2);
  elementRef = inject(ElementRef);
  ngOnInit(): void {
    this.renderer.addClass(this.elementRef.nativeElement, XExamplesPrefix);
  }
}
