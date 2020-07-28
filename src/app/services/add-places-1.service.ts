import { Injectable } from '@angular/core';
import { Place } from '../model/placeModel';
import {HttpClient } from '@angular/common/http'
import { Subject } from "rxjs";
import { Router } from "@angular/router";

import { map } from "rxjs/operators";

interface ServerData {
  places: Place[];
}

@Injectable({
  providedIn: 'root'
})
export class AddPlaces1Service {
  private places: Place[] = [];
  private place: Place;
  private placeID: string = null;
  private placeUpdated = new Subject<Place[]>();
  private placedetailsUpdated = new Subject<any>();

  constructor(private http:HttpClient, private router: Router) { }
  
  addplace(placeType: string, title: string, Description: string, image: string, amount: number, season: any, latitude: string, longitude: string, city: string)
  {
    const place: Place = {placeID: null, placeType: placeType, title: title, Description: Description, image: image, amount: amount, season: season, latitude: latitude, longitude: longitude, city: city};

    this.http.post<{message: string; postID:string}>(
      "http://localhost:1025/places1/post", place
    ).subscribe(responseData => {

      const id = responseData.postID;
      place.placeID = id;

      this.places.push(place);
      this.placeUpdated.next([...this.places]);
    })
  }


  

  getPlaces(){
    console.log("inside getPlaces()");
    this.http.get("http://localhost:1025/places1/getPlace")
    .pipe(
      map(placeData => {
        return placeData["result"].map(place => {
          return {
            _id:place._id,
            PlaceSchema:place["PlaceSchema"].map(opl => {
              return {
                title:opl.title,
                placeID:opl._id,
                image: opl.image,
                Description: opl.Description,
                amount: opl.amount,
                placeType: opl.placeType,
                season: opl.season,
                latitude: opl.latitude,
                longitude: opl.longitude
              };
            })
          }
        });
      })
    )
    .subscribe(transformedPlace => {
      this.places = transformedPlace;
      this.placeUpdated.next([...this.places]);
      console.log("hello", this.places);
    });
    
  }


  getPlace(placeID:string){
    return this.http.get<{message:string,place:Place}>("http://localhost:1025/places1/getPlaceDetails/" + placeID).subscribe(placeDetails => {
      this.place = placeDetails.place 
      this.placedetailsUpdated.next(this.place);
  
      })
    
  }


  getPlaceDetailsListener(){
    return this.placedetailsUpdated.asObservable();
  }

  getPlaceUpdateListener(){
    return this.placeUpdated.asObservable();

  }



}
