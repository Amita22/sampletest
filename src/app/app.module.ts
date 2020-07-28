import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { RouterModule } from '@angular/router';


import { HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { AddPlacesComponent } from './add-places/add-places.component';
import { AdminComponent } from './admin/admin.component';
import { ViewPlacesAddedComponent } from './view-places-added/view-places-added.component';
import { SignupComponent } from './signup/signup.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FooterComponent } from './footer/footer.component';
import { AdminNavBarComponent } from './admin-nav-bar/admin-nav-bar.component';
import { AddPlaces1Component} from './add-places1/add-places1.component';
import { ViewPlaces1AddedComponent } from './view-places1-added/view-places1-added.component';
import { PlaceCardComponent } from './place-card/place-card.component';
import { PlaceDespComponent } from './place-desp/place-desp.component';
import { AddHotelsComponent } from './add-hotels/add-hotels.component';
import { ViewHotelAddedComponent } from './view-hotel-added/view-hotel-added.component';
import { HotelDashboardComponent } from './hotel-dashboard/hotel-dashboard.component';
import { HotelCardComponent } from './hotel-card/hotel-card.component';
import { HotelDespComponent } from './hotel-desp/hotel-desp.component';
import { SocketIoModule, SocketIoConfig } from "ngx-socket-io";
import { ChatAppComponent } from './chat/chat-app/chat-app.component';
import { ChatInputComponent } from './chat/chat-input/chat-input.component';
import { ChatNamePopupComponent } from './chat/chat-name-popup/chat-name-popup.component';
import { ChatWindowComponent } from './chat/chat-window/chat-window.component';
import { MessageComponent } from './chat/message/message.component';
import { UsersListComponent } from './chat/users-list/users-list.component';
import { AddFeedbackComponent } from './add-feedback/add-feedback.component';
import { ViewFeedbacksComponent } from './view-feedbacks/view-feedbacks.component';
//import { } from ‘@types/googlemaps’;

const config: SocketIoConfig = { url: "http://localhost:1025", options: {} };

// import { AgmCoreModule } from '@agm/core';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    AddPlacesComponent,
    AdminComponent,
    ViewPlacesAddedComponent,
    SignupComponent,
    DashboardComponent,
    FooterComponent,
    AdminNavBarComponent,
    AddPlaces1Component,
    ViewPlaces1AddedComponent,
    PlaceCardComponent,
    PlaceDespComponent,
    AddHotelsComponent,
    ViewHotelAddedComponent,
    HotelDashboardComponent,
    HotelCardComponent,
    HotelDespComponent,
    ChatAppComponent,
    ChatInputComponent,
    ChatNamePopupComponent,
    ChatWindowComponent,
    MessageComponent,
    UsersListComponent,
    AddFeedbackComponent,
    ViewFeedbacksComponent,
    //googlemaps
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule, 
    ReactiveFormsModule,
    RouterModule,
    HttpClientModule,
    SocketIoModule.forRoot(config)
    // AgmCoreModule.forRoot({
    //   apiKey: 'AIzaSyBJVaKOIb8lU8Wv53HrV-GHhwt6K4r9Lhk'
    // })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
