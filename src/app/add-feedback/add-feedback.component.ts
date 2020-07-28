import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import {FeedbackService} from "../services/feedback.service";
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-feedback',
  templateUrl: './add-feedback.component.html',
  styleUrls: ['./add-feedback.component.css']
})
export class AddFeedbackComponent implements OnInit {
  form: FormGroup;

  constructor(public feedbackService:FeedbackService, public router: Router) { }

  ngOnInit() {
    this.form = new FormGroup({
      
  
      feedback:new FormControl(null,{validators:[Validators.required]
      }),
  
    });
  }
  onSaveFeedback(){
    if(this.form.invalid){
      return;
    }

    this.feedbackService.addfeedback(this.form.value.feedback)
     
  }

  goBack(){
    this.router.navigate(['/goBack']);
  }

}
