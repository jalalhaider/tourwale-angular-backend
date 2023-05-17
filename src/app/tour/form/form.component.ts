import { Component, EventEmitter, Input, Output } from "@angular/core"
import { Tour } from "../models/tour.models"
import { FormBuilder, ValidationErrors, Validators } from "@angular/forms"
import { ToastService } from "../../shared/services/toast.service"

@Component({
  selector: "app-tour-form",
  templateUrl: "./form.component.html",
})
export class FormComponent {
  @Input() formType!: string
  @Input() data!: Tour
  @Input() isLoading: boolean = false
  @Output() onSubmit = new EventEmitter<Tour>()

  errors: any[] = []

  form = this.fb.group({
    agencyId: [],
    categoryId: [],
    name: [],
    overview: [],
    languages: [],
    highlights: [],
    featured_image: [],
    included: [],
    excluded: [],
    departure_details: [],
    know_before: [],
    additional_info: [],
    duration: [],
    start_date: [], //2023-05-07T09:18:15.871Z;
    end_date: [],
    cancellation_policy: [],
    pickup_location_id: [],
    requirements: [],
    slug: [],
    basePrice: [],
    is_custom_tour: [],
    is_draft: [],
    around_location: [],
    recurring_type: [],
    isActive: [],
  })

  constructor(private fb: FormBuilder, private toastService: ToastService) {}

  ngOnInit(): void {}

  ngOnChanges() {
    /*  if (!Object.keys(this.data).length) return

    this.form.patchValue({
      title: this.data.title,
      description: this.data.description,
      image: this.data.image,
      isActive: this.data.isActive,
    }) */
  }

  handleSubmit(): void {
    //emit form values after validating
    if (this.form.valid) {
      const dto: any = {
        ...this.form.value,
      }
      this.onSubmit.emit(dto)
    } else {
      this.getFormValidationErrors()
      this.toastService.showErrorToast("Failed", "Invalid Form")
    }
  }

  getFormValidationErrors() {
    Object.keys(this.form.controls).forEach((key) => {
      const controlErrors: ValidationErrors = this.form.get(key)?.errors || []
      if (controlErrors != null) {
        Object.keys(controlErrors).forEach((keyError) => {
          this.errors.push({
            field: key,
            message: keyError,
          })
          console.log(controlErrors[keyError])
        })
      }
    })
  }
}
