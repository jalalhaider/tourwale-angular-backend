import { Component } from "@angular/core"
import { TourService } from "../tour.service"
import { Tour } from "../models"
import { Router } from "@angular/router"
import { environment } from "../../../environments/environment"

@Component({
  styleUrls: ["./list.component.css"],
  selector: "app-tour-list",
  templateUrl: `./list.component.html`,
})
export class ListComponent {
  constructor(private tour: TourService, private router: Router) {}

  list: Tour[] = []
  ngOnInit() {
    const query = {}
    this.tour.getList(query).subscribe((response) => {
      this.list = response
    })
  }
  handleEdit(event: any, tour: Tour) {
    this.router.navigateByUrl(`/tour/update?_id=${tour.tourId}`)
  }

  handleDelete(event: any, tour: Tour) {}
  getImage(image: string) {
    return `${environment.imageBaseURL}${image}`
  }
}
