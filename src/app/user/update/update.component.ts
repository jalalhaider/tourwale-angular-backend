import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { User } from "../models";

@Component({
  selector: "app-update",
  templateUrl: "./update.component.html",
  styleUrls: ["./update.component.scss"],
})
export class UpdateComponent implements OnInit {
  userId: string;
  user: User = {};
  constructor(private route: ActivatedRoute) {
    this.userId = "";
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.userId = params["user_id"];
      this.user = this.getUser();
    });
  }

  getUser() {
    //Get user
    return {
      id: "1",
      firstName: "Jalal",
      lastName: "Haider",
      phone: "+923352732318",
      email: "sjalalhaider1@gmail.com",
      username: "jalalhaider",
      role: "one",
      gender: "male",
      password: "123",
      isActive: true,
    };
  }
  onSubmit(event: any) {
    console.log("update component onSubmit Event", event);
    alert("user submitted");
  }
}
