import { Component } from "@angular/core"
import { ToastService } from "../../shared/services/toast.service"
import { LocationService } from "../location.service"
import { Router } from "@angular/router"
import { Location } from "../models/location.models"

@Component({
  selector: "app-location",
  templateUrl: "./create.component.html",
})
export class CreateComponent {
  formType = "Create"
  isLoading = false
  constructor(
    private toastService: ToastService,
    private locationService: LocationService,
    private router: Router
  ) {}
  ngOnInit(): void {}

  onSubmit(dto: Location) {
    this.isLoading = !this.isLoading
    this.locationService.create(dto).subscribe((location) => {
      this.isLoading = !this.isLoading
      this.router.navigateByUrl(`/location/list`)
      this.toastService.showSuccessToast("Success", "Agency Added")
    })
  }
}
