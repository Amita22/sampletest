import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
let ViewPlacesAddedComponent = class ViewPlacesAddedComponent {
    constructor(placesService, router) {
        this.placesService = placesService;
        this.router = router;
        this.productDisplay = [];
    }
    ngOnInit() {
        this.placesService.getProducts();
        this.productSub = this.placesService.getProductUpdateListener().subscribe((productDetails) => {
            console.log("productDetails cards", productDetails);
            this.productDisplay = productDetails;
        });
    }
};
ViewPlacesAddedComponent = tslib_1.__decorate([
    Component({
        selector: 'app-view-places-added',
        templateUrl: './view-places-added.component.html',
        styleUrls: ['./view-places-added.component.css']
    })
], ViewPlacesAddedComponent);
export { ViewPlacesAddedComponent };
//# sourceMappingURL=view-places-added.component.js.map