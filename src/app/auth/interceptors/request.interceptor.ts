import { Injectable } from "@angular/core";
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from "@angular/common/http";
import { Observable } from "rxjs";
// You can add URL which don't need AUTH header
const whiteListUrls = ["login", "refreshToken"];

@Injectable({
  providedIn: "root",
})
export class AuthInterceptor implements HttpInterceptor {
  constructor() {}
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (whiteListUrls.find((w) => request.url.includes(w))) {
      return next.handle(request);
    }
    const token = window.localStorage.get("token");
    request = request.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });
    return next.handle(request);
  }
}
