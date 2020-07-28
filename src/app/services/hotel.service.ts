import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http'
//import { LoginService } from './login.service';


@Injectable({
  providedIn: 'root'
})
export class HotelService {

  constructor(public router: Router, private http:HttpClient) { }

  private start: Date;
  private end: Date;
  private people: number;
  private final_hotel_list: any;
  private place: any;
  private hotelDescription ;
  private usermail: any;

  hotelFound( final_hotel_list: any){
    console.log("hotel service: ", final_hotel_list);
    this.final_hotel_list = final_hotel_list;
    return final_hotel_list;
    // start = start;
    // end = end;
    // people = people;
    // final_hotel_list = final_hotel_list;
    // place = place;
    // this.start_date();
    // this.end_date();
    // this.no_of_people();
    // this.hotel_list();
    // this.places();
    //this.router.navigate(['/hotel-card']);
  }

  start_date(start: Date){
    this.start = start;
    this.getStratDate();
  }

  end_date(end: Date){
    this.end = end;
    this.getEndDate();
  }

  no_of_people(person: number){
    this.people = person;
    this.getNoOfPeople();
  }

  username(usermail: String){
    this.usermail = usermail;
    return this.usermail;
    //this.getusername();
  }

  hotel_list(){
    return this.final_hotel_list;
  }

  places(){
    return this.place;
  }

  Description(hotelDesp: any){
    this.hotelDescription = hotelDesp;
    this.getHotelDesp();
  }

  getHotelDesp(){
    return this.hotelDescription;
  }

  getStratDate(){
    return this.start;
  }

  getEndDate(){
    return this.end;
  }

  getNoOfPeople(){
    return this.people;
  }

  getusername(){
    return this.usermail;
  }

  // putusername(name: string){
  //   this.usermail= name;
  //   console.log("hotel service: ", this.usermail);
  //   return this.usermail;
  // }

  generateMail(name: string){
    console.log("login username is:", name);
    const userMail = {mail:name};
    this.http.post(
      "http://localhost:1025/hotel/mail",userMail).subscribe(responseData =>{
        console.log("yusss:" , responseData);
      })

  }
}
