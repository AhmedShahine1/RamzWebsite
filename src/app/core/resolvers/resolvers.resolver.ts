
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Params, Resolve, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { BrandService } from '../services/products/brand.service';
import { ApiObjectData } from '../models/base/apiObjectData';
import { BaseService } from '../services/base/base.service';
import { SubCategoryService } from '../services/products/subCategory.service';
import { ModelYearService } from '../services/products/modelYear.service';
import { RegionService } from '../services/products/region.service';
import { CityService } from '../services/products/city.service';
import { BankService } from '../services/products/bank.service';
import { WorksectorService } from '../services/products/worksector.service';
import { ProductService } from '../services/products/product.service';
import { ApiService } from '../services/products/api.service';


@Injectable({
  providedIn: 'root'
})
export class BrandsResolver implements Resolve<ApiObjectData> {
  constructor(
    private service: BrandService,
    private baseService: BaseService
  ) { }
  resolve(): Observable<ApiObjectData> {
    return this.baseService.resolveGets(this.service);
  }
}

@Injectable({
  providedIn: 'root'
})
export class SubCategoriesResolver implements Resolve<ApiObjectData> {
  constructor(
    private service: SubCategoryService,
    private baseService: BaseService
  ) { }
  resolve(): Observable<ApiObjectData> {
    return this.baseService.resolveGets(this.service);
  }
}

@Injectable({
  providedIn: 'root'
})
export class ModelYearsResolver implements Resolve<ApiObjectData> {
  constructor(
    private service: ModelYearService,
    private baseService: BaseService
  ) { }
  resolve(): Observable<ApiObjectData> {
    return this.baseService.resolveGets(this.service);
  }
}


@Injectable({
  providedIn: 'root'
})
export class RegionsResolver implements Resolve<ApiObjectData> {
  constructor(
    private service: RegionService,
    private baseService: BaseService
  ) { }
  resolve(): Observable<ApiObjectData> {
    return this.baseService.resolveGets(this.service);
  }
}

@Injectable({
  providedIn: 'root'
})
export class CitiesResolver implements Resolve<ApiObjectData> {
  constructor(
    private service: CityService,
    private baseService: BaseService
  ) { }
  resolve(): Observable<ApiObjectData> {
    return this.baseService.resolveGets(this.service);
  }
}

@Injectable({
  providedIn: 'root'
})
export class BanksResolver implements Resolve<ApiObjectData> {
  constructor(
    private service: BankService,
    private baseService: BaseService
  ) { }
  resolve(): Observable<ApiObjectData> {
    return this.baseService.resolveGets(this.service);
  }
}

@Injectable({
  providedIn: 'root'
})
export class WorkSectorsResolver implements Resolve<ApiObjectData> {
  constructor(
    private service: WorksectorService,
    private baseService: BaseService
  ) { }
  resolve(): Observable<ApiObjectData> {
    return this.baseService.resolveGets(this.service);
  }
}

@Injectable({
  providedIn: 'root'
})
export class ProductResolver implements Resolve<ApiObjectData> {
  constructor(
    private productService: ProductService,
    private baseService:BaseService
  ) { }
  resolve(route: ActivatedRouteSnapshot): any {
    return this.productService.get(route.params.id).pipe(
      catchError(error => {
        console.log(error);
        return of(null);
      })
    );
  }
}


@Injectable({
  providedIn: 'root'
})
export class PromotionsResolver implements Resolve<ApiObjectData> {
  constructor(
    private apiService: ApiService
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

@Injectable({
  providedIn: 'root'
})
export class ProductsResolver implements Resolve<ApiObjectData> {
  constructor(
    private productService: ProductService
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

@Injectable({
  providedIn: 'root'
})
export class AllProductsResolver implements Resolve<ApiObjectData> {
  constructor(
    private productService: ProductService,
    private baseService:BaseService
  ) { }
  resolve(route: ActivatedRouteSnapshot): any {
    return this.baseService.resolveGets(this.productService)
  }
}

@Injectable({
  providedIn: 'root'
})
export class ProductsByBrandResolver implements Resolve<ApiObjectData> {
  constructor(
    private productService: ProductService,
    private baseService:BaseService
  ) { }
  resolve(route: ActivatedRouteSnapshot): any {
    return this.baseService.resolveOperation(this.productService.findByBrand(route.params.id,)).pipe(
      catchError(error => {
        console.log(error);
        return of(null);
      })
    );
  }
}

@Injectable({
  providedIn: 'root'
})
export class ProductsBySearchResolver implements Resolve<ApiObjectData> {
  constructor(
    private productService: ProductService,
    private baseService:BaseService
  ) { }
  resolve(route: ActivatedRouteSnapshot): any {
    const queryParams = route.queryParams;
    const queryString = this.formatParamsToString(queryParams); // Format queryParams if necessary
    return this.baseService.resolveOperation(this.productService.search(queryString)).pipe(
      catchError(error => {
        console.log(error);
        return of(null);
      })
    );
  }
  
  formatParamsToString(params: Params): string {
    // Format queryParams as a string or according to what search() expects
    return JSON.stringify(params); // or any other appropriate transformation
  }
  
}

