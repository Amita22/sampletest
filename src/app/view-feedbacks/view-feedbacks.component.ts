import { Component, OnInit } from '@angular/core';
import{FeedbackService} from '../services/feedback.service';
import {feedback} from '../model/feedback';
import { from } from 'rxjs';
import { Subscription} from 'rxjs'
import { Router } from "@angular/router";

@Component({
  selector: 'app-view-feedbacks',
  templateUrl: './view-feedbacks.component.html',
  styleUrls: ['./view-feedbacks.component.css']
})
export class ViewFeedbacksComponent implements OnInit {
  feedbackDisplay: feedback[] = [];
  private feedbackSub : Subscription;


  constructor(public router:Router, public feedbackService:FeedbackService) { }

  ngOnInit() {
    this.feedbackService.getfeedbacks();
    this.feedbackSub = this.feedbackService.getfeedbackUpdateListener().subscribe((feedbackDetails:feedback[]) => {
      console.log("feedbackDetails cards",feedbackDetails);
      this.feedbackDisplay = feedbackDetails
    })
  }

  goBack(){
    this.router.navigate(['/goBack']);
  }

}
