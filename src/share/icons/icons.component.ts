import {
  Component,
  OnInit,
  ViewEncapsulation,
  HostBinding,
  ChangeDetectionStrategy} from "@angular/core";

@Component({
  selector: "nm-icons",
  templateUrl: "./icons.component.html",
  styleUrls: ["./icons.component.scss"],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NmIconsComponent implements OnInit {
  @HostBinding("class.nm-icons") className() {
    return true;
  }

  constructor() {}

  ngOnInit() {}
}
