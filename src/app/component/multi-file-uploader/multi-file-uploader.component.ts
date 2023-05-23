import { Component, EventEmitter, Output } from "@angular/core"

@Component({
  selector: "app-multi-file-uploader",
  templateUrl: "./multi-file-uploader.component.html",
  styleUrls: ["./multi-file-uploader.component.css"],
})
export class MultiFileUploaderComponent {
  files: any[] = []
  onHover = false

  @Output() onDropFiles = new EventEmitter<FileList>()

  constructor() {}

  onDrop(event: DragEvent): void {
    event.preventDefault()
    const files = event.dataTransfer?.files || null

    if (files) {
      console.log("files,", files)
      this.onDropFiles.emit(files)
    }
  }

  onDragOver(event: DragEvent): void {
    event.preventDefault()
    this.onHover = true
  }

  onDragLeave(event: DragEvent): void {
    event.preventDefault()
    this.onHover = false
  }

  handleFiles(files: FileList | null): void {}
  onDelete(file: any) {}
}
