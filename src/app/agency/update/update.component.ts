import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { ToastService } from "../../shared/toast.service";
import { Agency } from "../models";
import { AgencyService } from "../agency.service";

@Component({
  selector: "app-agency",
  templateUrl: "./update.component.html",
  styles: [],
})
export class UpdateComponent implements OnInit {
  isLoading: boolean = true;
  formType = "Update";
  agency_id = 0;
  data: Agency = {};

  constructor(
    private toastService: ToastService,
    private agencySerivce: AgencyService,
    private route: ActivatedRoute,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.agency_id = params["agency_id"];
      this.getAgency();
    });
  }

  getAgency() {
    this.agencySerivce.get(this.agency_id).subscribe((res) => {
      this.data = res;
    });
    this.isLoading = !this.isLoading;
  }

  onSubmit(dto: Agency) {
    this.isLoading = !this.isLoading;
    this.agencySerivce.update(this.agency_id, dto).subscribe((agency) => {
      console.log("Agency Updated on Server", agency);
      this.isLoading = !this.isLoading;

      this.toastService.showSuccessToast("Success", "Agency Updated");
      this.router.navigateByUrl(`/agency/list`);
    });
  }
}
