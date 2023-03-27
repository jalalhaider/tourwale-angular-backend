import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, Observable, throwError } from "rxjs";
import { User } from "./models";

@Injectable()
export class UserService {
  constructor(private http: HttpClient) {}

  get(id: number): Observable<User> {
    return this.http
      .get("http://localhost:4100/api/v1/user/" + id)
      .pipe(catchError(this.handleError));
  }

  getList(where: any): Observable<any> {
    return this.http.get("http://localhost:4100/api/v1/user").pipe(
      catchError((err) => {
        console.log("user service - error", err);
        return throwError(err);
      })
    );
  }

  create(dto: User) {
    const httpOption = {};
    return this.http
      .post("http://localhost:4100/api/v1/user", dto, httpOption)
      .pipe(catchError(this.handleError));
  }

  update(id: number, dto: User) {
    const httpOption = {};
    return this.http
      .put("http://localhost:4100/api/v1/user/" + id, dto, httpOption)
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
