import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { Validators, FormGroup, FormControl } from '@angular/forms';

import {
  debounceTime, distinctUntilChanged, switchMap
} from 'rxjs/operators';

import { UserService } from '../../db/user-service';
import { CategoryService } from '../../db/category-service';
import { OfferService } from '../../db/offer-service';
import { UserInfo } from '../../db/UserInfo';
import { CategoryInfo } from '../../db/CategoryInfo';
import { OfferInfo } from '../../db/OfferInfo';
import { off } from 'process';

@Component({
  selector: 'app-offer',
  templateUrl: './offer.page.html',
  styleUrls: [
    './styles/offer.page.scss',
    './styles/offer.shell.scss',
    './styles/offer.responsive.scss',
    './styles/forms-filters.page.scss',
    './styles/forms-filters.page.scss',
    './styles/forms-validations.page.scss'
  ]
})

export class OfferPage  implements OnInit {
    private users:UserInfo[] = [];
    offerCategories:CategoryInfo[] = [];
    validationsForm: FormGroup;
    userID:number = 1;

    validations = {
      'offer_title': [
        { type: 'required', message: 'Title is required.' }
      ],
      'offer_body': [
        { type: 'required', message: 'Offer is required.' }
      ] 
    };

    constructor(private router: Router, private route: ActivatedRoute, private userService: UserService, private categoryService: CategoryService, private offerService: OfferService) {
      this.route.queryParams.subscribe(params => {
        if (this.router.getCurrentNavigation().extras.state) {
          var offerID = this.router.getCurrentNavigation().extras.state.offerID;

          console.log("Offer ID = " + offerID);
        }
      });
    }

    ngOnInit(): void {
      this.validationsForm = new FormGroup({
        'offer_title': new FormControl('', Validators.required),
        'offer_body': new FormControl('', Validators.required),
        'offer_category': new FormControl(this.offerCategories[0], Validators.required)
      });

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
        this.offerCategories = categories; 
        console.log("---->" + this.offerCategories.length);
        console.log("---->" + this.offerCategories[2].Name + " " + this.offerCategories[2].CategoryID);
      });
    }

    onSubmit(values) {
      console.log(values);
      var offer:OfferInfo = new OfferInfo();
      offer.Title = values.offer_title;
      offer.CategoryID = values.offer_category;
      offer.Body = values.offer_body;
      offer.UserID = this.userID;

      this.offerService.addOffer(offer)
      .subscribe(result => {
       console.log("Wrote data to MongoDB. -- " + result);
      });
    }
 }
