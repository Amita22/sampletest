import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent} from './home/home.component';
import { LoginComponent} from './login/login.component';
import { AdminComponent } from './admin/admin.component';
import { SignupComponent } from './signup/signup.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AddPlaces1Component } from './add-places1/add-places1.component';
import { LoginGuard } from './guards/login.guard';
import { PlaceDespComponent } from './place-desp/place-desp.component';
import { PlaceCardComponent } from './place-card/place-card.component';
import { AddHotelsComponent } from './add-hotels/add-hotels.component';
import { HotelDashboardComponent } from './hotel-dashboard/hotel-dashboard.component';
import { HotelCardComponent } from './hotel-card/hotel-card.component';
import { from } from 'rxjs';
import { HotelDespComponent } from './hotel-desp/hotel-desp.component';
import { ChatAppComponent } from './chat/chat-app/chat-app.component';
import{AddFeedbackComponent} from './add-feedback/add-feedback.component';
import { ViewFeedbacksComponent } from './view-feedbacks/view-feedbacks.component';


const routes: Routes = [
  {path: '',  component: HomeComponent},
  {path: 'login',  component: LoginComponent},
  {path: 'admin',  component: AdminComponent},
  {path: 'signup',  component: SignupComponent},
  // {path: 'dashboard/:name/:id',  component: DashboardComponent, canActivate:[LoginGuard]},
  {path: 'dashboard/:name/:id',  component: DashboardComponent},
  {path: 'add-places1',  component: AddPlaces1Component},
  {path: 'placeDesp',  component: PlaceDespComponent},
  {path: 'add-hotels', component: AddHotelsComponent},
  {path: 'hotel-dashboard', component: HotelDashboardComponent},
  {path: 'hotel-card', component: HotelCardComponent},
  {path: 'hotelDesp', component: HotelDespComponent},
  {path: 'chat', component: ChatAppComponent},
  {path:'feedback',component:AddFeedbackComponent},
  {path:'Feedback',component:ViewFeedbacksComponent},
  {path: 'goBack',  component: LoginComponent},


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
