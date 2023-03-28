import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, Observable, throwError } from "rxjs";
import { User } from "./models";
import { environment } from "../../environments/environment";

const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsImVtYWlsIjoiamhhaWRlckBzdW5ib25uLmNvbSIsImlhdCI6MTY3OTkxOTQ5MiwiZXhwIjoxNjc5OTIwMzkyfQ.S1QX2W3tfnJMQbVAA1CCKVSOSPROOJ6kVjI3j0sIyNE";
@Injectable()
export class UserService {
  constructor(private http: HttpClient) {}

  get(id: number): Observable<User> {
    const httpOption = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",

        Authorization: "Bearer " + token,
      }),
    };
    return this.http
      .get("http://localhost:4100/api/v1/user/" + id, httpOption)
      .pipe(catchError(this.handleError));
  }

  getList(where: any): Observable<any> {
    const httpOption = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",

        Authorization: "Bearer " + token,
      }),
    };
    return this.http
      .get(`${environment.url}/api/v1/user`, httpOption)
      .pipe(catchError(this.handleError));
  }

  create(dto: User) {
    const httpOption = {
      headers: new HttpHeaders({
        Authorization: "Bearer " + token,
      }),
    };
    return this.http
      .post("http://localhost:4100/api/v1/user", dto, httpOption)
      .pipe(catchError(this.handleError));
  }

  update(id: number, dto: User) {
    const httpOption = {
      headers: new HttpHeaders({
        Authorization: "Bearer " + token,
      }),
    };
    return this.http
      .put("http://localhost:4100/api/v1/user/" + id, dto, httpOption)
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    let message: any = null;
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error("An error occurred:", error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      message = error.status + " " + error.error?.message;
      console.error(
        `Backend returned code ${error.status}, body was: `,
        error.error
      );
    }
    // Return an observable with a user-facing error message.
    return throwError(
      () =>
        new Error(
          message ? message : "Something bad happened; please try again later."
        )
    );
  }
}
