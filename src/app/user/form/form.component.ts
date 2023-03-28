import { Component, Input, OnInit, Output } from "@angular/core";
import { FormBuilder, ValidationErrors, Validators } from "@angular/forms";
import { EventEmitter } from "@angular/core";
import { User } from "../models";
import { UtilService } from "../../shared/util.service";
import { environment } from "../../../environments/environment";

@Component({
  selector: "app-user-form",
  templateUrl: "./form.component.html",
  styleUrls: ["./form.component.css"],
})
export class FormComponent implements OnInit {
  @Input() formType: string = "";
  @Input() data: User = {};
  @Input() isLoading: boolean = false;
  @Output() onSubmit = new EventEmitter<any>();

  errors: any[] = [];
  imageSrc: string = "assets/images/users/user1.jpg";
  form = this.fb.group({
    name: ["", Validators.required],
    image: [""],
    email: ["", Validators.required],
    password: ["", Validators.required],
    username: ["", Validators.required],
    phone: ["", Validators.required],
    gender: [""],
  });

  constructor(private fb: FormBuilder, private utilService: UtilService) {}

  ngOnInit(): void {}

  ngOnChanges() {
    this.form.patchValue({
      ...this.data,
    });

    if (this.data.image !== "" && this.data.image != undefined) {
      console.log("this.data.image", this.data.image);
      this.imageSrc = `${environment.imageBaseURL}/${this.data.image}`;
    }
  }

  handleSubmit(): void {
    //emit form values after validating
    if (this.form.valid) {
      let password = this.data.password;

      if (this.form.get("password")?.value != this.data.password)
        password = this.form.get("password")?.value!;

      const dto: any = {
        ...this.form.value,
        password: password,
      };
      this.onSubmit.emit(this.utilService.toFormData(dto));
    } else {
      this.getFormValidationErrors();
    }
  }

  getFormValidationErrors() {
    Object.keys(this.form.controls).forEach((key) => {
      const controlErrors: ValidationErrors = this.form.get(key)?.errors || [];
      if (controlErrors != null) {
        Object.keys(controlErrors).forEach((keyError) => {
          this.errors.push({
            field: key,
            message: keyError,
          });
          console.log(controlErrors[keyError]);
        });
      }
    });
  }

  onFileChange(event: any) {
    const reader = new FileReader();

    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      console.log("file", file);
      reader.readAsDataURL(file);

      reader.onload = () => {
        this.imageSrc = reader.result as string;
        this.form.controls.image.setValue(file);
      };
    }
  }
}
