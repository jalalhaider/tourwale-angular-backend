import { Component, Input, OnDestroy, OnInit } from "@angular/core"
import { TourService } from "../../tour.service"
import { FormBuilder, Validators } from "@angular/forms"
import { ToastService, UtilService } from "../../../shared/services"
import { CategoryService } from "../../../category/category.service"
import { AgencyService } from "../../../agency/agency.service"
import { LocationService } from "../../../location/location.service"
import { ActivatedRoute, Router } from "@angular/router"
import { Tour } from "../../models"

@Component({
  selector: "app-tour-information",
  templateUrl: "./information.component.html",
})
export class InformationComponent implements OnInit, OnDestroy {
  @Input() tour!: Tour
  isEdit: boolean = false
  modules = {
    toolbar: [
      ["bold", "italic", "underline", "strike"], // toggled buttons
      ["blockquote", "code-block"],

      [{ header: 1 }, { header: 2 }], // custom button values
      [{ list: "ordered" }, { list: "bullet" }],
      [{ script: "sub" }, { script: "super" }], // superscript/subscript
      [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
      [{ direction: "rtl" }], // text direction

      [{ size: ["small", false, "large", "huge"] }], // custom dropdown
      [{ header: [1, 2, 3, 4, 5, 6, false] }],

      [{ color: [] }, { background: [] }], // dropdown with defaults from theme
      [{ font: [] }],
      [{ align: [] }],

      ["clean"], // remove formatting button

      ["link"], // link and image, video
    ],
  }
  form = this.fb.group({
    overview: ["", Validators.required],
    cancellation_policy: ["", Validators.required],
    included: ["", Validators.required],
    excluded: ["", Validators.required],
    know_before: ["", Validators.required],
    additional_info: ["", Validators.required],
    requirements: ["", Validators.required],
  })
  constructor(
    private tourService: TourService,
    private fb: FormBuilder,
    private util: UtilService,
    private toastService: ToastService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnDestroy(): void {}

  ngOnInit() {
    this.tour = this.tourService.state
    if (this.tour) {
      this.isEdit = true
      this.updateFormValues(this.tour)
    }
  }

  updateFormValues(response: Tour) {
    this.form.patchValue({
      overview: response.overview,
      cancellation_policy: response.cancellation_policy,
      included: response.included,
      excluded: response.excluded,
      know_before: response.know_before,
      additional_info: response.additional_info,
      requirements: response.requirements,
    })
  }
  onContentChanged(data: any, field: string) {
    this.form.patchValue({ [field]: data.html })
  }
  async handleSave() {
    //emit form values after validating

    if (this.form.valid) {
      const dto: any = {
        ...this.tour,
        basePrice: Number(this.tour.basePrice),
        overview: this.form.value.overview,
        cancellation_policy: this.form.value.cancellation_policy,
        included: this.form.value.included,
        excluded: this.form.value.excluded,
        know_before: this.form.value.know_before,
        additional_info: this.form.value.additional_info,
        requirements: this.form.value.requirements,
      }

      this.tourService.update(this.tour.tourId, dto).subscribe({
        next: (response) => {
          console.log("information", response)
          this.toastService.showSuccessToast("Success", "Tour Created")
        },
        error: (error) => this.toastService.showErrorToast("Failed", error),
      })
    } else {
      console.log("form", this.form.valid)
      this.toastService.showErrorToast("Failed", "Invalid Form")
    }
  }
}
