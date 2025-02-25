import { Injectable } from "@angular/core";
import { ApiObjectData } from "../models/base/apiObjectData";
import { Resolve } from "@angular/router";
import { Observable } from "rxjs";
import { BaseService } from "../services/base/base.service";
import { SubCategoryService } from "../services/products/subCategory.service";
import { ModelYearService } from "../services/products/modelYear.service";
import { BrandService } from "../services/products/brand.service";
import { BranchService } from "../services/products/branch.service";

@Injectable({
    providedIn: 'root'
  })
  export class BranchResolver implements Resolve<ApiObjectData> {
    constructor(
      private service: BranchService,
      private baseService: BaseService
    ) { }
    resolve(): Observable<ApiObjectData> {
      return this.baseService.resolveGets(this.service);
    }
  }
  
  @Injectable({
    providedIn: 'root'
  })
  export class BranchesResolver implements Resolve<ApiObjectData> {
    constructor(
      private service: BranchService,
      private baseService: BaseService
    ) { }
    resolve(): Observable<ApiObjectData> {
      return this.baseService.resolveGets(this.service);
    }
  }
  
 