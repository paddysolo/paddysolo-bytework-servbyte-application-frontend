import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-restaurant-item',
  templateUrl: './restaurant-item.component.html',
  styleUrls: ['./restaurant-item.component.scss']
})
export class RestaurantItemComponent implements OnInit {
  @Input() providerId: number = 0;
  @Input() name: string = '';
  @Input() logoUrl: string = '';
  constructor() { }

  ngOnInit(): void {
  }

}
