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

  imageSrc: string = "assets/images/bg/bg1_1_50.jpg"

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

  onContentChanged(data: any, field: string) {
    this.form.patchValue({ [field]: data.html })
  }

  constructor(private fb: FormBuilder, private toastService: ToastService) {}

  onFileChange(event: any) {
    const reader = new FileReader()

    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files
      console.log("file", file)
      reader.readAsDataURL(file)

      reader.onload = () => {
        this.imageSrc = reader.result as string
        this.form.controls.featured_image.setValue(file)
      }
    }
  }
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
      console.log("dto", dto)
      //this.onSubmit.emit(dto)
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
