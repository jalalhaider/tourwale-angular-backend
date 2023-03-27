import { Component, Input, OnInit, Output } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { EventEmitter } from "@angular/core";
import { User } from "../models";

@Component({
  selector: "app-setting-form",
  templateUrl: "./form.component.html",
})
export class FormComponent implements OnInit {
  @Input() formType: string = "";
  @Input() data: User = {};
  @Input() isLoading: boolean = false;
  @Output() onSubmit = new EventEmitter<User>();

  form = this.fb.group({
    name: ["", Validators.required],
    image: [""],
    email: ["", Validators.required],
    passowrd: ["", Validators.required],
    username: ["", Validators.required],
    phone: ["", Validators.required],
    gender: [""],
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
      const dto: User = {
        name: this.form.get("name")?.value || "",
        image: this.form.get("image")?.value || "",
        email: this.form.get("email")?.value || "",
        password: this.form.get("password")?.value || "",
        username: this.form.get("username")?.value || "",
        phone: this.form.get("phone")?.value || "",
        gender: this.form.get("gender")?.value || "",
      };
      this.onSubmit.emit(dto);
    }
  }
}
