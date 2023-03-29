import { Component, Input, OnInit, Output } from "@angular/core"
import {
  FormArray,
  FormBuilder,
  FormGroup,
  ValidationErrors,
  Validators,
} from "@angular/forms"
import { EventEmitter } from "@angular/core"
import { Agency, AgencyDescription } from "../models"
import { ToastService } from "../../shared/toast.service"

@Component({
  selector: "app-agency-form",
  templateUrl: "./form.component.html",
})
export class FormComponent implements OnInit {
  @Input() formType: string = ""
  @Input() data: Agency = {}
  @Input() isLoading: boolean = false
  @Output() onSubmit = new EventEmitter<Agency>()

  errors: any[] = []

  form = this.fb.group({
    slug: ["", Validators.required],
    isActive: [false],
    isBlacklisted: [false],
    description: this.fb.group({
      en: this.fb.group({
        languageId: [1],
        name: ["", Validators.required],
        description: ["", Validators.required],
        image: ["", Validators.required],
        coverImage: [""],
      }),
      ar: this.fb.group({
        languageId: [2],
        name: ["", Validators.required],
        description: ["", Validators.required],
        image: ["", Validators.required],
        coverImage: [""],
      }),
    }),
    socialMedia: this.fb.array([
      /*   this.fb.group({
        type: ["hello", Validators.required],
        followers: ["", Validators.required],
        link: ["", Validators.required],
      }), */
    ]),
  })

  constructor(private fb: FormBuilder, private toastService: ToastService) {}

  ngOnInit(): void {}
  ngOnChanges() {
    if (!Object.keys(this.data).length) return

    this.form.patchValue({
      slug: this.data.slug,
      isActive: this.data.isActive,
      isBlacklisted: this.data.isBlacklisted,
      description: {
        en: this.data.description?.en,
        ar: this.data.description?.ar,
      },
    })
    this.data.socialMedia?.map((sm) => {
      this.socialMedia.push(
        this.fb.group({
          type: [sm.type, Validators.required],
          followers: [sm.followers, Validators.required],
          link: [sm.link, Validators.required],
        })
      )
    })
  }

  handleSubmit(): void {
    //emit form values after validating
    console.log("this.form", this.form.value)
    if (this.form.valid) {
      const dto: any = {
        ...this.form.value,
        description: [
          this.form.value.description?.en,
          this.form.value.description?.ar,
        ],
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

  addSocialMedia() {
    this.socialMedia.push(
      this.fb.group({
        type: ["", Validators.required],
        followers: ["", Validators.required],
        link: ["", Validators.required],
      })
    )
  }
  removeSocialMedia(i: number) {
    this.socialMedia.removeAt(i)
  }

  get socialMedia(): FormArray {
    return this.form.get("socialMedia") as FormArray
  }
  agencyDescription(language: string): FormGroup {
    return this.form.get("description")?.get(language) as FormGroup
  }
}
