import { IonicModule } from '@ionic/angular';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentsModule } from '../components/components.module';
import { OfferDetailsPage } from './offer-details.page';
 
const routes: Routes = [
  {
    path: '',
    component: OfferDetailsPage
  }
];

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    RouterModule.forChild(routes),
    ComponentsModule
  ],
  declarations: [ OfferDetailsPage ]
})
export class OfferDetailsPageModule{

}
