import { Component, AfterViewInit, ViewChild, ElementRef,OnInit, Input } from '@angular/core';
//import { Component, OnInit } from '@angular/core';
import { PlaceDespService } from '../services/place-desp.service';
import { Router } from '@angular/router';
import { PlaceCardService } from '../services/place-card.service';
import { HotelService } from '../services/hotel.service';
import { from } from 'rxjs';
//import { AgmCoreModule } from '@agm/core';
//import { Input } from '@angular/core/src/metadata/directives';


@Component({
  selector: 'app-place-desp',
  templateUrl: './place-desp.component.html',
  styleUrls: ['./place-desp.component.css'],
  //inputs: ['latitude', 'longitude']
})
export class PlaceDespComponent implements AfterViewInit, OnInit {

  public placeDescription = [];
  @Input() latitude: any ;
  @Input() longitude: any ;

  usermail: any;
  username : any;

  constructor(public placeDespService: PlaceDespService, public router: Router, public placecardService: PlaceCardService, 
    public hotelService: HotelService) { }

    ngOnInit(){
      this.usermail = this.placecardService.user();
      
      console.log("Amita Kshitiz: ", this.usermail );
     // console.log("Amita Kshitiz 2: ", this.username );
      this.placeDescription = this.placeDespService.getLocation();
      this.latitude = parseFloat(this.placeDescription["latitude"]);
      this.longitude = parseFloat(this.placeDescription["longitude"]);
      console.log(this.placeDescription);
    }
    ngAfterViewInit() {
      
      this.mapInitializer();
    }
    
    @ViewChild('mapContainer', { static: false }) gmap: ElementRef;
    map: google.maps.Map;
    lat = 29.959427;
    lng = 80.08784;

    coordinates = new google.maps.LatLng(this.lat, this.lng);

    mapOptions: google.maps.MapOptions = {
     center: this.coordinates,
      zoom: 8
    };

    marker = new google.maps.Marker({
      position: this.coordinates,
      map: this.map,
    });

    


    mapInitializer() {
      console.dir("latitude: ", this.lat);
      console.log("coordinates are: ", this.coordinates);
      this.map = new google.maps.Map(this.gmap.nativeElement, 
      this.mapOptions);
      this.marker.setMap(this.map);
    }
    

    // ngOnInit() {
    //  this.placeDescription = this.placeDespService.getLocation();
    //  this.placeDescription.forEach(function(value){
    //    //console.log("ssssssssssssssss: ", value);
    //   this.latitude = parseInt(value.latitude);
    //   //  this.longitude = parseInt(value.longitude);
    //   //  console.log("latitude is: ", this.latitude, "longitude is: ", this.longitude);
    //  })     
    // }

    goToHotel(){
      this.username = this.hotelService.username(this.usermail);
      console.log("Amita Kshitiz 2: ", this.username );
      this.router.navigate(['/hotel-dashboard']);
    }

    goToLogin(){
      this.router.navigate(['/login'])
    }
  
    mailorder(){
      this.hotelService.generateMail(this.usermail);
    }
}
