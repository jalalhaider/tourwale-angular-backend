import { Injectable } from "@angular/core"
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from "@angular/router"

@Injectable({
  providedIn: "root",
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | UrlTree {
    // Check if the user is authenticated or meets certain criteria
    const isAuthenticated = false // Replace with your authentication logic

    if (isAuthenticated) {
      return true // Allow access to the route
    } else {
      // Redirect to the login page or another route
      return this.router.parseUrl("/auth/login")
    }
  }
}
