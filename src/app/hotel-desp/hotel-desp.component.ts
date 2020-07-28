import { Component, OnInit } from '@angular/core';
import { HotelService } from '../services/hotel.service';
import * as moment from 'moment';
import { PlaceDespService } from '../services/place-desp.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../services/login.service';
import { PlaceCardService } from '../services/place-card.service';

@Component({
  selector: 'app-hotel-desp',
  templateUrl: './hotel-desp.component.html',
  styleUrls: ['./hotel-desp.component.css']
})
export class HotelDespComponent implements OnInit {

  constructor(public hotelService: HotelService,
    public placeDespService: PlaceDespService, public router: Router, public loginService: LoginService, public placecardService: PlaceCardService) { }

  public placeDescription = [];
  tour_amount;
  username;
  usermail;

  
  total_single_room_amount;

 
  total_double_room_amount;

  hotelDescription ;
  startDate: any ;
  endDate: any ; 
  noOfDays;
  noOfPeople;

  overall_amount;

  form: FormGroup;


  ngOnInit() {
    this.form = new FormGroup({
      single_room: new FormControl(null),
      single_room_people: new FormControl(null),
      double_room: new FormControl(null),
      double_room_people: new FormControl(null),
      
    })
    this.usermail = this.placecardService.user();
    console.log("hotel desp amita; ", this.usermail);
    this.placeDescription = this.placeDespService.getLocation();
    console.log("place description: ", this.placeDescription);
    this.username = this.loginService.getusername();
    this.noOfPeople = this.hotelService.getNoOfPeople();
    this.tour_amount = this.placeDescription["amount"]*this.noOfPeople;
    this.hotelDescription = this.hotelService.getHotelDesp();
    this.startDate = moment(new Date(this.hotelService.getStratDate()));
    this.endDate = moment(new Date(this.hotelService.getEndDate()));
    // this.diffInDays = Math.abs(this.firstDate.diff(this.secondDate, 'days')); 
    this.noOfDays = Math.floor(Math.abs(this.startDate.diff(this.endDate)/(1000*60*60*24))) + 1;
    console.log("no. of days is: ", this.noOfDays);
    
  }
 
  
  calculate(){
    console.log("hey user: ", this.username);
    console.log("single room price: ", this.hotelDescription["singleRoom"])
    console.log("no of single room: ", this.form.value.single_room);
    console.log("no of people in single room: ", this.form.value.single_room_people);
    this.total_single_room_amount = this.form.value.single_room*this.form.value.single_room_people*this.hotelDescription["singleRoom"];
    this.total_double_room_amount = this.form.value.double_room*this.form.value.double_room_people*this.hotelDescription["doubleRoom"];
    this.overall_amount = (this.total_double_room_amount + this.total_single_room_amount + this.tour_amount)*this.noOfDays;
    console.log("single: ", this.total_single_room_amount, "double: ", this.total_double_room_amount, "overall: ", this.overall_amount);

  }

  goToLogin(){
    this.router.navigate(['/login'])
  }

  mailorder(){
    this.hotelService.generateMail(this.usermail);
  }
}
