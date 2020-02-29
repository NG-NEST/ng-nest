import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "ns-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
  encapsulation: ViewEncapsulation.None
})
export class HomeComponent implements OnInit {
  constructor(public router: Router) {}

  ngOnInit() {}
}
