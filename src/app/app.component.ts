import { Component, OnInit } from "@angular/core"
import { Router } from "@angular/router"

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent implements OnInit {
  title = "app"

  constructor(private router: Router) {}

  ngOnInit(): void {
    // This code will be executed when the component initializes
    //this.router.navigateByUrl("/dashboard")
    // You can perform initialization tasks here, such as fetching data from a server, subscribing to observables, etc.
  }
}
