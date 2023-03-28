import { Component, OnInit } from "@angular/core";
import { FormControl } from "@angular/forms";
import { Router } from "@angular/router";
import { ToastService } from "../../shared/toast.service";
import { Agency } from "../models";
import { AgencyService } from "../agency.service";

@Component({
  selector: "app-agency",
  templateUrl: "./create.component.html",
  styles: [],
})
export class CreateComponent implements OnInit {
  formType = "Create";
  isLoading = false;
  constructor(
    private toastService: ToastService,
    private agencyService: AgencyService,
    private router: Router
  ) {}
  ngOnInit(): void {}

  onSubmit(dto: Agency) {
    this.isLoading = !this.isLoading;
    this.agencyService.create(dto).subscribe((agency) => {
      this.isLoading = !this.isLoading;
      this.router.navigateByUrl(`/agency/list`);
      this.toastService.showSuccessToast("Success", "Agency Added");
    });
  }
}
