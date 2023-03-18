import { Component, Input, OnInit, Output } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { EventEmitter } from "@angular/core";
import { Agency } from "../models";

@Component({
  selector: "app-agency-form",
  templateUrl: "./form.component.html",
})
export class FormComponent implements OnInit {
  isLoading = false;

  @Input() formType: string = "";
  @Input() data: Agency = {};
  @Output() onSubmit = new EventEmitter<Agency>();

  userForm = this.fb.group({
    id: [""],
    password: ["", Validators.required],
    firstName: ["", Validators.required],
    lastName: ["", Validators.required],
    phone: ["", Validators.required],
    email: ["", Validators.required],
    username: ["", Validators.required],
    role: ["", Validators.required],
    gender: ["male", Validators.required],
    isActive: [false, Validators.required],
  });

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    console.log("ngOnInit", this.data);
  }
  ngOnChanges(changes: Agency) {
    if (changes) {
      //patch value
      console.log("ngOnChanges", changes);
      this.userForm.patchValue({
        firstName: this.data.firstName,
        lastName: this.data.lastName,
        email: this.data.email,
        password: this.data.password,
        phone: this.data.phone,
        username: this.data.username,
        role: this.data.role,
        gender: this.data.gender,
        isActive: this.data.isActive,
      });
    }
  }
  handleSubmit(): void {
    //emit form values after validating
    if (this.userForm.valid) {
      this.onSubmit.emit(this.transform());
    }
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

  transform(): Agency {
    const user = new Agency();
    user.id = this.userForm.get("id")?.value || "";
    user.firstName = this.userForm.get("firstName")?.value || "";
    user.lastName = this.userForm.get("lastName")?.value || "";
    user.email = this.userForm.get("email")?.value || "";
    user.username = this.userForm.get("username")?.value || "";
    user.password = this.userForm.get("password")?.value || "";
    user.gender = this.userForm.get("gender")?.value || "";
    user.role = this.userForm.get("role")?.value || "";
    user.isActive = this.userForm.get("isActive")?.value || false;

    return user;
  }
}
