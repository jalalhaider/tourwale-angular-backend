import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../environments/environment";
import { catchError, delay, Observable, tap, throwError } from "rxjs";
import { ILogin } from "./models";
import { LocalStorageService } from "../shared/localstorage.service";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  constructor(
    private http: HttpClient,
    private localstorage: LocalStorageService
  ) {}

  login(dto: ILogin): Observable<any> {
    return this.http.post(`${environment.url}/api/v1/auth/sign-in`, dto).pipe(
      tap((res) => {

        this.save_token(res);
      },delay(1000)),
      catchError(this.handleError)
    );
  }
  logout() {
    this.localstorage.removeItem("user");
  }

  private save_token(data: any) {
    this.localstorage.setItem("user", JSON.stringify(data));
    return;
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
