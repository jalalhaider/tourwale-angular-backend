import { Component, OnInit } from "@angular/core";
import { SettingService } from "../setting.service";

@Component({
  selector: "app-setting",
  templateUrl: "./update.component.html",
  styles: [],
})
export class UpdateComponent implements OnInit {
  constructor(private settingSerivce: SettingService) {}
  ngOnInit(): void {
    this.settingSerivce.get().subscribe((res) => {
      console.log("update component - res", res);
    });
  }
}
