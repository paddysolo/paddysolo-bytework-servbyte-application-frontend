import { Routes } from '@angular/router';


export const content: Routes = [
  {
    path: 'food',
    loadChildren: () => import('../../pages/home/home.module').then(m => m.HomeModule)
  },
  {
    path: 'restaurants',
    loadChildren: () => import('../../pages/restaurant/restaurant.module').then(m => m.RestaurantModule)
  },
  {
    path: 'restaurants/meal',
    loadChildren: () => import('../../pages/meal/meal.module').then(m => m.MealModule)
  }
];