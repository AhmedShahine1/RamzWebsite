import { ActivatedRouteSnapshot, Resolve } from "@angular/router";
import { ApiObjectData } from "../models/base/apiObjectData";
import { ProductImageService } from "../services/products/productImage.service";
import { catchError } from "rxjs/operators";
import { of } from "rxjs";
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
  })
  export class ProductImagesResolver implements Resolve<ApiObjectData> {
    constructor(
      private productService: ProductImageService
    ) { }
    resolve(route: ActivatedRouteSnapshot): any {
      return this.productService.gets().pipe(
        catchError(error => {
          console.log(error);
          return of(null);
        })
      );
    }
  }