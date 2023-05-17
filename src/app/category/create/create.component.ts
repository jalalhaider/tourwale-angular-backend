import { Component } from "@angular/core"
import { ToastService } from "../../shared/services/toast.service"
import { CategoryService } from "../category.service"
import { Router } from "@angular/router"
import { Category } from "../models/category.models"

@Component({
  selector: "app-category",
  templateUrl: "./create.component.html",
})
export class CreateComponent {
  formType = "Create"
  isLoading = false
  constructor(
    private toastService: ToastService,
    private categoryService: CategoryService,
    private router: Router
  ) {}
  ngOnInit(): void {}

  onSubmit(dto: Category) {
    this.isLoading = !this.isLoading
    this.categoryService.create(dto).subscribe((category) => {
      this.isLoading = !this.isLoading
      this.router.navigateByUrl(`/category/list`)
      this.toastService.showSuccessToast("Success", "Agency Added")
    })
  }
}
