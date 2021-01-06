import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { Observable, Subject } from 'rxjs';

import {
  debounceTime, distinctUntilChanged, switchMap
} from 'rxjs/operators';

import { UserService } from '../../db/user-service';
import { CategoryService } from '../../db/category-service';
import { OfferService } from '../../db/offer-service';
import { UserInfo } from '../../db/UserInfo';
import { CategoryInfo } from '../../db/CategoryInfo';
import { OfferInfo } from '../../db/OfferInfo';

@Component({
  selector: 'app-offer-details',
  templateUrl: './offer-details.page.html',
  styleUrls: [
    './styles/offer-details.page.scss',
    './styles/offer-details.shell.scss',
    './styles/offer-details.responsive.scss'
  ]
})

export class OfferDetailsPage  implements OnInit {
    private users:UserInfo[] = [];
    private categories:CategoryInfo[] = [];
    public offer:OfferInfo;
    public strCategory:string;

    constructor(private router: Router, private route: ActivatedRoute, private userService: UserService, private categoryService: CategoryService, private offerService: OfferService) {
      this.route.queryParams.subscribe(params => {
        if (this.router.getCurrentNavigation().extras.state) {
          var Id = this.router.getCurrentNavigation().extras.state.offerID;

          this.getOffer(Id);

          

          console.log("Offer ID = " + Id);
        }
      });
    }

    ngOnInit(): void {
    }
  
    getOffer(Id:string): void {
      this.offerService.getOffer(Id)
      .subscribe(offer => {
        this.offer = offer; 
        console.log("Offer ID = " + this.offer.Id);
        console.log("Title = " + this.offer.Title);

        this.getCategories();
      });
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
        this.categories = categories; 

        for(var i:number=0;i<this.categories.length;i++) {
          if(this.categories[i].CategoryID == this.offer.CategoryID) {
            this.strCategory = this.categories[i].Name;
            this.offer.CategoryImageFullLazy = "./assets/interests/" + this.categories[i].ImageName;
          }
        }

      });
    }
 }
