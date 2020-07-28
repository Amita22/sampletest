import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { Subject } from "rxjs";
import { map } from "rxjs/operators";
let PlacesService = class PlacesService {
    constructor(http, router) {
        this.http = http;
        this.router = router;
        this.products = [];
        this.prodID = null;
        this.productUpdated = new Subject();
        this.productdetailsUpdated = new Subject();
    }
    addProduct(title) {
        const product = { productID: null, title: title };
        this.http.post("http://localhost:1025/places/post", product).subscribe(responseData => {
            const id = responseData.postId;
            product.productID = id;
            this.products.push(product);
            this.productUpdated.next([...this.products]);
        });
    }
    getProducts() {
        console.log("inside getProducts()");
        this.http.get("http://localhost:1025/places/getProduct")
            .pipe(map(productData => {
            return productData["result"].map(product => {
                return {
                    _id: product._id,
                    ProductSchema: product["ProductSchema"].map(opl => {
                        return {
                            title: opl.title,
                            productID: opl._id,
                        };
                    })
                };
            });
        }))
            .subscribe(transformedProduct => {
            this.products = transformedProduct;
            this.productUpdated.next([...this.products]);
        });
    }
    getProduct(prodID) {
        return this.http.get("http://localhost:1025/places/getProductDetails/" + prodID).subscribe(productDetails => {
            this.product = productDetails.product;
            this.productdetailsUpdated.next(this.product);
        });
    }
    getProductDetailsListener() {
        return this.productdetailsUpdated.asObservable();
    }
    getProductUpdateListener() {
        return this.productUpdated.asObservable();
    }
};
PlacesService = tslib_1.__decorate([
    Injectable({
        providedIn: 'root'
    })
], PlacesService);
export { PlacesService };
//# sourceMappingURL=places.service.js.map