import { Injectable } from "@angular/core"
import { catchError, Observable, throwError } from "rxjs"
import { Iitinerary } from "./models"
import { HttpClient, HttpErrorResponse, HttpParams } from "@angular/common/http"
import { environment } from "../../environments/environment"
@Injectable()
export class ItineraryService {
  constructor(private http: HttpClient) {}

  get(tourId: number, sortOrder: number) {
    return this.http
      .get(`${environment.url}/api/v1/tour-itinerary/${tourId}/${sortOrder}`)
      .pipe(catchError(this.handleError))
  }

  getList(where: any): Observable<any> {
    const params = new HttpParams({ fromObject: where })
    return this.http
      .get(`${environment.url}/api/v1/tour-itinerary`, { params })
      .pipe(catchError(catchError(this.handleError)))
  }

  create(dto: Iitinerary) {
    const httpOption = {}
    return this.http
      .post("http://localhost:4100/api/v1/tour-itinerary", dto, httpOption)
      .pipe(catchError(this.handleError))
  }

  update(tourId: number, sortOrder: number, dto: Iitinerary) {
    const httpOption = {}
    return this.http
      .put(
        `${environment.url}/api/v1/tour-itinerary/${tourId}/${sortOrder}`,
        dto,
        httpOption
      )
      .pipe(catchError(this.handleError))
  }

  uploadImage(dto: any) {
    const httpOption = {}
    return this.http
      .post(`${environment.url}/api/v1/media/`, dto, httpOption)
      .pipe(catchError(this.handleError))
  }

  delete(tourId: number, sortOrder: number) {
    return this.http
      .delete(`${environment.url}/api/v1/tour-itinerary/${tourId}/${sortOrder}`)
      .pipe(catchError(catchError(this.handleError)))
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
    // Return an observable with a itinerary-facing error message.
    return throwError(
      () => new Error(`${error.status} : ${error.error.message}`)
    )
  }
}
