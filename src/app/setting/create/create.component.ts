import { Component, OnInit } from "@angular/core";
import { FormControl } from "@angular/forms";
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
  constructor(private settingService: SettingService) {}
  ngOnInit(): void {}

  onSubmit(dto: Setting) {
    console.log("setting submit ", dto);
    this.settingService.create(dto).subscribe((setting) => {
      console.log("Setting Added", setting);
    });
  }
}
