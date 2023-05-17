import { Injectable } from "@angular/core"
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from "@angular/router"
import { LocalStorageService } from "../shared/services/localstorage.service"

@Injectable({
  providedIn: "root",
})
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private localstorage: LocalStorageService
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | UrlTree {
    // Check if the user is authenticated or meets certain criteria

    let userObj = false
    try {
      const user = this.localstorage.getItem("user")
      userObj = user ? JSON.parse(user) : false
    } catch (error) {
      console.error(error)
      this.localstorage.removeItem("user")
    }

    const isAuthenticated = !!userObj // Replace with your authentication logic

    if (isAuthenticated) {
      return true // Allow access to the route
    } else {
      // Redirect to the login page or another route
      return this.router.parseUrl("/auth/login")
    }
  }
}
