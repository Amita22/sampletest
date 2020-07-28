import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PlaceDespService {

  private placeDescription = [];

  constructor() { }

  Description(placeDesp : any){
    this.placeDescription = placeDesp;
    this.getLocation();
  }

  getLocation(){
    console.log("place description services: ", this.placeDescription);
    return this.placeDescription;
  }
}
