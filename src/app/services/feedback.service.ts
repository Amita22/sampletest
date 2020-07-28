import { Injectable } from '@angular/core';
import {HttpClient } from '@angular/common/http'
import { Subject } from "rxjs";
import { Router } from "@angular/router";

import { map } from "rxjs/operators";
import{feedback} from "../model/feedback";
import { identifierModuleUrl } from '@angular/compiler';

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {
  private feedbacks:feedback[] = [];
  private feedback:feedback;
  private prodID:string = null;
  private feedbackUpdated = new Subject<feedback[]>();
  private feedbackdetailsUpdated = new Subject<any>();

  constructor(public http:HttpClient,public router:Router) { }



  addfeedback(description:string)
  {
    const feedback:feedback = {id:null, description: description };
   
    this.http.post<{message:string;postId:string}>(
      "http://localhost:1025/feedbacks/post",feedback
    ).subscribe(responseData => {

      const id = responseData.postId;
      feedback.id = id;
      this.feedbacks.push(feedback);
      this.feedbackUpdated.next([...this.feedbacks]);

    })
  }



  getfeedbacks(){
    this.http.get("http://localhost:1025/feedbacks/getfeedback")
    .pipe(
      map(feedbackData => {
        return feedbackData["result"].map(feedback => {
          return {
            _id:feedback.id,
            feedbackSchema:feedback["feedbackSchema"].map(opl => {
              return {
                
                description:opl.description,
                
                
                id:opl._id,
                

              };
            })
          }
        });
      })
    )
    .subscribe(transformedfeedback => {
      this.feedbacks = transformedfeedback;
      this.feedbackUpdated.next([...this.feedbacks]);
    });
  }



  getfeedback(feedbackID:string){
    return this.http.get<{message:string,product:feedback}>("http://localhost:1025/tips/getfeedbackDetails/" + feedbackID).subscribe(feedbackDetails => {
      this.feedback = feedbackDetails.product 
      this.feedbackdetailsUpdated.next(this.feedback);
  
      })
    
  }
 
getfeedbackDetailsListener(){
  return this.feedbackdetailsUpdated.asObservable();
}

getfeedbackUpdateListener(){
  return this.feedbackUpdated.asObservable();
}




}

