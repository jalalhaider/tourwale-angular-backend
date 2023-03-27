import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { ToastService } from "../../shared/toast.service";
import { User } from "../models";
import { UserService } from "../agency.service";

@Component({
  selector: "app-user",
  templateUrl: "./update.component.html",
  styles: [],
})
export class UpdateComponent implements OnInit {
  isLoading: boolean = true;
  formType = "Update";
  user_id = 0;
  data: User = {};

  constructor(
    private toastService: ToastService,
    private userSerivce: UserService,
    private route: ActivatedRoute,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.user_id = params["user_id"];
      this.getUser();
    });
  }

  getUser() {
    this.userSerivce.get(this.user_id).subscribe((res) => {
      this.data = res;
    });
    this.isLoading = !this.isLoading;
  }

  onSubmit(dto: User) {
    this.isLoading = !this.isLoading;
    this.userSerivce.update(this.user_id, dto).subscribe((user) => {
      console.log("User Updated on Server", user);
      this.isLoading = !this.isLoading;

      this.toastService.showSuccessToast("Success", "User Updated");
      this.router.navigateByUrl(`/user/list`);
    });
  }
}
