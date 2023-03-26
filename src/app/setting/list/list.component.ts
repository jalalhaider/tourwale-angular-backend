import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { Setting } from "../models";
import { SettingService } from "../setting.service";

@Component({
  selector: "app-setting-list",
  templateUrl: "./list.component.html",
})
export class ListComponent {
  list: Setting[] = [];
  constructor(private settingService: SettingService, private router: Router) {}

  ngOnInit() {
    const where = {};
    this.settingService.getList(where).subscribe((result) => {
      this.list = result;
    });
  }

  onClick($event: any, row: Setting) {
    this.router.navigateByUrl(`/setting/update?setting_id=${row.settingId}`);
  }
}
