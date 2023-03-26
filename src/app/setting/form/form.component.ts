import { Component, Input, OnInit, Output } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { EventEmitter } from "@angular/core";
import { Setting } from "../models";

@Component({
  selector: "app-setting-form",
  templateUrl: "./form.component.html",
})
export class FormComponent implements OnInit {
  @Input() formType: string = "";
  @Input() data: Setting = {};
  @Input() isLoading: boolean = false;
  @Output() onSubmit = new EventEmitter<Setting>();

  form = this.fb.group({
    settingId: [""],
    key: ["", Validators.required],
    value: ["", Validators.required],
    isSerialized: [false, Validators.required],
  });

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {}
  ngOnChanges() {
    this.form.patchValue({
      ...this.data,
    });
  }

  handleSubmit(): void {
    //emit form values after validating
    if (this.form.valid) {
      const dto: Setting = {
        key: this.form.get("key")?.value || "",
        value: this.form.get("value")?.value || "",
        isSerialized: this.form.get("isSerialized")?.value || false,
      };
      this.onSubmit.emit(dto);
    }
  }
}
