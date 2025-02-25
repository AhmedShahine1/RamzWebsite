import { ActivatedRouteSnapshot, Resolve } from "@angular/router";
import { ApiObjectData } from "../models/base/apiObjectData";
import { ProductService } from "../services/products/product.service";
import { catchError } from "rxjs/operators";
import { of } from "rxjs";
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
  })
  export class ProductResultResolver implements Resolve<ApiObjectData> {
    constructor(
      private productService: ProductService
    ) { }
    resolve(route: ActivatedRouteSnapshot): any {
      debugger
      return this.productService.search(route.params.brandId,route.params.catId,route.params.modelId,route.params.min,route.params.max).pipe(
        catchError(error => {
          console.log(error);
          return of(null);
        })
      );
    }
  }