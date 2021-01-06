import { IonicModule } from '@ionic/angular';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentsModule } from '../components/components.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OfferPage } from './offer.page';
 
const routes: Routes = [
  {
    path: '',
    component: OfferPage
  }
];

@NgModule({
  imports: [
    IonicModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    RouterModule.forChild(routes),
    ComponentsModule
  ],
  declarations: [ OfferPage ]
})

export class OfferPageModule{ }
