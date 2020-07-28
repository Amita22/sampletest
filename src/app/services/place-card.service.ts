import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { LoginService } from './login.service';
import { Subject } from 'rxjs';
import { Preference } from '../model/preferenceModel';
import { map } from "rxjs/operators";
import { Place } from '../model/placeModel';
import { Subscription} from 'rxjs';
import { HotelService } from './hotel.service';

@Injectable({
  providedIn: 'root'
})
export class PlaceCardService {

  public username: string;
  private preference:Preference[] = [];

  private amount;
  private places:Place[] = [];
  private user_place: any;
  private place:any;
  private placeID:string = null;
  private placeUpdated = new Subject<Place[]>();
  private placedetailsUpdated = new Subject<any>();
  private userid: any;
  private placeSub : Subscription;
  placeDisplay: Place[] = [];


  

  constructor(private router: Router,
    private http: HttpClient, private loginService: LoginService, public hotelService: HotelService) { }

    getusername(name: string){
      this.username = name;
     // this.username = this.hotelService.putusername(name);
      console.log("place-card username", this.username);
      this.user();
      return this.username;
    }

    user(){
      return this.username;
    }

    getuserid(id: any){
      this.userid = id;
      //console.log("getuserId in place-card service: ", this.userid);
      return this.userid;
    }

  // getPlaceCards(){
    
  //   this.http.get("http://localhost:1025/placecard/getPlaceCardPreference/"+this.userid,)
  //     .pipe(
  //       map(placeData => {
  //         return placeData["result"].map(place => {
  //           return {
  //             _id:place._id,
  //             PlaceSchema:place["PlaceSchema"].map(opl => {
  //               return {
  //                 title:opl.title,
  //                 description:opl.description,
  //                 category:opl.category,
  //                 price:opl.price,
  //                 productID:opl._id,
  //                 imagePath:opl.imagePath
  
  //               };
  //             })
  //           }
  //         });
  //       })
  //     )
  //     .subscribe(transformedPlace => {
  //       this.places = transformedPlace;
  //       this.placeUpdated.next([...this.places]);
  //     });
  // }

  getPreferenceCards(){
    return this.http.get<{message:string,place:Place}>("http://localhost:1025/placecard/getPlaceCardPreference/"+this.userid).subscribe(placeDetails => {
      this.user_place = placeDetails.place
      //console.log("placeeee: " ,this.user_place["preference"]);
      //console.log("placeeee: " ,this.user_place);
      //this.placeUpdated.next(this.user_place);
      this.getPlaceCards(this.user_place["preference"]);
      })
  }

  

  getPlaceCards(preference: any){
    console.log("your place card preferences: ", preference);
    return this.http.get<{message:string,place:Place}>("http://localhost:1025/placecard/getPlaceCard/"+ preference).subscribe(placeDetails => {
    //console.log("inside subscriber");  
    this.place = placeDetails.place;
    this.placedetailsUpdated.next(this.place);
    this.placeUpdated.next(this.place);
    //return this.places;
    //this.places = Object.values(this.place);
      //this.placeUpdated.next(this.place)
      })
  }  

  // getPlaceCard(){
  //   return this.http.get<{message:string,place:Place}>("http://localhost:1025/placecard/getPlaceCardDetails/" + this.userid).subscribe(placeDetails => {
  //     this.place = placeDetails.place 
  //     //console.log("placeeee: " ,this.place);
  //     this.placedetailsUpdated.next(this.place);
  
  //     })
    
  // }

  getAmount(amount: any){
    this.amount = amount;
    this.getPrice();
    return amount;
  }

  getPrice(){
    console.log("Confirmed entered amount is: ", this.amount);
    return this.amount;
  }


  getPlacecardDetailsListener(){
    return this.placedetailsUpdated.asObservable();
  }

  getPlacecardUpdateListener(){
    return this.placeUpdated.asObservable();
  }


}
