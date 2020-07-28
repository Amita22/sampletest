import { Component, OnInit } from '@angular/core';
import { AddHotelsService } from '../services/add-hotels.service';
import { Hotel } from '../model/hotelModel';
import { Subscription} from 'rxjs'
import { Router } from "@angular/router";


@Component({
  selector: 'app-view-hotel-added',
  templateUrl: './view-hotel-added.component.html',
  styleUrls: ['./view-hotel-added.component.css']
})
export class ViewHotelAddedComponent implements OnInit {

  hotelDisplay: Hotel[] = [];
  private hotelSub : Subscription;


  constructor(public addhotelsService: AddHotelsService,
    private router:Router) { }

  ngOnInit() {
    this.addhotelsService.getHotels();
    this.hotelSub = this.addhotelsService.getHotelUpdateListener().subscribe((hotelDetails:Hotel[]) => {
      //console.log("placeDetails cards",placeDetails);
      this.hotelDisplay = hotelDetails;
      console.log("amita: ", this.hotelDisplay);
      //console.log("heyyyyy: ", this.placeDisplay)
    })
  }
  
}
