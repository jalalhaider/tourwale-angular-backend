import { Component } from "@angular/core"
import { TourService } from "../../tour.service"
import { ToastService, UtilService } from "../../../shared/services"
import { FormBuilder, Validators } from "@angular/forms"
import { CategoryService } from "../../../category/category.service"
import { AgencyService } from "../../../agency/agency.service"
import { LocationService } from "../../../location/location.service"
import { end } from "@popperjs/core"

@Component({
  selector: "app-tour-general",
  templateUrl: "./general.component.html",
})
export class GeneralComponent {
  s = false
  imageSrc: string = "assets/images/bg/bg1_1_50.jpg"
  startDate = { year: 2023, month: 2, day: 2 }
  endDate = { year: 2023, month: 2, day: 2 }

  form = this.fb.group({
    agencyId: [0, Validators.required],
    categoryId: [0, Validators.required],
    pickup_location_id: [0, Validators.required],
    basePrice: [0, Validators.required],
    name: ["", Validators.required],
    languages: ["", Validators.required],
    highlights: ["", Validators.required],
    departure_details: ["", Validators.required],
    overview: ["", Validators.required],
    duration: ["", Validators.required],
    featured_image: [{}, Validators.required],
    start_date: ["", Validators.required],
    end_date: ["", Validators.required],
    slug: [""],
    around_location: [""],
    recurring_type: ["", Validators.required],
    is_custom_tour: [false],
    is_draft: [false],
    isActive: [false],
  })

  categories: any[] = []
  locations: any[] = []
  agencies: any[] = []
  constructor(
    private tour: TourService,
    private fb: FormBuilder,
    private util: UtilService,
    private category: CategoryService,
    private agency: AgencyService,
    private location: LocationService,
    private toastService: ToastService
  ) {}

  ngOnInit(): void {
    this.getAgencies()
    this.getCategories()
    this.getLocations()
  }
  isValid(field: string): boolean {
    return (
      (!this.form.get(field)?.valid && this.form.get(field)?.touched) || false
    )
  }

  getCategories() {
    this.category.getList({}).subscribe((response: any) => {
      this.categories = response
    })
  }
  getLocations() {
    this.location.getList({}).subscribe((response: any) => {
      this.locations = response
    })
  }
  getAgencies() {
    this.agency.getList({}).subscribe((response: any) => {
      this.agencies = response
    })
  }

  async handleSave() {
    //emit form values after validating

    console.log(this.form.value)
    if (this.form.valid) {
      // upload feature image

      const mediadto = {
        sortOrder: 0,
        mediaType: "image",
        entityId: 3,
        entity: "itinerary",
        altTag: "Featured Image",
        isActive: true,
        resource: this.form.value.featured_image,
      }
      const dt = this.util.toFormData(mediadto)

      const media: any = await new Promise((res, rej) => {
        this.tour.uploadImage(dt).subscribe((response) => {
          res(response)
        })
      })

      let tmpdate: any = this.form.value.start_date
      const start_date = new Date(
        `${tmpdate.year}-${tmpdate.month}-${tmpdate.day}`
      )
      tmpdate = this.form.value.end_date
      const end_date = new Date(
        `${tmpdate.year}-${tmpdate.month}-${tmpdate.day}`
      )

      const dto: any = {
        agencyId: Number(this.form.value.agencyId),
        categoryId: Number(this.form.value.categoryId),
        pickup_location_id: Number(this.form.value.pickup_location_id),
        basePrice: Number(this.form.value.basePrice),
        name: this.form.value.name,
        languages: this.form.value.languages,
        highlights: this.form.value.highlights,
        departure_details: this.form.value.departure_details,
        overview: this.form.value.overview,
        duration: this.form.value.duration,
        featured_image: media.featured_image,
        start_date: start_date.toISOString(),
        end_date: end_date.toISOString(),
        slug: this.form.value.slug,
        around_location: this.form.value.around_location,
        recurring_type: this.form.value.recurring_type,
        is_custom_tour: this.form.value.is_custom_tour,
        is_draft: this.form.value.is_draft,
        isActive: this.form.value.isActive,
      }

      this.tour.create(dto).subscribe({
        next: (response) => {
          this.toastService.showSuccessToast("Success", "Tour Created")
        },
        error: (error) => this.toastService.showErrorToast("Failed", error),
      })
    } else {
      console.log("form", this.form.valid)
      this.toastService.showErrorToast("Failed", "Invalid Form")
    }
  }

  onFileChange(event: any) {
    const reader = new FileReader()

    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files
      reader.readAsDataURL(file)

      reader.onload = () => {
        this.imageSrc = reader.result as string
        this.form.controls.featured_image.setValue(file)
      }
    }
  }
}
