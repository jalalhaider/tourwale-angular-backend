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

  activeId = 1
  constructor(private fb: FormBuilder, private toastService: ToastService) {}

  ngOnInit(): void {}

  next() {
    this.activeId++
  }
  tabclick(id: number) {
    this.activeId = id
  }
}
