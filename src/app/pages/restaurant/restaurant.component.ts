import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';
import { ApiEndpoints, ApiMethod } from 'src/app/shared/constants/apiconstants';
import { HttpService } from 'src/app/shared/services/http.service';

@Component({
  selector: 'app-restaurant',
  templateUrl: './restaurant.component.html',
  styleUrls: ['./restaurant.component.scss']
})
export class RestaurantComponent implements OnInit,OnDestroy {

  constructor(private route: ActivatedRoute,private _http:HttpService) { }
  sub: Subscription;
  selectedCity: number;
  serviceProvider: any = [];
  stateName: String = '';
  ngOnInit(): void {
    this.sub = this.route.queryParams.subscribe(params => {
      //defaults to 1
      this.selectedCity = +params['city_id'] || 1;
      // console.log("the selected city is " + this.selectedCity);

      this.fetchServiceProviderByCity(this.selectedCity);
    });
  }

  fetchServiceProviderByCity(cityId:number) {
    this.sub = this._http.makeApiCall(`${ApiEndpoints.GET_SERVICE_PROVIDER_BY_CITY}/${cityId}`, ApiMethod.GET)
      .subscribe((response) => {
        console.log(response);
        this.stateName = response.object[0].city.cityName;
        this.serviceProvider = response.object;
      }
    )
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

}
