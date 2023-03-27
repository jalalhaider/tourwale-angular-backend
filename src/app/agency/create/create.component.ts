import { Component, OnInit } from "@angular/core";
import { FormControl } from "@angular/forms";
import { Router } from "@angular/router";
import { ToastService } from "../../shared/toast.service";
import { User } from "../models";
import { UserService } from "../agency.service";

@Component({
  selector: "app-user",
  templateUrl: "./create.component.html",
  styles: [],
})
export class CreateComponent implements OnInit {
  formType = "Create";
  isLoading = false;
  constructor(
    private toastService: ToastService,
    private userService: UserService,
    private router: Router
  ) {}
  ngOnInit(): void {}

  onSubmit(dto: User) {
    this.isLoading = !this.isLoading;
    this.userService.create(dto).subscribe((user) => {
      this.isLoading = !this.isLoading;
      this.router.navigateByUrl(`/user/list`);
      this.toastService.showSuccessToast("Success", "User Added");
    });
  }
}
