import { Injectable } from "@angular/core"
import { catchError, Observable, throwError } from "rxjs"
import { Category } from "./models/category.models"
import { HttpClient, HttpErrorResponse, HttpParams } from "@angular/common/http"
import { environment } from "../../environments/environment"
@Injectable({
  providedIn: "root",
})
export class CategoryService {
  constructor(private http: HttpClient) {}

  get(id: number) {
    return this.http
      .get(`${environment.url}/api/v1/category/` + id)
      .pipe(catchError(this.handleError))
  }

  getList(where: any): Observable<any> {
    const params = new HttpParams({ fromObject: where })
    return this.http
      .get(`${environment.url}/api/v1/category`, { params })
      .pipe(catchError(catchError(this.handleError)))
  }

  create(dto: Category) {
    const httpOption = {}
    return this.http
      .post(`${environment.url}/api/v1/category`, dto, httpOption)
      .pipe(catchError(this.handleError))
  }

  update(id: number, dto: Category) {
    const httpOption = {}
    return this.http
      .put(`${environment.url}/api/v1/category/` + id, dto, httpOption)
      .pipe(catchError(this.handleError))
  }

  uploadImage(dto: any) {
    const httpOption = {}
    return this.http
      .post(`${environment.url}/api/v1/media/`, dto, httpOption)
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
    // Return an observable with a category-facing error message.
    return throwError(
      () => new Error("Something bad happened; please try again later.")
    )
  }
}
