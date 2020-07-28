import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PlaceDespService } from '../services/place-desp.service';
import { AddHotelsService } from '../services/add-hotels.service';
import { Hotel } from '../model/hotelModel';
import { HotelService } from '../services/hotel.service';
import { Subscription} from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-hotel-dashboard',
  templateUrl: './hotel-dashboard.component.html',
  styleUrls: ['./hotel-dashboard.component.css']
})
export class HotelDashboardComponent implements OnInit {

  public place = [];
  public hotel: Hotel[] = [];
  hotel_list = [];
  final_hotel_list = [];
  private hotelSub : Subscription;
  form: FormGroup;

  constructor(public placeDespService: PlaceDespService,
    public addhotelsService: AddHotelsService, public hotelService: HotelService,
    public router: Router) { }

  ngOnInit() {
    this.form = new FormGroup({
      start: new FormControl(null, {validators:[Validators.required]}),
      end: new FormControl(null, {validators:[Validators.required]}),
      people: new FormControl(null, {validators:[Validators.required]}),
      // city: new FormControl(null, {validators:[Validators.required]}),
    })

    

    // this.place = this.placeDespService.getLocation();
    // this.addhotelsService.getHotels();
    // this.hotelSub = this.addhotelsService.getHotelUpdateListener().subscribe((hotelDetails:Hotel[]) => {
    //   this.hotel = hotelDetails;
    //   console.log("the hotels are: ", this.hotel);
    //   console.log("places are: ", this.place["city"]);
    //   //if(this.place["city"]===this.hotel["city"]);
    // })
    
  }


   proceed(){
  //   console.log("city in place array: ", this.place["city"]);
  // console.log("hotels should come here: ", this.hotel);
  // this.hotel_list = [];
  // //console.log("hotel_list", this.hotel_list);
  // this.hotel.forEach(function(value){
  //   console.log("value in hotel page is:", value);
  //   this.hotel_list.push(value);
  //   console.log("hotel_list", this.hotel_list);
  // }.bind(this))

  // this.hotel_list.forEach(function(value){
  //   value.forEach(function(value1){
  //     //console.log("value1: ", value1);
  //     // console.log(value1["city"]);
  //     // console.log(this.place["city"]);
  //     if(JSON.stringify(this.place["city"])===JSON.stringify(value1["city"])){
  //       console.log("inside if");
  //       this.final_hotel_list = value1;
  //       console.log("deep: ", this.final_hotel_list);
  //     }
  //   }.bind(this))
  // }.bind(this))
  //this.router.navigate(["./hotel-card", this.final_hotel_list]);
  //this.hotelService.hotelFound(this.form.value.start, this.form.value.end, this.form.value.people, this.final_hotel_list, this.place);
  // this.final_hotel_list = this.hotelService.hotelFound( this.final_hotel_list);
  this.hotelService.start_date(this.form.value.start);
  this.hotelService.end_date(this.form.value.end);
  this.hotelService.no_of_people(this.form.value.people);
  this.router.navigate(["./hotel-card"]);
   }
    //console.log("hotel is of the type",typeof(this.hotel));
    
  }

  
