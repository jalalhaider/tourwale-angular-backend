import { HttpClient, HttpHeaders } from "@angular/common/http"
import { Component } from "@angular/core"
import { UtilService } from "../../../shared/services/util.service"

const example = [
  {
    mediaId:
      "IjMtdG91ci1zdG9yYWdlL3VwbG9hZC9tZWRpYS90b3VyLzMvMGQ0Y2UxNjNhMjExMGY1ZDgwYjUzYzE2ZTViMTAxMDUzMTQucG5nIg==",
    sortOrder: 1,
    mediaType: "image",
    entityId: 3,
    entity: "tour",
    resourcePath:
      "/upload/media/tour/3/0d4ce163a2110f5d80b53c16e5b10105314.png",
    altTag: "Lorem Ipsum",
    isActive: true,
    createdAt: "2023-05-18T20:11:39.512Z",
    updatedAt: "2023-05-18T20:11:39.512Z",
  },
  {
    mediaId:
      "IjMtdG91ci1zdG9yYWdlL3VwbG9hZC9tZWRpYS90b3VyLzMvN2E1MDgyOTMyYjU1OTMxMDg5NDM3OTA0YzcyNjQ3NzNkLkpQRyI=",
    sortOrder: 1,
    mediaType: "image",
    entityId: 3,
    entity: "tour",
    resourcePath: "/upload/media/tour/3/7a5082932b55931089437904c7264773d.JPG",
    altTag: "Lorem Ipsum",
    isActive: true,
    createdAt: "2023-05-18T20:02:37.179Z",
    updatedAt: "2023-05-18T20:02:37.179Z",
  },
  {
    mediaId:
      "IjMtdG91ci1zdG9yYWdlL3VwbG9hZC9tZWRpYS90b3VyLzMvNDAxMDczNTFjMTQ1NDU5NjlhNDg4YzU5ZDI0NjI5YmVjLnBuZyI=",
    sortOrder: 1,
    mediaType: "image",
    entityId: 3,
    entity: "tour",
    resourcePath: "/upload/media/tour/3/40107351c14545969a488c59d24629bec.png",
    altTag: "Lorem Ipsum",
    isActive: true,
    createdAt: "2023-05-18T20:11:39.515Z",
    updatedAt: "2023-05-18T20:11:39.515Z",
  },
  {
    mediaId:
      "IjMtdG91ci1zdG9yYWdlL3VwbG9hZC9tZWRpYS90b3VyLzMvNWRlNDJjMzkyYTkxMDUyYWJlNDFjMjEwMGExOTdiZWM2YS5qcGci",
    sortOrder: 1,
    mediaType: "image",
    entityId: 3,
    entity: "tour",
    resourcePath: "/upload/media/tour/3/5de42c392a91052abe41c2100a197bec6a.jpg",
    altTag: "Lorem Ipsum",
    isActive: true,
    createdAt: "2023-05-18T14:04:34.779Z",
    updatedAt: "2023-05-18T14:04:34.779Z",
  },
  {
    mediaId:
      "IjMtdG91ci1zdG9yYWdlL3VwbG9hZC9tZWRpYS90b3VyLzMvZGJmOGQzNzNlYTRmOWU5YTkxMTBlN2RhNzYwZDA1NmYzLkpQRyI=",
    sortOrder: 1,
    mediaType: "image",
    entityId: 3,
    entity: "tour",
    resourcePath: "/upload/media/tour/3/dbf8d373ea4f9e9a9110e7da760d056f3.JPG",
    altTag: "Lorem Ipsum",
    isActive: true,
    createdAt: "2023-05-18T19:53:03.224Z",
    updatedAt: "2023-05-18T19:53:03.224Z",
  },
  {
    mediaId:
      "IjMtdG91ci1zdG9yYWdlL3VwbG9hZC9tZWRpYS90b3VyLzMvZjBkMjJkMmNmYjI3NDNkNzIzNzM4YjEwN2U4ZjFkMDVmLnBuZyI=",
    sortOrder: 1,
    mediaType: "image",
    entityId: 3,
    entity: "tour",
    resourcePath: "/upload/media/tour/3/f0d22d2cfb2743d723738b107e8f1d05f.png",
    altTag: "Lorem Ipsum",
    isActive: true,
    createdAt: "2023-05-18T20:11:39.512Z",
    updatedAt: "2023-05-18T20:11:39.512Z",
  },
]
@Component({
  selector: "app-file-upload",
  templateUrl: "./file-upload.component.html",
  styleUrls: ["./file-upload.component.css"],
})
export class FileUploadComponent {
  files: any[] = example
  onHover = false

  constructor(private http: HttpClient, private util: UtilService) {}

  onDrop(event: DragEvent): void {
    event.preventDefault()
    const files = event.dataTransfer?.files || null
    this.handleFiles(files)
  }

  onDragOver(event: DragEvent): void {
    event.preventDefault()
    this.onHover = true
  }

  onDragLeave(event: DragEvent): void {
    event.preventDefault()
    this.onHover = false
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
