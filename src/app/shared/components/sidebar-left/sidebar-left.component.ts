import { Component, OnInit } from '@angular/core';
import { ApiEndpoints, ApiMethod } from '../../constants/apiconstants';
import { HttpService } from '../../services/http.service';

@Component({
  selector: 'app-sidebar-left',
  templateUrl: './sidebar-left.component.html',
  styleUrls: ['./sidebar-left.component.scss']
})
export class SidebarLeftComponent implements OnInit {
  
  constructor(private _http:HttpService) { }
  
  services: any = [];
  
  ngOnInit(): void {
    this.fetchCategory();
  }

  fetchCategory() {
    this._http.makeApiCall(ApiEndpoints.GET_CATEGORY_ENDPOINT, ApiMethod.GET).subscribe(
      (response) => {
        console.log(response);
        this.services = response.object;
        
      }
    )
  }
}
