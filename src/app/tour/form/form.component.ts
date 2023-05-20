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

  constructor(private fb: FormBuilder, private toastService: ToastService) {}

  onContentChanged(event: any, field: string) {}
  ngOnInit(): void {}
}
