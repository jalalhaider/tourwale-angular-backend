import { Component } from "@angular/core"
import { Router } from "@angular/router"
import { ToastService } from "../../shared/services/toast.service"
import { User } from "../models"
import { UserService } from "../user.service"

@Component({
  selector: "app-user-list",
  templateUrl: "./list.component.html",
})
export class ListComponent {
  list: User[] = []
  error = null
  constructor(private userService: UserService, private router: Router) {}

  ngOnInit() {
    const where = {}
    this.userService.getList(where).subscribe({
      next: this.handleResponse.bind(this),
      error: (error) => {
        this.error = error.message
      },
    })
  }

  handleResponse(result: User[]) {
    this.list = result
  }

  onClick($event: any, row: User) {
    this.router.navigateByUrl(`/user/update?user_id=${row.id}`)
  }
}
