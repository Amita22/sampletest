import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
let LoginService = class LoginService {
    constructor(router, http) {
        this.router = router;
        this.http = http;
        this.isAuthenticated = false;
        this.authStatusListener = new Subject();
    }
    getAuthStatusListener() {
        return this.authStatusListener.asObservable();
    }
    getToken() {
        console.log("getToken Function", this.token);
        return this.token;
    }
    getIsAuth() {
        return this.isAuthenticated;
    }
    userSignUp(user) {
        this.userMail = user.username;
        localStorage.setItem("Email", this.userMail);
        console.log("Service sign up", this.userMail);
        this.http.post('http://localhost:1025/auth/signup', user).subscribe((responseData) => {
            console.log("Result :: ", responseData);
            const token = responseData["token"];
            this.token = token;
            this.isAuthenticated = true;
            this.authStatusListener.next(true);
            if (responseData["status"] == "success") {
                if (responseData["data"]["userType"] == "customer") {
                    const Name = responseData["data"]["name"];
                    this.router.navigate(['/choice']);
                }
            }
        });
    }
    userSignIn(user) {
        this.userMail = user.username;
        console.log("userSignIn login", user);
        localStorage.setItem("Email", this.userMail);
        console.log("Service sign in", this.userMail);
        this.http.post('http://localhost:1025/auth/signin', user).subscribe((responseData) => {
            console.log("Result :: ", responseData);
            console.log("resulttttt", responseData);
            if (responseData["status"] == "success") {
                const token = responseData["token"];
                this.token = token;
                if (token) {
                    const expiresInDuration = responseData["expiresIn"];
                    console.log(expiresInDuration);
                    this.setAuthTimer(expiresInDuration);
                    this.isAuthenticated = true;
                    this.authStatusListener.next(true);
                    const now = new Date();
                    const expirationDate = new Date(now.getTime() + expiresInDuration * 1000);
                    console.log(expirationDate);
                    this.saveAuthData(token, expirationDate);
                    if (responseData["data"]["userType"] == "Manager") {
                        this.router.navigate(['/admin']);
                    }
                    else if (responseData["data"]["userType"] == "customer") {
                        const Name = responseData["data"]["name"];
                        this.router.navigate(['/dashboard', Name]);
                    }
                }
            }
        });
    }
    getusername() {
        console.log("in login service", this.userMail);
        return this.userMail;
    }
    putusername(name) {
        console.log("in putname", name);
        this.userMail = name;
    }
    autoAuthUser() {
        const authInformation = this.getAuthData();
        if (!authInformation) {
            return;
        }
        const now = new Date();
        const expiresIn = authInformation.expirationDate.getTime() - now.getTime();
        if (expiresIn > 0) {
            this.token = authInformation.token;
            this.isAuthenticated = true;
            this.setAuthTimer(expiresIn / 100);
            this.authStatusListener.next(true);
        }
    }
    logout() {
        this.token = null;
        this.isAuthenticated = false;
        this.authStatusListener.next(false);
        clearTimeout(this.tokenTimer);
        this.clearAuthData();
    }
    setAuthTimer(duration) {
        console.log("Setting timer: " + duration);
        this.tokenTimer = setTimeout(() => {
            this.logout();
        }, duration * 1000);
    }
    saveAuthData(token, expirationDate) {
        localStorage.setItem('token', token);
        localStorage.setItem('expiration', expirationDate.toISOString());
    }
    clearAuthData() {
        localStorage.removeItem("token");
        localStorage.removeItem("expiration");
        localStorage.removeItem("Email");
    }
    getAuthData() {
        const token = localStorage.getItem("token");
        const expirationDate = localStorage.getItem("expiration");
        if (!token || !expirationDate) {
            return;
        }
        return {
            token: token,
            expirationDate: new Date(expirationDate)
        };
    }
};
LoginService = tslib_1.__decorate([
    Injectable({
        providedIn: 'root'
    })
], LoginService);
export { LoginService };
//# sourceMappingURL=login.service.js.map