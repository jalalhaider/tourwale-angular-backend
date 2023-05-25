import { Component, OnDestroy, OnInit } from "@angular/core"
import { FormBuilder, Validators } from "@angular/forms"
import { ToastService, UtilService } from "../../../shared/services"
import { TourService } from "../../tour.service"
import { ItineraryService } from "../../itinerary.service"
import { Iitinerary, Tour } from "../../../tour/models"
import { CategoryService } from "../../../category/category.service"
import { LocationService } from "../../../location/location.service"
import { environment } from "../../../../environments/environment"

@Component({
  styleUrls: ["./itinerary.component.css"],
  selector: "app-tour-itinerary",
  templateUrl: "./itinerary.component.html",
})
export class ItineraryComponent implements OnInit, OnDestroy {
  tourId = 1
  tour!: Tour
  listLoading = false
  detailLoading = false
  editorContent = ""
  isEdit = false
  time = { hour: 17, minute: 0 }
  date = { year: 2023, month: 2, day: 2 }
  imageSrc: string = "assets/images/bg/bg1.jpg"
  form = this.fb.group({
    tourId: [0, Validators.required],
    locationId: [0, Validators.required],
    sortOrder: [0, Validators.required],
    categoryId: [0, Validators.required],
    featuredImage: [{}, Validators.required],
    name: ["", Validators.required],
    description: ["", Validators.required],
    date: [{}, Validators.required],
    time: [{}, Validators.required],
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
    private tourService: TourService,
    private itinerary: ItineraryService,
    private category: CategoryService,
    private location: LocationService,
    private util: UtilService,
    private fb: FormBuilder,
    private toastService: ToastService
  ) {}
  ngOnDestroy(): void {}

  ngOnInit(): void {
    this.tour = this.tourService.state
    if (this.tour) {
      this.tourId = this.tour.tourId
    }

    this.form.controls.tourId.setValue(this.tourId)
    this.getItinerary()
    this.getCategories()
    this.getLocations()
  }
  isValid(field: string): boolean {
    return (
      (!this.form.get(field)?.valid && this.form.get(field)?.touched) || false
    )
  }
  onContentChanged(data: any, field: string) {
    this.form.patchValue({ [field]: data.html })
  }

  onFileChange(event: any) {
    const reader = new FileReader()

    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files
      reader.readAsDataURL(file)

      reader.onload = () => {
        this.imageSrc = reader.result as string
        this.form.controls.featuredImage.setValue(file)
      }
    }
  }

  getItinerary() {
    const where = { tourId: this.tourId }
    this.listLoading = true
    this.itinerary.getList(where).subscribe((response) => {
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

  newForm() {
    this.isEdit = false
    this.form.patchValue({
      tourId: this.tourId,
      sortOrder: 0,
      locationId: 0,
      categoryId: 0,
      name: "",
      description: "",
      featuredImage: "",
      time: "",
      date: "",
    })
    this.editorContent = ""
    this.time = { hour: 0, minute: 0 }
    this.date = { year: 2023, month: 1, day: 1 }
    this.imageSrc = "assets/images/bg/bg1.jpg"
  }
  handleEdit(tourId: number, sortOrder: number) {
    this.detailLoading = true
    this.itinerary.get(tourId, sortOrder).subscribe((response: any) => {
      const d = new Date(response.time)
      this.date = {
        year: d.getFullYear(),
        month: d.getMonth(),
        day: d.getDate(),
      }
      this.time = {
        hour: d.getHours(),
        minute: d.getMinutes(),
      }
      const myform = {
        tourId: response.tourId,
        sortOrder: response.sortOrder,
        locationId: response.locationId,
        categoryId: response.categoryId,
        name: response.name,
        description: response.description,
        featuredImage: response.featuredImage,
        time: this.time,
        date: this.date,
      }
      this.editorContent = response.description
      this.form.patchValue(myform)
      this.imageSrc = `${environment.imageBaseURL}${response.featuredImage}`
      this.isEdit = true
    })
    this.detailLoading = false
  }

  handleDelete(tourId: number, sortOrder: number) {
    this.itinerary.delete(tourId, sortOrder).subscribe((response) => {
      this.toastService.showSuccessToast("Success", "Itinerary Deleted")
      this.getItinerary()
    })
  }

  async handleSubmit() {
    //emit form values after validating

    console.log(this.form.value)
    if (this.form.valid) {
      // upload feature image
      let media: any = {}
      if (this.form.value.featuredImage instanceof File) {
        const mediadto = {
          sortOrder: 0,
          mediaType: "image",
          entityId: this.tourId,
          entity: "itinerary",
          altTag: "Featured Image",
          isActive: true,
          resource: this.form.value.featuredImage,
        }
        const dt = this.util.toFormData(mediadto)

        media = await new Promise((res, rej) => {
          this.itinerary.uploadImage(dt).subscribe((response) => {
            res(response)
          })
        })
      } else {
        media.resourcePath = this.form.value.featuredImage
      }

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

      if (this.isEdit) {
        this.itinerary
          .update(itinerarydto.tourId, itinerarydto.sortOrder, itinerarydto)
          .subscribe({
            next: (response) => {
              this.toastService.showSuccessToast("Success", "Itinerary Updated")
              this.getItinerary()
              this.newForm()
            },
            error: (error) => this.toastService.showErrorToast("Failed", error),
          })
      } else {
        this.itinerary.create(itinerarydto).subscribe({
          next: (response) => {
            this.toastService.showSuccessToast("Success", "Itinerary Created")
            this.getItinerary()
            this.newForm()
          },
          error: (error) => this.toastService.showErrorToast("Failed", error),
        })
      }
    } else {
      this.toastService.showErrorToast("Failed", "Invalid Form")
    }
  }
}
