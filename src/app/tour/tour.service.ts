import { Injectable } from "@angular/core"
import { catchError, Observable, throwError } from "rxjs"
import { Tour } from "./models/tour.models"
import { HttpClient, HttpErrorResponse } from "@angular/common/http"

@Injectable()
export class TourService {
  constructor(private http: HttpClient) {}

  get(id: number) {
    return this.http
      .get("http://localhost:4100/api/v1/tour/" + id)
      .pipe(catchError(this.handleError))
  }

  getList(where: any): Observable<any> {
    return this.http
      .get("http://localhost:4100/api/v1/tour")
      .pipe(catchError(catchError(this.handleError)))
  }

  create(dto: Tour) {
    const httpOption = {}
    return this.http
      .post("http://localhost:4100/api/v1/tour", dto, httpOption)
      .pipe(catchError(this.handleError))
  }

  update(id: number, dto: Tour) {
    const httpOption = {}
    return this.http
      .put("http://localhost:4100/api/v1/tour/" + id, dto, httpOption)
      .pipe(catchError(this.handleError))
  }

  uploadImage(dto: any) {
    const httpOption = {}
    return this.http
      .post("http://localhost:4100/api/v1/media/", dto, httpOption)
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
    return throwError(
      () => new Error("Something bad happened; please try again later.")
    )
  }
}