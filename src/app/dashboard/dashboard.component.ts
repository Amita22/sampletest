import { Component, OnInit } from '@angular/core';
import { LoginService } from '../Services/login.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
// import { Preference } from '../model/preferenceModel';
// import { ThrowStmt } from '@angular/compiler';
import {PlaceCardService } from '../services/place-card.service'

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  userIsAuthenticated = false;
  private authListenerSubs:Subscription;

  constructor(public loginService: LoginService,
    public route: ActivatedRoute,
    public router: Router,
    public placecardService: PlaceCardService) { }
    name: string;
    // prefernce: any;
    id: any;
    private seasons;
    weather: Array<any> = [];


  ngOnInit() {
    this.route.paramMap.subscribe((paraMap)=>{
      if(paraMap.has('name')){
        this.name = paraMap.get('name');
        this.id = paraMap.get('id');
        //this.prefernce = paraMap.get('preference');
        console.log("dashboard: ", this.name, this.id);
        this.loginService.putusername(this.name);
        //this.loginService.putuserid(this.id);
        this.placecardService.getuserid(this.id);
        this.placecardService.getusername(this.name);
      } else {
        this.name = this.loginService.getusername();
      }
    })
    this.userIsAuthenticated = this.loginService.getIsAuth();
    //console.log("kaslksalks",this.userIsAuthenticated);
    this.authListenerSubs = this.loginService.getAuthStatusListener().subscribe(isAuthenticated => {
      //console.log("authhhh",isAuthenticated);
      this.userIsAuthenticated = isAuthenticated;
    })
  
  }

  
}
