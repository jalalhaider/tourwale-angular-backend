import { Component, EventEmitter, Input, Output } from "@angular/core"
import { Category } from "../models/category.models"
import { FormBuilder, ValidationErrors, Validators } from "@angular/forms"
import { ToastService } from "../../shared/toast.service"

@Component({
  selector: "app-category-form",
  templateUrl: "./form.component.html",
})
export class FormComponent {
  @Input() formType: string = ""
  @Input() data: Category = {}
  @Input() isLoading: boolean = false
  @Output() onSubmit = new EventEmitter<Category>()

  errors: any[] = []

  form = this.fb.group({
    title: ["", Validators.required],
    description: [""],
    image: [""],
    isActive: [false],
  })

  constructor(private fb: FormBuilder, private toastService: ToastService) {}

  ngOnInit(): void {}
  ngOnChanges() {
    if (!Object.keys(this.data).length) return

    this.form.patchValue({
      title: this.data.title,
      description: this.data.description,
      image: this.data.image,
      isActive: this.data.isActive,
    })
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
