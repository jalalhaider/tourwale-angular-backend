import { Injectable } from "@angular/core"
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from "@angular/common/http"
import { Observable } from "rxjs"
import { LocalStorageService } from "../../shared/services"
import { Router } from "@angular/router"

// You can add URL which don't need AUTH header
const whiteListUrls = ["login", "refreshToken"]

@Injectable({
  providedIn: "root",
})
export class RequestInterceptor implements HttpInterceptor {
  constructor(
    private router: Router,
    private localstorage: LocalStorageService
  ) {}
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    console.log("request", request)

    if (whiteListUrls.find((w) => request.url.includes(w))) {
      return next.handle(request)
    }
    let userObj = null
    try {
      const user = this.localstorage.getItem("user")
      userObj = user ? JSON.parse(user) : false
    } catch (error) {
      console.error(error)
      this.localstorage.removeItem("user")
      this.router.parseUrl("/auth/login")
    }
    const token = userObj.accessToken
    request = request.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    })
    return next.handle(request)
  }
}
