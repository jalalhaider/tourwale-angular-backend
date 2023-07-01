import { Component } from "@angular/core"
import { Location } from "../models/location.models"
import { LocationService } from "../location.service"
import { Router } from "@angular/router"

@Component({
  selector: "app-category",
  templateUrl: "./list.component.html",
})
export class ListComponent {
  list: Location[] = []
  constructor(
    private locationService: LocationService,
    private router: Router
  ) {}

  ngOnInit() {
    const where = {}
    this.locationService.getList(where).subscribe((result) => {
      this.list = result
    })
  }

  onClick($event: any, row: Location) {
    this.router.navigateByUrl(`/location/update?_id=${row.locationId}`)
  }
}
