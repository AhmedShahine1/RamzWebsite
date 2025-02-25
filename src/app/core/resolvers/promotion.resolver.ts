import { ActivatedRouteSnapshot, Resolve } from "@angular/router";
import { ApiObjectData } from "../models/base/apiObjectData";
import { PromotionService } from "../services/products/promotion.service";
import { catchError } from "rxjs/operators";
import { of } from "rxjs";
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
  })
  export class PromotionsResolver implements Resolve<ApiObjectData> {
    constructor(
      private apiService: PromotionService
    ) { }
    resolve(route: ActivatedRouteSnapshot): any {
      return this.apiService.getPromotions().pipe(
        catchError(error => {
          console.log(error);
          return of(null);
        })
      );
    }
  }