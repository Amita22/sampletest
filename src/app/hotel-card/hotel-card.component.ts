import { Component, OnInit } from '@angular/core';
import { HotelService } from '../services/hotel.service';
import { Hotel } from '../model/hotelModel';
import { Router } from '@angular/router';
import { AddHotelsService } from '../services/add-hotels.service';
import { Subscription} from 'rxjs';
import { PlaceDespService } from '../services/place-desp.service';
import { PlaceCardService } from '../services/place-card.service';


@Component({
  selector: 'app-hotel-card',
  templateUrl: './hotel-card.component.html',
  styleUrls: ['./hotel-card.component.css']
})
export class HotelCardComponent implements OnInit {

  constructor(public hotelService: HotelService,
    public router: Router, public addhotelsService: AddHotelsService,
    public placeDespService: PlaceDespService, public placecardService: PlaceCardService) { }

  public place;
  public hotel:Hotel[] = [];
  public hotel_list = [];
  private hotelSub : Subscription;
  private usermail;

  ngOnInit() {
    // this.final_list_hotel = this.hotelService.hotel_list();
    // console.log("The hotel cards are: ", this.final_list_hotel);
    // console.log("hotel card:", this.hotelService.hotel_list());
    // this.hotelDisplay = this.hotelService.hotel_list();
    this.usermail = this.placecardService.user();
    console.log("hotel card:", this.usermail);
    this.place = this.placeDespService.getLocation();
    console.log("place inside hotel card: ", this.place);
    this.addhotelsService.getHotels();
    this.hotelSub = this.addhotelsService.getHotelUpdateListener().subscribe((hotelDetails:Hotel[]) => {
      this.hotel = hotelDetails;
      console.log("the hotels are: ", this.hotel);
      //console.log("places are: ", this.hotel["_id"]);
      this.hotel_list = [];
      this.hotel.forEach(function(value){
        console.log("hotel card are: ", value["_id"]["city"]);
        if(JSON.stringify(this.place["city"])===JSON.stringify(value["_id"]["city"])){
          console.log("inside if");
          this.hotel_list.push(value);
        }
      }.bind(this))
      if(this.hotel_list.length>0){
        this.hotel = this.hotel_list;
      }
      console.log("finalized list: ", this.hotel);
      //if(this.place["city"]===this.hotel["city"]);
    })
  }

  hotelDescription(hotel: any){
   console.log("place city is: ", hotel);
   this.hotelService.Description(hotel);
   this.router.navigate(["/hotelDesp"]);
   //console.log("hotel card city: ", this.hotel["city"]);
  }

}
