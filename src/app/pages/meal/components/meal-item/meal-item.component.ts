import { Component, Input, OnInit, TemplateRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { environment } from 'src/environments/environment';
declare const PaystackPop: any;

@Component({
  selector: 'app-meal-item',
  templateUrl: './meal-item.component.html',
  styleUrls: ['./meal-item.component.scss']
})
export class MealItemComponent implements OnInit {

  constructor(private modalService: BsModalService, private route : ActivatedRoute,
    private router : Router) {}

  @Input() mealId: number = 0;
  @Input() mealName: string = '';
  @Input() pictureUrl: string = '';
  @Input() price: number = 0;
  @Input() preparationTime: number = 0;
  @Input() description: string = '';

  selectedMealID: number;
  selectedMealName: string;
  selectedMealPrice: number;

  customerEmail: string='';

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

    let handlePayComplete = (response)=>{
      console.log('Payment complete! Reference: ' + response.reference);
  
      // this.router.navigate(['/order-confirmation', {
      //   ref: response.reference,
      //   meal_id: this.selectedMealID
      // }]);
      // window.location.href = "localhost:4200/verify-transaction";  
    }

    let handler = PaystackPop.setup({
      key: environment.payStackApiKey,
      email: customerEmail,
      amount: this.selectedMealPrice * 100,
      
      callback: function(response) {
        handlePayComplete(response);
        // Make an AJAX call to your server with the reference to verify the transaction
      }
    });

   
    handler.openIframe();
  }

}
