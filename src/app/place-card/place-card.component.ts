import { Component, OnInit, AfterViewInit, ViewChild, ElementRef} from '@angular/core';
import { PlaceCardService } from '../services/place-card.service';
import { LoginService } from '../services/login.service';
import { Place } from '../model/placeModel';
import { Subscription} from 'rxjs'
import { from } from 'rxjs';
import { Router } from '@angular/router';
import { PlaceDespService } from '../services/place-desp.service'
//import { Pipe, PipeTransform } from '@angular/core';
@Component({
  selector: 'app-place-card',
  templateUrl: './place-card.component.html',
  styleUrls: ['./place-card.component.css']
})

// @Pipe({
//   name: 'keys'
// })
export class PlaceCardComponent implements OnInit {
  // title = 'angular-gmap';
  
  // @ViewChild('mapContainer', {static: false}) gmap: ElementRef;
  // map: google.maps.Map;
  // lat = 40.730610;
  // lng = -73.935242;
  // coordinates = new google.maps.LatLng(this.lat, this.lng);
  // mapOptions: google.maps.MapOptions = {
  //   center: this.coordinates,
  //   zoom: 8,
  // };
  // marker = new google.maps.Marker({
  //   position: this.coordinates,
  //   map: this.map,
  // });

  // ngAfterViewInit() {
  //   this.mapInitializer();
  // }

  // mapInitializer() {
  //   console.log("inside map initializer")
  //   this.gmap.nativeElement.focus();
  //   this.map = new google.maps.Map(this.gmap.nativeElement, this.mapOptions);
  //   this.marker.setMap(this.map);
  // }


  
  placeDisplay: Place[] = [];
  place: Place[] = [];
  Object = Object;
  
  private placeSub : Subscription;
  amount = String;
 
  private seasons;
  weather: Array<any> = [];

  usermail : String;
  

  constructor(public placecardService: PlaceCardService,
    private router: Router, public loginService: LoginService, public placeDespService: PlaceDespService) { }

  ngOnInit() {
    this.placecardService.getPreferenceCards();
    this.usermail = this.placecardService.user();
    
    //console.log("Amita Kumari: ", this.prefernce);
    //this.placecardService.getPlaceCards(this.prefernce);
    //this.placeDisplay = this.placecardService.getPlaceCardUpdate();
    //this.userid = this.loginService.getuserid();
    //console.log("Your user id is: ", this.userid);
    //console.log(this.placecardService.getPlaceCardUpdate(this.placeDisplay));
    //console.dir("ppppppppppppppp: ", this.placeDisplay);
    //this.placecardService.getPlaceCards();
    //console.log("front end place card");
    this.placeSub = this.placecardService.getPlacecardUpdateListener().subscribe((placeDetails:Place[]) => {
      //console.log("placeCardsDetails cardsssssssssssssssssss:",placeDetails);
      this.placeDisplay = placeDetails;
      console.log("the place display:", this.placeDisplay);
      console.log(typeof(this.placeDisplay));
      
    })

    // if(this.placecardService.getPrice()!='\0'){
    //   this.amount = this.placecardService.getPrice();
    //   console.log("place card amount: ", this.amount);
    //   if(this.placeDisplay["amount"] === this.amount){
    //     console.log("place cards according to amount: ", this.placeDisplay);
    //     this.placeDisplay = this.placeDisplay;
    //   }
    // }

    

  }

  season(event: any) {
    var key;
    console.log(event.target.value);
    console.log(event.target.checked); 
    this.seasons = event.target.value;
    key=event.target.checked;
    if(key===true){
      this.weather.push(this.seasons);
    }
    else{
      this.weather.splice(this.weather.indexOf(this.seasons),1);
    }  
    
    console.log("seasons array: ", this.weather);
}

  price(eamount: any){
    // console.log("entered amount is: ", eamount.value);
    this.placecardService.getAmount(eamount.value);
    this.place = [];
   this.placeDisplay.forEach(function (value){
    console.log("entered amount is: ", value.amount);
    console.log("entered amount is: ", eamount.value);
     if(value.amount <= eamount.value){
      console.log("value is: " ,value);
      this.place.push(value);
     }
   }.bind(this))
   this.placeDisplay = this.place;
   console.log("cards according to amount entered are: ", this.placeDisplay);
    
  }

  SelectedSeason(){
    console.log("selected seasons are: ", this.weather);
    this.place = [];
   this.placeDisplay.forEach(function (value){
    //console.log("entered amount is: ", value.amount);
    //console.log("entered amount is: ", eamount.value);
     if(JSON.stringify(value.season)==JSON.stringify(this.weather)){
      console.log("value is: " ,value);
      this.place.push(value);
     }
   }.bind(this))
   this.placeDisplay = this.place;
   console.log("cards according to amount entered are: ", this.placeDisplay);
  }


  goToDesp(place: any){
    console.log("view details of: ", place);
    // console.log("place despcription: ", this.placeDisplay);
    this.placeDespService.Description(place);
    this.router.navigate(["/placeDesp",]);
  }
  // placeDesp(){
  //   this.router.navigate(['/place-desp']);
  // }

  chat(){
    this.router.navigate(["/chat"]);
  }
  Feedback(){
    this.router.navigate(["/feedback"])
  }

}
