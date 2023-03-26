import { Component } from "@angular/core";
import { Setting } from "../models";
import { SettingService } from "../setting.service";

@Component({
  selector: "app-setting-list",
  templateUrl: "./list.component.html",
})
export class ListComponent {
  list: Setting[] = [];
  constructor(private settingService: SettingService) {}

  ngOnInit() {
    const where = {};
    this.settingService.getList(where).subscribe((result) => {
      this.list = result;
    });
  }
}
