import { IonicModule } from '@ionic/angular';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentsModule } from '../components/components.module';
import { SnapshotPage } from './snapshot.page';
 
const snapshotRoutes: Routes = [
  {
    path: '',
    component: SnapshotPage
  }
];

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    RouterModule.forChild(snapshotRoutes),
    ComponentsModule
  ],
  declarations: [ SnapshotPage ]
})
export class SnapshotPageModule{

}
