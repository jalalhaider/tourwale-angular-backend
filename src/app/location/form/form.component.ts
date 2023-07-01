import { Component, EventEmitter, Input, Output } from "@angular/core"
import { Location } from "../models/location.models"
import { FormBuilder, ValidationErrors, Validators } from "@angular/forms"
import { ToastService } from "../../shared/services/toast.service"

@Component({
  selector: "app-location-form",
  templateUrl: "./form.component.html",
})
export class FormComponent {
  @Input() formType: string = ""
  @Input() data: Location = {}
  @Input() isLoading: boolean = false
  @Output() onSubmit = new EventEmitter<Location>()

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
  errors: any[] = []

  form = this.fb.group({
    name: ["", Validators.required],
    description: ["", Validators.required],
    type: [""],
    currency: [""],
    bestTimeToVisit: [""],
    knowBefore: [""],
    timeZone: [""],
    isPopular: [false],
    isActive: [false],
  })

  constructor(private fb: FormBuilder, private toastService: ToastService) {}

  ngOnInit(): void {}
  ngOnChanges() {
    if (!Object.keys(this.data).length) return

    this.form.patchValue({
      name: this.data.name,
      description: this.data.description,
      type: this.data.type,
      currency: this.data.currency,
      bestTimeToVisit: this.data.bestTimeToVisit,
      knowBefore: this.data.knowBefore,
      timeZone: this.data.timeZone,
      isPopular: this.data.isPopular,
      isActive: this.data.isActive,
    })
  }

  isValid(field: string): boolean {
    return (
      (!this.form.get(field)?.valid && this.form.get(field)?.touched) || false
    )
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
