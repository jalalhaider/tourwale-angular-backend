import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, Observable, throwError } from "rxjs";
import { Agency } from "./models";

@Injectable()
export class AgencyService {
  constructor(private http: HttpClient) {}

  get(id: number): Observable<Agency> {
    return this.http
      .get("http://localhost:4100/api/v1/agency/" + id)
      .pipe(catchError(this.handleError));
  }

  getList(where: any): Observable<any> {
    return this.http
      .get("http://localhost:4100/api/v1/agency")
      .pipe(catchError(catchError(this.handleError)));
  }

  create(dto: Agency) {
    const httpOption = {};
    return this.http
      .post("http://localhost:4100/api/v1/agency", dto, httpOption)
      .pipe(catchError(this.handleError));
  }

  update(id: number, dto: Agency) {
    const httpOption = {};
    return this.http
      .put("http://localhost:4100/api/v1/agency/" + id, dto, httpOption)
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error("An error occurred:", error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `,
        error.error
      );
    }
    // Return an observable with a agency-facing error message.
    return throwError(
      () => new Error("Something bad happened; please try again later.")
    );
  }
}
