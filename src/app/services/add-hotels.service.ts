import { Injectable } from '@angular/core';
import { Hotel } from '../model/hotelModel';
import {HttpClient } from '@angular/common/http'
import { Subject } from "rxjs";
import { Router } from "@angular/router";

import { map } from "rxjs/operators";


@Injectable({
  providedIn: 'root'
})
export class AddHotelsService {

  private hotels: Hotel[] = [];
  private hotel: any;
  private hotelID: string = null;
  private hotelUpdated = new Subject<Hotel[]>();
  private hoteldetailsUpdated = new Subject<any>();


  constructor(private http:HttpClient, private router: Router) { }

  addhotel(title: string, singleRoom: number, doubleRoom: number, image: string, city: string){

    const hotel: Hotel = {hotelID: null, title: title, singleRoom: singleRoom, doubleRoom: doubleRoom, image: image, city: city};

    this.http.post<{message: string; postID:string}>(
      "http://localhost:1025/hotel/post", hotel
    ).subscribe(responseData => {

      const id = responseData.postID;
      hotel.hotelID = id;

      this.hotels.push(hotel);
      this.hotelUpdated.next([...this.hotels]);
    })
  }


  getHotels(){
    console.log("inside getHotels()");
    this.http.get("http://localhost:1025/hotel/getHotel")
    .pipe(
      map(hotelData => {
        return hotelData["result"].map(hotel => {
          return {
            _id:hotel._id,
            HotelSchema:hotel["HotelSchema"].map(opl => {
              return {
                title:opl.title,
                hotelID:opl._id,
                image: opl.image,
                singleRoom: opl.singleRoom,
                doubleRoom: opl.doubleRoom,
                city: opl.city
              };
            })
          }
        });
      })
    )
    .subscribe(transformedHotel => {
      this.hotels = transformedHotel;
      this.hotelUpdated.next([...this.hotels]);
      console.log("hello", this.hotels);
    });
    
  }


  getHotel(hotelID:string){
    return this.http.get<{message:string,hotel:Hotel}>("http://localhost:1025/hotel/getHotelDetails/" + hotelID).subscribe(hotelDetails => {
      this.hotel = hotelDetails.hotel 
      this.hoteldetailsUpdated.next(this.hotel);
      })
    
  }


  getHotelDetailsListener(){
    return this.hoteldetailsUpdated.asObservable();
  }

  getHotelUpdateListener(){
    return this.hotelUpdated.asObservable();

  }


}
