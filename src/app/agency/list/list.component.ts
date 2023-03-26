import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Agency } from "../models";
import { Employee, TableRows, TopSelling } from "./user-data";

@Component({
  selector: "app-list",
  templateUrl: "./list.component.html",
  styleUrls: ["./list.component.scss"],
})
export class ListComponent implements OnInit {
  topSelling: Agency[];

  trow: TableRows[];

  constructor(private router: Router) {
    this.topSelling = TopSelling;

    this.trow = Employee;
  }
  ngOnInit(): void {}

  onClick($event: any, row: any) {
    row.id = 1;
    this.router.navigateByUrl(`/user/update?user_id=${row.id}`);
  }
}