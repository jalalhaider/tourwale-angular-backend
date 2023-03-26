import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Setting } from "../models";
import { SettingService } from "../setting.service";

@Component({
  selector: "app-setting",
  templateUrl: "./update.component.html",
  styles: [],
})
export class UpdateComponent implements OnInit {
  isLoading: boolean = true;
  formType = "Update";
  setting_id = 0;
  data: Setting = {};

  constructor(
    private settingSerivce: SettingService,
    private route: ActivatedRoute
  ) {}
  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.setting_id = params["setting_id"];
      this.getSetting();
    });
  }

  getSetting() {
    setTimeout(() => {
      this.settingSerivce.get(this.setting_id).subscribe((res) => {
        this.data = res;
      });
      this.isLoading = !this.isLoading;
    }, 2000);
  }

  onSubmit(dto: Setting) {
    this.isLoading = !this.isLoading;
    this.settingSerivce.update(this.setting_id, dto).subscribe((setting) => {
      console.log("Setting Updated on Server", setting);
      this.isLoading = !this.isLoading;
    });
  }
}
