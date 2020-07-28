import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
let LoginComponent = class LoginComponent {
    constructor(router, loginService) {
        this.router = router;
        this.loginService = loginService;
    }
    ngOnInit() {
    }
    Next(Signupform) {
        console.log(Signupform.value);
        this.loginService.userSignUp(Signupform.value);
        //this.router.navigate['/choice'];
    }
    SignIn(loginform) {
        this.loginService.userSignIn(loginform.value);
    }
};
LoginComponent = tslib_1.__decorate([
    Component({
        selector: 'app-login',
        templateUrl: './login.component.html',
        styleUrls: ['./login.component.css']
    })
], LoginComponent);
export { LoginComponent };
//# sourceMappingURL=login.component.js.map