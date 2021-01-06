import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';

import {
  debounceTime, distinctUntilChanged, switchMap
} from 'rxjs/operators';

import { UserService } from '../../db/user-service';
import { CategoryService } from '../../db/category-service';
import { UserInfo } from '../../db/UserInfo';
import { CategoryInfo } from '../../db/CategoryInfo';

@Component({
  selector: 'app-snapshot',
  templateUrl: './snapshot.page.html',
  styleUrls: [
    './styles/snapshot.page.scss',
    './styles/snapshot.shell.scss',
    './styles/snapshot.responsive.scss'
  ]
})

export class SnapshotPage  implements OnInit {
    private users:UserInfo[] = [];
    private categories:CategoryInfo[] = [];

    constructor(private userService: UserService, private categoryService: CategoryService) {}

    ngOnInit(): void {
      //this.getUsers();
      this.getCategories();
    }
  
    getUsers(): void {
      this.userService.getUsers()
      .subscribe(users => {
        console.log("---->" + users.length);
        this.users = users; 
        console.log("---->" + this.users.length);
        console.log("---->" + this.users[1].UserName);
      });
    }

    getCategories(): void {
      this.categoryService.getCategories()
      .subscribe(categories => {
        console.log("---->" + categories.length);
        this.categories = categories; 
        console.log("---->" + this.categories.length);
        console.log("---->" + this.categories[1].Name);
      });
    }
 }
