import { Component } from "@angular/core"
import { ToastService } from "../../shared/services/toast.service"
import { TourService } from "../tour.service"
import { Router } from "@angular/router"
import { Tour } from "../models/tour.models"

@Component({
  selector: "app-tour",
  templateUrl: "./create.component.html",
})
export class CreateComponent {
  formType = "Create"
  isLoading = false
  constructor(
    private toastService: ToastService,
    private tourService: TourService,
    private router: Router
  ) {}
  ngOnInit(): void {}

  onSubmit(dto: Tour) {
    this.isLoading = !this.isLoading
    this.tourService.create(dto).subscribe((tour) => {
      this.isLoading = !this.isLoading
      this.router.navigateByUrl(`/tour/list`)
      this.toastService.showSuccessToast("Success", "Tour Added")
    })
  }
}
