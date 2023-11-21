import {
  Component,
  ViewEncapsulation,
  ChangeDetectionStrategy,
  Renderer2,
  ElementRef,
  inject,
  OnInit
} from '@angular/core';
import { PatternPrefix } from './pattern.property';

@Component({
  selector: 'x-pattern',
  standalone: true,
  templateUrl: './pattern.component.html',
  styleUrls: ['./style/index.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class XPatternComponent implements OnInit {
  private renderer = inject(Renderer2);
  private elementRef = inject(ElementRef<HTMLElement>);

  ngOnInit(): void {
    this.renderer.addClass(this.elementRef.nativeElement, PatternPrefix);
  }
}
