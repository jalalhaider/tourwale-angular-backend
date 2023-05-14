import { HttpClient, HttpHeaders } from "@angular/common/http"
import { Component } from "@angular/core"
import { UtilService } from "../../shared/util.service"

const example = [
  {
    mediaId:
      "IjMtdG91ci1zdG9yYWdlL3VwbG9hZC9tZWRpYS90b3VyLzMvMDZiOWUzNDBiMTA3ZDM0ZTZlYTRhMDhkOTY4NDJmMmQzLmpwZyI=",
    sortOrder: 1,
    mediaType: "image",
    entityId: 3,
    entity: "tour",
    resourcePath: "/upload/media/tour/3/06b9e340b107d34e6ea4a08d96842f2d3.jpg",
    altTag: "Lorem Ipsum",
    isActive: true,
    createdAt: "2023-05-14T09:50:19.309Z",
    updatedAt: "2023-05-14T09:50:19.309Z",
  },
  {
    mediaId:
      "IjMtdG91ci1zdG9yYWdlL3VwbG9hZC9tZWRpYS90b3VyLzMvMGI5NjkxMDkwY2I0MTBlOTc0NmY2Y2JlNGM1MTc1YjE2Ny5qcGci",
    sortOrder: 1,
    mediaType: "image",
    entityId: 3,
    entity: "tour",
    resourcePath: "/upload/media/tour/3/0b9691090cb410e9746f6cbe4c5175b167.jpg",
    altTag: "Lorem Ipsum",
    isActive: true,
    createdAt: "2023-05-14T09:41:44.380Z",
    updatedAt: "2023-05-14T09:41:44.380Z",
  },
]

@Component({
  selector: "app-file-upload",
  templateUrl: "./file-upload.component.html",
  styleUrls: ["./file-upload.component.css"],
})
export class FileUploadComponent {
  files: any[] = example

  constructor(private http: HttpClient, private util: UtilService) {}

  onDrop(event: DragEvent): void {
    event.preventDefault()
    const files = event.dataTransfer?.files || null
    this.handleFiles(files)
  }

  onDragOver(event: DragEvent): void {
    event.preventDefault()
  }

  onDragLeave(event: DragEvent): void {
    event.preventDefault()
  }

  handleFiles(files: FileList | null): void {
    if (files) {
      for (let i = 0; i < files.length; i++) {
        const file = files[i]
        // Handle each file as needed (e.g., upload to server)
        console.log("File:", file)
        const httpOption = {
          headers: new HttpHeaders({
            Authorization: "Bearer ",
          }),
        }
        const form = {
          sortOrder: 1,
          mediaType: "image",
          entityId: 3,
          entity: "tour",
          altTag: "Lorem Ipsum",
          isActive: true,
          resource: file,
        }
        const dto = this.util.toFormData(form)
        this.http
          .post("http://localhost:4100/api/v1/media", dto, httpOption)
          .subscribe({
            next: (res: any) => {
              this.files.push(res)
            },
            error: (err) => {
              console.error(err)
            },
          })
      }
    }
  }

  onDelete(file: any) {
    console.log(file)
    this.http
      .delete("http://localhost:4100/api/v1/media/" + file.mediaId)
      .subscribe({
        next: (res: any) => {
          this.files = this.files.filter((f) => f.mediaId != file.mediaId)
        },
        error: (err) => {
          console.error(err)
        },
      })
  }
}
