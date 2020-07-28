import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
let AuthInterceptor = class AuthInterceptor {
    constructor(loginService) {
        this.loginService = loginService;
    }
    intercept(req, next) {
        const authToken = this.loginService.getToken();
        console.log("in interceptor", authToken);
        const authRequest = req.clone({
            headers: req.headers.set("authorization", "Bearer " + authToken)
        });
        return next.handle(req);
    }
};
AuthInterceptor = tslib_1.__decorate([
    Injectable()
], AuthInterceptor);
export { AuthInterceptor };
//# sourceMappingURL=auth-interceptor.js.map