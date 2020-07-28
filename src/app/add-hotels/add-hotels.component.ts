import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AddHotelsService } from '../services/add-hotels.service';
import { from } from 'rxjs';

@Component({
  selector: 'app-add-hotels',
  templateUrl: './add-hotels.component.html',
  styleUrls: ['./add-hotels.component.css']
})
export class AddHotelsComponent implements OnInit {

  constructor(public addHotelesService : AddHotelsService) { }

  form: FormGroup;
  
  ngOnInit() {
    this.form = new FormGroup({
      title: new FormControl(null, {validators:[Validators.required]}),
      singleRoom: new FormControl(null, {validators:[Validators.required]}),
      doubleRoom: new FormControl(null, {validators:[Validators.required]}),
      image: new FormControl(null, {validators:[Validators.required]}),
      city: new FormControl(null, {validators:[Validators.required]}),
    })
  }

  onSaveHotel(){
    if(this.form.invalid){
      return;
    }
    this.addHotelesService.addhotel(
      this.form.value.title, 
      this.form.value.singleRoom,
      this.form.value.doubleRoom, 
      this.form.value.image, 
      this.form.value.city);
  
  }

}
