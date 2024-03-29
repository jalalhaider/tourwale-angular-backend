import { HttpClient, HttpErrorResponse } from "@angular/common/http"
import { Injectable } from "@angular/core"
import { catchError, Observable, throwError } from "rxjs"
import { Setting } from "./models"
import { environment } from "../../environments/environment"

@Injectable()
export class SettingService {
  constructor(private http: HttpClient) {}

  get(id: number): Observable<Setting> {
    return this.http
      .get(`${environment.url}/api/v1/setting/` + id)
      .pipe(catchError(this.handleError))
  }

  getList(where: any): Observable<any> {
    return this.http.get(`${environment.url}/api/v1/setting`).pipe(
      catchError((err) => {
        console.log("setting service - error", err)
        return throwError(err)
      })
    )
  }

  create(dto: Setting) {
    const httpOption = {}
    return this.http
      .post(`${environment.url}/api/v1/setting`, dto, httpOption)
      .pipe(catchError(this.handleError))
  }

  update(id: number, dto: Setting) {
    const httpOption = {}
    return this.http
      .put(`${environment.url}/api/v1/setting/` + id, dto, httpOption)
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
    // Return an observable with a user-facing error message.
    return throwError(
      () => new Error("Something bad happened; please try again later.")
    )
  }
}
