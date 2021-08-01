import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MealRoutingModule } from './meal-routing.module';
import { MealComponent } from './meal.component';
import { MealItemComponent } from './components/meal-item/meal-item.component';
import { ModalModule } from 'ngx-bootstrap/modal';


@NgModule({
  declarations: [MealComponent, MealItemComponent],
  imports: [
    CommonModule,
    MealRoutingModule,
    ModalModule.forRoot()
  ]
})
export class MealModule { }
