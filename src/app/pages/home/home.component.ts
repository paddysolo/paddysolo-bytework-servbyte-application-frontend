import { Component, OnInit } from '@angular/core';
import { ApiEndpoints, ApiMethod } from 'src/app/shared/constants/apiconstants';
import { HttpService } from 'src/app/shared/services/http.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private _http:HttpService) { }

  cities: any = [];
  selectedCityId: number =-1;

  ngOnInit(): void {
    this.fetchCities();
  }

  fetchCities() {
    this._http.makeApiCall(ApiEndpoints.GET_CITIES_ENDPOINT, ApiMethod.GET).subscribe(
      (response) => {
        console.log(response);
        this.cities = response.object;
        
      }
    )
  }

  onCityChange(id: number) {
    // console.log(id);
    this.selectedCityId = id;
  }

}
