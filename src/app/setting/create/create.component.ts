import { Component, OnInit } from "@angular/core";
import { FormControl } from "@angular/forms";
import { Router } from "@angular/router";
import { Setting } from "../models";
import { SettingService } from "../setting.service";

@Component({
  selector: "app-setting",
  templateUrl: "./create.component.html",
  styles: [],
})
export class CreateComponent implements OnInit {
  formType = "Create";
  isLoading = false;
  constructor(private settingService: SettingService, private router: Router) {}
  ngOnInit(): void {}

  onSubmit(dto: Setting) {
    this.isLoading = !this.isLoading;
    this.settingService.create(dto).subscribe((setting) => {
      this.isLoading = !this.isLoading;
      this.router.navigateByUrl(`/setting/list`);
    });
  }
}
