import { Component, OnInit } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";

@Component({
  selector: "app-user-form",
  templateUrl: "./form.component.html",
})
export class FormComponent implements OnInit {
  isLoading = false;
  userForm = this.fb.group({
    password: ["", Validators.required, Validators.min(2)],
    firstName: ["", Validators.required],
    lastName: ["", Validators.required],
    phone: ["", Validators.required],
    email: ["", Validators.required, Validators.email],
    username: ["", Validators.required],
    role: ["", Validators.required],
    gender: ["male", Validators.required],
  });

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {}
  onSubmit(): void {
    //emit form values after validating
  }

  changeRole(e: any) {
    this.role?.setValue(e.target.value, {
      onlySelf: true,
    });
  }

  get role() {
    return this.userForm.get("role");
  }
  getRoles() {
    return ["one", "two", "three", "four"];
  }
}
