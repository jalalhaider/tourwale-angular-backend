import { Component, Input, OnInit, Output } from "@angular/core";
import { FormBuilder, ValidationErrors, Validators } from "@angular/forms";
import { EventEmitter } from "@angular/core";
import { User } from "../models";

@Component({
  selector: "app-user-form",
  templateUrl: "./form.component.html",
})
export class FormComponent implements OnInit {
  @Input() formType: string = "";
  @Input() data: User = {};
  @Input() isLoading: boolean = false;
  @Output() onSubmit = new EventEmitter<User>();

  errors: any[] = [];
  form = this.fb.group({
    name: ["", Validators.required],
    image: [""],
    email: ["", Validators.required],
    password: ["", Validators.required],
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
      let password = this.data.password;

      if (this.form.get("password")?.value != this.data.password)
        password = this.form.get("password")?.value!;

      const dto: User = {
        name: this.form.get("name")?.value || "",
        image: this.form.get("image")?.value || "",
        email: this.form.get("email")?.value || "",
        password: password,
        username: this.form.get("username")?.value || "",
        phone: this.form.get("phone")?.value || "",
        gender: this.form.get("gender")?.value ? "male" : "female",
      };
      this.onSubmit.emit(dto);
    } else {
      this.getFormValidationErrors();
    }
  }
  getFormValidationErrors() {
    Object.keys(this.form.controls).forEach((key) => {
      const controlErrors: ValidationErrors = this.form.get(key)?.errors || [];
      if (controlErrors != null) {
        Object.keys(controlErrors).forEach((keyError) => {
          this.errors.push({
            field: key,
            message: keyError,
          });
          console.log(controlErrors[keyError]);
        });
      }
    });
  }
}
