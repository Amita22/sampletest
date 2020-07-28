import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
let ChoiceComponent = class ChoiceComponent {
    constructor(placesService, router) {
        this.placesService = placesService;
        this.router = router;
        // isValidFormSubmitted: boolean = null;
        // userForm = new FormGroup({
        //    //uname: new FormControl('', Validators.required),
        //    //gender: new FormControl('', Validators.required),
        //    //married: new FormControl(false),
        //    Mountains: new FormControl('', Validators.nullValidator),
        //    Beaches: new FormControl('', Validators.nullValidator),
        //    HP: new FormControl('', Validators.nullValidator),
        //    SA: new FormControl('', Validators.nullValidator),
        //    Museum: new FormControl('', Validators.nullValidator),
        //    FA: new FormControl('', Validators.nullValidator)
        // });
        // cb1;
        // cb2;
        // cb3;
        // cb4;
        // cb5;
        // cb6;
        this.productDisplay = [];
    }
    ngOnInit() {
        this.placesService.getProducts();
        this.productSub = this.placesService.getProductUpdateListener().subscribe((productDetails) => {
            console.log("productDetails cards", productDetails);
            this.productDisplay = productDetails;
        });
    }
    // SignUp(Signupform:NgForm){
    //   console.log(Signupform.value);
    //   //this.loginService.userSignUp(Signupform.value);
    // }
    onFormSubmit() {
        //   this.isValidFormSubmitted = false;
        //   if(this.userForm.invalid){
        //  return;	
        //   } 	
        //   this.isValidFormSubmitted = true;	
        //   console.log("the user form is valid" , this.userForm.valid);
        //   this.cb1= this.userForm.get('Mountains').value;
        //   console.log("Mountains", this.cb1);
        //   this.cb2= this.userForm.get('Beaches').value;
        //   console.log("Beaches", this.cb2);
        //   this.cb3= this.userForm.get('HP').value;
        //   console.log("Historical Places", this.cb3);
        //   this.cb4= this.userForm.get('SA').value;
        //   console.log("Snow Areas", this.cb4);
        //   this.cb5= this.userForm.get('Museum').value;
        //   console.log("Museum", this.cb5);
        //   this.cb6= this.userForm.get('FA').value;
        //   console.log("Forest Areas", this.cb6);
    }
};
ChoiceComponent = tslib_1.__decorate([
    Component({
        selector: 'app-choice',
        templateUrl: './choice.component.html',
        styleUrls: ['./choice.component.css']
    })
], ChoiceComponent);
export { ChoiceComponent };
//# sourceMappingURL=choice.component.js.map