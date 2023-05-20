import { Component } from "@angular/core"
import { ToastService } from "../../shared/services/toast.service"
import { TourService } from "../tour.service"
import { ActivatedRoute, Router } from "@angular/router"
import { Tour } from "../models/tour.models"

@Component({
  selector: "app-tour",
  templateUrl: "./update.component.html",
})
export class UpdateComponent {
  formType = "Update"
  isLoading = false
  tourId = 0
  data: any
  constructor(
    private toastService: ToastService,
    private tourService: TourService,

    private route: ActivatedRoute,
    private router: Router
  ) {
    console.log("hello")
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.tourId = params["_id"]

      this.getTour()
    })
  }
  getTour() {
    this.tourService.get(this.tourId).subscribe((response) => {
      this.data = response
    })
  }
  onSubmit(dto: Tour) {
    this.isLoading = !this.isLoading
    this.tourService.update(this.tourId, dto).subscribe((tour) => {
      this.isLoading = !this.isLoading
      this.router.navigateByUrl(`/tour/list`)
      this.toastService.showSuccessToast("Success", "Tour Added")
    })
  }
}
