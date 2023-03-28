import { AfterViewInit, Component } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { ToastService } from "../../shared/toast.service";
import { AuthService } from "../auth.service";
import { ILogin } from "../models";

@Component({
  templateUrl: "./login.component.html",
  styles: [],
})
export class LoginComponent {
  isLoading = false;
  form = this.fb.group({
    email: ["", Validators.required],
    password: ["", Validators.required],
    rememberme: [false],
  });

  constructor(
    private fb: FormBuilder,
    private toastService: ToastService,
    private authService: AuthService,
    private router: Router
  ) {}

  handleSubmit() {
    if (this.form.valid) {
      this.isLoading = !this.isLoading;
      const dto: ILogin = {
        email: this.form.value.email!,
        password: this.form.value.password!,
      };

      this.authService.login(dto).subscribe({
        next: (res) => {
          this.isLoading = !this.isLoading;
          this.router.navigateByUrl("/dashboard");
        },
        error: (err) => {
          this.toastService.showErrorToast("Failed", err.message);
          this.isLoading = !this.isLoading;
        },
      });
    } else {
      this.toastService.showErrorToast("Failed", "Invalid credentials");
    }
  }
}
