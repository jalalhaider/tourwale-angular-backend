import { Component, Input, OnDestroy, OnInit, Output } from "@angular/core"
import {
  FormArray,
  FormBuilder,
  FormGroup,
  ValidationErrors,
  Validators,
} from "@angular/forms"
import { EventEmitter } from "@angular/core"
import { Agency } from "../models"
import { ToastService } from "../../shared/services/toast.service"
import { MediaService, UtilService } from "../../shared/services"
import { environment } from "../../../environments/environment"

@Component({
  selector: "app-agency-form",
  templateUrl: "./form.component.html",
})
export class FormComponent implements OnInit, OnDestroy {
  @Input() formType: string = ""
  @Input() data: Agency = {}
  @Input() isLoading: boolean = false
  @Output() onSubmit = new EventEmitter<Agency>()
  imageSrc: string = "assets/images/bg/bg1.jpg"
  coverImageSrc: string = "assets/images/bg/bg1.jpg"

  errors: any[] = []

  form = this.fb.group({
    slug: ["", Validators.required],
    isActive: [false],
    isBlacklisted: [false],
    name: ["", Validators.required],
    description: ["", Validators.required],
    image: [{}],
    coverImage: [{}],
  })

  constructor(
    private fb: FormBuilder,
    private toastService: ToastService,
    private util: UtilService,
    private media: MediaService
  ) {}

  ngOnInit(): void {}

  ngOnDestroy(): void {}

  ngOnChanges() {
    if (!Object.keys(this.data).length) return

    this.form.patchValue({
      name: this.data.name,
      description: this.data.description,
      image: this.data.image,
      coverImage: this.data.coverImage,
      slug: this.data.slug,
      isActive: this.data.isActive,
      isBlacklisted: this.data.isBlacklisted,
    })
    this.imageSrc = `${environment.imageBaseURL}${this.data.image}`
    this.coverImageSrc = `${environment.imageBaseURL}${this.data.coverImage}`
  }
  onFileChange(event: any, formField: string) {
    const reader = new FileReader()

    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files
      reader.readAsDataURL(file)

      reader.onload = () => {
        if (formField === "image") {
          this.imageSrc = reader.result as string
          this.form.controls.image.setValue(file)
        }
        if (formField === "coverImage") {
          this.coverImageSrc = reader.result as string
          this.form.controls.coverImage.setValue(file)
        }
      }
    }
  }

  isValid(field: string): boolean {
    return (
      (!this.form.get(field)?.valid && this.form.get(field)?.touched) || false
    )
  }

  async handleSubmit() {
    //emit form values after validating
    let media: any = await this.uploadMedia(this.form.value.image)

    let mediaT: any = await this.uploadMedia(this.form.value.coverImage)

    console.log("media", media)
    if (this.form.valid) {
      const dto: any = {
        ...this.form.value,
        image: media.resourcePath,
        coverImage: mediaT.resourcePath,
      }
      this.onSubmit.emit(dto)
    } else {
      this.toastService.showErrorToast("Failed", "Invalid Form")
    }
  }

  async uploadMedia(file: any) {
    let media: any = {}
    if (file instanceof File) {
      const mediadto = {
        sortOrder: 0,
        mediaType: "image",
        entityId: 0,
        entity: "agency",
        altTag: "Cover Image",
        isActive: true,
        resource: file,
      }
      const dt = this.util.toFormData(mediadto)
      console.log("dt", dt)
      media = await new Promise((res, rej) => {
        this.media.uploadImage(dt).subscribe({
          next: (response) => {
            res(response)
          },
          error: (err) => {
            this.toastService.showErrorToast("Error", err.message)
          },
        })
      })
    } else {
      media.resourcePath = file //this will string if not instance of file
    }
    return media
  }
}
