import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { ToastService } from "../../shared/toast.service";
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
    private toastService: ToastService,
    private settingSerivce: SettingService,
    private route: ActivatedRoute,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.setting_id = params["setting_id"];
      this.getSetting();
    });
  }

  getSetting() {
    this.settingSerivce.get(this.setting_id).subscribe((res) => {
      this.data = res;
    });
    this.isLoading = !this.isLoading;
  }

  onSubmit(dto: Setting) {
    this.isLoading = !this.isLoading;
    this.settingSerivce.update(this.setting_id, dto).subscribe((setting) => {
      console.log("Setting Updated on Server", setting);
      this.isLoading = !this.isLoading;

      this.toastService.showSuccessToast("Success", "Setting Updated");
      this.router.navigateByUrl(`/setting/list`);
    });
  }
}
