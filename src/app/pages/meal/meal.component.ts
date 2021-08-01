import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { ApiEndpoints, ApiMethod } from 'src/app/shared/constants/apiconstants';
import { HttpService } from 'src/app/shared/services/http.service';

@Component({
  selector: 'app-meal',
  templateUrl: './meal.component.html',
  styleUrls: ['./meal.component.scss']
})
export class MealComponent implements OnInit,OnDestroy  {
  
  constructor(private route: ActivatedRoute, private _http: HttpService) { }
  
  sub: Subscription;
  selectedProvider: number;
  mealsByProvider: any = [];
  providerName: String = '';


  ngOnInit(): void {
    this.sub = this.route.queryParams.subscribe(params => {
      //defaults to 1
      this.selectedProvider = +params['provider_id'] || 1;
      // console.log("the selected city is " + this.selectedCity);

      this.fetchMealsByServiceProvider(this.selectedProvider);
    });
  }

  fetchMealsByServiceProvider(providerId:number) {
    this.sub = this._http.makeApiCall(`${ApiEndpoints.GET_MEALS_BY_SERVICE_PROVIDER}/${providerId}`, ApiMethod.GET)
      .subscribe((response) => {
        console.log(response);
        this.providerName = response.object[0].serviceProvider.restaurantName;
        this.mealsByProvider = response.object;
      }
    )
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

}
