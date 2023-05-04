import { Component, OnInit } from "@angular/core"
import { ActivatedRoute, Router } from "@angular/router"
import { ToastService } from "../../shared/toast.service"

import { CategoryService } from "../category.service"
import { Category } from "../models"

@Component({
  selector: "app-category",
  templateUrl: "./update.component.html",
  styles: [],
})
export class UpdateComponent implements OnInit {
  isLoading: boolean = true
  formType = "Update"
  category_id = 0
  data: Category = {}

  constructor(
    private toastService: ToastService,
    private categorySerivce: CategoryService,
    private route: ActivatedRoute,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.category_id = params["_id"]
      this.getCategory()
    })
  }

  getCategory() {
    this.categorySerivce.get(this.category_id).subscribe((res: any) => {
      this.data = res
    })
    this.isLoading = !this.isLoading
  }

  onSubmit(dto: Category) {
    this.isLoading = !this.isLoading
    this.categorySerivce.update(this.category_id, dto).subscribe((category) => {
      console.log("Category Updated on Server", category)
      this.isLoading = !this.isLoading

      this.toastService.showSuccessToast("Success", "Category Updated")
      this.router.navigateByUrl(`/category/list`)
    })
  }
}
