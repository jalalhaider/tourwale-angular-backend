import { Component } from "@angular/core"
import { Router } from "@angular/router"
import { ToastService } from "../../shared/services/toast.service"
import { Agency } from "../models"
import { AgencyService } from "../agency.service"
import { environment } from "../../../environments/environment"

@Component({
  styleUrls: ["./list.component.css"],
  selector: "app-agency-list",
  templateUrl: "./list.component.html",
})
export class ListComponent {
  list: Agency[] = []
  constructor(private agencyService: AgencyService, private router: Router) {}

  ngOnInit() {
    const where = {}
    this.agencyService.getList(where).subscribe((result) => {
      this.list = result
    })
  }

  onClick($event: any, row: Agency) {
    this.router.navigateByUrl(`/agency/update?agency_id=${row.agencyId}`)
  }

  getImage(image: string) {
    return `${environment.imageBaseURL}${image}`
  }
}
