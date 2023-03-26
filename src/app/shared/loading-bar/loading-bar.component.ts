import { Component } from "@angular/core";

@Component({
  selector: "app-loading-bar",
  template: `<div class="loader">
    <div class="loaderBar"></div>
  </div>`,
  styleUrls: ["./loading-bar.component.css"],
})
export class LoadingBarComponent {}
