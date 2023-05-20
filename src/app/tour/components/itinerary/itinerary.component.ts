import { Component } from "@angular/core"
import { FormBuilder, Validators } from "@angular/forms"
import { ToastService, UtilService } from "../../../shared/services"
import { TourService } from "../../tour.service"
import { ItineraryService } from "../../itinerary.service"
import { Iitinerary } from "../../../tour/models"
import { CategoryService } from "../../../category/category.service"
import { LocationService } from "../../../location/location.service"

@Component({
  styleUrls: ["./itinerary.component.css"],
  selector: "app-tour-itinerary",
  templateUrl: "./itinerary.component.html",
})
export class ItineraryComponent {
  listLoading = false
  imageSrc: string = "assets/images/bg/bg1_1_50.jpg"
  time = { hour: 17, minute: 0 }
  form = this.fb.group({
    tourId: [0, Validators.required],
    locationId: [0, Validators.required],
    sortOrder: [0, Validators.required],
    categoryId: [0, Validators.required],
    featuredImage: ["", Validators.required],
    name: ["", Validators.required],
    description: ["", Validators.required],
    date: ["", Validators.required],
    time: ["", Validators.required],
  })
  quillModules = {
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
  list: Iitinerary[] = []
  categories: any[] = []
  locations: any[] = []

  constructor(
    private tour: TourService,
    private itinerary: ItineraryService,
    private category: CategoryService,
    private location: LocationService,
    private util: UtilService,
    private fb: FormBuilder,
    private toastService: ToastService
  ) {}

  ngOnInit(): void {
    this.form.controls.tourId.setValue(3)
    this.getItinerary()
    this.getCategories()
    this.getLocations()
  }

  onContentChanged(data: any, field: string) {
    this.form.patchValue({ [field]: data.html })
  }

  onFileChange(event: any) {
    const reader = new FileReader()

    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files
      console.log("file", file)
      reader.readAsDataURL(file)

      reader.onload = () => {
        this.imageSrc = reader.result as string
        this.form.controls.featuredImage.setValue(file)
      }
    }
  }
  onTimeChange(event: any) {
    console.log(event)
  }

  getItinerary() {
    const where = { tourId: 3 }
    this.listLoading = true
    this.itinerary.getList(where).subscribe((response) => {
      console.log("Itinerary", response)
      this.list = response
      this.listLoading = false
    })
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

  handlerDelete(tourId: number, sortOrder: number) {
    this.itinerary.delete(tourId, sortOrder).subscribe((response) => {
      this.toastService.showSuccessToast("Success", "Itinerary Deleted")
      this.getItinerary()
    })
  }
  isValid(field: string): boolean {
    return (
      (!this.form.get(field)?.valid && this.form.get(field)?.touched) || false
    )
  }

  async handleSubmit() {
    //emit form values after validating
    console.log("this.form.value", this.form.value)
    console.log("this.form.featuredImage", this.form.value.featuredImage)
    console.log("this.form.date", this.form.value.date)
    console.log("this.form.time", this.form.value.time)
    console.log("this.form.getTime", this.getTime())

    if (this.form.valid) {
      // upload feature image
      const mediadto = {
        sortOrder: 0,
        mediaType: "image",
        entityId: 3,
        entity: "itinerary",
        altTag: "Featured Image",
        isActive: true,
        resource: this.form.value.featuredImage,
      }
      const dt = this.util.toFormData(mediadto)

      const media: any = await new Promise((res, rej) => {
        this.itinerary.uploadImage(dt).subscribe((response) => {
          res(response)
        })
      })

      const itinerarydto: any = {
        tourId: this.form.value.tourId,
        sortOrder: Number(this.form.value.sortOrder),
        locationId: Number(this.form.value.locationId),
        categoryId: Number(this.form.value.categoryId),
        name: this.form.value.name,
        description: this.form.value.description,
        featuredImage: media.resourcePath,
        time: this.getTime(),
      }
      this.itinerary.create(itinerarydto).subscribe({
        next: (response) => {
          console.log("itinerary", response)
          this.toastService.showSuccessToast("Success", "Itinerary Deleted")
          this.getItinerary()
        },
        error: (error) => {
          console.log("errorerrorerrorerror", error)
          this.toastService.showErrorToast("Failed", error)
        },
      })
    } else {
      this.toastService.showErrorToast("Failed", "Invalid Form")
    }
  }
  getTime() {
    try {
      const date: any = this.form.value.date
      const time: any = this.form.value.time
      const newdate = new Date(`${date.year}-${date.month}-${date.day}`)
      newdate.setHours(time.hour, time.minute)
      return newdate.toISOString()
    } catch (error) {
      return "Invalid DateTime"
    }
  }
}
