import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, Observable, throwError } from "rxjs";
import { Setting } from "./models";

@Injectable()
export class SettingService {
  constructor(private http: HttpClient) {}

  get(): Observable<any> {
    return this.http.get("http://localhost:4100/api/v1/setting/1").pipe(
      catchError((err) => {
        console.log("setting service - error", err);
        return throwError(err);
      })
    );
  }

  getList(where: any): Observable<any> {
    return this.http.get("http://localhost:4100/api/v1/setting").pipe(
      catchError((err) => {
        console.log("setting service - error", err);
        return throwError(err);
      })
    );
  }

  create(dto: Setting) {
    const httpOption = {};
    return this.http
      .post("http://localhost:4100/api/v1/setting", dto, httpOption)
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
    // Return an observable with a user-facing error message.
    return throwError(
      () => new Error("Something bad happened; please try again later.")
    );
  }
}
