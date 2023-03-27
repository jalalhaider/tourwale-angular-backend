import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { ToastService } from "../../shared/toast.service";
import { User } from "../models";
import { UserService } from "../user.service";

@Component({
  selector: "app-user-list",
  templateUrl: "./list.component.html",
})
export class ListComponent {
  list: User[] = [];
  constructor(private userService: UserService, private router: Router) {}

  ngOnInit() {
    const where = {};
    this.userService.getList(where).subscribe((result) => {
      this.list = result;
    });
  }

  onClick($event: any, row: User) {
    this.router.navigateByUrl(`/user/update?user_id=${row.id}`);
  }
}
