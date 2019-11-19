import { Component, OnInit } from "@angular/core";

@Component({
  selector: "ex-loading",
  templateUrl: "./loading.component.html",
  styleUrls: ["./loading.component.scss"]
})
export class ExLoadingComponent implements OnInit {
  loading: boolean = false;

  constructor() {}

  ngOnInit() {}

  save() {
    if (this.loading) return;
    this.loading = true;
    setTimeout(() => {
      this.loading = false;
    }, 3000);
  }
}
