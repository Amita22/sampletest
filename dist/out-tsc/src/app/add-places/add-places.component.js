import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from "@angular/forms";
let AddPlacesComponent = class AddPlacesComponent {
    constructor(route, placesService) {
        this.route = route;
        this.placesService = placesService;
    }
    ngOnInit() {
        this.form = new FormGroup({
            title: new FormControl(null, { validators: [Validators.required]
            })
        });
    }
    onSaveProduct() {
        if (this.form.invalid) {
            return;
        }
        this.placesService.addProduct(this.form.value.title);
    }
};
AddPlacesComponent = tslib_1.__decorate([
    Component({
        selector: 'app-add-places',
        templateUrl: './add-places.component.html',
        styleUrls: ['./add-places.component.css']
    })
], AddPlacesComponent);
export { AddPlacesComponent };
//# sourceMappingURL=add-places.component.js.map