import { Component, OnInit } from "@angular/core"
import { ActivatedRoute, Router } from "@angular/router"
import { ToastService } from "../../shared/services/toast.service"

import { LocationService } from "../location.service"
import { Location } from "../models"

@Component({
  selector: "app-location",
  templateUrl: "./update.component.html",
  styles: [],
})
export class UpdateComponent implements OnInit {
  isLoading: boolean = true
  formType = "Update"
  location_id = 0
  data: Location = {}

  constructor(
    private toastService: ToastService,
    private locationSerivce: LocationService,
    private route: ActivatedRoute,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.location_id = params["_id"]
      this.getLocation()
    })
  }

  getLocation() {
    this.locationSerivce.get(this.location_id).subscribe((res: any) => {
      this.data = res
    })
    this.isLoading = !this.isLoading
  }

  onSubmit(dto: Location) {
    this.isLoading = !this.isLoading
    this.locationSerivce.update(this.location_id, dto).subscribe((location) => {
      console.log("Location Updated on Server", location)
      this.isLoading = !this.isLoading

      this.toastService.showSuccessToast("Success", "Location Updated")
      this.router.navigateByUrl(`/location/list`)
    })
  }
}
