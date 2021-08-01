import { Component, Input, NgZone, OnInit, TemplateRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Subscription } from 'rxjs';
import { ApiEndpoints, ApiMethod } from 'src/app/shared/constants/apiconstants';
import { HttpService } from 'src/app/shared/services/http.service';
import { environment } from 'src/environments/environment';
declare const PaystackPop: any;

@Component({
  selector: 'app-meal-item',
  templateUrl: './meal-item.component.html',
  styleUrls: ['./meal-item.component.scss']
})
export class MealItemComponent implements OnInit {

  constructor(private modalService: BsModalService, private route : ActivatedRoute,
    private router : Router, private _http: HttpService,private zone: NgZone) {}
  
  @Input() mealId: number = 0;
  @Input() mealName: string = '';
  @Input() pictureUrl: string = '';
  @Input() price: number = 0;
  @Input() preparationTime: number = 0;
  @Input() description: string = '';

  selectedMealID: number;
  selectedMealName: string;
  selectedMealPrice: number;
  status: any;

  customerEmail: string='';
  sub: Subscription;
  ngOnInit(): void {
  }

  modalRef: BsModalRef;
  config = {
    animated: true
  };

 
  openModal(template: TemplateRef<any>, mealName: string, price: number,mealId:number) {
    console.log("Name : " + mealName)
    console.log("price : " + price)
    console.log("id : " + mealId)
    this.selectedMealName = mealName;
    this.selectedMealPrice = price;
    this.selectedMealID = mealId;

    this.modalRef = this.modalService.show(template, this.config);
  }

  makeOrder(customerEmail:string) {
    console.log("client email "+customerEmail)
    this.modalService.hide();
    let handlePayComplete =  (response)=>{
      console.log('Payment complete! Reference: ' + response.reference);

      this.sub = this._http.makeApiCall(`${ApiEndpoints.VERIFY_PAYMENT}/${response.reference}/${this.selectedMealID}`, ApiMethod.GET)
        .subscribe((response) => {
          console.log(response);
          this.status = response.isSuccessful;
          if (response.isSuccessful) {
            this.zone.run(() => {
              //this should be the call back page, due to time constrait am returnin the user back to the home page
              this.router.navigate(['/food', {
                status : this.status}]);
            });
            
          }
        });
  
     
    }

    let handler = PaystackPop.setup({
      key: environment.payStackApiKey,
      email: customerEmail,
      amount: this.selectedMealPrice * 100,

      callback: function(response) {
        handlePayComplete(response);
        // Make an API call to your server with the reference to verify the transaction
        
      }
    });

   
    handler.openIframe();
  }

}
