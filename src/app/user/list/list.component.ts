import { Component, OnInit } from "@angular/core";
import { Employee, TableRows, TopSelling, User } from "./user-data";

@Component({
  selector: "app-list",
  templateUrl: "./list.component.html",
  styleUrls: ["./list.component.scss"],
})
export class ListComponent implements OnInit {
  topSelling: User[];

  trow: TableRows[];

  constructor() {
    this.topSelling = TopSelling;

    this.trow = Employee;
  }
  ngOnInit(): void {}
}
