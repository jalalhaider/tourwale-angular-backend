import { Component } from "@angular/core";
import { Category } from "../models/category.models";
import { CategoryService } from "../category.service";
import { Router } from "@angular/router";

@Component({
    selector: 'app-category',
    templateUrl:'./list.component.html',

})
export class ListComponent {
    list: Category[] = [];
    constructor(private categoryService: CategoryService, private router: Router) {}
  
    ngOnInit() {
      const where = {};
      this.categoryService.getList(where).subscribe((result) => {
        this.list = result;
      });
    }
  
    onClick($event: any, row: Category) {
      this.router.navigateByUrl(`/category/update?category_id=${row.categoryId}`);
    }

} 