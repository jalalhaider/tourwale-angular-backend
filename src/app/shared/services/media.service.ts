import { HttpClient, HttpErrorResponse, HttpParams } from "@angular/common/http"
import { Injectable } from "@angular/core"
import { environment } from "../../../environments/environment"
import { catchError, throwError } from "rxjs"

@Injectable({
  providedIn: "root",
})
export class MediaService {
  constructor(private http: HttpClient) {}

  uploadImage(dto: any) {
    const httpOption = {}
    return this.http
      .post(`${environment.url}/api/v1/media/`, dto, httpOption)
      .pipe(catchError(this.handleError))
  }

  getMedia(entityId: number, entity: string) {
    const params = new HttpParams({ fromObject: { entityId, entity } })
    return this.http
      .get(`${environment.url}/api/v1/media`, { params })
      .pipe(catchError(this.handleError))
  }

  deleteImage(mediaId: string) {
    const httpOption = {}
    return this.http
      .delete(`${environment.url}/api/v1/media/` + mediaId)
      .pipe(catchError(this.handleError))
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error("An error occurred:", error.error)
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `,
        error.error
      )
    }
    // Return an observable with a tour-facing error message.
    return throwError(() => {
      const rr: any = new Error(
        "Something bad happened; please try again later."
      )
      rr.message = error.error.message
      return rr
    })
  }
}
