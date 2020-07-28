import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
//import { Router } from '@angular/router';
import {Router, NavigationExtras} from "@angular/router";
import { Subject } from 'rxjs';
import { Preference } from '../model/preferenceModel';



@Injectable({
 providedIn: 'root'
})
export class LoginService {

  private places:Preference[] = [];
  
  private place:Preference;
  private placeID:string = null;
  private placeUpdated = new Subject<Preference[]>();
  private placedetailsUpdated = new Subject<any>();


 public userMail: string;
 public id: string;
 private tokenTimer:any;
 private isAuthenticated = false;
 private token:string;
 private preference:Preference[] = [];
 private authStatusListener = new Subject<boolean>();


 constructor(private router: Router,
   private http: HttpClient) { }




getAuthStatusListener(){
 return this.authStatusListener.asObservable();
}

 
getToken(){
 console.log("getToken Function",this.token)
 return this.token;
}

getIsAuth(){
 return this.isAuthenticated;
}

 userSignUp(title: any, username:any, password:any, preference:any){
   //this.userMail = user.username;
   //localStorage.setItem("Email",this.userMail);
   var user = {
     title: title,
     username: username,
     password: password,
     preference: preference
   }
   this.userMail=user.username;
   //this.preference=user.preference;
   //console.log("user preference: " , user.preference);
   localStorage.setItem("Email",user.username);
   console.log("Service sign up",user.username);

   this.http.post('http://localhost:1025/auth/signup',user).subscribe((responseData) => {
     console.log("Result :: " , responseData);
     const token = responseData["token"];
     this.token = token;
    //  this.preference = responseData["data"].preference;
     console.log(responseData["status"]);
     this.isAuthenticated = true;
     this.authStatusListener.next(true);
     if(responseData["status"] == "success"){
          if (responseData["data"]["userType"] == "customer"){
          const Name =responseData["data"]["username"];
         const id = responseData["data"]["_id"];
          //this.router.navigate(['/dashboard', Name])
          this.router.navigate(['/dashboard',Name, id])
         }
     }
   });
 }

//  addPreference(title:string){
//   console.log("inside addPreference()");
//   const place: Preference = {  title: title};
//   console.log(place);
//   this.http.post<{message:string; postId:string}>(
//     "http://localhost:1025/auth/addplace",place
//     ).subscribe(responseData => {
//       console.log(responseData);
//       const id = title;
//       place.title = title;
//       console.log(title);
//       console.log(place.title);
//       this.places.push(place);
//       this.placeUpdated.next([...this.places]);

//     })
//  }

 userSignIn(user:any){
   this.userMail = user.username;
  //  this.preference = user.preference;
   //console.log("preeeee", user.preference);
   //console.log("userSignIn login",user)
   localStorage.setItem("Email",this.userMail);

   console.log("Service sign in",this.userMail);

   this.http.post('http://localhost:1025/auth/signin',user).subscribe((responseData) => {
     console.log("Result :: " , responseData);
     console.log("resulttttt",responseData)
     
     

     if(responseData["status"] == "success"){

       const token = responseData["token"];
       this.token = token;
       if(token){
         const expiresInDuration = responseData["expiresIn"];
         console.log(expiresInDuration);
         this.setAuthTimer(expiresInDuration);
         this.isAuthenticated = true;
         this.authStatusListener.next(true);
         const now = new Date();
         const expirationDate = new Date(now.getTime() + expiresInDuration*1000);
         console.log(expirationDate);
         this.saveAuthData(token,expirationDate)

         if(responseData["data"]["userType"] == "Manager"){
          this.router.navigate(['/admin'])

       }else if (responseData["data"]["userType"] == "customer"){
         const Name =responseData["data"]["username"];
         const id = responseData["data"]["_id"];
         //let navigationExtras: NavigationExtras = responseData["data"]["preference"];
         //console.log("navigationExtras: ", navigationExtras);
         //const preference = responseData["data"]["preference"];
         //this.preference = responseData["data"].preference;
         //console.log("login preference", this.preference);
         //this.router.navigate(['/dashboard',Name])
         console.log("naviagte");
         this.router.navigate(['/dashboard',Name, id]);
        //  this.preference = responseData["data"].preference;
        //  this.userMail = responseData["data"].username;
        //  this.id = responseData["data"]._id;
        //  console.log("login preference", this.preference);
        //  this.getPreference(this.preference);
        //  this.getusername(this.userMail);
        //  this.getuserid(this.id);
       }
      }
    }
  });
}



getusername(){
  //console.log("in login service :", username);
  // this.userMail = username;
  // console.log("get username: " , this.userMail);
  console.log("in login service",this.userMail);
  return this.userMail;
}

getuserid(){
  
  return this.id;
}
// getPreference(){
//   //console.log(preference);
//   // this.preference = preference;
//   // console.log("get preference: ", this.preference);
//   return this.preference;
// }

putusername(name: string){
  console.log("in putname",name)
  this.userMail = name;
}



putuserid(id: any){
  console.log("in putid",id)
  this.id = id;
}


autoAuthUser(){
  const authInformation =   this.getAuthData();
  if(!authInformation){
    return;
  }
  const now = new Date();
  const expiresIn = authInformation.expirationDate.getTime() - now.getTime();
  if(expiresIn > 0){
    this.token = authInformation.token;
    this.isAuthenticated = true;
    this.setAuthTimer(expiresIn/100);
    this.authStatusListener.next(true);
  }
}

logout(){
  this.token = null;
  this.isAuthenticated = false;
  this.authStatusListener.next(false);
  clearTimeout(this.tokenTimer);
  this.clearAuthData();
}

private setAuthTimer(duration:number){
  console.log("Setting timer: " + duration);
  this.tokenTimer = setTimeout(() => {
    this.logout();
  }, duration*1000);
}


private saveAuthData(token:string,expirationDate:Date){
localStorage.setItem('token',token);
localStorage.setItem('expiration',expirationDate.toISOString());
}

private clearAuthData(){
localStorage.removeItem("token");
localStorage.removeItem("expiration");
localStorage.removeItem("Email");
}

private getAuthData(){
const token = localStorage.getItem("token");
const expirationDate = localStorage.getItem("expiration");
if(!token || !expirationDate){
  return;
}
return {
  token:token,
  expirationDate: new Date(expirationDate)
}
}


}
       
